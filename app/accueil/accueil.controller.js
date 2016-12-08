(function() {
    'use strict';

    angular
        .module('accueil.controller', ['ui.materialize', 'app.service'])
        .controller('AccueilController', AccueilController);

    AccueilController.$inject = ['$scope', '$filter', 'dataservice', '$q', '$location'];

    function AccueilController($scope, $filter, dataservice, $q, $location) {

        var vm = this;
        vm.favorites = [];
        $scope.ok = '';

        activate();

        function activate() {
            var promises = [getFavorite()];
            return $q.all(promises).then(function(eventArgs) {
              console.log(vm.favorites);
            });
        }

        function getFavorite() {
            vm.favorites = JSON.parse(dataservice.getFromFavorite());
        }
    }

})();
