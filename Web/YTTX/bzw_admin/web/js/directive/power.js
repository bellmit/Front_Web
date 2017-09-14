/*公共指令集*/
(function () {
    'use strict';


    /*定义指令*/
    angular
        .module('view')/*公共指令集名称*/
        .directive('viewPowerColgroup', viewPowerColgroup)/*权限分组指令*/
        .directive('viewPowerTheadAll', viewPowerTheadAll)/*包含全选操作权限头部指令*/
        .directive('viewPowerThead', viewPowerThead)/*权限头部指令*/
        .directive('viewPowerTbody', viewPowerTbody)/*权限主体指令*/
        .directive('viewPowerTbodyItem', viewPowerTbodyItem)/*拥有单独设置权限主体指令*/;


    /*指令依赖注入*/
    viewPowerTbodyItem.$inject = ['loginService', 'toolUtil','testService'];


    /*指令实现*/
    /*权限分组指令*/
    function viewPowerColgroup() {
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                colgroup: '=colgroup'
            },
            template: '<col class="{{i.col_class}}" ng-repeat="i in colgroup" />'
        };
    }

    /*包含全选操作权限头部指令*/
    function viewPowerTheadAll() {
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                thead: '=thead'
            },
            template: '<tr>\
               <th ng-repeat="i in thead" class="g-t-c"><label><input class="{{i.inputclass}}" data-index="{{i.index}}" data-modid="{{i.id}}" type="checkbox" name="{{i.name}}" />&nbsp;{{i.name}}</label></th>\
            </tr>',
            link: powerTheadAll
        };

        /*link实现*/
        function powerTheadAll(scope, element, attrs) {
            /*angular.element(element).bind('click',function ($event) {
                var target = $event.target,
                    node = target.nodeName.toLowerCase(),
                    $operate;
                if (node === 'thead' || node === 'tr' || node === 'td' || node === 'th') {
                    return false;
                } else if (node === 'label') {
                    $operate = angular.element(target).find('input');
                } else if (node === 'input') {
                    $operate = angular.element(target);
                }
                if($operate.is(':checked')){
                    $operate.prop({
                        'checked': false
                    });
                }else{
                    $operate.prop({
                        'checked': false
                    });
                }
            });*/
        }
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
            link: powerThead
        };

        /*link实现*/
        function powerThead(scope, element, attrs) {
            console.log('thead');
        }
    }

    /*权限主体指令*/
    function viewPowerTbody() {
        return {
            replace: false,
            restrict: 'EA',
            template: '',
            link: powerTbody
        };

        /*link实现*/
        function powerTbody(scope, element, attrs) {
            console.log('tbody');
        }
    }

    /*拥有单独设置权限主体指令*/
    function viewPowerTbodyItem(loginService, toolUtil,testService) {
        return {
            replace: false,
            restrict: 'EA',
            scope:{
                debug:'=debug'
            },
            template: '',
            link: powerTbodyItem
        };

        
        /*link实现*/
        function powerTbodyItem(scope, element, attrs) {
            angular.element(element).bind('click', function ($event) {
                var target = $event.target,
                    node = target.nodeName.toLowerCase(),
                    $operate;
                if (node === 'tbody' || node === 'tr' || node === 'td' || node === 'th') {
                    return false;
                } else if (node === 'label') {
                    $operate = angular.element(target).find('input');
                } else if (node === 'input') {
                    $operate = angular.element(target);
                }
                var check = $operate.is(':checked'),
                    prid = $operate.attr('data-prid'),
                    tempparam = loginService.getCache().loginMap.param,
                    param = {
                        adminId: tempparam.adminId,
                        token: tempparam.token,
                        organizationId: tempparam.organizationId,
                        prid: prid,
                        isPermit: check ? 1 : 0
                    };

                toolUtil
                    .requestHttp({
                        url: '/permission/state/update',
                        method: 'post',
                        debug: debug,
                        data: param
                    })
                    .then(function (resp) {
                            if (debug) {
                                var resp = testService.testSuccess();
                            }
                            var data = resp.data,
                                status = parseInt(resp.status, 10);

                            if (status === 200) {
                                var code = parseInt(data.code, 10),
                                    message = data.message;
                                if (code !== 0) {
                                    if (typeof message !== 'undefined' && message !== '') {
                                        console.log(message);
                                    } else {
                                        console.log('设置权限失败');
                                    }
                                    if (code === 999) {
                                        /*退出系统*/
                                        loginService.outAction();
                                    }
                                    /*恢复原来设置*/
                                    $operate.prop({
                                        'checked': !check
                                    });
                                }
                            }
                        },
                        function (resp) {
                            var faildata=resp.data;
                            if(faildata){
                                var message = resp.data.message;
                                if (typeof message !== 'undefined' && message !== '') {
                                    console.log(message);
                                } else {
                                    console.log('设置权限失败');
                                }
                            }else{
                                console.log('设置权限失败');
                            }
                            /*恢复原来设置*/
                            $operate.prop({
                                'checked': !check
                            });
                        });


            });
        }
    }

}());
   