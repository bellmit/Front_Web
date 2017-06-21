/*加载动画服务*/
'use strict';
angular.module('tool.loading', [])
    .service('toolLoading', function () {
        var loadingflag = 'g-d-hidei';

        /*获取显示隐藏变量*/
        this.getLoadingFlag = function () {
            return loadingflag;
        };
        
        /*显示隐藏*/
        this.loading = function (config) {
            var type = config.type,
                model = config.model,
                delay = config.delay;

            if (type === 'show') {
                loadingflag = 'g-d-showi';
            } else if (type === 'hide') {
                loadingflag = 'g-d-hidei';
            }
            model.isloading = loadingflag;
            /*清除延时指针*/
            if (delay) {
                clearTimeout(delay);
                delay = null;
            }
        };
    });
