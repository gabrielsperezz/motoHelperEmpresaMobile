 angular.module('motohelper')
.factory('linguagem', function (ARequest, tokenService, $localStorage, constant) {
 
    var _linguagem = 'pt-BR';
    
    return {
        setLinguagem: function(linguagem){
            _linguagem = linguagem;
            return this;
        },
        createRequest: function () {
            var token = tokenService.getToken();
            var headers = {
                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + token
            }
            return new ARequest('/api/v1/usuario/login/trocaridioma/' + _linguagem, headers, 'PATCH');
        }
    }
});