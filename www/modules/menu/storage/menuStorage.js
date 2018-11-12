angular.module('motohelper')
.service('menuStorage', function ($q, auxiliar, sistemaService, executeRequest, getModulos, historicoModel, $translate, getEventosRequest, $localStorage) {

    var _pedirHistorico = function (filtros) {
        currentLanguage = $translate.use();
        var deffered = $q.defer();
        var sistema_id = sistemaService.getId();

        executeRequest(getEventosRequest.setIdSistema(sistema_id).setFilter(historicoModel.prepareFilters(filtros))).then(function(resp){
            deffered.resolve(resp.data);
        }, function (error) {
            if(error.status == 400){
                deffered.reject(error);
            } else {
                deffered.reject();
                auxiliar.erro(error.status);
            }
        });
        return deffered.promise;
    };

    var _pegarModulos = function () {
        var deffered = $q.defer();
        sistemaService.checkSistemaId().then(function(){
            var sistema_id = sistemaService.getId();
            executeRequest(getModulos.setIdSistema(sistema_id)).then(function(resp){
                deffered.resolve(resp.data);
                $localStorage.setObject( 'modulos', resp.data);
            }, function (error) {
                auxiliar.erro(error.status);
            });
        });
        return deffered.promise;
    };

    return {
        pedirHistorico: _pedirHistorico,
        pegarModulos: _pegarModulos
    };
});
