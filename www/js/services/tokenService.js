angular.module('motohelper')
.service('tokenService', function ($localStorage,  constant, $q) {

	var token = null;
	var firstDeferred = $q.defer();
    firstDeferred.resolve();
    var refreshTokenDeferred = firstDeferred;
	this.getToken = function () {
		if(token == null){
			token = $localStorage.get(constant.TOKEN);
		}
		return token;
	};

    this.resetPromise = function (){
    	firstDeferred = $q.defer();
        firstDeferred.resolve();
    	refreshTokenDeferred = firstDeferred;
    }

    this.setToken = function (accessToken) {

        $localStorage.set(constant.TOKEN, accessToken);

        if (ionic.Platform.isWebView()) {
            NativeStorage.setItem(constant.TOKEN, accessToken, function () {});
            if (ionic.Platform.isIOS()) {
                var options = {
                    key: constant.TOKEN,
                    value: accessToken,
                    suite: constant.GROUPS
                };
                window.AppGroupsUserDefaults.save(options, function() {});
            }
        }
    };

});
