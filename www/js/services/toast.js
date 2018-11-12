angular.module('motohelper')
.service("toast", function ( $cordovaToast ) {

    var _top = function (message) {
        if(ionic.Platform.isWebView()){
            $cordovaToast.showLongTop(message).then(function(success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }
    };

    var _center = function (message) {
        if(ionic.Platform.isWebView()){
            $cordovaToast.showLongCenter(message).then(function(success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }
    };

    var _bottom = function (message) {
        if(ionic.Platform.isWebView()){
            $cordovaToast.showLongBottom(message).then(function(success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }
    };

    return {
        bottom: _bottom,
        top: _top,
        center: _center
    };
});
