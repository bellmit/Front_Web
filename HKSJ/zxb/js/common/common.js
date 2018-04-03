/*
公共模块
author:yipin
*/

define(['jquery','modal_dialog'],function($,Modal_Dialog){
		var common={
		//是否支持本地存储
			supportStorage:(function(){
					return window.sessionStorage?true:false;
			}()),
			/*
				设置内部参数：设置请求参数到cookie或者Stroage
				参数说明：key索引，value请求字符串
			*/
			setParams:function(key,value){
				if(this.supportStorage){
						window.sessionStorage.setItem(key,value);
				}else{
					if($.cookie(key)){
						$.removeCookie(key);
					}
					$.cookie(key,value);
				}
			},
			/*
				获取内部参数：从cookie或者Stroage中获取请求参数
				参数说明：key索引
				返回获取的字符串值
			*/
			getParams:function(key){
				if(this.supportStorage){
						return window.sessionStorage.getItem(key)||'';
				}else{
						if(typeof $.cookie==='function'){
								return $.cookie(key)?$.cookie(key):'';
						}
				}
				return '';
			},
			/*
				删除内部参数：从cookie或者Stroage中删除请求参数
				参数说明：key索引
			*/
			removeParams:function(key){
				if(this.supportStorage){
							window.sessionStorage.removeItem(key);
				}else{
					if(typeof $.cookie==='function'){
							if($.cookie(key)){
								$.removeCookie(key);
							}
					}
				}
			},
			/*
				获取内部参数：从cookie或者Stroage中获取请求id
				参数说明：key索引
				返回获取的字符串值
			*/
			getID:function(key){
					var params=this.getParams(key),
					id='';
					params=params.split('&');
					for(var i=0;i<params.length;i++){
							var tempparams=params[i].split('=');
							if(tempparams[0].indexOf('id')!=-1){
									id=tempparams[1];
									return id;
							}
					}
					return id;
			}
		};
		//搜索类型
		$(function(){
			var $searchshow=$('#searchshow'),
				$searchtype=$('#searchtype'),
				$searchselect=$('#searchselect');
				
				
			//初始化搜索事件
			var init_select=$searchselect.find('li:first');
			$searchtype.val(init_select.attr('data-key'));
			$searchshow.text(init_select.text());
			
			//绑定搜索事件
			$searchselect.delegate('li','click',function(){
					var $this=$(this),
						value=$this.text(),
						key=$this.attr('data-key');
						
						$searchtype.val(key);
						$searchshow.text(value);
			});
			
		});
		
		
		//主导航"免费申请设计"按钮弹窗
		$(function(){
			$mainmenu_apply=$('#mainmenu_apply');
			
			//初始化模态窗口
			Modal_Dialog.modalInit(['login','apply','info_success']);
			
			//模态窗口调用
			$mainmenu_apply.on('click',function(){
					//申请窗口调用
					Modal_Dialog.modal('apply',function(){
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
											self.modalHide('apply');
											//弹窗相关提示窗口
											self.modal('info_success');
										},200);
									},
									error: function(){}
							});
							
						
					});
			});
		});
		
		//导航高亮
		(function(){
				var winurl=window.location.href,
						currenturl=winurl.lastIndexOf('/'),
						menuurl_map={
									0:["index"],
									1:["gallery"],
									2:["case"],
									3:["decorate"],
									4:["company"],
									5:["guide"]	
						};
						common.winurl=winurl;
				
						if(currenturl!=-1){
								currenturl=winurl.slice(currenturl + 1);
								common.currenturl=currenturl;
								var $menuitem=$('#main_menuitem').children();
								loopouter:for(var i in menuurl_map){
										var tempitem=menuurl_map[i],
												len=tempitem.length,
												j=0;
										for(j;j<len;j++){
												if(currenturl.indexOf(tempitem[j])!=-1){
														$menuitem.eq(i).addClass('menu-active');
														break loopouter;
												}
										}
								}
						}
						
						
				
		}());
		
		
		
		return common;
});







