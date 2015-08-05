var mongoose = require('mongoose');
var Comune = require('./Comune');
var Schema = mongoose.Schema;

// create a schema
var ufficioSchema = new Schema({
    descrizione: String,
    via: String,
    comune: {type: mongoose.Schema.ObjectId, ref: 'Comune'},
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Ufficio = mongoose.model('Ufficio', ufficioSchema);

// make this available to our users in our Node applications
module.exports = Ufficio;