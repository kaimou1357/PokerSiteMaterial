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
				var hand = result.rows[0]
				client.query('SELECT * FROM playerinfo WHERE postid = $1', [req.query.handid], function(err, result){
					hand.players = result.rows
					res.json(hand)
				})
			})
		})
	}

	else{
		pool.connect(function(err, client, done){
			if (err){
				return console.log("Failed to connect to database")
			}

			client.query('SELECT title, author from hands;', function(err, result){
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
				'($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11, $12, $13) returning postid;',[req.body.author, req.body.title, req.body.preflop.one, req.body.preflop.two, req.body.preflop_betting, req.body.flop.one, req.body.flop.two,req.body.flop.three, req.body.flop_betting, req.body.turn_card, req.body.turn_betting, req.body.river_card, req.body.river_betting], function(err, result){
					done()
					if(err){
						console.log(err)
					}					
					for(var i = 0; i<req.body.players.length; i++){
						var player = req.body.players[i]
						client.query('INSERT INTO playerinfo(postid, name, position, stack_size, image) VALUES ($1, $2, $3, $4, $5);', [req.body.postid, player.name, player.position, player.stack_size, player.image], function(err, result){
							done()
							if(err){console.log('Failed to insert into playerinfo')}

						})
					}
					res.json({"Success" : "True"})
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