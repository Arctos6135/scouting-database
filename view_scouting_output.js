const db = require ('./scouting.js');

//displays the scouting output either for a specific event, if one is given, or across all events

async function handle_output (connection, event_code) {
    await get_output(connection, event_code)
	.then(output => print_output(output))
	.then(() => connection.end());
}
async function get_output (connection, event_code) {
    
    if (event_code) {
	console.log("specific");
	return new Promise(
	    (resolve, reject) =>
		connection.query("SELECT * FROM specific_scouting_output sso " +
				 " WHERE sso.event_code = ? "+
				 "ORDER BY sso.team_number ",
				 [event_code],
				 (error, results) =>
				 (error)
				 ? console.warn(error) || reject (error)
				 : resolve(results)
				));
    }
    
    else {
	console.log("all");
	return new Promise(
	    (resolve, reject) =>
		connection.query("SELECT * FROM all_scouting_output aso " +
				 " ORDER BY aso.team_number",
				 [],
				 (error, results) =>
				 (error)
				 ? reject (error)
				 : resolve(results)
				));
    }
}
function print_output (output) {
    for (let i = 0; i < output.length; i++) {
	console.log(output[i]);
    }
}

//if we're not running at the top level (ie. in the webapp) we might want to do something else with the output 
if (require.main === module) {
    var event_code =
	(process.argv.length < 3)
	? void 0
	: process.argv[2];
    console.log("running");
    db.with_connection(connection => handle_output(connection, event_code));
}

