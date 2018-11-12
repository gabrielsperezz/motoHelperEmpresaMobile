angular.module('motohelper')

.service('loginService', function ($localStorage, $q) {
	
	_getLoginPattern = function() {
		return $localStorage.get('login_pattern');
    };
    _setLoginPattern = function(pattern) {
        $localStorage.set('login_pattern', pattern);
    };
    _checkLoginPattern = function(pattern) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.success = function(fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function(fn) {
            promise.then(null, fn);
            return promise;
        }

        if (pattern == this.getLoginPattern()) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

        return promise;
    };
    _checkLoginPatternCadastro = function(pattern, patternConfirma) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.success = function(fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function(fn) {
            promise.then(null, fn);
            return promise;
        }

        if (pattern == patternConfirma) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

        return promise;
    };
    return{
		getLoginPattern: _getLoginPattern,
		setLoginPattern: _setLoginPattern,
		checkLoginPattern: _checkLoginPattern,
        checkLoginPatternCadastro: _checkLoginPatternCadastro
	};
});