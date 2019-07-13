const db = require('./scouting.js');
const fs = require('fs');

async function add_output(connection, raw_data_output, all_done) {
    if (!raw_data_output) {
	console.error("No data");
	all_done();
    }
    console.log("Inserting " + raw_data_output.length + " rows of data");
    //raw_data_output.forEach((data, index) => {index < 10 && add_one_row(connection, data)}); 
    //connection.query('INSERT INTO alliance_member_outcome VALUES ', );
    await Promise.all(raw_data_output.map(data => add_one_row(connection, data)))
	.then(all_done)
	.catch((error) => console.error("Something went wrong: " + error));
    console.log("done");
}

async function add_one_row (connection, row) {
    function getAllianceID(match_number, team_number){
	return new Promise(
	    (resolve, reject) =>
		connection.query("SELECT a.alliance_id FROM frc_match m " +
				 "INNER JOIN alliance a " +
				 "        ON a.match_id = m.match_id " +
				 "INNER JOIN alliance_member am " + 
				 "        ON am.alliance_id = a.alliance_id " +
				 "     WHERE m.match_number = ? " +
				 "       AND am.team_number = ?",
				 [match_number, team_number],
				 (error, results) => {
				     if (error) {
					 reject(error);
					 return;
				     }
				     if (! results || results.length == 0) {
					 reject("no results when getting alliance id for " + team_number + " in " + match_number);
					 return;
				     }
				     console.log("alliance_id for match " + match_number + " is " + results[0].alliance_id);
				     resolve(results[0].alliance_id);
				 }
				)
	);
	}
	function insertDataWithID(alliance_id, row){
	    return new Promise(
		(resolve, reject) =>
		    connection.query(
			"INSERT INTO alliance_member_outcome " +
			    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
			    " ON DUPLICATE KEY UPDATE team_number=team_number " ,
			[alliance_id, row.teamNumber, row.startlvl, row.hatch1,
			 row.hatch2, row.hatch3, row.hatch4, row.cargo1, row.cargo2,
			 row.cargo3, row.cargo4, row.shiph, row.rock1h, row.rock2h,
			 row.rock3h, row.shipc, row.rock1c, row.rock2c, row.rock3c,
			 row.opposide, row.assist, row.climblvlReached, row.tip,
			 row.broken, row.floor, row.hdropped],
			(error) => (error)
			    ? console.warn("inserting " + row.teamNumber + " on alliance " + alliance_id + " caused " + error) || reject(error)
			    : resolve()
		    )
	    );
	}
	return getAllianceID(row.matchNumber, row.teamNumber)
	    .then(id => insertDataWithID(id, row))
	    .catch(error => console.warn("something went wrong " + error.message + " with team " + row.teamNumber + " in " + row.matchNumber));
		  
 
}

if (require.main === module) {
    var file_path = (process.argv.length < 3)
	? (console.log("Missing argument: file_path. Assume output.json stored in this directory") || '')
	: process.argv[2];
    db.with_connection(connection =>
		       add_output(connection,
				  JSON.parse(fs.readFileSync(file_path + 'output.json')),
				  () => connection.end()
		      ));
}

