var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comune = require('../models/Comune');
var Segnalazione = require('../models/Segnalazione');
var Ufficio = require('../models/Ufficio');
var User = require('../models/User');



router.get('/segnalazioni', function (req, res){

    var callback = function (err, segnalazioni) {
        console.log("****************LISTA SEGNALAZIONI**************************" + segnalazioni.length);
        if (!err) {
            Comune.populate(segnalazioni,{path:'ufficio.comune'},function(err,docs) {
                return res.send(docs);
            })
        }
         else {
            return console.log(err);
        }
    }
   return Segnalazione.find().
            populate('ufficio').
            exec(callback);
});

router.get('/segnalazioni/uffici', function (req, res){

    var callback = function (err, uffici) {
        if (!err) {
            //console.log(uffici);
            return res.send(uffici);
        } else {
            return console.log(err);
        }
    }
    //console.log(req.query.name);
    var regex = new RegExp(req.query.name, "i")
    if (!req.query.name || req.query.name.length <=3)
        return Ufficio.find({descrizione: 'xxxx'}).
            populate('comune').
            exec(callback);;
    return Ufficio.find({descrizione: regex}).
        populate('comune').
        exec(callback);
});

router.post('/segnalazioni', function (req, res){
    var segnalazione  = new Segnalazione({

        descrizione: req.body.descrizione,
        ufficio: req.body.ufficio
    });
    segnalazione.save(function (err) {
        if (!err) {
            console.log("created");
            console.log(segnalazione);
            return res.send(segnalazione);
        } else {
            return console.log("errore...." + err);
        }
    });

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

router.post('/segnalazioni/ufficio', function (req, res){
    Comune.findOne({descrizione:req.body.params.ufficio.comune.descrizione},function(err,comune){
        if (err || comune == null){
            console.log('Comune non trovato!');
            return res.sendStatus(500);
        }
        console.log('Comune ok!');
        console.log(comune);
        var ufficio = new Ufficio({descrizione:req.body.params.ufficio.descrizione, via: req.body.params.ufficio.via, comune: comune._id});
        ufficio.save(function(err){
            if (!err) {
                console.log("Ufficio created");

                return res.send(ufficio);
            } else {
                return console.log("errore...." + err);
            }

        })
    })
    return console.log(req.body);
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

