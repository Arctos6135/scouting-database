// Load all event matches into the scouting db
//this is expected to be run only once per event

const tba = require('./tba.js');
const db = require('./scouting.js');

const RED = "red";
const BLUE = "blue";

async function load_matches(connection, matches) {
    if (!matches) {
        console.error("No matches");
        connection.end();
    }
    console.log(`Loading ${matches.length} matches`);
    await Promise.all(matches.map(m => load_match(connection, m)))
        .then(() => connection.end())
        .catch((e) => console.error("Something went wrong: " + e));
    console.log("done");
}

// Returns a Promise to load a single match into the db
async function load_match(connection, match) {

    if (!is_qualifying(match)) {
        // we do not want to load this, return an immediately-resolved Promise
        return Promise.resolve();
    }

    // extract the number of the i'th team on the alliance colour
    function get_team_number(colour, i) {
        // team_keys always has frc prepended.  So strip the first three characters, then parse it as
        // a base-10 number
        return parseInt(match.alliances[colour].team_keys[i].substring(3), 10);
    }

    // These functions all return Promises that wrap calls to mysql
    // They all take the connection as a free variable.

    // A Promise is created with two callbacks, one for success and one for failure
    // it must call one or the other as the LAST thing it does.
    // msql query method expects a callback which it calls with three inputs, error, results, fields.
    // 
    // error is non-null if something went wrong.  In that case, the Promise needs to reject.
    //
    // results is the results if any.  If we don't care about results, we just resolve with no value
    // Otherwise, we check the results and either resolve with some value (e.g. an id) or reject with a problem.
    // 
    // We don't care about fields and don't even look for it.

    // Takes a match (object) and returns a Promise to insert that match.  
    function insertMatch(match) {
        return new Promise(
            (resolve, reject) => 
                connection.query(
                    "INSERT INTO frc_match (match_number, event_code, practice)" +
                        " VALUES(?, ?, ?)" +
                        " ON DUPLICATE KEY UPDATE event_code = event_code",
                    [match.match_number, match.event_key, false],
                    (error) =>  (error) ? reject(error) : resolve(match)
                )
        );
    }

    // Takes a match, and return a Promise that (when resolved) yields id of the inserted match in the db
    function getMatchId(match) {
        return new Promise(
            (resolve, reject) => 
                connection.query(
                    "SELECT match_id FROM frc_match" +
                        " WHERE match_number = ?" +
                        "   AND event_code = ?" +
                        "   AND practice = ?",
                    [match.match_number, match.event_key, false],
                    (error, results) => 
                        (error)
                        ? reject(error)  // something went wrong
                        : ((!results || results.size == 0) 
                            ? ("no match_id found.  Did insert fail?")  // we got results but we don't like them
                            : resolve(results[0].match_id))   // we got an id, return it.
                ));
    }

    // returns a Promise to insert the alliance and all its teams
    function insertAllianceAndTeams(match_id, colour) {
        return insertAlliance(match_id, colour)
            .then(() => getAllianceId(match_id, colour))
            .then(id => Promise.all([
                insertTeam(id, get_team_number(colour, 0)),
                insertTeam(id, get_team_number(colour, 1)),
                insertTeam(id, get_team_number(colour, 2))]))
        .catch(bad => console.warn(`While inserting alliance ${colour} for match ${match_id}: ${bad}`));
    }

    // returns a Promise to insert an alliance.  
    function insertAlliance(match_id, colour) {
        return new Promise(
            (resolve, reject) => 
                connection.query(
                    "INSERT INTO alliance (match_id, alliance_colour)" +
                        " VALUES (?, ?)" + 
                        "ON DUPLICATE KEY UPDATE match_id = match_id",
                    [match_id, colour],
                    (error, results) => 
                        (error) ? reject(error) : resolve()
                ));
    }

    // Returns a Promise that resolves to the id of the alliance
    function getAllianceId(match_id, colour) {
        return new Promise(
            (resolve, reject) => 
                connection.query(
                    "SELECT alliance_id FROM alliance " +
                        " WHERE match_id = ? AND alliance_colour = ?",
                    [match_id, colour],
                    (error, results) => {
                        if (error) {
                            reject(error);
                            return; // reject should always be the last thing the promise body does
                        }
                        if (! results || results.length == 0) {
                            reject("no results when getting alliance id " + match_id + " " + colour);
                            return;
                        }
                        resolve(results[0].alliance_id);
                    }
                ));
    }

    // Returns a Promise to insert a team
    function insertTeam(alliance_id, team_number) {
        return new Promise(
            (resolve, reject) => 
                connection.query(
                    "INSERT INTO alliance_member (alliance_id, team_number)" +
                        " VALUES (?, ?) " +
                        " ON DUPLICATE KEY UPDATE team_number = team_number;",
                    [alliance_id, team_number],
                    (error) => (error)
                        ? console.warn(`While inserting team ${team_number} into ${alliance_id}: ${error}`) || reject(error)
                        : resolve()
                )
        );
    }

    // insert the match, get the id, then insert both alliances
    return insertMatch(match)
        .then(m => getMatchId(m))
        .then(match_id => Promise.all([RED, BLUE].map(colour => insertAllianceAndTeams(match_id, colour))))
        .then(() => console.log(`Loaded ${match.event_key} ${match.match_number}`))
        .catch(bad => console.warn("something went wrong " + bad.message));

}

function is_qualifying(match){
    return  match.comp_level == 'qm';
}

if (require.main === module) {
    var event_code = (process.argv.length < 3)
        ? (console.error("Missing argument: event_code") || process.exit())
        : process.argv[2];
    db.with_connection(connection =>  
                       tba.matches_at_event(event_code, matches => load_matches(connection, matches)));
}
