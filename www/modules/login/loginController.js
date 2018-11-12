angular.module('motohelper')

.controller('loginCtrl', function($scope, $state, $ionicModal, $ionicLoading, constant, auxiliar,
    loading, loginRequest, $ionicPopup, $ionicHistory, tokenService, $localStorage, cadastrarLoginRequest){

    $ionicModal.fromTemplateUrl('modules/login/modalLogin.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    $scope.usuario = {
        username: null,
        password: null
    };

    $scope.novousuario = {
        login : null,
        senha: null,
        nome : null,
        email : null
    }

    $scope.openModal = function() {
        $scope.modal.show();
    };

    console.log(tokenService.getToken());
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

    $scope.cadastrarUsuario = function (novoUsuario) {

        loading.show('carregando');

        cadastrarLoginRequest.createRequest(novoUsuario).getRequest().then(function (response) {
            $scope.modal.hide();
            $ionicPopup.alert({
                template : response.data.msg,
                buttons: [{
                    text: "Ok",
                    type: 'button-dark'
                }]
            });
            $scope.usuario.username = response.data.login.login;
            $ionicLoading.hide();
        }, function (erro) {
            $ionicLoading.hide();
            var msgErrors = "";
            console.log(erro)
            angular.forEach(erro.data.erros, function(value){
                msgErrors += "<br>" + value;
            })
            $ionicPopup.alert({
                template : msgErrors,
                buttons: [{
                    text: "Ok",
                    type: 'button-dark'
                }]
            });
        });
    };

});