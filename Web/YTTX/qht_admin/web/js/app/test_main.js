'use strict';

/*控制器设置基本配置*/
(function () {
       angular.module('app')
           .controller('AppCtrl', ['$scope','toolDialog','$http',function($scope,toolDialog,$http){
                  
                  
                  
               
       }]).controller('SubCtrl', ['$scope','toolDialog','$http',function($scope,toolDialog,$http){
              var dia=toolDialog.dia();
              $scope.subSearchAction=function () {
                     toolDialog.show({
                            dia:dia,
                            type:'succ',
                            value:'searching...'
                     });
              }
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
