angular.module('motohelper')

.service('logoff', function ($state, $localStorage, constant) {
	this.clearLocalStorage = function () {
		$localStorage.clear();
		if(ionic.Platform.isWebView()){
			NativeStorage.clear();
			var options = {
				key: constant.TOKEN,
				value: 'nil',
				suite: constant.GROUPS
			};
			window.AppGroupsUserDefaults.save(options, function() {});
		}
		$state.go("login");
	};
});