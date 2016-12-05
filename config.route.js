angular
    .module('app.route', [])
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/commande', {
            templateUrl: 'app/commande/commande.html',
            controller: 'BodyController',
            controllerAs: 'vm'
        }).when('/carte', {
            templateUrl: 'app/carte/carte.html',
            controller: 'CarteController',
            controllerAs: 'vm'
        }).when('/', {
            templateUrl: 'app/accueil/accueil.html',
            controller: 'AccueilController',
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/'
        });
}
