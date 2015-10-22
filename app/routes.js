 // app/routes.js

// grab the notes model
var UserNotes = require('./models/notes');

    module.exports = function(app) {

        // Server routes.  Handles api calls, authentication etc

        // get all api call
        app.get('/api/notes', function(req, res) {
            // use mongoose to get all notes in the database
            // console.log('get notes');
            UserNotes.find(function(err, notes) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json({ all : notes }); // return all notes in JSON format
            });
        });

        // get single note api call
        app.get('/api/notes/single/:_id', function(req, res) {
            // use mongoose to get all nerds in the database
            UserNotes.findOne({
                _id: req.params._id
                }, function(err, note) {
                    if (err)
                        res.send(err);
                    res.json({ userNote : note }); // return all favorites in JSON format
            });
        });

        // route to handle creating (app.post)
        app.post('/api/addNote', function(req, res) { 
            var newNote = new UserNotes(req.body);      // create a new instance of the notes model
            console.log(req.body);
            newNote.title = req.body.title;  // set the notes info (comes from the request)
            console.log(req.body.title);
            newNote.save(function(err, note) {
                if (err)
                res.send(err);
            console.log(err);
                res.json({ message: 'Note Added!' + note });
            });
        });
        
        // route to handle delete goes here based on object _id (app.delete)
        app.delete('/api/removeNote/:_id', function(req, res) { 
            
        UserNotes.remove({
            _id: req.params._id,
            }, function(err, note) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully removed note'});
            });
        });

        // Frontend routes 

        // route to handle root request
        app.get('/', function(req, res) {
            res.render('index', {
             firstChoice : 'null'
           });
        });

        // route to handle root request
        app.get('/feature/:choice', function(req, res) {
           res.render('index', {
             firstChoice : req.params.choice
           });
        });


        // route to handle note request
        app.get('/note/:noteId', function(req, res) {
            // load our public/note.ejs file and pass the note id
            res.render('note', { noteId: req.params.noteId }); 
        });

        // route to create request
        app.get('/create', function(req, res) {
            // load our public/create.ejs file
            res.render('create'); 
        });

        // catch 404 and forward to error handler
        app.get('*', function(req, res) {
          res.render('error', { title: 'Express' }); // load our public/error.ejs file
        });

    };
