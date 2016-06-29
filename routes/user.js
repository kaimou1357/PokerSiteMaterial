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


 exports.saveUser = function(username, password, email, callback){
	pool.connect(function(err, client, done){
		if(err){
			console.log('Failed to connect to database')
		}

		client.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING ' + 
			'userid, username, email, password;', [username, email, password], function(err, result){
			done()
			if(err){
				console.log('Error saving user', err)
			}
			else{
				return callback(null, result.rows[0])
			}

		})
		
			
	})
}

exports.findById = function(id, callback){
	pool.connect(function(err, client, done){
		if(err){
			console.log('Failed to connect to database')
		}
		client.query("SELECT * FROM users WHERE userid = $1", [id], function(err, result){
			done()

			if(err){
				console.log('Failed to query find user')
			}
			else{
				return callback(null, result.rows[0])
			}
		})
	})
}

exports.findUser = function(username, callback){
	pool.connect(function(err, client, done){
		if(err){
			console.log('Failed to connect to database')
		}
		client.query("SELECT * FROM users WHERE username = $1", [username], function(err, result){
			done()

			if(err){
				console.log('Failed to query find user')
			}
			else{
				return callback(null, result.rows[0])
			}
		})
	})
};



