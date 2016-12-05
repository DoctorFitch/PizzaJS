(function() {
    'use strict';

angular
    .module('commande.controller', ['ui.materialize', 'app.service'])
    .controller('BodyController', BodyController);

BodyController.$inject = ['$scope', '$filter', 'dataservice', '$q', '$location'];

function BodyController($scope, $filter, dataservice, $q, $location) {
    
    var vm = this;

    vm.pizzas = [];

    // function
    vm.total = total;
    vm.commanderPizza = commanderPizza;

    // var 
    vm.isDisabled = true;

    $scope.result = "";

    $scope.pates = [
        {id: 1, nom: 'Fine'}, 
        {id: 2, nom: 'Epaisse'}
    ];

    $scope.bases = [
        {id: 1, nom: 'Tomate', prix: 3}, 
        {id: 2, nom: 'Crème',  prix: 4}
    ];

    $scope.ingredients = [
        {id: 1, nom: 'Anchois', prix: 1, select: false}, 
        {id: 2, nom: 'Jambon',  prix: 2, select: false}, 
        {id: 3, nom: 'Miel',    prix: 2, select: false}, 
        {id: 4, nom: 'Magret',  prix: 4, select: false}
    ];

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

    function postCommande(commande) {
        return dataservice.postCommande(commande)
            .then(function() {
                Materialize.toast('Votre commande à correctement été prise en compte !', 4000, 'green');
                $location.path("/");
            }).catch(function () {
                Materialize.toast('Une erreur est survenue durant la commande', 4000, 'red');
            });
    }

    function total() {

        var total = 0;
        var atLeastOneSelected = false;

        if ($scope.bases.val) {
            total += parseInt($scope.bases.val);
        }

        angular.forEach($scope.ingredients, function (ingredient) {
            if (ingredient.selected) {
                total += ingredient.prix;
                atLeastOneSelected = true;
            }
        });

        vm.isDisabled = ($scope.pates.val && $scope.bases.val && atLeastOneSelected) ? false : true;

        return total;
    }

    function commanderPizza() {
        
        var pizza = { pate: 'fine', base: 'tomate', anchois: true, jambon: true, miel: true, magret: true };
        var pizzaToPost = JSON.stringify(pizza);

        postCommande(pizzaToPost);
    }
}

})();