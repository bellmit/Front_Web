/*
作用：案例详情服务类
编写：易品
*/
define(['jquery','comment_reply'],function($,Comment_Reply){
	return {
				/*
					初始化方法
				*/
				init:function(opt){
						//初始化dom节点引用
						this.$image_navwrap=$('#image_navwrap');
						this.$image_navtab=$('#image_navtab');
						this.$image_navbtn=$('#image_navbtn');
						this.$image_listitem=$('#image_listitem');
						this.$comment_wrap=$('#comment_wrap');
						this.$caseshow_person=$('#caseshow_person');
						//合并变量
						$.extend(this,opt);
						//初始化及相关常量
						this.navtop=$(window).scrollTop();
						this.casestr=this.getParams('case_params');
						this.curid='';
						this.classname={
								'客厅':'image-list-kticon',
								'卧室':'image-list-wsicon',
								'餐厅':'image-list-cticon',
								'厨房':'image-list-cficon',
								'卫生间':'image-list-wsjicon',
								'阳台':'image-list-yticon',
								'书房':'image-list-sficon',
								'玄关':'image-list-xgicon',
								'儿童房':'image-list-etficon',
								'衣帽间':'image-list-ymjicon',
								'花园':'image-list-hyicon'
						};
						//简介模板
						this.info_template='<div class="person-image">'+
									'		<img src="$desHeadPortraitUrl" alt="" >'+
									'		</div>'+
									'		<div class="person-info">'+
									'				<h1>$name</h1>'+
									'				<p><span>参考预算：<em>$budget万元</em></span><span>户型：$housetype</span><span>风格：$style</span><span>$aream<sup>2</sup></span></p>'+
									'				<p><span>所在地：$inArea</span><span>所在楼盘:$Town</span></p>'+
									'				<p>装修公司：$decName</p>'+
									'		 <div id="person_like" class="like">'+
									'				<span></span>喜欢（<i>$greatNumber</i>）'+
									'		 </div>'+
									'		 <div id="person_warn" class="warn">'+
									'				<span></span>举报'+
									'		 </div>'+
									'</div>';
						//导航html模板
						this.nav_template='<dt>'+
									'   <a href="#space_$index">$space<span></span></a>'+
									'</dt>'+
									'<dd><span></span></dd>'+
									'<dd><span></span></dd>'+
									'<dd><span></span></dd>';
						//列表描述html模板
						this.listinfo_template='<li id="space_$index">'+
									'		<div class="image-listremark">'+
									'				$remark'+
									'		</div>'+
									'</li>';
						//列表图片html模板
						this.listimage_template='<li id="space_$index">'+
									'		<h3><span class="$classicon"></span>$space</h3>'+
									'$imageitem'+
									'</li>';
						//列表图片组html模板
						this.imageitem_template='<div class="image-listimg">'+
									'   <img src="$url">'+
									'   <div><span></span><p>$subsetRemark</p></div>'+
									'</div>';
						//初始化数据
						this.initData();
						//事件绑定
						this.bindEvents();
				},
				/*
					获取数据
				*/
				initData:function(){
						//获取当前id
						if(this.casestr!=''){
								var tempstr=this.casestr.split('&');
								for(var o=0;o<tempstr.length;o++){
										if(tempstr[o].indexOf('id')!=-1){
											this.curid=tempstr[o].split('=')[1];
											break;
										}
								}
								if(this.curid!=''){
									//获取装修公司信息
									this.getInfoData();
									//初始化请求评论列表
									Comment_Reply.extendParams({
										comment:{
											data:'id='+this.curid
										}
									});
									Comment_Reply.getCommentData();
									//初始化请求相册列表
									this.getListData();
								}
						}else{
							this.render(false);
						}
				},
				/*
					渲染方法
				*/
				render:function(flag){
						if(flag){
								//左侧导航相关变量
								var menusize=this.$image_navtab.children().size(),
								itemobj=this.$image_listitem.children(),
								imagewrap_height=menusize * 25;
								this.image_screen=imagewrap_height>400?parseInt(imagewrap_height/400,10) - 1:0;
								this.image_count=0;
								this.menudt=this.$image_navtab.children('dt');
								this.itemsize=itemobj.size();
								this.imageitem_pos=[];
								for(var m=0;m<this.itemsize;m++){
									this.imageitem_pos.push(itemobj.eq(m).offset().top);
								}
								this.max_height=this.imageitem_pos[this.itemsize - 1];
								
								
								//初始化滚动条监听
								if(this.navtop>=0&&this.navtop<=500){
										this.$image_navwrap.css({'top':500 - this.navtop});
								}else if(this.navtop>=this.max_height){
										this.$image_navwrap.css({'top':this.max_height-this.navtop});
								}else{
										this.$image_navwrap.css({'top':0});
								}
								if(this.navtop>=220){
									this.$case_form.addClass('case-formfixed');
									for(var j=0;j<this.itemsize;j++){
										var initpos=parseInt(this.imageitem_pos[j]),
												initpos_pre=initpos  - 300,
												initpos_next=initpos  + 300;
											if((this.navtop>=initpos_pre)&&(this.navtop<=initpos_next)){
													this.menudt.eq(j).addClass('image-navactive').siblings('dt').removeClass('image-navactive');
													break;
											}
									}
								}else{
									this.$case_form.removeClass('case-formfixed');
									this.menudt.eq(0).addClass('image-navactive').siblings('dt').removeClass('image-navactive');
								}
						}else{
								//左侧导航相关变量
								var menusize=0,
								itemobj=null,
								imagewrap_height=0;
								this.image_screen=0;
								this.image_count=0;
								this.menudt=null;
								this.itemsize=0;
								this.imageitem_pos=[];
								this.max_height=650;
								
								
								//初始化滚动条监听
								if(this.navtop>=0&&this.navtop<=500){
										this.$image_navwrap.css({'top':500 - this.navtop});
								}else if(this.navtop>=this.max_height){
										this.$image_navwrap.css({'top':this.max_height-this.navtop});
								}else{
										this.$image_navwrap.css({'top':0});
								}
								if(this.navtop>=220){
									this.$case_form.addClass('case-formfixed');
								}else{
									this.$case_form.removeClass('case-formfixed');
								}
						}
				},
				/*
					事件绑定
				*/
				bindEvents:function(){
						var self=this;
						//监听滚动条事件
						var imagecount=0;
						$(window).scroll(function(){
								imagecount++;
								if(imagecount>=10000){
									imagecount=0;
								}
								var $this=$(this),
								curtop=$this.scrollTop();
								if(curtop>=0&&curtop<=500){
										self.$image_navwrap.css({'top':500 - curtop});
								}else if(curtop>=self.max_height){
										self.$image_navwrap.css({'top':self.max_height-curtop});
								}else{
										self.$image_navwrap.css({'top':0});
								}
								if(curtop>=220){
									self.$case_form.addClass('case-formfixed');
									if(self.curid!=''){
										if(imagecount%2==0){
												for(var i=0;i<self.itemsize;i++){
													var pos=parseInt(self.imageitem_pos[i]),
															pos_pre=pos  - 300,
															pos_next=pos  + 300;
															if((curtop>=pos_pre)&&(curtop<=pos_next)){
																self.menudt.eq(i).addClass('image-navactive').siblings('dt').removeClass('image-navactive');
																break;
															}
												}
										}
									}
								}else{
									self.$case_form.removeClass('case-formfixed');
									if(self.curid!=''){
										self.menudt.eq(0).addClass('image-navactive').siblings('dt').removeClass('image-navactive');
									}
								}
						});
						//navtab效果切换
						this.$image_navtab.delegate('dt','click',function(e){
								var $this=$(this);
								$this.addClass('image-navactive').siblings('dt').removeClass('image-navactive');
						});
						//绑定左侧导航上下切换
						this.$image_navbtn.on('click',function(){
								if(self.image_screen==0){
										return false;
								}
								
								var $this=$(this);
					
								
								if($this.hasClass('image-navbtnactive')){
										if(self.image_count>0){
											self.image_count--;
											self.$image_navtab.animate({'top':-self.image_count * 400},500);
										}else{
											self.$image_navtab.animate({'top':0},500);
											self.$image_navbtn.removeClass('image-navbtnactive');
										}
								}else{
									if(self.image_count<self.image_screen){
											self.image_count++;
									}else{
											self.$image_navbtn.addClass('image-navbtnactive');
									}
									self.$image_navtab.animate({'top':-self.image_count * 400},500);
								}
								
								
								
							
						});
				},
				/*
				获取列表数据(to do)
				*/
				getListData:function(){
							var listset=[],
									navset=[],
									self=this;
						$.ajax({
								url:'../../json/caseshow_list.json',
								type:'get',
								dataType:"json",
								data:'id='+self.curid,
								async:false,
								success: function(result){
										var i=0,
												listdata=result.caseList,
												len=listdata.length;
										if(len!==0){
												var navstr='',
														htmlstr='',
														itemstr='';
												for(i;i<len;i++){
														navstr=self.nav_template;
														if(i==0){
															//当第一个数据时获取描述模板
															htmlstr=self.listinfo_template;
															//左侧导航
															navset.push(navstr.replace('$index',i)
															.replace('$space','案例简介'));
															//右侧列表
															listset.push(htmlstr.replace('$index',i)
															.replace('$remark',function(){
																	var remark=listdata[i]['remark'];
																	if(remark.indexOf('\n\r')!=-1){
																		remark=remark.split('\n\r');
																		return '<p>'+remark.join('</p><p>')+'</p>';
																	}else if(remark.indexOf('.')!=-1){
																		remark=remark.split('.');
																		return '<p>'+remark.join('</p><p>')+'</p>';
																	}else if(remark.indexOf('。')!=-1){
																		remark=remark.split('。');
																		return '<p>'+remark.join('</p><p>')+'</p>';
																	}else{
																		return '<p>'+remark+'</p>';
																	}
															}));
														}else{
															//非第一个时获取列表模板
															htmlstr=self.listimage_template;
															//左侧导航
															navset.push(navstr.replace('$index',i)
															.replace('$space',listdata[i]['space']));
															//右侧列表
															listset.push(htmlstr.replace('$index',i)
															.replace('$classicon',function(){
																	return self.classname[listdata[i]['space']];
															})
															.replace('$space',listdata[i]['space'])
															.replace('$imageitem',function(){
																	var itemstr='',
																			imageitem=listdata[i]['imageItem'],
																			len=imageitem.length,
																			j=0,
																			tempitem=[];
																	if(len!=0){
																			for(j;j<len;j++){
																				itemstr=self.imageitem_template;
																				tempitem.push(itemstr.replace('$url',imageitem[j]['url'])
																				.replace('$subsetRemark',imageitem[j]['subsetRemark']));
																			}
																			return tempitem.join('');
																	}
																	return '';
															}));
														}
												}	
												$(navset.join('')).appendTo(self.$image_navtab);
												$(listset.join('')).appendTo(self.$image_listitem);
										}
								},
								error:function(){}
						});
						//初始化渲染
						this.render(true);
				},
				/*
				获取个人信息
				*/
				getInfoData:function(){
						var infostr=this.getParams('case_info');
						if(infostr!==''&&infostr){
							infostr=$.parseJSON(this.getParams('case_info'));
							infostr=this.info_template.replace('$desHeadPortraitUrl',infostr['desHeadPortraitUrl'])
							.replace('$name',infostr['name'])
							.replace('$budget',infostr['budget'])
							.replace('$housetype',infostr['housetype'])
							.replace('$style',infostr['style'])
							.replace('$area',infostr['area'])
							.replace('$inArea',infostr['inArea'])
							.replace('$decName',infostr['decName'])
							.replace('$greatNumber',infostr['greatNumber'])
							.replace('$Town',infostr['Town'])
							.replace('$inArea',infostr['inArea']);
							
							
							$(infostr).insertBefore(this.$caseshow_person);
						}	
						
				},
				/*
					是否支持本地存储
				*/
				supportStorage:(function(){
						return window.sessionStorage?true:false;
				}()),
				/*
					设置内部参数：设置请求参数到cookie或者Stroage
					参数说明：key索引，value请求字符串
				*/
				setParams:function(key,value){
					if(this.supportStorage){
							window.sessionStorage[key]=value;
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
								return window.sessionStorage[key]?window.sessionStorage[key]:'';
					}else{
						if(typeof $.cookie==='function'){
								return $.cookie(key)?$.cookie(key):'';
						}
					}
					return '';
				}
	}
	
	
});


