(function() {
    'use strict';

angular
    .module('carte.controller', ['ui.materialize', 'app.service'])
    .controller('CarteController', CarteController);

CarteController.$inject = ['$scope', '$filter', 'dataservice', '$q', '$location'];

function CarteController($scope, $filter, dataservice, $q, $location) {

    var vm = this;
    vm.pizzas = [];
    vm.panier = [];
    vm.commanderPizza = commanderPizza;

    $scope.lol = "ta mere la tchoin";

    activate();

    function activate() {
        var promises = [getPizzas()];
        return $q.all(promises).then(function (eventArgs) {
            console.log(vm.pizzas);
        });
    }

    function getPizzas() {
        return dataservice.getPizzas().then(function(data) {
                vm.pizzas = data;
                return vm.pizzas;
            }).catch(function(error) {
                Materialize.toast('Impossible de charger la carte !', 4000);
            });
    }

    function commanderPizza(pizzaNom, pizzaObj) {

        vm.panier.push(pizzaObj);

        console.log('on inject les pizz');
        dataservice.addToBasket(pizzaNom, JSON.stringify(vm.panier));

    }
}

})();
