/*首页控制器*/
angular.module('app').controller('IndexController', ['loginService',function(loginService){
    var menudata=loginService.getMenuData();

    this.indexinfo=Mock.mock({
        'list|2-10':[{
            "name":/[a-z]{2,5}/,
            "value":/[0-9a-zA-Z]{2,10}/
        }]
    }).list;

    if(menudata!==null){
        this.quickitem=menudata.slice(1);
    }else{
        this.quickitem=[];
    }
}]);