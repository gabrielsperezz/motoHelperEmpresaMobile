angular.module('motohelper')
.directive('alertaCard', function () {
	return {
		templateUrl: "js/directives/alertaCard/alerta.html",
		restrict: "E",
		scope: {
			mensagem: "@",
			mostrar: "="
		}
	};
});
