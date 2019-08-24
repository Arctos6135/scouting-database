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
    const connection = get_connection();
    
    connection.connect(function(err) {
		if (err) {
			console.error('Error connecting: ' + err.stack);
			return;
		}
	
    });

    c(connection);
}

module.exports.with_connection = with_connection;
