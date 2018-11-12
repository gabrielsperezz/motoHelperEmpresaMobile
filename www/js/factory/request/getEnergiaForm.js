angular.module('motohelper')
    .factory('getEnergiaForm', function (ARequest, tokenService, $localStorage, constant) {
        var _idSistema = 0;
        return {

            setIdSistema: function (idSistema) {
                _idSistema = idSistema;
                return this;
            },
            createRequest: function () {
                var token = tokenService.getToken();
                var headers = {
                    'Accept-Language': $localStorage.get(constant.LINGUAGEM_DO_APP),
                    'Authorization': 'Bearer ' + token
                }
                return new ARequest('/api/v1/sistema/' + _idSistema + '/energia/form', headers, 'GET');
            }
        }
    });