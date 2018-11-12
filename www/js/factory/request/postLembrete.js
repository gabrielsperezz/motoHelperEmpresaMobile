 angular.module('motohelper')
.factory('postLembrete', function (ARequest, tokenService, serialize) {

    var _date;
    return {
        setDate: function(date){
            _date = date;
            return this;
        },
        createRequest: function () {
         var token = tokenService.getToken();
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            // parameters = serialize.toUrlParams(_date);
            return new ARequest('/api/v1/agendamento', headers, 'POST', _date);
        }
    }
});