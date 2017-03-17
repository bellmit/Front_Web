/*应用程序初始化配置*/
angular.module('app').constant('BASE_CONFIG',{
    unique:'qht_admin_unique_key',
    basedomain:'http://10.0.5.226:8080',
    baseproject:'/qht-bms-api'
}).factory('httpInterceptor',['BASE_CONFIG','$httpParamSerializerJQLike',function (BASE_CONFIG,$httpParamSerializerJQLike) {
    var http_config={};

    /*请求配置*/
    http_config.request=function (config) {
        var url=config.url,
            set=config.set;

        /*需要转换的*/
        if(set){
            var headers=config.headers,
                data=config.data;
            /*配置url*/
            if(typeof url!=='undefined'){
                config.url=BASE_CONFIG.basedomain + BASE_CONFIG.baseproject + url;
            }
            /*设置头信息*/
            if(typeof headers!=='undefined'){
                headers['Content-Type']="application/x-www-form-urlencoded";
            }else{
                config['headers']={ "Content-Type": "application/x-www-form-urlencoded" };
            }
            /*转换参数*/
            if(typeof data!=='undefined'&&data){
                config.data=$httpParamSerializerJQLike(data);
            }
            /*清除需要配置项*/
            delete config.set;
            return config;
        }
    };
    return http_config;
}])/*.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}])*/;

/*

test:
10.0.5.226:8080

debug:
10.0.5.222:8080

*/