'use strict';

/*控制器设置基本配置*/
(function () {
       angular.module('app')
           .controller('AppCtrl', ['$scope','toolDialog','$http',function($scope,toolDialog,$http){


       }]).controller('SubCtrl', ['$scope','toolDialog','$http',function($scope,toolDialog,$http){
              var dia=toolDialog.dia();

              /*侧边栏搜索事件*/
              $scope.subSearchAction=function () {
                     toolDialog.show({
                            tip:dia,
                            type:'succ',
                            value:'searching...'
                     });
              };

              /*初始化请求侧边栏数据tab数据*/
              $http({
                     url:'../json/test.json',
                     method:'post',
                     data:''
              })
              .then(function (resp) {
                  var datares=resp.data,
                      code=parseInt(datares.code,10);
                  if(code!==0){
                         if(code===999){
                                /*清空缓存*/
                                /*public_tool.loginTips(function () {
                                 public_tool.clear();
                                 public_tool.clearCacheData();
                                 });*/
                         }
                         console.log(datares.message);
                         $scope.tabitem=null;
                         return false;
                  }
                  var result=Mock.mock({
                         'list|2':[{
                                "name":'tab',
                                "type|+1":1
                         }]
                  });
                  if(typeof result==='undefined'){
                         $scope.tabitem=null;
                         return false;
                  }
                  $scope.tabitem=result.list;
              })
              .catch(function(resp){
                  console.log(resp.message);
                  $scope.tabitem=null;
                  return false;
               });




       }]);

    /*$scope.testHaha=function(){
        toolDialog.show({
            dia:dia,
            type:'warn',
            value:'你妹，还是你妹'
        });
    };
    $scope.testHehe=function(){
        var suredia=toolDialog.sureDialog(dia);
        suredia.sure('',function(cf){
            var tip=cf.dia;
            toolDialog.show({
                dia:dia,
                type:'warn',
                value:'你妹，还是你妹'
            });
        },"是否审核该商品?",true);
    };*/


}());
