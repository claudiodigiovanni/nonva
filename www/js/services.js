/**
 * Created by cdgAir on 05/08/15.
 */
var service = angular.module('starter.services', ['ngResource']);


service.factory('Segnalazioni',Segnalazioni);

function Segnalazioni ($resource) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var segnalazioni = $resource("http://localhost:3000/api/post/:_id", {_id:'@_id'});
    return segnalazioni;

}

