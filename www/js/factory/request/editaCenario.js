angular.module('motohelper')
.factory('editaCenario', function (ARequest, tokenService, serialize) {

    var _date;
    return {
        setDate: function(date){
            _date = date;
            return this;
        },
        createRequest: function () {
         var token = tokenService.getToken();
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            }
            parameters = serialize.toUrlParams(_date);
            return new ARequest('/api/v1/sistema/cenario/' + _date.id, headers, 'PUT', parameters);
        }
    }
});