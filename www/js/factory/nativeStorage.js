angular.module('motohelper')

.factory('$nativeStorage', function($window) {
    return{
        set: function(key, value) {
            NativeStorage.setItem(key, value);
        },
        get: function(key) {
            console.log('key', key);
            return NativeStorage.getItem(key);
        },
        setObject: function(key, value) {
            NativeStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function(key) {
            return JSON.parse(NativeStorage.getItem(key));
        },
        clear: function(){
            NativeStorage.clear();
        },
        removeItem: function(key){
            NativeStorage.remove(key);
        }
    };
});