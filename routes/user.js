var pg = require('pg')
var bcrypt = require('bcrypt-nodejs')
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'pokerdb', //env var: PGDATABASE
  password: 'adventure', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config)

function User(){
	this.username = ''
	this.email = ''
	this.password = ''

	this.save = function(callback){

		pool.connect(function(err, client, done){
			if(err){
				console.log('Failed to connect to database')
			}
			console.log("Username" + this.username)
			client.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3);', [this.username, this.email, this.password], function(err, result){
				done()
				if(err){
					console.log('Error saving user', err)
				}

				client.query('SELECT * FROM users WHERE email = $1', [this.email], function(err, result){
					done()
					if(err){
						console.log('Failed to retrieve user after saving')
					}

					if(result.rows.length >0){
						var user = new User()
						user.email = result.rows[0]['email']
						user.password = result.rows[0]['password']
						user.username = result.rows[0]['username']
						return callback(user)
					}
				})
			})


		})
	}
}


User.findOne = function(username, callback){
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

module.exports = User


