const db = require('./scouting.js');
const fs = require('fs');

//add_output's main job is to 
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

// returns a promise to add one Row
function add_one_row (connection, row) {
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
				     if (results.length > 1) {
					 console.log("Warning: team " + team_number + " in match " + match_number + " has several matches. Alliance_id may be for wrong event!");
				     }
				     console.log("alliance_id for " + team_number+ " match " + match_number + " is " + results[0].alliance_id);
				     resolve(results[0].alliance_id);
				 }
				)
	);
    }
    function whatSandLocationIndex(value){
	return value == 1 ? 1
	    :  value == 2 ? 2
	    :  value == 3 ? 3
	    :  value == 4 ? 0
	    :  -1;
    }
    function getSandstormHatchLocations(row){
	return new Promise(
	    (resolve, reject) => {
		// should probably check  input and call reject if anything is bad
		//cs_hatch, r1_hatch, r2_hatch, r3_hatch
		let sand_hatch_locations = [0, 0, 0, 0];
		sand_hatch_locations[whatSandLocationIndex(row.hatch1)]++;
		sand_hatch_locations[whatSandLocationIndex(row.hatch2)]++;
		sand_hatch_locations[whatSandLocationIndex(row.hatch3)]++;
		sand_hatch_locations[whatSandLocationIndex(row.hatch4)]++;
		resolve(sand_hatch_locations);
	    });
		
    }
     function getSandstormCargoLocations(row){
	return new Promise(
	    (resolve, reject) => {
		//cs_cargo, r1_cargo, r2_cargo, r3_cargo
		let sand_cargo_locations = [0, 0, 0, 0];
		sand_cargo_locations[whatSandLocationIndex(row.cargo1)]++;
		sand_cargo_locations[whatSandLocationIndex(row.cargo2)]++;
		sand_cargo_locations[whatSandLocationIndex(row.cargo3)]++;
		sand_cargo_locations[whatSandLocationIndex(row.cargo4)]++;
		resolve(sand_cargo_locations);
	    });
		
    }
    function insertRowWithIDAndHelperData(row, alliance_id, sand_hatch_locations, sand_cargo_locations){
	return new Promise(
	    (resolve, reject) => {
		if (!sand_hatch_locations || !sand_cargo_locations){
		    reject("bad hatch locations " + sand_hatch_locations + " or bad cargo " + sand_cargo_locations);
		    return;
		}
		connection.query(
		    "INSERT INTO alliance_member_outcome (alliance_id, " + 
			"team_number, " + 
			"start_level, " +
			"sand_cs_hatch, " +
			"sand_r1_hatch, " +
			"sand_r2_hatch, " +
			"sand_r3_hatch, " +
			"sand_cs_cargo, " +
			"sand_r1_cargo, " +
			"sand_r2_cargo, " +
			"sand_r3_cargo, " +

		        "tele_cs_hatch, " +
			"tele_r1_hatch, " +
			"tele_r2_hatch, " +
			"tele_r3_hatch, " +
			"tele_cs_cargo, " +
			"tele_r1_cargo, " +
			"tele_r2_cargo, " +
			"tele_r3_cargo, " +

		        "defense_time, " +
			"assist_level, " +
			"climb_level, " +
			"tipped, " +
			"broke, " +
			"floor_hatch, " +
			"dropped_hatch) " +
			" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
			" ON DUPLICATE KEY UPDATE team_number=team_number " ,
		    [alliance_id, row.teamNumber, row.startlvl,
		     sand_hatch_locations[0], sand_hatch_locations[1], sand_hatch_locations[2], sand_hatch_locations[3],
		     sand_cargo_locations[0], sand_cargo_locations[1], sand_cargo_locations[2], sand_cargo_locations[3],
		     row.shiph, row.rock1h, row.rock2h, row.rock3h,
		     row.shipc, row.rock1c, row.rock2c, row.rock3c,
		     row.opposide, row.assist, row.climblvlReached, row.tip, row.broken, row.floor, row.hdropped],
		    (error) => (error)
			? console.warn("inserting " + row.teamNumber + " on alliance " + alliance_id + " caused " + error) || reject(error)
			: resolve()
		);}
	);
    }
    /*return getAllianceID(row.matchNumber, row.teamNumber)
	    .then(id => insertDataWithID(id, row))
	.catch(error => console.warn("something went wrong " + error.message + " with team " + row.teamNumber + " in " + row.matchNumber));
    */
    return Promise.all([getAllianceID(row.matchNumber, row.teamNumber),
			getSandstormHatchLocations(row),
			getSandstormCargoLocations(row)])
	.then(promise_results =>  insertRowWithIDAndHelperData(row,
							       promise_results[0],
							       promise_results[1],
							       promise_results[2]))
		       .catch(error =>  console.warn("something went wrong " + error.message + " with team " + row.teamNumber + " in " + row.matchNumber));
    
}

//this bit is the first part to run. It reads through the specified output file and calls add_output to handle it
if (require.main === module) {
    var file_path = (process.argv.length < 3)
	? (console.log("Missing argument: file_path. Assume output.json stored in this directory") || 'output.json')
	: process.argv[2];
    db.with_connection(connection =>
		       add_output(connection,
				  JSON.parse(fs.readFileSync(file_path)),
				  () => connection.end()
		      ));
}

