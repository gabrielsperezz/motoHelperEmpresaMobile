angular.module('motohelper')
.service('serialize', function () {
    this.toUrlParams = function(obj, prefix) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
                str.push(typeof v == "object" ?
                    this.toUrlParams(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v)
                );
            }
        }
        return str.join("&");
    } 
});