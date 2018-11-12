angular.module('motohelper')
.service('homeStorage', function ($q, loading, getEnergia, $localStorage, getSistema, getModulos,constant, auxiliar, sistemaService, panico, getCenariosAtivo, postComandoCenario) {

	var _getSistema = function () {
        var deffered = $q.defer();
        sistemaService.checkSistemaId().then(function(){
            var sistema_id = sistemaService.getId();
            executeRequest(getSistema.setIdSistema(sistema_id)).then(function (resp) {
                var sistema = resp.data
                sistemaService.setTz(sistema.tz);
                $localStorage.setObject( constant.SISTEMA, sistema);
                deffered.resolve(sistema);
            }, function (resp) {
                deffered.reject();
                auxiliar.erro(resp.status);
            });
        });
        return deffered.promise;
    };

    var _geraIdMQQT = function () {
        return (window.device) ? window.device.uuid : "WEB-UUID" + parseInt(Math.random() * 100, 10);
    }

    var _geraConsumoEnergia = function(){
        var deffered = $q.defer();
        sistemaService.checkSistemaId().then(function(){
            var sistema_id = sistemaService.getId();
            executeRequest(getEnergia.setIdSistema(sistema_id)).then(function (resp) {
                deffered.resolve(resp.data);
            }, function (resp) {
                deffered.reject();
                auxiliar.erro(resp.status);
            });
        });
        return deffered.promise;
    }

    var _panico = function(idPainel){
        var deffered = $q.defer();
        loading.show('');
        executeRequest(panico.setIdPainel(idPainel)).then(function (resp) {
            deffered.resolve(resp.data);
            loading.hide();
        }, function (resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    }

    var _pegarCenariosAtivos = function (sistema_id) {
        var deffered = $q.defer();
        executeRequest(getCenariosAtivo.setIdSistema(sistema_id)).then(function (resp) {
            deffered.resolve(resp.data);
        }, function (resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    };

    var _pegarModulos = function (sistema_id) {
        var deffered = $q.defer();
        executeRequest(getModulos.setIdSistema(sistema_id)).then(function (resp) {
            $localStorage.setObject( 'modulos', resp.data);
            deffered.resolve(resp.data);
        }, function (error) {
            auxiliar.erro(error.status);
            deffered.reject();
        });
        return deffered.promise;
    }

    var _acionarComando = function (idCenario) {
        var deffered = $q.defer();
        executeRequest(postComandoCenario.setIdCenario(idCenario)).then(function (resp) {
            deffered.resolve(resp.data);
        }, function (resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    };

	return {
		getSistema: _getSistema,
        geraIdMQQT: _geraIdMQQT,
        geraConsumoEnergia: _geraConsumoEnergia,
        panico: _panico,
        pegarCenariosAtivos: _pegarCenariosAtivos,
        acionarComando: _acionarComando,
        pegarModulos: _pegarModulos
	};
});
