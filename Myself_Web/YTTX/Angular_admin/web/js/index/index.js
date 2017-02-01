(function(){
	"use strict";
	var app=angular.module('myApp',[]);

	app.controller('myCtrl',function ($scope) {
		$scope.username='hello,world';
	});

})();