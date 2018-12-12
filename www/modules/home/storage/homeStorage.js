angular.module('motohelper')
.service('homeStorage', function () {


    var _geraIdMQQT = function () {
        return (window.device) ? window.device.uuid : "WEB-UUID" + parseInt(Math.random() * 100, 10);
    }

	return {
        geraIdMQQT: _geraIdMQQT
	};
});
