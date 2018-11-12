angular.module('motohelper')

.factory('$localStorage', ['$window', function($window) {
    return{
        set: function(key, value,callback) {
            localStorage.setItem(key,value);
        },
        get: function(key,callback) {
            return localStorage.getItem(key);
        },
        setObject: function(key, value, callback) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function(key,callback) {
            return JSON.parse(localStorage.getItem(key));
        },
        clear: function(){
            $window.localStorage.clear();
        },
        removeItem: function(constante){
            localStorage.removeItem(constante);
        }
    };
}]);