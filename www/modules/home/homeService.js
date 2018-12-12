angular.module("motohelper").service('homeService', function () {

    var mapa = null;
    var markersGroup;
    var configRotas =
    {
        "delay": 800,
        "dashArray": [1, 32],
        "weight": 8,
        "color": "#0000FF",
        "pulseColor": "#FFFFFF",
        "paused": false,
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

    _setCorridaEmAndamento = function(posicoes, rotasInfo ){
        _clearLears();
        _criarRotas(posicoes);

        var marker = _criarMaker(rotasInfo.final.posicao, "black");
        var icon = angular.element(marker._icon);
        icon.append(_createMarkerLabel(rotasInfo.final, "black"));

        _setMarkerHouse(rotasInfo.inicial.posicao);

    }

    _criarRotas = function(rotas){
        var path = L.polyline.antPath(rotas,configRotas);
        markersGroup.addLayer(path);
        mapa.fitBounds(path.getBounds());
    };

    _criarMaker = function (localizacao, cor) {
        return L.marker([localizacao.latitude, localizacao.longitude], {
            icon: L.AwesomeMarkers.icon({
                icon: 'fa-user',
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

    _setMarkerHouse = function (localizacaoCasa) {
            L.marker([localizacaoCasa.latitude, localizacaoCasa.longitude], {
                icon: L.AwesomeMarkers.icon({
                    icon: 'fa-motorcycle',
                    markerColor: 'black',
                    prefix: 'fa'
                })
            }).addTo(markersGroup);
    };

    _createMarkerLabel = function (posicao, cor) {

        label = '<div class="marker_div marker_div_' + cor + '"><span> ' + posicao.nome + '</span></div>';

        return label;
    };

    return {
        initMapa: _initialize,
        setMarkerHouse: _setMarkerHouse,
        setCorridaEmAndamento : _setCorridaEmAndamento
    };

});