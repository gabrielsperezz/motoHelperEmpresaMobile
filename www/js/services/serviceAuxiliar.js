angular.module('motohelper')

.service("auxiliar", function ($ionicPopup, $translate, $ionicLoading, logoff, $ionicPopup) {

	this.erro = function (status) {
        $ionicLoading.hide();

        if(status == 401){
            $ionicPopup.confirm({
                template: $translate.instant("sessao_expirada"),
                buttons: [{
                    text: "Ok",
                    type: 'button-custom',
                    onTap: function(){
                        logoff.clearLocalStorage();                        
                    }
                }]
            });            
            return;
        }

        switch (status){

            case 0 /* offline */:
                var message = $translate.instant("offline_menssage");   
            break;

            case 401 /* Unauthorized */:
                var message = $translate.instant("unauthorized_message");
            break;

            case 403 /* forbidden */:
                var message = $translate.instant("forbidden_message");
            break;

            case 404 /* NotFound */:
                var message = $translate.instant("dados_nao_encontrado");
            break;
            
            case 408 /* RequestTimeout */:
                var message = $translate.instant("falha_comando_timeout_comando");
            break;

            case 500 /* error */:
                var message = $translate.instant("erro_menssage");
            break;
            default:
                var message = $translate.instant("erroGenerico_message");
        }
        $ionicPopup.alert({
            template : message,
            buttons: [{
                text: '<b>OK</b>',
                type: 'button-custom',
            }]
        });
    };
     
});