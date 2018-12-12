angular.module('motohelper')
.controller('AppCtrl', function($scope, corridaRequest) {

    function atualizarHistoricoDeCorridas(){
        corridaRequest.buscarHistoricoDeCorridas().getRequest().then(function (data) {
            $scope.corridas  = data.data;

            setTimeout(function () {
                $scope.$apply();
            },1);
        });
    }

    atualizarHistoricoDeCorridas();

});