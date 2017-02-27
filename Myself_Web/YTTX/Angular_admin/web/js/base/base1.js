(function(){
	'use strict';
	var app=angular.module('myApp',[]),
		dataarr1=[{
			label:'张三',
			name:"1"
		},{
			label:'李四',
			name:"2"
		},{
			label:'王五',
			name:"3"
		}],
		dataarr2=[{
			label:'zhangsan',
			name:"1"
		},{
			label:'lisi',
			name:"2"
		},{
			label:'wangwu',
			name:"3"
		},{
			label:'zhaoliu',
			name:"4"
		},{
			label:'maqi',
			name:"5"
		},{
			label:'zhuba',
			name:"6"
		},{
			label:'chenjiu',
			name:"7"
		}],
		dataarr3=[{
			label:'勒布朗.詹姆斯',
			name:"1"
		},{
			label:'德维恩.韦德',
			name:"2"
		},{
			label:'哈基姆.奥拉朱旺',
			name:"3"
		},{
			label:'阿卜杜勒.贾巴尔',
			name:"4"
		},{
			label:'迈克尔.乔丹',
			name:"5"
		},{
			label:'麦克格雷迪',
			name:"6"
		},{
			label:'卡特',
			name:"7"
		},{
			label:'张伯伦',
			name:"8"
		},{
			label:'拉塞尔',
			name:"9"
		},{
			label:'约翰逊',
			name:"10"
		},{
			label:'奥尼尔',
			name:"11"
		},{
			label:'科比.布莱恩特',
			name:"12"
		},{
			label:'纳什',
			name:"13"
		},{
			label:'邓肯',
			name:"14"
		}];


	/*模块应用1*/
	app.controller('myCtrl1',function ($scope) {
		$scope.username='hello,world';
	});

	/*模块应用2*/
	app.directive('themeDirective',function () {
		return {
			scope:false,
			replace:true,
			restrict:'AE',
			template:'<div class="admin-gap-theme1">主题：{{theme}}</div>'
		};
	}).controller('myCtrl2',['$scope',function ($scope) {
		$scope.theme='angular';
	}]);

	/*模块应用3*/
	app.controller('myCtrl3',function ($scope) {
		$scope.formdata=dataarr1;
	});

	/*模块应用4*/
	app.controller('myCtrl4',function ($scope) {
		$scope.formdata=dataarr2;
	});

	/*模块应用5*/
	app.controller('myCtrl5',function ($scope,$interval) {
		$scope.addcount=0;
		var countid=$interval(function () {
			$scope.addcount++;
			if($scope.addcount===60){
				$interval.cancel(countid);
			}
		},1000);
	});


	/*模块应用6*/
	app.controller('myCtrl6',function ($scope) {
		$scope.optitem=angular.copy(dataarr3);
	});


	/*模块应用7*/
	app.controller('myCtrl7',function ($scope) {});


	/*模块应用8*/
	app.controller('myCtrl8',function ($scope) {
		$scope.tritem=angular.copy(dataarr3);
	});


})();