var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');

var Books = require('../models/book');
var Users =require('../models/user');
var Review =require('../models/review');


// create a review 
router.post('/users/reviews', function(req,res,next){
	
	var bookId = req.body.book;
	var userId = req.body.postedBy;
	
	Books.findById(bookId, function(err, book){
	if(err){return next(err);}
	if(book == null) {
				return res.status(404).json(
				{"message":"Book not found"});
			}
	
	
	});
		/*.then(book => {
		  if (!book) {
			return res.status(404).json({
			  message: "Book not found"
			});
		  }
	});*/
	
	Users.findById(userId, function(err, user){
	if(err){return next(err);}
	if(user == null) {
				return res.status(404).json(
				{"message":"User not found"});
			}
	
	
	});

	/*Users.findById(req.body.postedBy)
		.then(user => {
		  if (!user) {
			return res.status(404).json({
			  message: "User not found"
			});	
		  }
	});*/


	var rev = new Review({
		book : req.body.book,
		feedback : req.body.feedback,
		postedBy :[ req.body.postedBy]
	})

	rev.save(function(err){
		if(err){ return next(err);}
		res.status(201).json(rev);
	});
});


// show reviews 
router.get('/users/reviews', function (req,res,next){
	Review.find({}).sort(req.query.sort).exec(function(err, review) {
		if(err){ return next(err);}
		res.json({"data": review});
	});
});

//edit a review
router.patch('/users/reviews/:id', function(req, res, next) {
	var id = req.params.id;
	Review.findById(req.params.id, function(err, review){
		if(err) { return next(err); }
			if(review == null) {
				return res.status(404).json(
				{"message":"Review not found"});
			}
			review.bk = review.bk;
			review.feedback = (req.body.feedback || review.feedback);
			postedBy = review.postedBy;
			
			review.save();
			res.json(review);
	});
});

//delete a review
router.delete('/users/reviews/:id', function(req, res, next) {
	var id = req.params.id;
	Review.findOneAndDelete({"_id": id}, function(err, review) {
		if(err) {return next(err);}
		if(review == null){
			return res.status(404).json(
			{"message": "Review not found"});
		}
		res.json(review);
	});
});

router.delete('/admins/reviews/:id', function(req, res, next) {
	var id = req.params.id;
	Review.findOneAndDelete({"_id": id}, function(err, review) {
		if(err) {return next(err);}
		if(review == null){
			return res.status(404).json(
			{"message": "Review not found"});
		}
		res.json(review);
	});
});

module.exports=router








