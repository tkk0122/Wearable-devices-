 // app/routes.js
var path = require("path");
// grab the photo model we just created
var Photo = require('./models/photo');
var PhotoArr = require('./models/photo_arr');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/photos', function(req, res) {
            // use mongoose to get all photos in the database
            Photo.find(function(err, photos) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }
                res.json(photos); // return all photos in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/submit', function(req, res) {
            var photo = new Photo({
                user_id: req.body.user_id,
                image: req.body.image,
                x_location: req.body.x_location,
                y_location: req.body.y_location,
                x_category: req.body.x_category,
                y_category: req.body.y_category,
                graph_width: req.body.graph_width,
                graph_height: req.body.graph_height,
                comment: req.body.comment,
            });
            photo.save(function(err, photos) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }
                res.json(photos); // return all photos in JSON format
            });
        });

        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../public/', 'index.html'));
        });

    };