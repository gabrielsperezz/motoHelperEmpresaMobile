angular.module('motohelper')
.factory('cadastrarLoginRequest', function (ARequest, serialize) {
    return {
        createRequest: function (usuario) {
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            parameters = serialize.toUrlParams(usuario);
            return new ARequest('/api/mobile/login/novo', headers, 'POST', parameters);
        },
    }
});