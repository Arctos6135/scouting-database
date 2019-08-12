const db = require ('./scouting.js');

//displays all of a team's information either for a specific event, if one is given, or across all events

//arguments are team_number event_code(optional) match_types(optional)
//Note that if you omit event_code and specify match_types, you must write [team_number] all [match_types] for the arguments


async function handle_data (connection, team_number, event_code, match_types) {
    await get_data(connection, team_number, event_code, match_types)
	.then(data => print_data(data))
	.then(() => connection.end())
	.catch((err) => console.error(err));
}
async function get_data (connection, team_number, event_code, match_types) {
    var query = "SELECT m.match_number, ao.score, amo.*, ao.RP1_rocket, ao.RP2_climbed " +
	" FROM frc_match m " +
	"   INNER JOIN alliance a " +
	"           ON a.match_id = m.match_id " +
	"   INNER JOIN alliance_outcome ao " +
	"           ON ao.alliance_id = a.alliance_id " +
	"   INNER JOIN alliance_member_outcome amo " +
	"           ON amo.alliance_id = a.alliance_id " +
	"        WHERE amo.team_number = ? " +
	(event_code ? " AND m.event_code = " + connection.escape(event_code) : " ") +
	" AND m.match_type IN " + match_types; 

    console.log(query)
    return new Promise(
	(resolve, reject) =>
	    connection.query(query,
			     [team_number],
			     (error, results) =>
			     (error)
			     ? console.warn(error) || reject (error)
			     : resolve(results)
			    ));
}

function print_data (data) {
    for (let i = 0; i < data.length; i++) {
	console.log(data[i]);
    }
}

//if we're not running at the top level (ie. in the webapp) we might want to do something else with the output 
if (require.main === module) {
    var team_number = process.argv.length < 3
	? (console.error("Missing argument: team_number") || process.exit())
	: process.argv[2];
    var event_code = process.argv.length < 4 
	? void 0
	: process.argv[3] == 'all' ? void 0 : process.argv[3];
    var match_types = process.argv.length < 5
	? "('qm')"
	: process.argv[4];
    console.log(team_number + " " + event_code + " " + match_types);
    console.log("running");
    db.with_connection(connection => handle_data(connection, team_number, event_code, match_types));
}

