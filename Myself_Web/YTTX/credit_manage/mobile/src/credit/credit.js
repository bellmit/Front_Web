/**
 * Created by Administrator on 2016/5/31 0031.
 */
/*程序主入口*/
(function () {


    //历史服务模块
    var historyapp=angular.module('historyApp',[]);

    historyapp.controller("historyCtrl",['$scope',function($scope){

    }]);



    //菜单服务模块
    var menuapp=angular.module("menuApp",[]);

    menuapp.controller("menuCtrl",['$scope',function($scope){
        var menuitem=[{
            "href":"../community/community.html",
            "class":"menu-sq"
        },{
            "href":"credit.html",
            "class":"menu-xyk"
        },{
            "href":"../community/share_community.html",
            "class":"menu-fw"
        },{
            "href":"#",
            "class":"menu-sc"
        },{
            "href":"#",
            "class":"menu-wo"
        }];
        $scope.menuitem=menuitem;
    }]);


    //手动启动任务
    //angular.bootstrap(angular.element("#app_history"),["historyApp"]);
    angular.bootstrap(document.getElementById("app_menu"),["menuApp"]);


}());

