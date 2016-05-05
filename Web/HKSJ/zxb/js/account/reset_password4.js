/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform'],function($,undefined,Rule,CommonFn,undefined) {
	$(function() {
			//页面元素获取
			//表单对象
			var $gotoindex=$('#gotoindex'),
					countid=null,
					count=5;
					
					
					(function(){
							$gotoindex.text(count);
							setInterval(function(){
								count--;
								$gotoindex.text(count);
								if(count<=0){
										clearInterval(countid);
										countid=null;
										setTimeout(function(){
											window.location.href="../index.html";
										},1000);
								}
							},1000);
					}());
					

	});
});
