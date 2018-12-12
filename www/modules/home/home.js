angular.module('motohelper')
.controller('homeCtrl', function($scope, homeService, loading, $ionicLoading, $ionicModal,$localStorage, corridaRequest, constant, homeStorage) {

    var client = null;

    function initiVariaveis() {
        $scope.corridas = [];
        $scope.corridaAtual =  null;
        $scope.rotas = null;
    }

    conectaComMQTT(null);

    initiVariaveis();

    function atualizaTemplate(){
        homeService.initMapa($localStorage.getObject('user_motoboy').posicao);
        homeService.setMarkerHouse($localStorage.getObject('user_motoboy').posicao);
    }

    $scope.$on('atualizarTela', function() {
        atualizaTemplate();
    });

    $ionicModal.fromTemplateUrl('modules/home/modalListaServicos.html', {
        scope: $scope
    }).then(function(modal) {
         $scope.modal = modal;
    });

    $scope.buscandoServicos = true;

    $scope.ficarDisponivel = function () {
        loading.show('Procurando clientes');
        setTimeout(function () {
            atualizaListaDeCorridas();
        },2000);

    };

    function atualizaListaDeCorridas() {
        corridaRequest.ficarDisponivel().getRequest().then(function (data) {
            $ionicLoading.hide();
            iniciaListaDeBuscaPorCorridas(data.data);
        });
    }

    function iniciaListaDeBuscaPorCorridas(corridas){
        $scope.corridas = corridas;
        setTimeout(function () {
           $scope.$apply();
        },0);
        $scope.modal.show();
    }


    $scope.aceitarCorrida = function(idCorrida){
        corridaRequest.aceitarCorrida(idCorrida).getRequest().then(function (data) {
            loading.show('Preparando corrida');
            $scope.corridaAtual = data.data;
            $scope.buscandoServicos = false;
            $scope.modal.hide();
            $localStorage.setObject("corrida_atual", $scope.corridaAtual);
            setCorrida();
        });
    };

    function setCorrida(){
        corridaRequest.buscarRotaCorrida($scope.corridaAtual.id_usuario).getRequest().then(function (data) {
            conectaComMQTT($scope.corridaAtual.id);
            $scope.rotas = data.data;
            setTimeout(function () {
                $scope.$apply();
            },0);
            setNovoServico($scope.rotas.rotas_clean, $scope.rotas);
            loading.hide();
        });
    }

    setNovoServico = function (posicoes, rotasInfo) {
        homeService.setCorridaEmAndamento(posicoes, rotasInfo)
    };
    
    $scope.cancelarServico = function (idOcorrencia) {

        corridaRequest.cancelarCorrida(idOcorrencia).getRequest().then(function () {
            finalizaOcorrencia();
        });
    };

    function finalizaOcorrencia() {

        $scope.buscandoServicos = true;
        $scope.corridaAtual = null;
        $localStorage.setObject("corrida_atual", null);
        initiVariaveis();
        atualizaTemplate();
    }

    if($localStorage.getObject("corrida_atual") != null){
        loading.show('Preparando corrida');
        homeService.initMapa($localStorage.getObject('user_motoboy').posicao);
        $scope.corridaAtual = $localStorage.getObject("corrida_atual");
        $scope.buscandoServicos = false;
        setCorrida();
    }else{
        atualizaTemplate();
    }

    function conectaComMQTT(idCorrida) {
        client = new Paho.MQTT.Client(constant.MQTT_URL, Number(constant.MQTT_PORTA), "", String(homeStorage.geraIdMQQT()));
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        var options = {
            timeout: 3,
            onSuccess: function () {
                if(idCorrida != null){
                    client.subscribe('corrida/'+idCorrida+'/#', {qos: 2});
                }
                client.subscribe('corridas/busca', {qos: 2});
            },
            onFailure: function (mensagem) {
                console.log('[MQTT] ~ Desconectado ~');
            },
            reconnect: true,
            useSSL: true,
            userName: constant.MQTT_USERNAME,
            password: constant.MQTT_PASSWORD
        };

        client.connect(options);

        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:"+responseObject.errorMessage);
            }
        }

        function onMessageArrived(message) {
            if (message != null) {
                console.log(message);
                if(message.topic.match('/posicoes')){
                    setCorrida();
                }
                if(message.topic.match('/finalizar')){
                    $scope.cancelarServico();
                }
                if(message.topic.match('corridas/busca')){
                    atualizaListaDeCorridas();
                }
            }
        }
    };

});
