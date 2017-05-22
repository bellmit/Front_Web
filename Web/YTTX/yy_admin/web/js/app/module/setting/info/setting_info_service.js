angular.module('app')
    .service('settingInfoService',['toolUtil','toolDialog','BASE_CONFIG',function(toolUtil,toolDialog,BASE_CONFIG){

        /*获取缓存数据*/
        var self=this;
        
        /*扩展服务--初始化jquery dom节点*/
        this.initJQDom=function (dom) {
            if(dom){
                /*复制dom引用*/
                for(var i in dom){
                    self[i]=dom[i];
                }
            }
        };
    }]);