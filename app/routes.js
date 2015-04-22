 // app/routes.js

// grab the notes model
var UserNotes = require('./models/notes');

    module.exports = function(app) {

        // Server routes.  Handles api calls, authentication etc

       
        // get all api call
        app.get('/api/notes', function(req, res) {
            // use mongoose to get all  in the database
            UserNotes.find(function(err, notes) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json({ all : notes }); // return all favorites in JSON format
            });
        });

        // get notes api with paramater - uid
        app.get('/api/userNotes/:uid', function(req, res) {
            // use mongoose to get all notes in the database
            UserNotes.find({
                uid: req.params.uid
                }, function(err, notes) {
                    if (err)
                        res.send(err);
                    res.json({ userNotes : notes }); // return all notes in JSON format
            });
        });

        // route to handle creating (app.post)
        app.post('/api/addNote', function(req, res) { 
            
            var newNote = new UserNotes(req.body);      // create a new instance of the userFav model
            console.log(req.body);
            newNote.title = req.body.title;  // set the favorite info (comes from the request)

            newNote.save(function(err, note) {
                if (err)
                    res.send(err);

                res.json({ message: 'Note Added!' + note });
            });
        });
        
        // route to handle delete goes here based on object _id (app.delete)
        app.delete('/api/removeNote/:_id', function(req, res) { 
            
        UserFavorites.remove({
            _id: req.params._id,
            }, function(err, note) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully removed note'});
            });
        });

        // frontend routes 

        // route to handle root request
        app.get('/', function(req, res) {
            var uid = req.param('uid');
            res.render('index', {uid : uid}); // load our public/index.ejs file
        });

        // catch 404 and forward to error handler
        app.get('*', function(req, res) {
          res.render('error', { title: 'Express' }); // load our public/error.ejs file
        });

    };
