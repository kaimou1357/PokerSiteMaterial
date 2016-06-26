var LocalStrategy = require('passport-local').Strategy

var User = require('../routes/user')

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id)
	})

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		})
	})

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'username',
		emailField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, 
	function(req, username, email, password, done){
		process.nextTick(function(){
			User.findOne(username, function(err, user){
				if(err) return done(err)

				if(user){
					return done(null, false, req.flash('signupMessage', 'That username is already taken'))
				}
				else{
					var newUser = new User()
					newUser.email = email
					newUser.password = password
					newUser.username = username

					newUser.save(function(err){
						if(err)
							throw err
						return done(null, newUser)
					})
				}

			})
		})
	}))
}