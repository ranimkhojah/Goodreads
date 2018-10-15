var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name: { type: String }
});

module.exports = mongoose.model('admins', adminSchema);
