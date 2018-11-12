angular.module('motohelper')

.service('nomeaSetores', function (constant, $translate, $filter) {
	
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

    this.padLeft = function(string,padNum, stringPad){
        return $filter('padleft')(string, padNum, stringPad);
    }
});