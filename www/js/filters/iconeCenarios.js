angular.module('motohelper')
.filter('iconeCenarios', function () {
 
   	return function (icone){
        switch (icone) {
            case 'ic_unlock':
                return 'ion-unlocked'
                break;
            case 'ic_lock':
                return 'ion-locked'
                break;
            case 'ic_download':
                return 'ion-ios-download'
                break;
            case 'ic_upload':
                return 'ion-ios-upload'
                break;
            case 'ic_home':
                return 'ion-home'
                break;
            case 'ic_incadescent':
                return 'ion-ios-lightbulb-outline'
                break;
        	case 'ic_clock':
        		return 'ion-android-time'
        		break;
            case 'ic_bike':
                return 'ion-android-bicycle'
                break;
            case 'ic_car':
                return 'ion-model-s'
                break;
            case 'ic_train':
                return 'ion-android-train'
                break;
            case 'ic_utensils':
                return 'ion-android-restaurant'
                break;
            case 'ic_cap':
                return 'ion-university'
                break;
            case 'ic_book':
                return 'ion-ios-book'
                break;
            case 'ic_film':
                return 'ion-ios-film-outline'
                break;
            case 'ic_joystick':
                return 'ion-ios-game-controller-a'
                break;
            case 'ic_explore':
                return 'ion-android-compass'
                break;
            case 'ic_coffe':
                return 'ion-coffee'
                break;
            case 'ic_suitcase':
                return 'ion-briefcase'
                break;
            case 'ic_card':
                return 'ion-card'
                break;
            case 'ic_shopping':
                return 'ion-bag'
                break;
            case 'ic_power':
                return 'ion-power'
                break;
            case 'ic_key':
                return 'ion-key'
                break;
            case 'ic_settings':
                return 'ion-gear-a'
                break;
            case 'ic_wrench':
                return 'ion-wrench'
                break;
            case 'ic_keyboard':
                return 'ion-ios-keypad'
                break;
            case 'ic_cloud':
                return 'ion-cloud'
                break;
            case 'ic_sunny':
                return 'ion-ios-sunny'
                break;
            case 'ic_star':
                return 'ion-star'
                break;
            case 'ic_stop':
                return 'ion-stop'
                break;
            case 'ic_heart':
                return 'ion-heart'
                break;
        	default:
        		return 'ion-help'
        		break;
        }
    };
})