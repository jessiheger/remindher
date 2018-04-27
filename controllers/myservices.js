var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var isLoggedIn      = require('../middlewear/isLoggedIn');
var passport		= require('../config/passportConfig');
var mongoose		= require('mongoose');


//includ the models
var User 			= require('../models/user');
var Service 		= require('../models/service');

router.post('/', isLoggedIn, function addServices(req, res) {
  User.findById(res.locals.currentUser.id, (err, user) => {
      // console.log(req.body)
    Service.create(req.body, (err, service) => {
        // console.log(err)
        user.services.push(service); 
        user.save();
    })
  });
  res.send("success");
});


module.exports = router;