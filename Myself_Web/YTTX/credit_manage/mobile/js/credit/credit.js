/**name:credit_manage / credit;
 author:yipin;
 date:2016-06-01;
 version:1.0.0**/
!function(){var a=angular.module("historyApp",[]);a.controller("historyCtrl",["$scope",function(a){}]);var b=angular.module("menuApp",[]);b.controller("menuCtrl",["$scope",function(a){var b=[{href:"../community/community.html","class":"menu-sq"},{href:"credit.html","class":"menu-xyk"},{href:"../community/share_community.html","class":"menu-fw"},{href:"#","class":"menu-sc"},{href:"#","class":"menu-wo"}];a.menuitem=b}]),angular.bootstrap(document.getElementById("app_menu"),["menuApp"])}();