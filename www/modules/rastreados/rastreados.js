angular.module('motohelper')
.controller('rastreadosCtrl', function($scope, rastreadosStorage, $sce, $timeout, rastreadosService){

    $scope.rastreados = [];
    $scope.idVeiculoAtual = 0;
    $scope.mostrarIformacoes = false;
    $scope.veiculoAtual = {};

    $scope.carregarInformacoesVeiculo = function (idVeiculo) {
        $scope.idVeiculoAtual = idVeiculo;
        $scope.mostrarIformacoes = true;
        $scope.buscarLocalizacaoPorIntervaloDeHoras(0);
    }

    $scope.buscarLocalizacaoPorIntervaloDeHoras = function (horas) {
        $scope.veiculoAtual = {};
        rastreadosStorage.buscarPosicoesDeVeiculo(horas, $scope.idVeiculoAtual).then(function (data) {
            $scope.veiculoAtual = data[0];
            buscarEnderecoPorPosicao(data[0]);
            $timeout(function () {
                rastreadosService.setMarkers(data, true);
            }, 0);
        });
    };

    $scope.buscarUltimaPosicaoDeVeiculos = function () {

        rastreadosService.initMapa();
        $scope.mostrarIformacoes = false;
        rastreadosStorage.buscarPosicoesVeiculoPorSistema().then(function (data) {
            $timeout(function () {
                rastreadosService.setMarkers(data, false);
            }, 0);
            rastreadosStorage.buscarEnderecoDoSistema().then(function (data) {
                $timeout(function () {
                    rastreadosService.setMarkerHouse(data, false);
                }, 0);

            });
        });
    };

    buscarEnderecoPorPosicao = function (posicao) {
        if(posicao != null){
            rastreadosStorage.buscarEnderecoPorLatLong(posicao.latitude, posicao.longitude).then(function (argument) {
                $scope.veiculoAtual.endereco = argument;
            });
        }
    };

    pedirRastreados = function () {
        rastreadosService.destroyMap();
        rastreadosStorage.buscarRastreadosPorSistema().then(function (argument) {
            $scope.rastreados = argument;
        });
        $scope.buscarUltimaPosicaoDeVeiculos();
    };

    pedirRastreados();

});
