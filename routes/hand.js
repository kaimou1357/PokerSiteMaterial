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
			//TODO: Find a command that allows you to call only one query but return all the data necessary. 
			client.query('SELECT * FROM hands WHERE postid = $1', [req.query.handid], function(err, result){
				done()
				if(err){
					return console.error("Error running query")
				}
				else{
					res.json(result.rows[0])
				}
			})
		})
	}

	else{
		pool.connect(function(err, client, done){
			if (err){
				return console.log("Failed to connect to database")
			}

			client.query('SELECT title, author, postid from hands;', function(err, result){
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
	//add in some error handling.

	pool.connect(function(err, client, done){
		if(err){
			return console.log("Failed to connect to database")
		}
		else{
	
			client.query('INSERT INTO hands(author, title, preflop_one, preflop_two, preflop_betting, flop_one, flop_two, flop_three, flop_betting, turn_card, turn_betting, river_card, river_betting) VALUES' + 
				'($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11, $12, $13) returning postid, title, author;',[req.body.author, req.body.title, req.body.preflop.one, req.body.preflop.two, req.body.preflop.betting, req.body.flop.one, req.body.flop.two,req.body.flop.three, req.body.flop.betting, req.body.turn.card, req.body.turn.betting, req.body.river.card, req.body.river.betting], function(err, result){
					done()
					if(err){
						console.log(err)
						res.json({"Error" : "Failed to insert into hands"})
					}				
					for(var i = 0; i<req.body.players.length; i++){
						var player = req.body.players[i]
						client.query('INSERT INTO playerinfo(postid, name, position, stack_size, image) VALUES ($1, $2, $3, $4, $5);', [result.rows[0].postid, player.name, player.position, player.stack_size, player.image], function(err, result){
							done()
							if(err){
								console.log('Failed to insert into playerinfo')
								console.log(err)
								res.json({"Error" : "Failed to insert into playerinfo"})
							}

						})
					}
					res.json({"title" : result.rows[0].title, "author" : result.rows[0].author})
			});
		}
	})
}

exports.deleteHand = function(req, res){
	//Takes in parameter "handid" for delete function.
	if(!req.param.handid){
		res.json({"success": "false"})
	}
	else{
		pool.connect(function(err, client, done){
			if(err){
				return console.log("Failed to connect to database")
			}

			client.query('DELETE FROM hands WHERE handid = $1 RETURNING handid;', [req.param.handid], function(err, result){
				done()
				res.json({"success" : "true"})
			})
		})
	}
}