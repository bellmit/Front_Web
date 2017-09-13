/*服务辅助工具类*/
(function ($) {
    'use strict';

    /*定义或扩展工厂模块*/
    angular
        .module('assist', [])
        .factory('assistCommon', assistCommon);


    /*工厂依赖注入*/
    assistCommon.$inject = ['toolUtil', 'toolDialog', '$timeout', 'loginService'];


    /*工厂实现*/
    function assistCommon(toolUtil, toolDialog, $timeout, loginService) {


        var tempparam = loginService.getCache().loginMap.param,
            $modal = null;

        /*对外接口*/
        return {
            changeCache: changeCache/*更新缓存*/,
            loginOut: loginOut/*退出*/,

            toggleModal: toggleModal/*弹出层显示隐藏*/,

            /*表单类*/
            addFormDelay: addFormDelay/*表单类服务--执行延时任务序列*/,
            clearFormDelay: clearFormDelay/*表单类服务--清除延时任务序列*/,
            clearFormData: clearFormData/*表单类服务--清空表单模型数据*/,
            clearFormValid: clearFormValid/*表单类服务--重置表单数据*/,
            formSubmit: formSubmit/*表单类服务--提交表单数据*/,
            formReset: formReset/*表单类服务--重置表单*/
        };


        /*更新缓存*/
        function changeCache(key, obj) {
            /*设置新缓存*/
            if (obj) {
                toolUtil.setParams(key, obj);
            } else {
                toolUtil.setParams(key, {});
            }
            /*更新登录缓存*/
            loginService.changeCache();
        }

        /*退出*/
        function loginOut() {
            loginService.outAction();
        }

        /*
         弹出层显示隐藏
         config配置说明
         config:{
         area:''/!*区域或类别，可能和wrap同功能*!/,
         wrap:''/!*容器*!/,
         display:''/!*动作：显示或隐藏*!/,
         delay:''/!*延迟*!/,
         clear:''/!*是否清除延时任务*!/
         }*/
        function toggleModal(config, fn) {
            var temp_timer = null;
            if (config.display === 'show') {
                if (typeof config.delay !== 'undefined') {
                    temp_timer = setTimeout(function () {
                        config.wrap.modal('show', {backdrop: 'static'});
                        clearTimeout(temp_timer);
                        temp_timer = null;
                    }, config.delay);
                    if (fn && typeof fn === 'function') {
                        fn.call(null);
                    }
                } else {
                    config.wrap.modal('show', {backdrop: 'static'});
                    if (fn && typeof fn === 'function') {
                        fn.call(null);
                    }
                }
            } else if (config.display === 'hide') {
                if (typeof config.delay !== 'undefined') {
                    temp_timer = setTimeout(function () {
                        config.wrap.modal('hide');
                        /*清除延时任务序列*/
                        if (config.clear) {
                            clearFormDelay();
                        }
                        clearTimeout(temp_timer);
                        temp_timer = null;
                    }, config.delay);
                } else {
                    config.wrap.modal('hide');
                    /*清除延时任务序列*/
                    if (config.clear) {
                        clearFormDelay();
                    }
                }
            }
        }

        /*表单类服务--执行延时任务序列*/
        function addFormDelay(config) {
            config.timer = $timeout(function () {
                /*触发重置表单*/
                config.node.trigger('click');
            }, 0);
        }

        /*表单类服务--清除延时任务序列*/
        function clearFormDelay(config) {
            if (config.tid && config.tid !== null) {
                $timeout.cancel(config.tid);
                config.tid = null;
            } else {
                /*如果存在延迟任务则清除延迟任务*/
                if (config.timer !== null) {
                    $timeout.cancel(config.timer);
                    config.timer = null;
                }
            }
        }

        /*表单类服务--清空表单模型数据*/
        function clearFormData(data, fn) {
            if (!data) {
                return false;
            }
            if (fn && typeof fn === 'function') {
                fn.call(null, data);
            } else {
                for (var i in data) {
                    data[i] = '';
                }
            }
        }

        /*表单类服务--重置表单数据*/
        function clearFormValid(forms) {
            if (forms) {
                var temp_cont = forms.$$controls;
                if (temp_cont) {
                    var len = temp_cont.length,
                        i = 0;
                    forms.$dirty = false;
                    forms.$invalid = true;
                    forms.$pristine = true;
                    forms.valid = false;

                    if (len !== 0) {
                        for (i; i < len; i++) {
                            var temp_item = temp_cont[i];
                            temp_item['$dirty'] = false;
                            temp_item['$invalid'] = true;
                            temp_item['$pristine'] = true;
                            temp_item['$valid'] = false;
                        }
                    }
                }
            }
        }

        /*表单类服务--提交表单数据*/
        function formSubmit(model, config) {
            /*
            type:表单所属模型，
            * action：表单提交类型，新增，修改...
            * */
            
            /*参数适配*/
            var param = {
                    adminId: tempparam.adminId,
                    token: tempparam.token
                },
                req_config = {
                    method: 'post',
                    url: config.url,
                    debug: config.debug,
                    action: config.action
                };

            var req_param=config.param;
            for(var i in req_param){
                param[i]=req_param[i];
            }
            req_config["data"]=param;



        }

        /*表单类服务--重置表单*/
        function formReset(config) {

        }


    }
})(jQuery);
