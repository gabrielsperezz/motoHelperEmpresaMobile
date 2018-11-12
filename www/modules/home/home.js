angular.module('motohelper')
.controller('homeCtrl', function($scope, homeService, loading, $ionicLoading, $ionicModal) {

    function atualizaTemplate(){
        console.log('atualizado');
    }

    $scope.$on('atualizarTela', function() {
        atualizaTemplate();
    });

    $ionicModal.fromTemplateUrl('modules/home/modalFinalizarServico.html', {
        scope: $scope
    }).then(function(modal) {
         $scope.modal = modal;
    });

    $scope.buscandoServicos = true;

    homeService.initMapa({latitude : '-22.207151', longitude : '-49.681706'});

    var localizacoesFake = [
        {
            latitude : '-22.220743', longitude : '-49.660133', placa : "KDJ-1311", modelo : 'HONDA - CBTWISTER 250F', cor : 'gray'
        },
        {
            latitude : '-22.211135', longitude : '-49.678805', placa : "JDM-1091", modelo : 'YAMAHA - MT03', cor : 'blue'
        },
        {
            latitude : '-22.2061    40', longitude : '-49.665539', placa : "VMR-4141", modelo : 'YAMAHA - XJ6', cor : 'darkgreen'
        },
        {
            latitude : '-22.214420', longitude : '-49.660226', placa : "KMA-1491", modelo : 'HONDA - HORNET 650F', cor : 'green'
        },
        {
            latitude : '-22.207767', longitude : '-49.658558', placa : "MNO-1944", modelo : 'HONDA - CG150', cor : 'red'
        }
    ]
    homeService.setMarkers(localizacoesFake)
    homeService.setMarkerHouse({latitude : '-22.207151', longitude : '-49.681706'})

    atualizaTemplate();

    $scope.solicitarServico = function () {
        loading.show('Buscando motoboys');
        $scope.buscandoServicos = false;
        setTimeout(function () {
            $ionicLoading.hide();
            var objServico = {
                possicaoCliente : {latitude : '-22.207151', longitude : '-49.681706'},
                motoboy: {
                    nome : "Paulo", latitude : '-22.220743', longitude : '-49.660133', placa : "KDJ-1311", modelo : 'HONDA - CBTWISTER 250F', cor : 'gray', ultimaPosicao: "Garça, São Paulo, Rua Carlos Ferrari Nº941"
                }
            }

            $scope.motoboy = objServico.motoboy;

            setNovoServico(objServico)
        }, 1000);
    }

    setNovoServico = function (posicoes) {
        homeService.setCorridaEmAndamento(posicoes)
    }
    
    $scope.finalizarServico = function (servico) {
        $scope.modal.show();
    };

});
