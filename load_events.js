//# Load all Ontario events into the db
//this is expected to run only once per season

const tba = require('./tba.js');
const db = require('./scouting.js');

//# Using connection to database, add event_code
function add_event(connection, event_code) {
    console.log(event_code);
    connection.query('INSERT INTO frc_event (event_code) VALUES(?) ON DUPLICATE KEY UPDATE event_code = event_code',
		     [event_code],
		     function (error, results, fields) {
			 if (error) {
			     throw error;
			 }
		     });
}

if (require.main === module) {
    db.with_connection(
	connection =>
		       tba.all_events(x => add_event(connection, x.key),
				      () => connection.end() 
				     ));
}
