var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var passport = require('passport')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')

require('./config/passport')(passport)

//express setup
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())

//passport setup

app.use(session({secret : 'kaimou', resave : true, saveUninitialized : true, cookie : {maxAge : null}}))
app.use(passport.initialize())
app.use(passport.session())

//routes
require('./routes/index.js')(app, passport)	
	 

app.listen(3000, function(){
	console.log("Listening on Port 3000")
});