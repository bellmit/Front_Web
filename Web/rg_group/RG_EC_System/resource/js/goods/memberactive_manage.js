/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		}
	}
});



/*程序入口*/
require(['jquery','bootstrap','common','dialog'], function($,$strap,undefined,undefined) {
	$(function() {
		/*页面元素引用*/
		var $poOrderForm=$('#poOrder'),
				$member_griddata=$('#member_griddata'),
				$member_active=$('#member_active');
		
		
		//绑定激活
		$member_active.on('click',function(){
				var dia=dialog({
						content:'<span class="g-c-cyan1">确认激活会员？</span>',
						okValue:'激活',
						width:300,
						ok:function(){
								this.content('<span class="g-c-cyan1">正在激活中......</span>');
								//to do 
								//填充激活业务逻辑
								
								
								setTimeout(function(){
									dia.close().remove();
								},3000);
								return false;
						},
						cancelValue:'取消激活',
						cancel:function(){}
				}).showModal();
		});
		


		
	});
});
