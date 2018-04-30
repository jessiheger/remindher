
require('dotenv').config();
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var expressLayouts  = require('express-ejs-layouts')
var passport        = require('./config/passportConfig');
var session         = require('express-session');
var path  			= require('path');
var flash           = require('connect-flash');
var isLoggedIn      = require('./middlewear/isLoggedIn')
var app         	= express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/remindher')

// Set views
app.set('view engine', 'ejs');

// dictates that static pages come from public directory
app.use(express.static(__dirname + '/public'));

// Use middlewear
app.use(bodyParser.urlencoded({ extended: false})); //
app.use(expressLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET, //from the .env file
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Gives every single page access to user and alerts
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
});

// Define top-level route
app.get('/', function(req, res) {
    res.render('landingpage');
});

// requires all routes from controllers/auth.js
app.use('/auth', require('./controllers/auth'));
app.use('/find', require('./controllers/find'));
app.use('/myservices', require('./controllers/myservices'));
app.use('/records', require('./controllers/records'));

app.listen(process.env.PORT || 3000);