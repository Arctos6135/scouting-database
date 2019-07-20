//Load all alliance outcomes for an event into the scouting db
//This is only for using our old data from past events
//because I don't want to enter it manually...

const tba = require('./tba.js');
const db = require ('./scouting.js');

async function load_outcomes(connection, outcomes) {
     console.log(`Loading ${outcomes.length} outcomes`);
    if (!outcomes) {
	console.error("No outcomes. Are you sure a match has happened?");
	connection.end();
    }
   
    await Promise.all(outcomes.map(outcome => load_outcome(connection, outcome)))
	.then(() => connection.end())
	.catch((err) => console.error("Something went wrong: " + err));
    console.log("done");
}

async function load_outcome(connection, outcome) {
    if (!is_qualifying(outcome)) {
	return Promise.resolve();
    }

    function getAllianceID(outcome, colour) {
	//console.log("getting alliance id for " + outcome.match_number + " " + colour + " at event " + outcome.event_key);
	 return new Promise(
            (resolve, reject) => 
                connection.query(
                    "SELECT a.alliance_id FROM frc_match m " +
			" INNER JOIN alliance a " +
			"    ON a.match_id = m.match_id " +
			"   AND a.alliance_colour = ? " +
                        " WHERE m.match_number = ? " +
                        "   AND m.event_code = ? " +
                        "   AND m.practice = ? ", 
                    [colour, outcome.match_number, outcome.event_key, false],
                    (error, results) => 
                        (error)
                        ? reject(error)  // something went wrong
                        : ((!results || results.size == 0) 
                            ? ("Something went wrong. Have you loaded matches for this event?")  // we got results but we don't like them
                            : resolve(results[0].alliance_id))   // we got an id, return it.
                ));
    }

    function insertAllianceOutcome(connection, outcome, alliance_id, colour) {
	//console.log("insert " + outcome.match_number + " " + colour + " with alliance_id " + alliance_id);
	//
	//console.log("rocket RP " +  outcome.score_breakdown[colour].completeRocketRankingPoint);
	//console.log("climb RP " + outcome.score_breakdown[colour].habDockingRankingPoint);
	//console.log("score " + outcome.alliances[colour].score);
	return new Promise(
	    (resolve, reject) =>
		connection.query(
		    "INSERT alliance_outcome VALUES (?, ?, ?, ?) ",
		    [alliance_id,
		     outcome.alliances[colour].score,
		     outcome.score_breakdown[colour].completeRocketRankingPoint,
		     outcome.score_breakdown[colour].habDockingRankingPoint],
		    (error) => (error)
			?  console.warn(`While inserting outcome ${outcome.match_number} into ${alliance_id}: ${error}`) || reject(error)
		    : resolve()
		)
	);
    }
    return Promise.all(["red", "blue"].map(colour => getAllianceID(outcome, colour)
					   .then(alliance_id => {
					       //console.log(alliance_id);
					       return insertAllianceOutcome(connection, outcome, alliance_id, colour)})))
					  // .then(() => console.log("Entered " + outcome.match_number + " into the database"))))
	.catch(err => console.warn("something went wrong " + err.message));
   
	    
}

function is_qualifying(outcome){
    return outcome.comp_level == 'qm';
}

if (require.main === module) {
    console.log("running");
    var event_code = (process.argv.length < 3)
        ? (console.error("Missing argument: event_code") || process.exit())
        : process.argv[2];
    console.log(event_code);
    db.with_connection(connection =>  
                       tba.all_alliance_outcomes(event_code, outcomes => {
			   console.log("got " + outcomes.length + " outcomes");
			   load_outcomes(connection, outcomes)}));
}
