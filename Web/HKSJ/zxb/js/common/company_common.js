/*
公共模块
author:yipin
*/

define(['jquery','share','common','modal_dialog'],function($,Share,Common,Modal_Dialog){
	
		//导航高亮
		(function(){
						var menuurl_map={
									0:["home"],
									1:["privilege"],
									2:["stylist"],
									3:["scheme"],
									4:["site"],
									5:["complete"],
									6:["profile","intro","register","advisory","contact","service"]		
						},
						currenturl=Common.currenturl,
						$menuitem=$('#company_menuitem').children();
						
						loopouter:for(var i in menuurl_map){
								var tempitem=menuurl_map[i],
										len=tempitem.length,
										j=0;
								for(j;j<len;j++){
										if(currenturl.indexOf(tempitem[j])!=-1){
												$menuitem.eq(i).addClass('company-navactive');
												if(i==6){
														var $company_sidemenu=$('#company_sidemenu'),
																$sideitem=$company_sidemenu.children(),
																sublen=$sideitem.size(),
																k=0;
																for(k;k<sublen;k++){
																		var $tempsub=$sideitem.eq(k),
																				tempsuburl=$tempsub.find('a').attr('href');
																		if(tempsuburl.indexOf(tempitem[j])!=-1){
																				$tempsub.addClass('profile-active');
																				break;
																		}
																}
												}
												break loopouter;
										}
								}
						}
		}());
		
	
	
		
		//分享代码 baidu
		window._bd_share_config={
			"common":{
					"bdSnsKey":{},
					"bdText":"",
					"bdMini":"0",
					"bdPic":"",
					"bdStyle":"0",
					"bdSize":"16"
			},
			"share":{},
			"image":{
					"viewList":["tsina","qzone","tqq"],
					"viewText":"分享到：",
					"viewSize":"16"
			},
			"selectShare":{
					"bdContainerClass":null,
					"bdSelectMiniList":["tsina","qzone","tqq"]
			}
	};
	
	
		//获取报价
		(function(){
				var $company_apply=$('#company_apply');
				
				//初始化
				Modal_Dialog.modalInit(['price']);
				
				//绑定调用获取报价
				$company_apply.on('click',function(){
						Modal_Dialog.modal('price',function(){
									var self=this;
		
									//to do
									$.ajax({
											url:'请求地址',
											type:'post',
											dataType:"json",
											data:'相关请求参数',
											success: function(data){
												//to do
		
												
												setTimeout(function(){
													//关闭窗口
													self.modalHide('price');
													//弹窗相关提示窗口
													self.modal('info_success');
												},200);
											},
											error: function(){}
									});
							
						});
				});
			
				//其他操作
		}());
		
		
		
		
	
});







