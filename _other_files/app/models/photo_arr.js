// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var Photo = require('./photo');

// create a photo schema
module.exports = mongoose.model('PhotoArr', {
    photos: [Photo]
});