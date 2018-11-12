angular.module('motohelper')

.service('comparaObj', function (constant, $translate, $filter) {
	this.comparador = function (response, painelVirtual) {
        var setoresAbertos = response.mensagem.split(',');
        var template = "";
        for(id in  painelVirtual.setores){
            setorPainel = painelVirtual.setores[id];
            
            for(idx in setoresAbertos){
                var setorAberto = setoresAbertos[idx];
                if(setorPainel.numero == setorAberto){
                    template += "<p>"  + $filter('padleft')(setorPainel.numero,3) + " - " + setorPainel.descricao + "</p>";
                }
            }
        }
        return template;
    };
    this.typoCommand = function (command) {
        var template = $translate.instant("erro_menssage");
        if(command.tipo == constant.COMANDO_DESARMAR){
            template = $translate.instant("erro_desarme");
        }
        if(command.tipo == constant.COMANDO_ARMAR_SEM_CHECAGEM || command.tipo == constant.COMANDO_ARMAR){
            template = $translate.instant("erro_menssage_armar");
        }
        if(command.tipo == constant.COMANDO_ARMAR_STAY_SEM_CHECAGEM || command.tipo == constant.COMANDO_ARMAR_STAY){
            template = $translate.instant("erro_menssage_armar_stay");
        }
        if(command.tipo == constant.COMANDO_ACIONAR_PGM){
            template = $translate.instant("erro_menssage_acionar_PGM");
        }
        if(command.tipo == constant.COMANDO_DESASCIONAR_PGM){
            template = $translate.instant("erro_menssage_desascionar_PGM");
        }
        if(command.tipo == constant.COMANDO_INIBIR_ZONAS){
            template = $translate.instant("erro_menssage_inibir_setor");
        }
        if(command.tipo == constant.COMANDO_DESINIBIR_ZONAS){
            template = $translate.instant("erro_menssage_desinibir_setor");
        }
        return template;
    };

    this.padLeft = function(string,padNum, stringPad){
         return $filter('padleft')(string, padNum, stringPad);
    }
});