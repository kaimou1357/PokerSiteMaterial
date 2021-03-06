var path = require("path")
var user = require('./user')
var hand = require('./hand')
var comment = require('./comment')


module.exports = function(app, passport){
	app.get('/api/hands', hand.getHand)
	app.post('/api/hands', hand.postHand)
	app.delete('/api/hands/:handid', hand.deleteHand)

	app.get('/api/comments', comment.getComment)
	app.post('/api/comments', comment.postComment)
	app.delete('/api/comments/:commentid', comment.deleteComment)

	app.post('/signup', passport.authenticate('local-signup'), function(req, res){
		if(req.user){
			res.json(req.user)
		}
		else{
			res.json({"Signup" : "Signup Failed"})
		}
	})

	
	app.post('/login', passport.authenticate('local-login'), function(req, res){
		if(req.user){
			res.json(req.user)
		}
		else{
			res.json({"Login" : "Login Failed"})
		}
		
	})

	app.get('/logout', function(req, res){
		console.log("User logged out")
		req.logout()
		res.redirect('/')
	})

	app.get('/username', function(req, res){
		if(req.user != undefined){
			console.log("Client username check " + req.user.username)
			res.json({username: req.user.username})
		}
		
	})
 
	app.get('*', function(req, res){
		res.sendFile(path.join(__dirname, "../public" , "index.html"))
		if(req.user == undefined){
			console.log("Username not set in session")
		}
		else{
			console.log("Username from session : " + req.user.username)
		}
	})
}