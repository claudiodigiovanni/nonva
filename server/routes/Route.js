var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comune = require('../models/Comune');
var Segnalazione = require('../models/Segnalazione');
var Ufficio = require('../models/Ufficio');
var User = require('../models/User');



router.get('/segnalazioni', function (req, res){

    var callback = function (err, segnalazioni) {
        if (!err) {
            return res.send(segnalazioni);
        } else {
            return console.log(err);
        }
    }
   return Segnalazione.find().
            populate('ufficio').
            populate('ufficio.comune').
            exec(callback);
});

router.post('/segnalazioni', function (req, res){
    var segnalazione  = new Segnalazione({

        descrizione: req.body.descrizione
    });
    segnalazione.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log("errore...." + err);
        }
    });
    return res.send(segnalazione);
});

router.get('/segnalazioni/:id', function (req, res){

    return Segnalazione.findById(req.params.id, function (err, segnalazione) {
        if (!err) {
            return res.send(segnalazione);
        } else {
            return console.log(err);
        }
    });
});

router.post('/segnalazioni/:id', function (req, res){
    return Segnalazione.findById(req.params.id, function (err, segnalazione) {
        segnalazione.descrizione = req.body.descrizione;
        return segnalazione.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(segnalazione);
        });
    });
});

router.delete('/segnalazioni/:id', function (req, res){

    return Segnalazione.findById(req.params.id, function (err, segnalazione) {
        return segnalazione.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});

module.exports = router;

