var pg = require('pg')

var connectionString = 'postgres://postgres:adventure@localhost:5432/pokerdb'

var client = new pg.Client(connectionString)

client.connect(function(err){
	if(err){
		return console.error("Could not connect to Postgres database")
	}
	var query = client.query(
		'CREATE TABLE IF NOT EXISTS users(userid SERIAL PRIMARY KEY, username text, password text, email text);' + 
		'CREATE TABLE IF NOT EXISTS hands(postid SERIAL PRIMARY text, title text, preflop_hands integer[2], preflop_betting text, flop_cards integer[3], flop_betting text, turn_card integer, turn_betting text, river_card integer, river_betting text);' + 
		'CREATE TABLE IF NOT EXISTS playerinfo(postid integer , author text, name text, position text, stack_size integer, image text);' +
		'CREATE TABLE IF NOT EXISTS comments(commentid SERIAL PRIMARY KEY, author text, postid integer, content text);')
	//Create users table.
	query.on('end', function(){
		console.log("Tables Created")
		client.end()
	})


});
