angular.module('motohelper')
.factory('StackedPopUp',function ($ionicPopup, $q) {
    var firstDeferred = $q.defer();
    firstDeferred.resolve();
    var lastPopupPromise = firstDeferred.promise;
    // Change this var to true if you want that popups will automaticly close before opening another
    var closeAndOpen = false;
    return {
        'show': function (method, object) {
            var deferred = $q.defer();
            var closeMethod = null;
            deferred.promise.isOpen = false;
            deferred.promise.close = function () {
                if (deferred.promise.isOpen && angular.isFunction(closeMethod)) {
                    closeMethod();
                }
            };

            if (closeAndOpen && lastPopupPromise.isOpen) {
                lastPopupPromise.close();
            }

            lastPopupPromise.then(function () {
                deferred.promise.isOpen = true;
                var popupInstance = $ionicPopup[method](object);

                closeMethod = popupInstance.close;
                popupInstance.then(function (res) {
                    deferred.promise.isOpen = false;
                    deferred.resolve(res);
                });
            });
            lastPopupPromise = deferred.promise;
            return deferred.promise;
        }
    };
});
