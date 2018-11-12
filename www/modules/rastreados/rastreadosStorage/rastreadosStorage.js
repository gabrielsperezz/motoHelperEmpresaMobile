angular.module('motohelper')
.service('rastreadosStorage', function($q, loading, auxiliar, sistemaService, getPosicaoVeiculo, getPosicaoVeiculoPorSistema, getVeiculosPorSistema, getEnderecoPorLatLong, getEnderecoPorSistema){

	var _buscarPosicoesDeVeiculo = function (horas, idVeiculo) {
		var deffered = $q.defer();
        executeRequest(getPosicaoVeiculo.setIdVeiculo(idVeiculo).setHoras(horas)).then(function (resp) {
            var rastreados = resp.data;
            loading.hide();
            deffered.resolve(rastreados);
        }, function(resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
	}

    var _buscarPosicoesVeiculoPorSistema = function () {
        var deffered = $q.defer();
        executeRequest(getPosicaoVeiculoPorSistema.setIdSistema(sistemaService.getId())).then(function (resp) {
            var rastreados = resp.data;
            loading.hide();
            deffered.resolve(rastreados);
        }, function(resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    }

    var _buscarRastreadosPorSistema = function () {
        var deffered = $q.defer();
        executeRequest(getVeiculosPorSistema.setIdSistema(sistemaService.getId())).then(function (resp) {
            var rastreados = resp.data;
            loading.hide();
            deffered.resolve(rastreados);
        }, function(resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    }

    var _buscarEnderecoPorLatLong = function (lat, long) {
        var deffered = $q.defer();
        executeRequest(getEnderecoPorLatLong.setLatitude(lat).setLongitude(long)).then(function (resp) {
            var rastreados = resp.data;
            loading.hide();
            deffered.resolve(rastreados);
        }, function(resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    }

    var _buscarEnderecoDoSistema = function () {
        var deffered = $q.defer();
        executeRequest(getEnderecoPorSistema.setIdSistema(sistemaService.getId())).then(function (resp) {
            var rastreados = resp.data;
            loading.hide();
            deffered.resolve(rastreados);
        }, function(resp) {
            deffered.reject();
            auxiliar.erro(resp.status);
        });
        return deffered.promise;
    }


    return {
        buscarPosicoesVeiculoPorSistema: _buscarPosicoesVeiculoPorSistema,
        buscarPosicoesDeVeiculo : _buscarPosicoesDeVeiculo,
        buscarRastreadosPorSistema : _buscarRastreadosPorSistema,
        buscarEnderecoDoSistema: _buscarEnderecoDoSistema,
        buscarEnderecoPorLatLong : _buscarEnderecoPorLatLong
    }; 
});