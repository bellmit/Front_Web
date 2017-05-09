/*应用程序初始化配置*/
var yy_app=angular.module('app')
        .constant('BASE_CONFIG',{
        unique_key:'yy_admin_unique_key',
        basedomain:'http://10.0.5.226:8882'
        /*
            test:http://10.0.5.226:8882
            debug:http://10.0.5.222:8082
        */,
        debug:false,
        baseproject:'/bms-bzwyys-api',
        loadingdom:'struct_layout_loading',
        nologindom:'struct_layout_nologin',
        nologintipdom:'struct_goto_login',
        loginoutdom:'struct_layout_loginout',
        submenulimit:6
    })
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
            yy_app.controller = $controllerProvider.register;
            yy_app.directive  = $compileProvider.directive;
            yy_app.filter     = $filterProvider.register;
            yy_app.factory    = $provide.factory;
            yy_app.service    = $provide.service;
            yy_app.constant   = $provide.constant;
            yy_app.value      = $provide.value;
        }
    ]);