var express = require('express')
var app = express()

var user = require('./routes/user')
var hand = require('./routes/hand')
var comment = require('./routes/comment')

app.use(express.static('public'));

app.route('/api/hands')
	.get(hand.getHand)
	.post(hand.postHand)
	.delete(hand.deleteHand)

app.route('/api/comments')
	.get(comment.getComments)
	.post(comment.postComment)
	.delete(comment.deleteComment)

app.route('/api/users')
	.post(user.createUser)
	

app.get('*', require('./routes/index').default)
	 

app.listen(3000, function(){
	console.log("Listening on Port 3000")
});