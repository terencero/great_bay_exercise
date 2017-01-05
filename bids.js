var mysql = require(mysql);

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'nietzsche83!',
	database: 'great_bay_db'
});