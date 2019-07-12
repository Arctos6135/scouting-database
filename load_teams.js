//# Load all Ontario teams into the scouting db
//this is expected to run only once per season

const tba = require('./tba.js');
const db = require('./scouting.js');

//# Using connection to database, add team_number with name
function add_team(connection, team_number, name) {
	console.log(team_number + " "  + name);
	connection.query('INSERT INTO team (team_number, name) VALUES(?, ?) ON DUPLICATE KEY UPDATE team_number = team_number',
					 [team_number, name],
					 function (error, results, fields) {
						 if (error) {
							 throw error;
						 }
					 });
}

function is_Ontario(x) {
	return x.state_prov == "Ontario";
}

if (require.main === module) {
	db.with_connection(connection =>
					   tba.all_teams(x => is_Ontario(x) && add_team(connection, x.team_number, x.nickname),
									 () => {connection.end()}
									));
}
