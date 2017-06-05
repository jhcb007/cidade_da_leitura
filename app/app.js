'use strict';
var app = angular.module('cidadeLeituraAPP', ['ngRoute', 'ngSanitize', 'LocalStorageModule', 'Inciciomodulo']);

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/inicio', {
            templateUrl: 'view/inicio.html',
            controller: 'InicioController'
        })
        .when('/livros/:termo', {
            templateUrl: 'view/livros.html',
            controller: 'LivrosController'
        })
        .when('/livro/:id', {
            templateUrl: 'view/livro_detalhe.html',
            controller: 'LivrosDetalheController'
        })
        .when('/minha_biblioteca', {
            templateUrl: 'view/minha_biblioteca.html',
            controller: 'MinhaBibliotecaController'
        })
        .otherwise({
            redirectTo: '/inicio'
        });
    $locationProvider.hashPrefix('!');
});

app.run(function ($rootScope, $window) {
    $rootScope._pesquisa = '';
    $rootScope._consulta = function (termo) {
        $window.location.href = '#!/livros/' + termo
    };
});



