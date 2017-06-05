'use strict';

angular.module('Inciciomodulo', ['servicoGeral'])
    .controller('InicioController', InicioController)
    .controller('LivrosController', LivrosController)
    .controller('LivrosDetalheController', LivrosDetalheController)
    .controller('MinhaBibliotecaController', MinhaBibliotecaController);

function InicioController($window, $rootScope, $scope, LivrosInicio) {
    $scope.index = 0;
    $scope.livros1 = [];
    $scope.livros2 = [];
    $scope.livros3 = [];
    $scope.livros4 = [];

    LivrosInicio.get({query: 'subject:Suspense', index: $scope.index, max: 10}, function (resul) {
        $scope.livros1 = resul.items;
    });

    LivrosInicio.get({query: 'subject:Psychology', index: $scope.index, max: 10}, function (resul) {
        $scope.livros2 = resul.items;
    });

    LivrosInicio.get({query: 'subject:Poetry', index: $scope.index, max: 10}, function (resul) {
        $scope.livros3 = resul.items;
    });

    LivrosInicio.get({query: 'subject:Romance', index: $scope.index, max: 10}, function (resul) {
        $scope.livros4 = resul.items;
    });
}

function LivrosController($window, $rootScope, $scope, $routeParams, LivrosInicio) {
    $scope.index = 0;
    $scope.livros = [];
    $rootScope._pesquisa = $routeParams.termo;
    LivrosInicio.get({query: $routeParams.termo, index: $scope.index, max: 40}, function (resul) {
        $scope.livros = resul.items;
    });

    $scope.get_mais = function () {
        $scope.index = $scope.index + 40;
        LivrosInicio.get({query: $routeParams.termo, index: $scope.index, max: 40}, function (resul) {
            $scope.livros = resul.items;
        });
    }
}

function LivrosDetalheController($window, $rootScope, $scope, $routeParams, localStorageService, LivroCodigo) {
    LivroCodigo.get({id: $routeParams.id}, function (resul) {
        $scope.livro = resul;
    });
    $scope.set_biblioteca = function (livro) {
        var meus_livros = [];
        if (readCookie('meus_livros')) {
            meus_livros = JSON.parse(localStorageService.get('meus_livros'));
            localStorageService.remove(meus_livros);
        }
        meus_livros.push(livro);
        localStorageService.set('meus_livros', JSON.stringify(meus_livros));
    };
}

function MinhaBibliotecaController($window, $scope, $rootScope, localStorageService) {
    $scope.livros = JSON.parse(localStorageService.get('meus_livros'));
}


