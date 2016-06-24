var pg = require('pg')
var pool = new pg.Pool(config)

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'pokerdb', //env var: PGDATABASE
  password: 'adventure', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

exports.getComment = function(req, res){
	//takes in parent "postid" as a query string. 
	if(!req.query.postid){
		res.json({"success" : "false"})
	}
	else{
		pool.connect(function(err, client, done){
			if(err){
				console.error('Failed to connect to database')
			}
			client.query('SELECT * FROM comments WHERE postid = $1;', [req.query.postid], function(err, result){
				if(err){
					console.error('Failed to run query')
				}
				res.json(result)
			})
		})
	}
}

exports.postComment = function(req, res){

}

exports.deleteComment = function(req, res){
	
}