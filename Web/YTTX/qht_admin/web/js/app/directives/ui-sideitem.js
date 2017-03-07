angular.module('ui.sideitem',['tool.util'])
    .directive('uiSubLogo',function() {
        return {
          replace:false,
          restrict: 'EC',
          template:'<div class="logo-img-wrap">\
                        <img src="images/index_logo.png" alt="logo" />\
                    </div>\
                    <h1>深圳银通移动支付有限公司</h1>'
        };
    })
    .directive('uiSubInfo',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li>身份：<span>省级代理商</span></li>'
        };
    })
    .directive('uiSubList',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in subdata.listitem"><a href="#{{i.href}}" title="">{{i.name}}</a></li>'
        };
    })
    .directive('uiSubSearch',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<label class="search-content">\
                <input type="text" placeholder="搜索" value="" name="search_name" class="g-br3" />\
            <span class="search-clear"></span></label>',
            link:function (scope, element, attrs) {
                /*绑定事件*/
                element.on('keyup','input',function (e){
                    var $this=$(this),
                        value=toolUtil.trims(this.value),
                        $label=$this.parent(),
                        kcode='';

                    if(value===''){
                        /*输入为空时*/
                        $label.removeClass('search-content-active');
                    }else{
                        /*输入非空*/
                        $label.addClass('search-content-active');
                        kcode=e.keyCode;
                        /*提交*/
                        if(kcode===13){
                            scope.$apply(function () {
                                console.log('search:'+value);
                            });
                        }
                    }
                });
                element.on('click','span',function (e) {
                    var $input=element.find('input');

                    $input.val('');
                    $input.trigger('keyup');
                });
            }
        };
    }])
    .directive('uiSubTab',['$http',function($http) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li data-type="{{i.type}}" ng-repeat="i in subdata.tabitem">{{i.name}}</li>',
            link:function (scope, element, attrs) {
               /*绑定事件*/
                element.on('click','li',function (e) {
                    $(this).addClass('tabactive').siblings().removeClass('tabactive');
                });
            }
        };
    }])
    .directive('uiSubMenu',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li>\
                <a class="sub-menu-title" href="#" title="">菜单列表1</a>\
                <ul>\
                    <li>\
                        <a class="sub-menu-title" href="#" title="">菜单列表1</a>\
                        <ul>\
                            <li><a href="#" title="">菜单列表1</a></li>\
                        </ul>\
                    </li>\
                </ul>\
            </li>',
            link:function (scope, element, attrs) {
                /*绑定事件*/
                element.on('click','a',function (e) {
                    var $this=$(this),
                        haschild=$this.hasClass('sub-menu-title'),
                        $child;

                    if(haschild){
                        e.preventDefault();
                        $child=$this.next();
                        if($child.hasClass('g-d-showi')){
                            /*隐藏*/
                            $child.removeClass('g-d-showi');
                            $this.removeClass('sub-menu-titleactive');
                        }else{
                            /*显示*/
                            $child.addClass('g-d-showi');
                            $this.addClass('sub-menu-titleactive');
                        }
                    }
                });
            }
        };
    })
    .directive('uiSubBtn',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li>\
                <span><i class="fa-plus"></i>添加按钮</span>\
            </li>\
            <li>\
                <span><i class="fa-plus"></i>添加按钮</span>\
            </li>'
        };
    });