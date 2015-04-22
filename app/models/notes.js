// app/models/notes.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called.  This happens in routes.js
module.exports = mongoose.model('notes', {
    title : {type : String, default: ''},
    body  : {type : String, default: ''}
});