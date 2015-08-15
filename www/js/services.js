/**
 * Created by cdgAir on 05/08/15.
 */
var service = angular.module('starter.services', ['ngResource']);


service.factory('Segnalazioni',Segnalazioni);

function Segnalazioni ($resource) {
    // Might use a resource here that returns a JSON array


    var segnalazioni = $resource("http://localhost:3000/api/segnalazioni/:_id", {_id:'@_id'});
    return segnalazioni;

}

service.factory('RefreshUffici',RefreshUffici);

function RefreshUffici($scope,$http) {
    console.log('service refreshUffici');
    var descri = $scope.segnalazione.ufficio.descrizione;
    console.log(descri);
    if (!descri){
        return this.uffici = {};

    }
    var params = {name: descri};
    return $http.get(
        'http://localhost:3000/api/segnalazioni/uffici',
        {params: params}
    ).then(function(response) {
            $scope.uffici = response.data
            //console.log($scope.uffici);
        });
};

