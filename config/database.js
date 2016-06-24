var pg = require('pg')

var connectionString = 'postgres://postgres:adventure@localhost:5432/pokerdb'

var client = new pg.Client(connectionString)

client.connect(function(err){
	if(err){
		return console.error("Could not connect to Postgres database")
	}
	var query = client.query(
		'CREATE TABLE IF NOT EXISTS users(userid text unique, username text, password text, email text);' + 
		'CREATE TABLE IF NOT EXISTS hands(handid SERIAL PRIMARY KEY, ownerid text, title text, content text);' + 
		'CREATE TABLE IF NOT EXISTS comments(ownerid text, postid text, content text);')
	//Create users table.
	query.on('end', function(){
		console.log("Tables Created")
		client.end()
	})


});
