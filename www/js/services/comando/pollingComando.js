angular.module('motohelper')

.service('pollingComando', function (executeRequest, statusComandoRequest, constant, loading, $q, $ionicPopup, $ionicLoading, $ionicPopup, $translate, $ionicLoading) {

	this.comando = function (id) {
		var endTime  = Number(new Date()) + 2 * (60 * 1000);
		var deffered = $q.defer();
		(function p() {
			if (Number(new Date()) < endTime) {
				var st = statusComandoRequest.setIdComando(id);
				executeRequest(st).then(function(resp){
					var status_comando = resp.data.status;
					if( resp.data.tipo != constant.COMANDO_FECHAR_PORTAO && resp.data.tipo != constant.COMANDO_ABRIR_PORTAO ){
						var pararPolling = status_comando != constant.STATUS_COMANDO_ENVIOU_PARA_FILA && status_comando != constant.STATUS_COMANDO_ENVIOU_PARA_THREAD_DE_EXECUCAO && status_comando != constant.STATUS_COMANDO_EM_EXECUCAO;
					} else {
						var pararPolling = status_comando >= constant.STATUS_COMANDO_EM_EXECUCAO;
					}
					if( pararPolling ){
						deffered.resolve(resp.data);
					}else{
						if( status_comando == constant.STATUS_COMANDO_ENVIOU_PARA_FILA ){
							loading.show('Comando_fila');
						}else if ( status_comando == constant.STATUS_COMANDO_ENVIOU_PARA_THREAD_DE_EXECUCAO ) {
							loading.show('Comando_thread');
						} else if( status_comando == constant.STATUS_COMANDO_EM_EXECUCAO ){
							loading.show('Comando_execução');
						};
						setTimeout(p, 500);
					};
				},function(resp){
					deffered.reject(resp);
				});
			} else {
				$ionicLoading.hide();
				$ionicPopup.alert({
					template : $translate.instant("timeoutComando"),
            		buttons: [{
                		text: '<b>OK</b>',
            		}]
        		});
				deffered.reject();
			}
		})();
		return deffered.promise
	};
});