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

})();