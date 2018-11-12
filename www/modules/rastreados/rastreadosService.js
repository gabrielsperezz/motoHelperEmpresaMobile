angular.module("motohelper").service('rastreadosService', function (constant, $filter,$document) {

    var mapa = null;
    var markersGroup;
    var configRotas =
    {
        "delay": 800,
        "dashArray": [1, 87],
        "weight": 8,
        "color": "#0000FF",
        "pulseColor": "#FFFFFF",
        "paused": false,
        "reverse": false
    };

    _initialize = function () {

        if(mapa == null){
            mapa = L.map(document.getElementById('leaflet-map'));
        }

        L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/dist/images';

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Fulltrack Mapa</a>'
        }).addTo(mapa);

        _clearLears();

        markersGroup = L.layerGroup().addTo(mapa);

        mapa.setView([-22.215403, -49.654070], 3);
    };

    _destroyMap = function () {
        mapa = null;
    };

    _setMarkersFulltrack = function (localizacoes, deveCriarRotas) {
        _clearLears();
        var rotas = [];

        angular.forEach(localizacoes, function (localizacao) {
            if (localizacao != null) {

                var cor = _buscarCorPorEstadoDoVeiculo(localizacao);
                var marker = _criarMaker(localizacao, cor);

                var icon = angular.element(marker._icon);
                icon.append(_createMarkerLabel(localizacao, cor, deveCriarRotas, localizacoes.length));

                mapa.setView([localizacao.latitude, localizacao.longitude], 6);
                rotas.push([Number(localizacao.latitude), Number(localizacao.longitude)]);
            }
        });

        if (deveCriarRotas) {
            _criarRotas(rotas);
        }
    };

    _criarRotas = function(rotas){
        var path = L.polyline.antPath(rotas,configRotas);
        markersGroup.addLayer(path);
        mapa.fitBounds(path.getBounds());
    };

    _criarMaker = function (localizacao, cor) {
        return L.marker([localizacao.latitude, localizacao.longitude], {
            icon: L.AwesomeMarkers.icon({
                icon: 'car',
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
        if(localizacaoCasa.length != []){
            L.marker([localizacaoCasa.latitude, localizacaoCasa.longitude], {
                icon: L.AwesomeMarkers.icon({
                    icon: 'home',
                    markerColor: 'blue',
                    prefix: 'fa'
                })
            }).addTo(markersGroup);
        }
    };

    _createMarkerLabel = function (veiculo, cor, deveCriarRotas, qtnPosicoes) {
        var label = "";

        if (qtnPosicoes == 1 || !deveCriarRotas) {
            label = '<div class="marker_div marker_div_' + cor + '"><span> ' + veiculo.descricao + '</span></div>';
        }

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
        setMarkerHouse: _setMarkerHouse
    };

});