var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var isLoggedIn      = require('../middlewear/isLoggedIn');
var userLocation;
var newLat;
var newLng;
var newLocation;
require('dotenv').config();

//includ the user model
var User 			= require('../models/user');

// include api keys
var SECRET_KEY_ZIP = process.env.SECRET_KEY_ZIP;
var SECRET_KEY_GOOGLE = process.env.SECRET_KEY_GOOGLE;

//APIs
router.get('/', isLoggedIn, function(req, res) {
    userLocation = req.user.location;

    var findLatLong =`https://www.zipcodeapi.com/rest/${SECRET_KEY_ZIP}/info.json/${userLocation}/degrees`;

    request(findLatLong, function (error, response, body) {
        let unstringifiedLat = JSON.parse(body).lat;
        let unstringifiedLng = JSON.parse(body).lng;

        console.log("user's Lat is:", unstringifiedLat);
        console.log("user's Lng is:", unstringifiedLng);

        var findDoctors = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${unstringifiedLat},${unstringifiedLng}&radius=40000&keyword=gynecologist&key=${SECRET_KEY_GOOGLE}`;

        request(findDoctors, function (error, response, results) {
            var doctors = JSON.parse(results);
            // console.log("#####", doctors);//this is working
            res.render("find", {doctors: doctors});
            // res.send(doctors);

        });
    });
});

router.put('/', isLoggedIn, function(req, res) {
    console.log("req.body is:", req.body);
    User.findByIdAndUpdate(res.locals.currentUser, 
        {location: req.body.location},
        function(err, user) {
            // console.log("new location is:", location)
        })
    res.send('Success!');
});


module.exports = router;