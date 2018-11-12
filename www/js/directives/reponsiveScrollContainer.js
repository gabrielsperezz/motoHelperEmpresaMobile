angular.module('motohelper')
.directive('reponsiveScrollContainer', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var parent = element.parent()[0];
            var responsiveContainer = element;
            var children = parent.children;
            function onResize(){
                    var offsetTop = responsiveContainer[0].offsetTop;
                    var totalHeight = parent.offsetHeight;
                    for (var i = 0; i < children.length; i++) {
                        if (children[i] != responsiveContainer[0]) {
                            totalHeight -= children[i].offsetHeight;
                        }
                    }
                    responsiveContainer.css('height', totalHeight + 'px');
                }
            scope.$watch(parent.offsetHeight, onResize, true);
            angular.element($window).bind('resize', onResize);
            scope.$on('target-resize', onResize)
        }
    }
});
