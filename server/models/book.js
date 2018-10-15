var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review = require('./review');

var bookSchema = new Schema({
    name: { type: String },
    author: { type: String },
	genre: { type: String}
});

bookSchema.post('remove', function(doc) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
	Review.findOne({book: doc._id}, function(rev) {
		Review.remove(rev).exec();
	});
});

module.exports = mongoose.model('books', bookSchema);
