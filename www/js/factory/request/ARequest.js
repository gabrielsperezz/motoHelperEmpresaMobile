angular.module('motohelper')
.factory('ARequest', function (constant, $http) {
  
	var Request = Class.create({
		initialize: function (url, headers, method, parameters, timeoutRequest) {
			this.url = constant.BASE_URL + url;			
			this.headers = headers;
			this.method = method;
			this.parameters = parameters;
			this.timeoutRequest = timeoutRequest ? timeoutRequest : constant.TIME_TIMEOUT_REQUEST;
		},
        getRequest: function () {
            if(this.method.toUpperCase() == 'GET'){
                return $http({method: this.method, headers : this.headers, url: this.url, params: this.parameters, paramSerializer: '$httpParamSerializerJQLike', timeout: this.timeoutRequest});
            }else{
                return $http({method: this.method, headers : this.headers, url: this.url, data: this.parameters, timeout: this.timeoutRequest});
            };
        },
	});
	return Request;
});