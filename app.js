var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var user = require('./routes/user')
var hand = require('./routes/hand')
var comment = require('./routes/comment')

app.use(express.static('public'));
app.use(bodyParser.json())

app.get('/api/hands', hand.getHand)
app.post('/api/hands', hand.postHand)
app.delete('/api/hands/:handid', hand.deleteHand)

app.get('/api/comments', comment.getComment)
app.post('/api/comments', comment.postComment)
app.delete('/api/comments/:commentid', comment.deleteComment)


app.get('/api/login', function(req, res){
	//Leave this to setup user authentication
	res.send("Cool")
})

app.get('/api/signup', function(req, res){
	//Leave this to setup user setup.
	res.send("Cool")
})
	

app.get('*', require('./routes/index').default)
	 

app.listen(3000, function(){
	console.log("Listening on Port 3000")
});