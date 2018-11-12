angular.module('motohelper')
.service("checarLogin", function ( $localStorage, $q, constant ) {

    var _recuperarDados = function () {
        var deffered = $q.defer();
        if (ionic.Platform.isWebView()) {
            if (ionic.Platform.isAndroid()) {
                NativeStorage.getItem(constant.TOKEN, function (argument) {
                    $localStorage.set(constant.TOKEN, argument);
                });
            }
            if (ionic.Platform.isIOS()) {
                var options = {
                    key: constant.TOKEN,
                    suite: constant.GROUPS
                };
                window.AppGroupsUserDefaults.load(options, function(result) {
                    $localStorage.set(constant.TOKEN, result);
                });
            }
        } else {
            deffered.resolve();
        }
        return deffered.promise;
    }

    var _logado = function () {
        var deffered = $q.defer();
        if($localStorage.get(constant.AUTHENTICATED)){

            deffered.resolve();
        }else{
            if (ionic.Platform.isWebView()) {
                NativeStorage.getItem(constant.AUTHENTICATED, function () {
                    NativeStorage.getItem(constant.TOKEN, function (argument) {
                        $localStorage.set(constant.TOKEN, argument);

                        NativeStorage.getItem(constant.USER, function (argument) {
                            $localStorage.setObject( constant.USER, argument);
                            deffered.resolve();
                        });
                    });
                }, function () {
                    deffered.reject();                        
                })
            } else {
                deffered.reject();
            }
        }
        return deffered.promise;
    };

    return {
        logado: _logado,
        recuperarDados: _recuperarDados
    };
});