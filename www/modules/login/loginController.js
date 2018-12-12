angular.module('motohelper')

.controller('loginCtrl', function($scope, $state, $ionicModal, $ionicLoading, constant, auxiliar,
    loading, loginRequest, $ionicPopup, $ionicHistory, tokenService, $localStorage){

    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    $scope.usuario = {
        username: null,
        password: null
    };

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.loginUsuario = function (telefone) {

        loading.show('carregando');

        loginRequest.createRequest(telefone).getRequest().then(function (response) {
            tokenService.setToken(response.data.token);
            $localStorage.setObject(constant.USER, response.data.user);
            $localStorage.setObject(constant.AUTHENTICATED,true);
            if (ionic.Platform.isWebView()) {
                NativeStorage.setItem(constant.AUTHENTICATED, true);
                NativeStorage.setItem(constant.USER, response.data.user);
            }
            $state.go("app.home");
        }, function (erro) {
            $ionicLoading.hide();
            switch (erro.status) {
                case 400:
                    var msgErrors = "";
                    angular.forEach(erro.data.errors, function(value){
                        msgErrors += "<br>" + value;
                    })
                    $ionicPopup.alert({
                        template : msgErrors,
                        buttons: [{
                            text: "Ok",
                            type: 'button-dark'
                        }]
                    });
                    break;
                case 401:
                    $ionicPopup.alert({
                        template : "A combinação de login e senha não conferem",
                        buttons: [{
                            text: "Ok",
                            type: 'button-dark'
                        }]
                    });
                    break;
                case 403:
                    $ionicPopup.alert({
                        template : erro.data.mensagem,
                        buttons: [{
                            text: "Ok",
                            type: 'button-dark'
                        }]
                    });
                    break;
                default:
                    auxiliar.erro(erro.status);
            };
        });
    };

});