/*首页控制器*/
angular.module('app')
    .controller('SettingInfoController', ['settingInfoService','$scope',function(settingInfoService,$scope){
        var self=this;

        console.log(this);
        console.log($scope);

        for(var i in this){
            console.log(this[i]);
        }

    }]);