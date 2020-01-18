var mysql = require('mysql');

function get_connection() {
    return mysql.createConnection({
	host     : 'localhost',
	database : 'strategy',
	user     : 'strategy',
	password : 'foo',
    });
}

//open a connection to the database, then call function c with the connection object
//c can send queries to the connection object
//c is expected to close connection when done
function with_connection(c) {
    var connection = get_connection();
    
    connection.connect(function(err) {
	if (err) {
	    console.error('Error connecting: ' + err.stack);
	    return;
	}
	
    });
    
    c(connection);
    
}

//this is test or demo code that's run only at top level
if (require.main === module) {
    //get a connection to the database
    //and then insert a random team
    //this is an example of node sql
    with_connection(connection => 
		    connection.query('INSERT INTO team (team_number, name) VALUES(?, ?) ON DUPLICATE KEY UPDATE team_number = team_number',
				     //the ON DUPLICATE KEY UPDATE is a mysql 'trick' to prevent errors in the database if reentering same team
									 [7889, 'OSAT'],
									 function (error, results, fields) {
										 if (error) {
										     throw error;
										 }
										 console.log(results.affectedRows + " updated");
									 })
				   );
}

module.exports.with_connection = with_connection;
