
// Modules I need for running this app (previously installed in terminal)
require('dotenv').config(); //loads the .env
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var expressLayouts  = require('express-ejs-layouts')
var passport        = require('./config/passportConfig');
var session         = require('express-session');
var path  			= require('path');
var flash           = require('connect-flash');
var isLoggedIn      = require('./middlewear/isLoggedIn')

//App variable
var app         = express();

// Connect to database (can name it whatever I want after localhost/)
mongoose.connect('mongodb://localhost/reminderher')

// Set views
app.set('view engine', 'ejs'); // set EJS as view engine

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

// Just a convenience, but makes life easier...
// define a custom piece of middlewear
// if there are any flash messages, write them to this flash variable
// gives every single page access to user and alerts (to be able to render)
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
});

// Define my top-level routes
app.get('/myservices', function(req, res) {
    res.render('myservices'); // because it's render, it knows to look for myservices file, and because I set the view engine as EJS, it knows to look for EJS
});


// requires all routes from controllers/auth.js - MUST BE APP.USE
app.use('/auth', require('./controllers/auth'));
app.use('/find', require('./controllers/find'));
app.use('/myservices', require('./controllers/myservices'));
app.use('/records', require('./controllers/records'));


// Listen
app.listen(process.env.PORT || 3000);