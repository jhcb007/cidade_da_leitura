angular.module('servicoGeral', ['ngResource'])
    .factory('LivrosInicio', function ($resource) {
        return $resource('https://www.googleapis.com/books/v1/volumes?hl=pt-br&q=:query&startIndex=:index&maxResults=:max', {}, {
            'get': {
                method: 'GET',
                params: {termo: 'termo', index: 'index', max: 'max'},
                isArray: false
            }
        });
    })
    .factory('LivroCodigo', function ($resource) {
        return $resource('https://www.googleapis.com/books/v1/volumes/:id', {}, {
            'get': {
                method: 'GET',
                params: {id: 'id'},
                isArray: false
            }
        });
    });