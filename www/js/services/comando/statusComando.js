angular.module('motohelper')
.service('polling', function ($ionicPopup, constant, codigoErro, $translate, $q, $ionicLoading, nomeaSetores, $rootScope) {

	this.erroComando = function (response, painelVirtual) {
        var status_comando = response.status;
        var deffered = $q.defer();
        if(status_comando == codigoErro.FALHA_DE_ARME_ZONA_ABERTA || status_comando == codigoErro.STAY_ZONA_ABERTA || status_comando == codigoErro.ARME_INIBINDO_SETOR_RECUSADO_ZONAS_ABERTAS || status_comando == codigoErro.ARME_STAY_INIBINDO_SETORES_RECUSADO_ZONAS_EXTERNAS_ABERTAS){
            var template = nomeaSetores.comparador(response, painelVirtual);
            switch(response.tipo){
                case constant.COMANDO_ARMAR:
                    var comandoSemChecagem = constant.COMANDO_ARMAR_SEM_CHECAGEM;
                    var title = $translate.instant("armar");
                    var subTitle = $translate.instant("setores_abertos");
                break;
                case constant.COMANDO_ARMAR_STAY:
                    var comandoSemChecagem = constant.COMANDO_ARMAR_STAY_SEM_CHECAGEM;
                    var title = $translate.instant("armar_stay");
                    var subTitle = $translate.instant("setores_externo_abertos");
                break;
                case constant.COMANDO_ARMAR_INIBINDO_SETORES:
                    var comandoSemChecagem = constant.COMANDO_ARMAR_INIBINDO_SETORES_SEM_CHECAGEM;
                    var title = $translate.instant("armar");
                    var subTitle = $translate.instant("setores_abertos");
                break;
                case constant.COMANDO_ARMAR_STAY_INIBINDO_SETORES:
                    var comandoSemChecagem = constant.COMANDO_ARMAR_STAY_INIBINDO_SETORES_SEM_CHECAGEM;
                    var title = $translate.instant("armar_stay");
                    var subTitle = $translate.instant("setores_externo_abertos");
                break;
            }
            $rootScope.data = {
                inibirSetores: false
            }

            if(response.mensagem.length == 0){
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    subTitle: $translate.instant("falha_arme_setor_aberto_nao_listado"),
                    scope: $rootScope,
                    buttons: [{
                        text: $translate.instant("cancelar_button"),
                        type: 'button-dark'
                    },
                    {
                        text: $translate.instant("armar"),
                        type: 'button-assertive',
                        onTap: function(e){
                            deffered.resolve({
                                idDoPainel: painelVirtual.id,
                                comando: comandoSemChecagem,
                                inibir: false,
                            });
                        }
                    }]
                });
            }else{
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    subTitle: subTitle,
                    scope: $rootScope,
                    template: '<ion-toggle toggle-class="toggle-custom" ng-model="data.inibirSetores">' + $translate.instant("inibir_setores") +'</ion-toggle><div class="item">'+ template +'</div>',
                    buttons: [{
                        text: $translate.instant("cancelar_button"),
                        type: 'button-dark'
                    },
                    {
                        text: $translate.instant("armar"),
                        type: 'button-assertive',
                        onTap: function(e){
                            switch(response.tipo){
                                case constant.COMANDO_ARMAR_STAY:
                                    comandoSemChecagem = constant.COMANDO_ARMAR_STAY_INIBINDO_SETORES_SEM_CHECAGEM
                                break;
                                case constant.COMANDO_ARMAR:
                                    comandoSemChecagem = constant.COMANDO_ARMAR_INIBINDO_SETORES_SEM_CHECAGEM
                                break;
                            }
                            deffered.resolve({
                                idDoPainel: painelVirtual.id,
                                comando: comandoSemChecagem,
                                inibir: $rootScope.data.inibirSetores,
                                response: response.mensagem
                            });
                        }
                    }]
                });
            }
        }else{
            $ionicLoading.hide();
            deffered.reject();

            function popupDeMensagem (mensagemTeste) {                
                $ionicPopup.alert({
                    template : $translate.instant(mensagemTeste),
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-dark',
                    }]
                });
            };

            function popupDeMensagemComSetores (response, nomeSetor) {
                $ionicPopup.alert({
                    title: $translate.instant("titulo"),
                    template : $translate.instant(response.mensagem + " - " + nomeSetor),
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-dark',
                    }]
                });
            };

            var nomeaSetoresParaExibir = function () {
                var nomeSetor;
                for (var i = 0; i < painelVirtual.setores.length; i++) {
                    if(response.mensagem == painelVirtual.setores[i].numero){
                        nomeSetor = painelVirtual.setores[i].descricao;
                    }
                };
                return nomeSetor;
            }

            switch (status_comando){
                case codigoErro.PARTICAO_JA_ARMADO:
                    if (painelVirtual.tipo_arme == constant.ARMADO_STAY) {
                        popupDeMensagem("falha_de_arme_particao_ja_armado_stay");
                    } else {
                        popupDeMensagem('falha_de_arme_particao_ja_armado');
                    }
                break;
                case codigoErro.PARTICAO_JA_DESARMADA:
                    popupDeMensagem("falha_de_arme_particao_ja_desarmada");
                break;


                case codigoErro.FALHA_DE_ARME_ZONAS_NAO_INIBIVEL:
                    var template = nomeaSetores.comparador(response, painelVirtual);
                    $ionicPopup.alert({
                        title : $translate.instant("falha_de_arme_zonas_nao_inibivel"),
                        template : template,
                        buttons: [{
                            text: '<b>OK</b>',
                            type: 'button-dark',
                        }]
                    });
                break;
                case codigoErro.ZONA_DESABILITADA:
                    var nomeSetor;                                                  //chamar nomeaSetoresParaExibir para colocar os nomes
                    for (var i = 0; i < painelVirtual.setores.length; i++) {
                        if(response.mensagem == painelVirtual.setores[i].numero){
                            nomeSetor = painelVirtual.setores[i].descricao;
                        }
                    };
                    $ionicPopup.alert({
                        title: $translate.instant("falha_de_arme_zonas_desabilitada"),
                        template : $translate.instant(response.mensagem + " - " + nomeSetor),
                        buttons: [{
                            text: '<b>OK</b>',
                            type: 'button-dark',
                        }]
                    });
                break;
                case constant.STATUS_COMANDO_DESCONECTADO:
                    $ionicPopup.alert({
                        template : $translate.instant("falha_comando_painel_desconectado"),
                        buttons: [{
                            text: '<b>OK</b>',
                            type: 'button-dark',
                        }]
                    });
                break;
                case codigoErro.TIMEOUT_COMANDO:
                    popupDeMensagem("timeoutComando"); 
                break;
                case codigoErro.ERRO_GENERICO:
                    popupDeMensagem("erro_menssage");
                break;
                case codigoErro.ARME_STAY_RECUSADO_ZONAS_EXTERNAS_ABERTAS: //Depreciado.
                    popupDeMensagem("arme_stay_Rrecusado_zonas_externas_abertas");
                break;
                case codigoErro.FALHA_AO_INIBIR_ZONAS_NAO_INIBIDO: //ver se retorna qual zona não é inibida n existe mais.
                    popupDeMensagem("falha_inibir_zona_nao_inibido");
                break;
                case codigoErro.TODOS_SETORES_INIBIDOS: //Depreciado.
                    popupDeMensagem("falha_de_arme_todas_as_zonas_inibidas");
                break;
                case codigoErro.ALGUMA_PARTICAO_ARMADA:
                    popupDeMensagem("falha_inibir_zona_particao_armada");
                break;
                case codigoErro.SENHA_INCORRETA:
                    popupDeMensagem("senha_incorreta");
                break;
                case codigoErro.COMANDO_INVALIDO:
                    popupDeMensagem('comando_invalido');
                break;
                case codigoErro.CENTRAL_NAO_PARTICIONADA:
                    popupDeMensagem("central_nao_particionada");
                break;
                case codigoErro.ZONAS_ABERTAS:
                    popupDeMensagem("zonas_abertas");
                break;
                case codigoErro.COMANDO_DESCONTINUADO:
                    popupDeMensagem("comando_descontinuado");
                break;
                case codigoErro.FALHA_AO_DESINIBIR_ZONAS_NAO_DESINIBIDO:// não existe mais. 
                    popupDeMensagem("falha_desinibir_zona_nao_desinibido");
                break;
                case codigoErro.FALHA_ARMAR_COM_TEMPO_DE_SAIDA:
                    popupDeMensagem("falha_arme_tempo_saida");
                break;
                case codigoErro.PORTAO_JA_ABERTO:
                    popupDeMensagem("fala_portao_ja_aberto");
                break;
                case codigoErro.PORTAO_JA_FECHADO:
                    popupDeMensagem("falha_portao_ja_fechado");
                break;
                case codigoErro.SPIRIT_NAO_RESPONDE:
                    popupDeMensagem("spirit_nao_responde");
                break;
                case codigoErro.SPIRIT_SENSOR_NAO_ENCONTRADA:
                    popupDeMensagem("spirit_sensor_nao_encontrada");
                break;
                case codigoErro.SPIRIT_SENSOR_NAO_RESPONDE:
                    popupDeMensagem("spirit_sensor_nao_responde");
                break;
                case codigoErro.SPIRIT_NAO_MONITORADA:
                    popupDeMensagem("spirit_nao_monitorada");
                break;
                case codigoErro.SPIRIT_NAO_EXISTE:
                    popupDeMensagem("spirit_nao_existe");
                break;
                case codigoErro.PGM_DESABILITADA:
                    popupDeMensagem("pgm_desabilitada");
                break;
                case codigoErro.ARME_RECUSADO_TAMPER:
                    popupDeMensagem("falha_arme_tamper");
                break;
                case codigoErro.ARME_INIBINDO_SETORES_RECUSADO_TAMPER:
                    popupDeMensagem("falha_arme_inibindo_tamper");
                break;
                case codigoErro.ARME_STAY_RECUSADO_TAMPER:
                    popupDeMensagem("falha_arme_stay_tamper");
                break;
                case codigoErro.ARME_STAY_INIBINDO_SETORES_RECUSADO_TAMPER:
                    popupDeMensagem("falha_arme_stay_inibindo_tamper");
                break;
                case codigoErro.ARME_RECUSADO_SENSOR_OFFLINE:
                    popupDeMensagem("falha_sensor_offline");
                break;
                case codigoErro.ARME_INIBINDO_SETORES_RECUSADO_SENSOR_OFFLINE:
                    popupDeMensagem("falha_inibindo_setores_sotor_offline");
                break;
                case codigoErro.ARME_STAY_RECUSADO_SENSOR_OFFLINE:
                    popupDeMensagem("falha_stay_sensor_offline");
                break;
                case codigoErro.ARME_STAY_INIBINDO_SETORES_RECUSADO_SENSOR_OFFLINE:
                    popupDeMensagem("falha_arme_stay_inibindo_offline");
                break;
            };
        }
        return deffered.promise;
    };
});