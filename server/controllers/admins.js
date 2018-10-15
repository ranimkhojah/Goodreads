var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Admin = require('../models/admin');

router.get('/admins/admins', function (req, res, next)  {
	Admin.find({}).sort(req.query.sort).exec(function(err, admin) {
		if(err){ return next(err);}
		res.json({"data": admin});
	});
});

//get a specific admin
router.get('/admins/admins/:id', function(req, res, next) {
	var id = req.params.id;
	Admin.findById(req.params.id, function(err, admin){
			if(err) { return next(err); }
			if(admin == null) {
				return res.status(404).json(
				{"message":"Admin not found"});
			}
		res.json(admin);
	});
});

//put admin

router.put('/admins/admins/:id', function(req, res, next) {
	var id = req.params.id;
	Admin.findById(req.params.id, function(err, admin){
		if(err) { return next(err); }
			if(admin == null) {
				return res.status(404).json(
				{"message":"Admin not found"});
			}
			admin.name = req.body.name ;
			admin.save();
			res.json(admin);
	});
});

router.patch('/admins/admins/:id', function(req, res, next) {
	var id = req.params.id;
	Admin.findById(req.params.id, function(err, admin){
		if(err) { return next(err); }
			if(admin == null) {
				return res.status(404).json(
				{"message":"Admin not found"});
			}
			admin.name = (req.body.name || admin.name);
			admin.save();
			res.json(admin);
	});
});

router.post('/admins/admins', function(req, res, next) {
	var admin = new Admin(req.body);
	admin.save(function(err) {
		if(err) {return next(err);}
		res.status(201).json(admin);
	});
});

router.delete('/admins/admins/:id', function(req, res, next) {
	var id = req.params.id;
	User.findOneAndDelete({"_id": id}, function(err, user) {
		if(err) {return next(err);}
		if(user == null){
			return res.status(404).json(
			{"message": "Admin not found"});
		}
		res.json(user);
	});
});

module.exports = router
