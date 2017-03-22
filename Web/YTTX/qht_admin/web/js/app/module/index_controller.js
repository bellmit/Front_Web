/*首页控制器*/
angular.module('app').controller('AppController', ['loginService',function(loginService){
    var self=this,
        menudata=loginService.getMenuData();
    if(menudata!==null){
        this.headeritem=menudata;
        this.quickitem=menudata.slice(1);
    }else{
        this.headeritem=[];
        this.quickitem=[];
    }
}]);