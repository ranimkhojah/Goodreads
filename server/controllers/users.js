var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user');

// get all users
router.get('/users/users', function (req, res, next) {
	User.find({}).sort(req.query.sort).exec(function(err, user) {
		if(err){ return next(err);}
		res.json({"data": user});
	});
});

router.get('/admins/users', function (req, res, next)  {
	User.find({}).sort(req.query.sort).exec(function(err, user) {
		if(err){ return next(err);}
		res.json({"data": user});
	});
});

//get a specific user
router.get('/users/users/:id', function(req, res, next) {
	var id = req.params.id;
	User.findById(req.params.id, function(err, user){
			if(err) { return next(err); }
			if(user == null) {
				return res.status(404).json(
				{"message":"User not found"});
			}
		res.json(user);
	});
});

router.get('/admins/users/:id', function(req, res, next) {
	var id = req.params.id;
	User.findById(req.params.id, function(err, user){
			if(err) { return next(err); }
			if(user == null) {
				return res.status(404).json(
				{"message":"User not found"});
			}
		res.json(user);
	});
});

router.put('/admins/users/:id', function(req, res, next) {
	var id = req.params.id;
	User.findById(req.params.id, function(err, user){
		if(err) { return next(err); }
			if(user == null) {
				return res.status(404).json(
				{"message":"User not found"});
			}
			user.name = req.body.name ;
			user.save();
			res.json(user);
	});
});

router.patch('/admins/users/:id', function(req, res, next) {
	var id = req.params.id;
	User.findById(req.params.id, function(err, user){
		if(err) { return next(err); }
			if(user == null) {
				return res.status(404).json(
				{"message":"User not found"});
			}
			user.name = (req.body.name || user.name);
			user.save();
			res.json(user);
	});
});

router.post('/admins/users', function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if(err) {return next(err);}
		res.status(201).json(user);
	});
});

router.delete('/admins/users/:id', function(req, res, next) {
	var id = req.params.id;
	User.findOneAndDelete({"_id": id}, function(err, user) {
		if(err) {return next(err);}
		if(user == null){
			return res.status(404).json(
			{"message": "User not found"});
		}
		res.json(user);
	});
});

module.exports = router
