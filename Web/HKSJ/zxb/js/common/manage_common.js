define(['jquery','cookie'],function($){
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

	
	//左侧导航
	$(function(){
				//绑定左侧导航事件
				 //初始化
				 var wurl=window.location.href,
						 lastprefix=wurl.lastIndexOf('/'),
						 menuurl_map={
									'company-part':['brief_manage','certificate','register_info','article_advisory','article_advisory_add','contact','five-star'],
									'design-part':['stylist_manage_list','stylist_manage'],
									'case-part':['unloading_case'],
									'active-part':['coupon_active']
						};
				 if(lastprefix!==-1){
						var currenturl=wurl.slice(lastprefix+1),
						$zxb_menu_box=$('#zxb_menu_box');
						common.currenturl=currenturl,
						$menuitems=$zxb_menu_box.find('a'),
						menulen=$menuitems.size(),
						m=0;
	outerloop:for(m;m<menulen;m++){
								var $this=$($menuitems[m]),
										href=$this.attr('href');
								if(href==currenturl){
										$this.parent().addClass('child-menu-on');
										break outerloop;
								}else{
										var subpart=$this.attr('data-part');
										if(subpart&&subpart!=''){
											var parts=menuurl_map[subpart],
													len=parts.length,
													i=0;
													if(parts){
															for(i;i<len;i++){
																	if(currenturl.indexOf(parts[i])!=-1){
																			$this.parent().addClass('child-menu-on');
																			break outerloop;
																	}
															}
													}
										}
								}
							
						}
				 }
				 //绑定左侧导航事件监听
				 $('.parent-menu').children('a').on('click',function(){
							var $this=$(this),
									$parent=$this.parent('.parent-menu'),
									dataStatus =$parent.attr('data_status');
							if(dataStatus=='hide'){
									$parent.find('.child-menu').show();
									$parent.attr('data_status','show');
									$this.find('i').removeClass('pm-icon-close').addClass('pm-icon-open');
							}else{
									$parent.find('.child-menu').hide();
									$parent.attr('data_status','hide');
									$this.find('i').removeClass('pm-icon-open').addClass('pm-icon-close');
							}
				});
				
				 //绑定商户中心--店铺管理导航
				 var $brief_subnav=$('#brief_subnav');
				 if($brief_subnav.length!=0){
					 	var $subnav=$brief_subnav.children(),
								sublen=$subnav.length,
								i=0;
						for(i;i<sublen;i++){
								var $tempitem=$subnav.eq(i),
								temphref=$tempitem.find('a').attr('href');
								
								if(temphref==common.currenturl){
										$tempitem.addClass('brief-subnavactive');
										break;
								}else if(i==3&&common.currenturl.indexOf('article_advisory')!=-1){
										$tempitem.addClass('brief-subnavactive');
										break;
								}
						}
				 }
		
	});
	

	
	return common;
});