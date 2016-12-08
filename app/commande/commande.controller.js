(function() {
    'use strict';

angular
    .module('commande.controller', ['ui.materialize', 'app.service'])
    .controller('BodyController', BodyController);

BodyController.$inject = ['$scope', '$filter', 'dataservice', '$q', '$location', '$log'];

function BodyController($scope, $filter, dataservice, $q, $location, $log) {

    var vm = this;

    vm.pizzas = [];

    // function
    vm.total = total;
    vm.commanderPizza = commanderPizza;

    vm.isDisabled = true;
    $scope.result = "";

    // datas
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

    function postCommande(commande) {

        return dataservice.postCommande(commande)
            .then(function() {
                Materialize.toast('Votre commande à correctement été prise en compte !', 4000, 'green');
                $log.debug('success postCommande');
                $location.path("/");
            }).catch(function () {
                Materialize.toast('Une erreur est survenue durant la commande', 4000, 'red');
                $log.warn('postCommande failed');
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

        // permet de déverouiller le bouton de commande
        vm.isDisabled = ($scope.pates.val && $scope.bases.val && atLeastOneSelected) ? false : true;

        return total;
    }

    function commanderPizza() {

        $log.debug('commanderPizza()');
        var pate = $scope.pates.val;
        var base = $scope.bases[0].nom;

        var pizza = { pate: pate, base: base, anchois: true, jambon: true, miel: true, magret: true };

        var pizzaToPost = JSON.stringify(pizza);

        postCommande(pizzaToPost);

    }
}

})();
