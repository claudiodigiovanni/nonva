var express = require('express');
var faker = require('faker');
var bodyParser = require ('body-parser');
var restful = require('node-restful');
var cors = require ('cors')
var mongoose = restful.mongoose;

var segnalazioniRoutes = require('./routes/Route')
var Comune = require('./models/Comune');
var Ufficio = require('./models/Ufficio');
var Segnalazione = require('./models/Segnalazione');

var app = express();

app.use(cors());
app.use (bodyParser.json());

var url = 'mongodb://root:root@ds047772.mongolab.com:47772/mymongodb'
mongoose.connect(url);


app.use('/api', segnalazioniRoutes);

//**********************
/*Comune.remove({}, function(err) {
    console.log('collection removed')
});
Ufficio.remove({}, function(err) {
    console.log('collection removed')
});
Segnalazione.remove({}, function(err) {
    console.log('collection removed')
});

console.log('****************************');


var comune1 = new Comune({descrizione:'descrizioneComune1'});
comune1.save(function(err){

    var ufficio1 = new Ufficio({descrizione: 'descriUfficio1', comune:comune1._id});
    ufficio1.save(function(err){
        
        var segnalazione = new Segnalazione({descrizione: 'miaDescrizione',ufficio:ufficio1._id});
        segnalazione.save(function(err){
            if (err)
            console.log('errore!!!!');
        });



    });

});

var mycallback = function (err, docs) {
    console.log('11111');
    console.log(docs);

    Comune.populate(docs,{path:'ufficio.comune'},function(err,docs){
        console.log('size:' + docs.length);
        if (!err) {
            console.log('2222222222222222*****');
            console.log(docs);
        } else {
            return console.log(err);
        }
    });

}

var miaSegnalazione = Segnalazione.find({})
    .populate('ufficio')
    .exec(mycallback);

console.log('Stampa Comuni!!!');
Comune.find({}).exec(function(err,data){
    console.log(data);
});






var comune1 = new Comune({descrizione:'descrizioneComune1'});
comune1.save(function(err){

    var ufficio1 = new Ufficio({descrizione: 'descriUfficio1', comune:comune1._id});
    ufficio1.save(function(err){
    });

});

var comune2 = new Comune({descrizione:'descrizioneComune2'});
comune2.save(function(err){

    var ufficio2 = new Ufficio({descrizione: 'descriUfficio2', comune:comune2._id});
    ufficio2.save(function(err){
    });

});

 var comune1 = new Comune({descrizione:'comune1'});
 comune1.save(function(err){


 });

 var comune2 = new Comune({descrizione:'comune2'});
 comune2.save(function(err){


 });
 */
//**********************





app.listen ('3000', function (){

    console.log('listening on port 3000....');
}) /**
 * Created by cdgAir on 05/08/15.
 */
