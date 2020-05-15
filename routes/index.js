var express = require('express');
var router = express.Router();
var authcontrollers = require('../controllers/authcontrollers')

//Signup Route
router.post('/signup', function(req,res){
  authcontrollers.signup(req.body.email,req.body.password,res)
});

// Login Route
router.post('/login', function(req,res){
  authcontrollers.login(req.body.email,req.body.password,res);
});

module.exports = router;
