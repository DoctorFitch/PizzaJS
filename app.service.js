angular
    .module('app.service', [])
    .service('dataservice', dataservice);

dataservice.$inject = ['$http', '$log'];

function dataservice($http, $log) {

    return {
        getPizzas: getPizzas,
        postCommande: postCommande,
        addToFavorite: addToFavorite,
        getFromFavorite: getFromFavorite,
        purgeFavorites: purgeFavorites
    };

    function getPizzas() {
        return $http.get('http://localhost:8008/pizzas')
            .then(getPizzasComplete)
            .catch(getPizzasFailed);

        function getPizzasComplete(response) {
            return response.data;
        }

        function getPizzasFailed(error) {
            throw error;
            $log.error('getPizzas: impossible de récuperer les pizzas, voir erreur ->', error);
        }
    }

    function postCommande(data) {
        return $http.post('http://localhost:8008/commanderPizza', data)
            .then(postCommandeSuccess)
            .catch(postCommandeFailed);

        function postCommandeSuccess(response) {
            return response.data;
        }

        function postCommandeFailed(error) {
            throw error;
            $log.error('postCommande: impossible de poster la commande, voir erreur ->', error);
        }
    }

    function addToFavorite(pizzaNom, pizzaObj) {
        if (typeof(window.localStorage) !== "undefined") {
            window.localStorage.setItem(pizzaNom, pizzaObj);
        } else {
            $log.warn('addToBasket: Impossible de stocker les pizzas commandés sur ce navigateur');
        }
    }

    function getFromFavorite() {
        if (typeof(window.localStorage) !== "undefined") {
            console.log('On entre dans le getFromFavorite');
            return window.localStorage.getItem('favoris');
        } else {
            console.log('Impossible de stocker les pizzas commandés sur ce navigateur');
        }
    }

    function purgeFavorites() {
        window.localStorage.removeItem('favoris');
        Materialize.toast('Favoris supprimés !', 4000, 'green');
    }

}
