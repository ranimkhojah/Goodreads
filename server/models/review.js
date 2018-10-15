var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Books = require('./book');
var Users = require('./user');

// review model has list of books and user
var reviewModel = new Schema({

	book : { 
			type: mongoose.Schema.Types.ObjectId, ref : 'books'
	},
	feedback : String,
    postedBy:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
    }]

});

module.exports= mongoose.model('Review', reviewModel);