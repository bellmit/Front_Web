/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});



	

/*程序入口*/
require(['jquery','dialog'], function($,undefined) {
	$(function() {        
			$("#site_list>li").click(function(e){
					var current=e.target,
							nodename=current.nodeName.toLowerCase(),
							strUrl='',
							$this;
							
					if(nodename=='li'){
							if(current.id){
								/*创建微网站操作*/
								window.location.href = $(this).attr("data-url");
								return false;
							}else{
								strUrl=$(current).attr("data-url");
							}
					}else if(nodename=='div'||nodename=='p'||nodename=='h3'){
							strUrl=$(current).parent().attr("data-url");
					}else if(nodename=='em'){
							strUrl=$(current).parent().parent().attr("data-url");
					}else if(nodename=='span'){
						
							$this=$(current);
							$curLi=$this.parent().parent();
							strUrl=$curLi.attr("data-url");
							
							var curAction=$this.attr('data-action');
							
							if(curAction){
								/*当前微网站标题*/
								var curTitle=$this.parent().prev().prev().text();
								
								if(curAction=='edit'){
									/*编辑操作*/
									//to do
									
									
									
								}else if(curAction=='delete'){
									/*删除操作*/
									dialog({
										title:'温馨提示',
										width:300,
										content:'您确定要删除&nbsp;<span class="g-c-red2">'+curTitle+'</span>&nbsp;吗?',
										okValue: '确定',
										ok: function () {
											var dg=this;
											
											/*
												to do
												开发阶段请去掉注释最近的下面的return 和之前的内容
											*/
											var r=parseInt(Math.random()*10)%2;
											if(r==0){
													dg.content('删除&nbsp;<span class="g-c-blue2">'+curTitle+'</span>&nbsp;成功.');
													$curLi.html('').remove();
													setTimeout(function(){
														dg.close().remove();
													},500);
											}else{
													dg.content('删除&nbsp;<span class="g-c-red2">'+curTitle+'</span>&nbsp;失败！');
													setTimeout(function(){
														dg.close().remove();
													},500);
											}
											return false;
											
											/*删除操作 ajax*/
											$.get(strUrl,function(resp){
												if(resp){
														dg.content('删除&nbsp;<span class="g-c-blue2">'+curTitle+'</span>&nbsp;成功.');
														$curLi.html('').remove();
														setTimeout(function(){
															dg.close().remove();
														},500);
												}else{
														dg.content('删除&nbsp;<span class="g-c-red2">'+curTitle+'</span>&nbsp;失败！');
														setTimeout(function(){
															dg.close().remove();
														},500);
												}
										  },'json');
											return false;
										},
										cancelValue: '取消',
										cancel: function () {}
									}).showModal();
								}
								return false;
							}
					}
					
					/*跳转到相关微网站*/
					window.location.href = $(this).attr("data-url");
					return false;
					/*下面为开发状态时开启*/
					$.get(strUrl,function(resp){
							if(parseInt(resp.tip_status)===0 ){
									window.location.href = APP_SITE_URL+'/index.php?act=admin';
							}else{
									dialog({
										title:'温馨提示',
										width:300,
										content:'<span class="g-c-red2">'+resp.tip_msg+'</span>',
										okValue: '确定',
										ok: function () {}
									}).showModal();
							}
					 },'json');
			});

			

			
			

			
			

			

	});
});












