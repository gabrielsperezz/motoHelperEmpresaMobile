angular.module('motohelper')
.factory('authInterceptor', function($location, $q, $window, $localStorage, constant) {

	return {
		request: function(config) {
			if ( config.url.indexOf(constant.BASE_URL) == 0 ) {
				config.headers = config.headers || {};
				config.headers.TokenID = $localStorage.get(constant.TOKEN);
			}
			return config;
		}
	};
})

.config(function($httpProvider) {
  	$httpProvider.interceptors.push('authInterceptor');
});
