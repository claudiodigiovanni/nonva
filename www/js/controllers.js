angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every pcomune change.
  // To listen for when this pcomune is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ListCtrl', function($scope,$rootScope, Segnalazioni, $state) {
      var vm = this;
        /*vm.remove = function(s){
             var segnalazione = Segnalazioni.get({ _id: s._id }, function() {
                // $scope.entry is fetched from server and is an instance of Entry
                segnalazione.$delete(function() {
                    console.log('DELETED!!!!');
                    //Refresh....
                    vm.segnalazioni = Segnalazioni.query(function(){
                        console.log('segnalazioni acquired! Dim:' + vm.segnalazioni.length);

                    });
                });
            });
        }*/

        vm.remove = function(s){
            Segnalazioni.get({ _id: s._id}).$promise.then(function(result){
                result.$delete(function(){
                    //Refresh....
                    Segnalazioni.query().$promise.then(function (results){
                        vm.segnalazioni = results;
                    })

                });
            });
        }



        $scope.$on('$ionicView.enter', function(e) {
            vm.segnalazioni = Segnalazioni.query(function(){
                console.log('segnalazioni acquired! Dim:' + vm.segnalazioni.length);

            });
        });
})

.controller('EditCtrl', function($scope, $stateParams,$rootScope, Segnalazioni) {
      var myId = $stateParams.myId;
      var vm = this;
      vm.segnalazione = Segnalazioni.get({_id:myId});

})


.controller('CreateCtrl', function($scope, $stateParams,$rootScope, Segnalazioni, $state, $http) {

    var vm = this;
    vm.submit = function(){
        var newS = new Segnalazioni();
        newS.descrizione = vm.descrizione;
        newS.ufficio = vm.ufficio;
        newS.$save(function callback(){
            console.log('saved.......');
        });
        $state.go('app.list');


    }

       


        vm.refreshUffici = function(partial) {
            if (!partial){
                vm.uffici = {};
                return;
            }

            var params = {name: partial};
            return $http.get(
                'http://localhost:3000/api/segnalazioni/uffici',
                {params: params}
            ).then(function(response) {
                    vm.uffici = response.data
                    console.log(vm.uffici);
                });
        };




});

