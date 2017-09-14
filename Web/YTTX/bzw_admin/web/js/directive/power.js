/*公共指令集*/
(function () {
    'use strict';


    /*定义指令*/
    angular
        .module('view')/*公共指令集名称*/
        .directive('viewPowerColgroup', viewPowerColgroup)/*权限分组指令*/
        .directive('viewPowerThead', viewPowerThead)/*权限头部指令*/
        .directive('viewPowerTbody', viewPowerTbody)/*权限主体指令*/;


    /*指令依赖注入*/


    /*指令实现*/
    /*权限分组指令*/
    function viewPowerColgroup() {
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                colgroup: '=colgroup'
            },
            template: '<col class="{{i.colclass}}" ng-repeat="i in colgroup" />'
        };
    }

    /*权限头部指令*/
    function viewPowerThead() {
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                thead: '=thead'
            },
            template: '<tr>\
               <th ng-repeat="i in thead" class="g-t-c"><label><input class="{{i.inputclass}}" data-index="{{i.index}}" data-modid="{{i.id}}" type="checkbox" name="{{i.name}}" />&nbsp;{{i.name}}</label></th>\
            </tr>',
            link:powerThead
        };

        /*link实现*/
        function powerThead(scope, element, attrs) {
            console.log('thead');
        }
    }

    /*权限主体指令*/
    function viewPowerTbody() {
        return {
            replace: true,
            restrict: 'EA',
            template: '',
            link:powerTbody
        };

        /*link实现*/
        function powerTbody(scope, element, attrs) {
            console.log('tbody');
        }
    }

}());
   