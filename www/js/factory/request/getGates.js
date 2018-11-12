angular.module('motohelper')
.factory('getGates', function (ARequest, tokenService, $localStorage, constant) {

    var _idSistema = 0;
    return {

        setIdSistema: function(idSistema){
            _idSistema = idSistema;
            return this;
        },
        createRequest: function () {
        	var token = tokenService.getToken();
            var headers = {

                'Authorization': 'Bearer ' + token
            }
            return new ARequest('/api/v1/sistema/' + _idSistema + '/portoes', headers, 'GET');
        }
    }
});