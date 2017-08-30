/*初始化渲染服务*/
(function () {
    'use strict';

    /*创建渲染服务*/
    angular
        .module('app')
        .service('appService', appService);


    /*服务注入依赖*/


    /*服务实现*/
    function appService() {
        var viewmode = 'default'/*视口类型*/,
            container = 1080,
            viewwidth = 1080 - 367/*视口宽度*/,
            viewoffset = 0/*视口误差*/,
            viewside = 367/*logo + logout + padding*/,
            size = 18/*单个子宽度*/,
            gap = 60/*间距*/,
            count = 0/*多少个字符*/,
            item = 0,
            menudata/*菜单缓存*/;

        /*对外接口*/
        this.calculateMenu = calculateMenu/*计算当前菜单的视口宽度*/;
        this.getViewWidth = getViewWidth/*获取视口宽度*/;
        this.changeViewMode = changeViewMode/*切换视口类型*/;
        this.renderMenu = renderMenu/*菜单渲染*/;
        this.getLoginMessage=getLoginMessage/*获取登录信息*/;


        /*获取视口宽度*/
        function getViewWidth() {
            if (viewmode === 'default') {
                container = 1080;
            } else if (viewmode === 'auto') {
                container = parseInt(angular.element('body').width(), 10);
                if (container < 1080) {
                    container = 1080;
                }
            } else if (viewmode === 'mini') {
                container = parseInt(angular.element('body').width(), 10);
                if (container > 640) {
                    container = 640;
                }
            }
            viewwidth = container - viewside;
        }

        /*计算当前菜单的视口宽度,menu:菜单数组，flag:是否获取新缓存*/
        function calculateMenu(menu, flag) {
            var ismenu = false;
            if (count === 0) {
                menu ? ismenu = true : ismenu = false;
            } else if (count !== 0) {
                ismenu = true;
            }

            if (!ismenu) {
                return {
                    subshow: false,
                    mainmenu: [],
                    submenu: []
                };
            }

            /*计算当前视口宽度*/
            getViewWidth();

            /*判断缓存*/
            if (count === 0 || (menu && flag)) {
                menudata = menu.slice(0);
                item = menu.length;
            }

            /*过滤短量菜单*/
            if (viewmode === 'default') {
                if (item <= 4) {
                    return {
                        subshow: false,
                        mainmenu: menudata,
                        submenu: []
                    };
                }
            } else if (viewmode === 'auto') {
                if (viewwidth > 1500) {
                    if (item <= 10) {
                        return {
                            subshow: false,
                            mainmenu: menudata,
                            submenu: []
                        };
                    }
                } else if (viewwidth >= 1200 && viewwidth <= 1500) {
                    if (item <= 8) {
                        return {
                            subshow: false,
                            mainmenu: menudata,
                            submenu: []
                        };
                    }
                } else {
                    if (item <= 4) {
                        return {
                            subshow: false,
                            mainmenu: menudata,
                            submenu: []
                        };
                    }
                }
            } else if (viewmode === 'mini') {
                if (item <= 3) {
                    return {
                        subshow: false,
                        mainmenu: menudata,
                        submenu: []
                    };
                }
            }


            /*计算菜单视口宽度*/
            var i = 0,
                tempwidth = 0;

            /*初始化算*/
            count = 0;
            for (i; i < item; i++) {
                tempwidth += gap;
                tempwidth = parseInt(tempwidth, 10) - viewoffset;
                if (tempwidth >= viewwidth) {
                    return {
                        subshow: true,
                        mainmenu: menudata.slice(0, i + 1),
                        submenu: menudata.slice(i + 1)
                    };
                }
                var main = menudata[i]['name'].length,
                    j = 0;
                count += main;
                for (j; j < main; j++) {
                    tempwidth += size * (j + 1);
                    tempwidth = parseInt(tempwidth, 10);
                    if (tempwidth >= viewwidth) {
                        return {
                            subshow: true,
                            mainmenu: menudata.slice(0, i + 1),
                            submenu: menudata.slice(i + 1)
                        };
                    }
                }
            }
            return {
                subshow: false,
                mainmenu: menudata,
                submenu: []
            };
        }

        /*切换视口类型*/
        function changeViewMode(value, fn) {
            viewmode = value;
            if (fn && typeof fn === 'function') {
                fn.call(null, calculateMenu());
            } else {
                return calculateMenu();
            }
        }

        /*菜单渲染*/
        function renderMenu(model,fn) {
            if(!model){
                return false;
            }
            var tempmenu =fn.call(null);
            model.headeritem = tempmenu.mainmenu;
            model.headersubitem = tempmenu.submenu;
            model.isshow = tempmenu.subshow;
        }
        
        
        /*获取登录信息*/
        function getLoginMessage(model,fn) {
            if(!model){
                return false;
            }
            var message=fn.call(null);
            if(message){
                model.isshow=true;
                model.login=message;
            }else{
                model.isshow=false;
                model.login=[];
            }
        }
    }


}());