var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs')
const saltRounds = 8
var User = require('../routes/user')

module.exports = function(passport){
	
	passport.serializeUser(function(user, done){
		done(null, user.userid)
	})

	passport.deserializeUser(function(id, done){
		
		User.findById(id, function(err, user){
			done(err, user)
		})
	})

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'username',
		passwordField: 'password',
		passReqToCallback : true
	}, 
	function(req, email, password,done){
		User.findUser(req.body.username, function(err, user){
			if(err) 
				return done(err)

			if(user){	
				 console.log('User already exists so not created!')
				 return done(null, false)
			}
			else{
				bcrypt.hash(req.body.password, saltRounds, function(err, hash){
					User.saveUser(req.body.username, hash, req.body.email, function(err, user){
						if(err){
							console.log(err)
						}
						else{
							return done(null, user)
						}
					})
				})
				
			}

		})
		
	}))


	passport.use('local-login', new LocalStrategy({
		usernameField : 'username',
        passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done){
		User.findUser(req.body.username, function(err, user){
			if(err)
				return done(err)
			if(!user)
				return done(null, false)
			bcrypt.compare(req.body.password, user.password, function(err, res){
				console.log(res)
				if(res == true){
					console.log('Login Successful')
					return done(null, user)
				}
				else{
					console.log('Login Unsuccessful')
					return done(null, false)
				}
			})

			
		})
	
	}))
}