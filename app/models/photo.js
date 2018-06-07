// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// create a photo schema
module.exports = mongoose.model('Photo', {
	user_id: Number, 
    image: String, // url for the photo
    x_location: Number,
    y_location: Number,
    x_category: Number,
    y_category: Number,
    graph_width: Number,
    graph_height: Number,
    comment: [],
});