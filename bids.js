// Load NPM packages.
var mysql = require('mysql');
var inquirer = require('inquirer');
// variables for user inputs from inquirer prompt
var userItem;
var userDescr;
var userPrice;
var userBid;
// variable to refer to list of current items to bid on.
var currentItems;

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'nietzsche83!',
	database: 'great_bay_db'
});

connection.connect(function(err) {
	if(err) throw err;
	console.log('connected as id ' + connection.threadId);
});

connection.query('INSERT INTO bids SET ?', {
	item: userItem,
	description: userDescr,
	price: userPrice
}, function(err, res) {});

connection.query('UPDATE bids SET ? WHERE ?', [{
	item: userItem,
}, {	
	price: userBid
}], function(err, res) {});

connection.query('DELETE FROM bids WHERE ?', {
	item: userItem
}, function(err, res) {});

connection.query('SELECT * FROM bids', function(err, res) {
	if(err) throw err;
	console.log(res);
});

inquirer.prompt([
		{
			type: 'input',
			message: 'Would you like to post an item or bid on an item?',
			choices: ['Post an item', 'Bid on an item'],
			name: 'userChoice'
		},
	]).then(function(ans){
		if(userChoice === 'Post an item'){
			postPrompt();
		} else if(userChoice === 'Bid on an item') {

		}
	});

var postPrompt = function(){
	inquirer.prompt([
			{
				type: 'input',
				message: 'Please enter an item name.',
				name: userItem
			},
			{
				type: 'input',
				message: 'Please enter a brief item description (max 100 characters).',
				name: userDescr
			},
			{
				type: 'input',
				message: 'Please enter an initial price.',
				name: userPrice
			}
		]);
};

var bidPrompt = function(){
	inquirer.prompt([
			{
				type: 'input',
				message: 'Please choose an item to bid on.',
				// Variable containing current list of items
				choices: [currentItems],
				name: 'bidChoice'
			}

		]);
};