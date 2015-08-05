var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comune = require('./Ufficio');

// create a schema
var segnalazioneSchema = new Schema({
    descrizione: String,
    ufficio: {type: mongoose.Schema.ObjectId, ref: 'Ufficio'},
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Segnalazione = mongoose.model('Segnalazione', segnalazioneSchema);

// make this available to our users in our Node applications
module.exports = Segnalazione;