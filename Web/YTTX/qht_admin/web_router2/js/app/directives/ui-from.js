angular.module('ui.form',[])
    .directive('uiCheckLoginIsExist',['toolUtil','loginService',function(toolUtil,loginService) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            template:'',
            link:function (scope, element, attrs, ngModel) {
                /*绑定事件*/
                element.on('focusout',function (e){});
            }
        }
    }
]);