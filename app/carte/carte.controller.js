(function() {
    'use strict';

angular
    .module('carte.controller', ['ui.materialize', 'app.service'])
    .controller('CarteController', CarteController);

CarteController.$inject = ['$scope', '$filter', 'dataservice', '$q', '$location', '$log'];

function CarteController($scope, $filter, dataservice, $q, $location, $log) {

    var vm = this;
    vm.pizzas = [];
    vm.panier = [];
    vm.commanderPizza = commanderPizza;

    activate();

    function activate() {
        var promises = [getPizzas()];
        return $q.all(promises).then(function (eventArgs) {
            $log.info('Pizzas récupérés');
        });
    }

    function getPizzas() {
        return dataservice.getPizzas().then(function(data) {
                vm.pizzas = data;
                return vm.pizzas;
            }).catch(function(error) {
                Materialize.toast('Impossible de charger la carte !', 4000);
                $log.warn('Impossible de récupérer les pizzas : getPizzas()');
            });
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
