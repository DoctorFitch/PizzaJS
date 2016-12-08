(function() {
    'use strict';

    angular
        .module('accueil.controller', ['ui.materialize', 'app.service'])
        .controller('AccueilController', AccueilController);

    AccueilController.$inject = ['$scope', '$filter', 'dataservice', '$q', '$location'];

    function AccueilController($scope, $filter, dataservice, $q, $location) {

        var vm = this;
        vm.favorites = [];
        vm.panier = [];
        vm.commanderPizza = commanderPizza;

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

        function commanderPizza(pizzaNom, pizzaObj) {

            vm.panier.push(pizzaObj);
            dataservice.addToFavorite(pizzaNom, JSON.stringify(vm.panier));

            dataservice.postCommande(pizzaObj).then(function(data) {
                Materialize.toast('Pizza commandé !', 4000, 'green');
            }).catch(function(error) {
                Materialize.toast('Erreur sur la commande !', 4000, 'red');
            });
        }
    }

})();
