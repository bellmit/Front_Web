angular.module('ui.headeritem',[])
    .directive('uiHeaderMenu',function() {
        return {
            replace:false,
            restrict: 'EC',
            /*scope:{},*/
            template:'<li ng-repeat="i in headerdata.menuitem"><a href="#{{i.href}}" title="">{{i.name}}</a></li>',
            link:function (scope, element, attrs) {
                /*绑定事件menuactive*/
                element.on('click','a',function (e) {
                    var $this=$(this);
                    $this.addClass('menuactive').parent().siblings().find('a').removeClass('menuactive');
                });
            }
        };
    })
    .directive('uiHeaderLogout',function() {
        return {
            replace:true,
            restrict: 'EC',
            template:'<div class="g-br3 header-outwrap" ng-click="headerdata.systemLogout()">退出</div>'
        };
    });