angular.module('motohelper')
.controller('AppCtrl', function($scope) {
    $scope.corridas = [
        {data : '01/10/2017 - 09:33-AM', mensagem: "Corrida finalizada"},
        {data : '01/10/2017 - 09:13-AM', mensagem: "Corrida inciada"},
        {data : '29/09/2018 - 03:13-PM', mensagem: "Corrida finalizada"},
        {data : '29/09/2018 - 02:55-PM', mensagem: "Corrida inciada"},
    ]

});