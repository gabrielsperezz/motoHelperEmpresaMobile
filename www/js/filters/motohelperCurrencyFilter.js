angular.module('motohelper')
.filter('motohelperCurrencyFilter', function ($filter,$localStorage, constant) {
 
   	return function (amount){
        var lingaguem = $localStorage.get(constant.LINGUAGEM_DO_APP);
        var moeda = "$";
        if(amount != null){
            if(lingaguem === "pt-BR"){
                moeda = "R$";
                var string = $filter('currency')(amount,moeda, 2);
                for(var i = 0; i < string.length; i++){
                    if(string.charAt(i) === ','){
                        string = string.substring(0,i) + "." + string.substring(i+1);
                    }else if(string.charAt(i) === '.'){
                        string = string.substring(0,i) + "," + string.substr(i+1);
                    }
                }
                return string;
            }else{
                moeda = "$";
                return $filter('currency')(amount,moeda, 2);
            }
        }else{
            return amount;
        }
    };
})