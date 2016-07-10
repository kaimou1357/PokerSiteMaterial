var pg = require('pg')

var connectionString = 'postgres://postgres:adventure@localhost:5432/pokerdb'

var client = new pg.Client(connectionString)

client.connect(function(err){
	if(err){
		return console.error("Could not connect to Postgres database")
	}
	var query = client.query(
		'CREATE TABLE IF NOT EXISTS users(userid SERIAL PRIMARY KEY, username text, password text, email text);' + 
		'CREATE TABLE IF NOT EXISTS hands(postid SERIAL PRIMARY KEY, title text, author text, preflop_one integer, preflop_two integer, preflop_betting text, flop_one integer, flop_two integer, flop_three integer, flop_betting text, turn_card integer, turn_betting text, river_card integer, river_betting text);' + 
		'CREATE TABLE IF NOT EXISTS playerinfo(postid integer, name text, position integer, stack_size integer, image integer);' +
		'CREATE TABLE IF NOT EXISTS comments(commentid SERIAL PRIMARY KEY, author text, postid integer, content text);')
	//Create users table.
	query.on('end', function(){
		console.log("Tables Created")
		client.end()
	})


});
