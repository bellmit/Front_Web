/*首页控制器*/
angular.module('app').controller('StructController', ['loginService','$scope',function(loginService,$scope){
    var self=this;

    this.tabitem=[{
        name:'运营架构',
        href:'struct',
        active:'tabactive'
    },{
        name:'角色',
        href:'role',
        active:''
    }];

    /*menudata=loginService.getMenuData();
    if(menudata!==null){
        this.headeritem=menudata;
        this.quickitem=menudata.slice(1);
    }else{
        this.headeritem=[];
        this.quickitem=[];
    }*/


    /*var self=this,
        menudata=loginService.getMenuData();
    if(menudata!==null){
        this.headeritem=menudata;
        this.quickitem=menudata.slice(1);
    }else{
        this.headeritem=[];
        this.quickitem=[];
    }*/
}]);