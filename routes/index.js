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

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/posts/1',
		failureFlash : true
	}))

	app.get('*', function(req, res){
		res.sendFile(path.join(__dirname, "../public" , "index.html"))
	})
}