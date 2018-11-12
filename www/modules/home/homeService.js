angular.module("motohelper").service('homeService', function () {

    var mapa = null;
    var markersGroup;
    var configRotas =
    {
        "delay": 800,
        "dashArray": [1, 87],
        "weight": 8,
        "color": "#0000FF",
        "pulseColor": "#FFFFFF",
        "paused": true,
        "reverse": false
    };

    _initialize = function (localizacao) {

        if(mapa == null){
            mapa = L.map(document.getElementById('leaflet-map'));
        }

        L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapa);

        _clearLears();

        markersGroup = L.layerGroup().addTo(mapa);

        mapa.setView([localizacao.latitude, localizacao.longitude], 13);
    };

    _destroyMap = function () {
        mapa = null;
    };

    _setMarkersFulltrack = function (localizacoes) {
        _clearLears();
        var rotas = [];

        angular.forEach(localizacoes, function (localizacao) {
            if (localizacao != null) {

                var marker = _criarMaker(localizacao, localizacao.cor);

                var icon = angular.element(marker._icon);
                icon.append(_createMarkerLabel(localizacao, localizacao.cor));

                rotas.push([Number(localizacao.latitude), Number(localizacao.longitude)]);
            }
        });
    };


    _setCorridaEmAndamento = function(servico){
        _clearLears();

        var rotas = [];

        var marker = _criarMaker(servico.motoboy, servico.motoboy.cor);

        var icon = angular.element(marker._icon);
        icon.append(_createMarkerLabel(servico.motoboy, servico.motoboy.cor));

        rotas.push([Number(servico.motoboy.latitude), Number(servico.motoboy.longitude)]);
        rotas.push([Number(servico.possicaoCliente.latitude), Number(servico.possicaoCliente.longitude)]);

        _setMarkerHouse(servico.possicaoCliente);
        _criarRotas(rotas);

    }

    _criarRotas = function(rotas){
        var path = L.polyline.antPath(rotas,configRotas);
        markersGroup.addLayer(path);
        mapa.fitBounds(path.getBounds());
    };

    _criarMaker = function (localizacao, cor) {
        return L.marker([localizacao.latitude, localizacao.longitude], {
            icon: L.AwesomeMarkers.icon({
                icon: ' fa-motorcycle',
                markerColor: cor,
                prefix: 'fa'
            })
        })
        .addTo(markersGroup);
    };

    _clearLears = function () {
        if(markersGroup != null){
            markersGroup.clearLayers();
        }
    };

    _buscarCorPorEstadoDoVeiculo = function (veiculo) {
        var cor = "";
        switch (veiculo.estado_veiculo) {
            case 1:
                cor = "red";
                break;
            case 2:
                cor = "green";
                break;
            case 3:
                cor = "blue";
                break;
        }
        return cor;
    };

    _setMarkerHouse = function (localizacaoCasa) {
            L.marker([localizacaoCasa.latitude, localizacaoCasa.longitude], {
                icon: L.AwesomeMarkers.icon({
                    icon: 'user',
                    markerColor: 'black',
                    prefix: 'fa'
                })
            }).addTo(markersGroup);
    };

    _createMarkerLabel = function (posicao, cor) {

        label = '<div class="marker_div marker_div_' + cor + '"><span> ' + posicao.placa + '</span></div>';

        return label;
    };

    _createPopupPorVeiculo = function (veiculo, cor) {
        return '<ul class="list">\n' +
            '  <div class="item item-divider">\n' +
            '    Candy Bars\n' +
            '  </div>\n' +
            '    <li class="item">\n' +
            '          <span><i class="fa fa-globe"></i> Latitude: <strong>\' + veiculo.latitude + \'</strong></span>\n' +
            '    </li>\n' +
            '</ul>';
    }

    return {
        initMapa: _initialize,
        setMarkers: _setMarkersFulltrack,
        destroyMap : _destroyMap,
        setMarkerHouse: _setMarkerHouse,
        setCorridaEmAndamento : _setCorridaEmAndamento
    };

});