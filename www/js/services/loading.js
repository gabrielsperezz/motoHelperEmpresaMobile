angular.module('motohelper')

.service("loading", function ( $ionicLoading, $translate ) {

    return{
    	show : function (textLoading) {
    		var txt = $translate.instant(textLoading)
    	  	if(txt){
    	  		txt = "<p> "+ txt + "...</p>";
    	  	}
            $ionicLoading.show({
                template: txt + "<ion-spinner icon='ios'></ion-spinner>",
                hideOnStateChange: true,
                delay: 100
            });
        },

        hide : function () {
            $ionicLoading.hide();
        }
    };
});