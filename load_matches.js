//# Load all event matches into the scouting db
//this is expected to run only once per event

const tba = require('./tba.js');
const db = require('./scouting.js');
const async = require("async")

// Using connection to database, add the match object
//basic match schedule information is stored in several tables: frc_match, alliance, and alliance_member

var matches = [];

// collect all the matches into a list.
function add_match(connection, match) {
    matches.push(match);
}

// this is called after TBA has found all the matches.
function after_all_matches_are_collected_load_them(connection) {
    console.log("Loading " + matches.length + " matches");
    load_match_list(connection, matches, () =>  connection.end());
}

// Load the list of matches, one at a time.
// When all are loaded, call the done function.
function load_match_list(connection, matches, done) {
    if (matches.length == 0) {
        done();
        return;
    }
    
    var match = matches.pop();
    console.log(match.event_key + " " + match.match_number);
    var alliance_ids = {"red": null, "blue": null};
    var match_id = null;

    function get_match_id() {
        return match_id;
    }

    function get_team_number(colour, i) {
        // team_keys always has frc prepended.  So strip the first three characters, then parse it as
        // a base-10 number
        return parseInt(match.alliances[colour].team_keys[i].substring(3), 10);
    }

    // Returns a function that can be used in an async series to insert the current match
    // It also sets match_id (which is global with respect to this function) to the id of
    // the match just inserted, so that subsequent queries can use it.
    function get_match_inserter(match) {
        return (cb) => 
            connection.query(
                "INSERT INTO frc_match (match_number, event_code, practice)" +
                    " VALUES(?, ?, ?)" +
                    " ON DUPLICATE KEY UPDATE event_code = event_code",
                [match.match_number, match.event_key, false],
                (error) => {
                    if (error) {
                        return cb(error);
                    }
                    // get the id of the row we just inserted
                    connection.query(
                        "SELECT match_id FROM frc_match" +
                            " WHERE match_number = ?"+
                            "   AND event_code = ?" +
                            "   AND practice = ?",
                        [match.match_number, match.event_key, false],
                        (error, results) => {
                            match_id = results[0].match_id;
                            cb(error);
                        }
                    );
                    }
                );
    }

    // Returns a function that can be used in an async series
    // to insert an alliance using the current match_id for a given colour.
    // It also fetches the id the newly inserted alliance and stores it in
    // alliance_ids for use by team inserters.
    // An asycn series function takes one argument (cb) which it calls whenever it needs to exit, whether with error
    // or not.
    function get_alliance_inserter(colour) {
        return (cb) => {
            // we do not know the match_id at the time this is called, so the inserter function has
            // to call a function at run time to get it
            var match_id = get_match_id();
            connection.query(
            "INSERT INTO alliance (match_id, alliance_colour)" +
                " VALUES (?, ?)" + 
                "ON DUPLICATE KEY UPDATE match_id = match_id",
                [match_id, colour],
                (error, results) => {
                    if (error) {
                        return cb(error);
                    }
                    connection.query(
                        "SELECT alliance_id FROM alliance " +
                            " WHERE match_id = ? AND alliance_colour = ?",
                        [match_id, colour],
                        (error, results) => {
                            if (error) {
                                return cb(error);
                            }
                            alliance_ids[colour] = results[0].alliance_id;
                            cb(error);
                        });
                }
            );
        };
    }

    function get_team_inserter(colour, i) {
        return (cb) => {
            var alliance_id = alliance_ids[colour];
            connection.query(
                "INSERT INTO alliance_member (alliance_id, team_number)" +
                    " VALUES (?, ?) " +
                    " ON DUPLICATE KEY UPDATE team_number = team_number;",
                [alliance_id, get_team_number(colour, i)],
                (error, results) => cb(error)
            );
        };
    }

    // Node runs each database query asynchronously, but we want to wait
    // for (some of the) queries to finish before doing the next one so we
    // can use results from previous queries.  To do this we need to use
    // the aync library, which allows us to run a series of calls
    // in strict order.  Each call is expressed as function (of one argument,
    // cb) and it calls that cb when it is done.  The cb function then
    // calls the next operation (unless there is an error)

    async.series(
    [
        get_match_inserter(match),
        get_alliance_inserter("red"),
        get_team_inserter("red", 0),
        get_team_inserter("red", 1),
        get_team_inserter("red", 2),

        get_alliance_inserter("blue"),
        get_team_inserter("blue", 0),
        get_team_inserter("blue", 1),
        get_team_inserter("blue", 2)

    ],
    
    // This is called when all are finished
    (err, results) => {
        load_match_list(connection, matches, done)
    }
    );
    
}

function is_qualifying(x){
    return  x.comp_level == 'qm';
}

if (require.main === module) {
    if (process.argv.length < 3) {
    throw "Missing argument: event_code";
    }
    var event_code = process.argv[2];
    db.with_connection(connection =>  
               tba.matches_at_event(event_code,
                        x => is_qualifying(x) && add_match(connection, x),
                        () => after_all_matches_are_collected_load_them(connection)
                       ));
}
