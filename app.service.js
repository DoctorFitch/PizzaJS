angular
    .module('app.service', [])
    .service('dataservice', dataservice);

dataservice.$inject = ['$http', '$log'];

function dataservice($http, $log) {

    return {
        getPizzas: getPizzas,
        postCommande: postCommande,
        addToBasket: addToBasket,
        getFromBasket: getFromBasket
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
            }
    }

    function addToBasket(pizzaNom, pizzaObj) {
        if(typeof(window.localStorage) !== "undefined") {
            console.log('On entre dans la addTo');
            window.localStorage.setItem(pizzaNom, pizzaObj);
        } else {
            console.log('Impossible de stocker les pizzas commandés sur ce navigateur');
        }
    }

    function getFromBasket(key) {
        if(typeof(window.localStorage) !== "undefined") {
            console.log('On entre dans le getFromBasket');
            return window.localStorage.getItem(key);
        } else {
            console.log('Impossible de stocker les pizzas commandés sur ce navigateur');
        }
    }
}
