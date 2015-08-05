var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var comuneSchema = new Schema({
    descrizione: String
});

// the schema is useless so far
// we need to create a model using it
var Comune = mongoose.model('Comune', comuneSchema);

// make this available to our users in our Node applications
module.exports = Comune;