var pg = require('pg')
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'pokerdb', //env var: PGDATABASE
  password: 'adventure', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config)
exports.getHand = function(req, res){
	//Takes in handid as a query string.
	if(req.query.handid){
		pool.connect(function(err, client, done){
			if(err){
				return console.error("Failed to connect to database")

			}

			client.query('SELECT * FROM hands WHERE postid = $1', [req.query.handid], function(err, result){
				done()
				if(err){
					return console.error("Error running query")
				}

				res.json(result.rows[0])
			})
		})
	}

	else{
		pool.connect(function(err, client, done){
			if (err){
				return console.log("Failed to connect to database")
			}

			client.query('SELECT * from hands;', function(err, result){
				done()
				if(err){
					console.error("Error running query")
				}

				res.json(result.rows)
			})
		})
	}
		
}


exports.postHand = function(req, res){
	//post hand via post paramters.
}

exports.deleteHand = function(req, res){
	//Takes in parameter "handid" for delete function.
	if(!req.param.handid){
		res.json({"success": "false"})
	}
	else{
		pool.connect(function(err, client, done){
			done()
			if(err){
				return console.log("Failed to connect to database")
			}

			client.query('DELETE FROM hands WHERE handid = $1 RETURNING handid;', [req.param.handid], function(err, result){
				
				res.json({"success" : "true"})
			})
		})
	}
}