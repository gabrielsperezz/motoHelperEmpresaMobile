angular.module('motohelper')
.factory('loginRequest', function (ARequest, serialize) {
    return {
        createRequest: function (usuario) {
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            parameters = serialize.toUrlParams(usuario);
            return new ARequest('/api/mobile/login/motoboy', headers, 'POST', parameters);
        },
    }
});