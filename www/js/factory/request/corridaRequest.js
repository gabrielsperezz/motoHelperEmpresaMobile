angular.module('motohelper')
    .factory('corridaRequest', function (ARequest, tokenService, $localStorage) {
        return {
            ficarDisponivel: function () {
                var token = tokenService.getToken();
                var headers = {
                    'token': token
                };
                return new ARequest('/api/mobile/corrida/disponivel/'+ $localStorage.getObject('user_motoboy').id, headers, 'POST');
            },
            cancelarCorrida: function (idCorrida) {
                var token = tokenService.getToken();
                var headers = {
                    'token': token
                };

                return new ARequest('/api/mobile/corrida/'+ idCorrida +'/cancelar', headers, 'PUT');
            },
            aceitarCorrida: function (idCorrida) {
                var token = tokenService.getToken();
                var headers = {
                    'token': token
                };

                return new ARequest('/api/mobile/corrida/'+ idCorrida +'/aceitar', headers, 'PUT');
            },
            buscarRotaCorrida: function (idCliente) {
                var token = tokenService.getToken();
                var headers = {
                    'token': token
                };

                return new ARequest('/api/mobile/rotas/'+$localStorage.getObject('user_motoboy').id+'/' + idCliente, headers, 'GET');
            },
            buscarUserInfo: function () {
                var token = tokenService.getToken();
                var headers = {
                    'token': token
                };

                return new ARequest('/api/mobile/user/me', headers, 'GET');
            },
            buscarHistoricoDeCorridas: function () {
                var token = tokenService.getToken();
                var headers = {
                    'token': token
                };
                return new ARequest('/api/mobile/corridas/historico', headers, 'GET');
            }
        }
    });