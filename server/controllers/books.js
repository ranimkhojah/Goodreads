var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Book = require('../models/book');



//user view books
router.get('/users/books', function (req, res, next) {
	Book.find({}).sort(req.query.sort).exec(function(err, book) {
		if(err){ return next(err);}
		res.json({"data": book});
	});
});

// admin view books
router.get('/admins/books', function (req, res, next) {
	console.log("entered get method");
	Book.find({}).sort(req.query.sort).exec(function(err, book) {
		if(err){ return next(err);}
		res.json({"data": book});
	});
});

//get book by id
router.get('/users/books/:id', function(req, res, next) {
	var id = req.params.id;
	Book.findById(req.params.id, function(err, book){
			if(err) { return next(err); }
			if(book == null) {
				return res.status(404).json(
				{"message":"Book not found"});
			}
		res.json(book);
	});
});

router.get('/admins/books/:id', function(req, res, next) {
	var id = req.params.id;
	Book.findById(req.params.id, function(err, book){
			if(err) { return next(err); }
			if(book == null) {
				return res.status(404).json(
				{"message":"Book not found"});
			}
		res.json(book);
	});
});

router.put('/admins/books/:id', function(req, res, next) {
	var id = req.params.id;
	Book.findById(req.params.id, function(err, book){
		if(err) { return next(err); }
			if(book == null) {
				return res.status(404).json(
				{"message":"Book not found"});
			}
			book.name = req.body.name ;
			book.author = req.body.author ;
			book.genre = req.body.genre ;
			book.save();
			res.json(book);
	});
});

router.patch('/admins/books/:id', function(req, res, next) {
	var id = req.params.id;
	Book.findById(req.params.id, function(err, book){
		if(err) { return next(err); }
			if(book == null) {
				return res.status(404).json(
				{"message":"Book not found"});
			}
			book.name = (req.body.name || book.name);
			book.author = (req.body.author || book.author);
			book.genre = (req.body.genre || book.genre);
			book.save();
			res.json(book);
	});
});

router.post('/admins/books', function(req, res, next) {
	var book = new Book(req.body);
	book.save(function(err) {
		if(err) {return next(err);}
		res.status(201).json(book);
	});
});

router.delete('/admins/books/:id', function(req, res, next) {
	
	var id = req.params.id;
	Book.findOne({"_id": id}, function(err, book) {
		if(err) {return next(err);}
		if(book == null){
			return res.status(404).json(
			{"message": "Book not found"});
		}
		book.remove();
		res.json(book);
	});
	
});

module.exports = router