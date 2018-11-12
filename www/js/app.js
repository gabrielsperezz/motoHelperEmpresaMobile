angular.module('motohelper', ['ionic', 'ngCordova', 'pascalprecht.translate', 'ion-gallery','rzModule', "ngSanitize", "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.hls", "com.2fdevs.videogular.plugins.buffering", "com.2fdevs.videogular.plugins.controls", "ion-datetime-picker", "com.2fdevs.videogular.plugins.poster"])
.run(function($ionicPlatform, constant, $localStorage, $state, $cordovaGlobalization, $translate, $window, checarLogin) {

    $ionicPlatform.ready(function() {
        if($window.MobileAccessibility){
            $window.MobileAccessibility.usePreferredTextZoom(false);
        }

        if (window.cordova) {
            if (window.cordova.plugins) {
                if (window.cordova.plugins.Keyboard) {
                    if (cordova.plugins.Keyboard.hideKeyboardAccessoryBar) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(false);
                    }
                }
            }
        }

        if (window.StatusBar) {
            if (ionic.Platform.isAndroid()) {
                StatusBar.styleLightContent();
            } else {
                StatusBar.styleDefault();
            }
        }

        checarLogin.logado().then(function () {
            checarLogin.recuperarDados().then(function () {
                $state.go("app.home");
            });
        }, function () {
            $state.go('login');
        })

    });
})

.config(function($stateProvider) {

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'modules/menu/menu.html',
            controller: 'AppCtrl'
        })

        .state('login', {
            cache: false,
            url: '/login',
            params: {pais: null, telefone: null},
            templateUrl: 'modules/login/login.html',
            controller: "loginCtrl"
        })

        .state('app.home', {
            cache: false,
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/home.html',
                    controller: 'homeCtrl'
                }
            }
        })

        .state('app.rastreados', {
            url: '/rastreados',
            views: {
                'menuContent':{
                    templateUrl: 'modules/rastreados/rastreados.html',
                    controller: "rastreadosCtrl"
                }
            }
        })
});
