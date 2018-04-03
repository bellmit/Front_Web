/*
author:yipin,
name:query
图库列表查询插件
*/
define(['jquery'],function ($) {
	
		var set={
				//图片统计量容器
				numberwrap:null,
				//图片展现容器
				listwrap:null,
				//查询更多条件
				itemmore:null,
				//查询更多条件选项
				itemmore_set:[],
				//查询更多条件显示隐藏样式
				itemmore_class:'g-d-hidei',
				//条件查询容器
				itemwrap:{},
				//已选择的条件
				itemquery:{},
				//参数对象
				itemparams:'',
				//选中条件的激活样式
				itemactive_class:'queryitem-active',
				//条件容器显示隐藏样式
				itemshow_class:'queryitem-show',
				//辅助清除按钮显示隐藏的样式
				itemsel_class:'queryitem-sel',
				//排序选中样式
				orderby_class:'itemorderby-active',
				//存储cookie 值
				cookie:'gallery_params',
				//排序关键字
				orderby:'new',
				//排序选择容器
				orderbywrap:null,
				//总记录数
				total:0,
				//每页显示记录数
				pageSize:10,
				//当前第几页
				pageNum:1,
				//分页容器
				pagewrap:null,
				//每次延迟加载20条记录
				screennum:5,
				//初始化正则匹配哈希
				initreg:/(space|houseType|type|part|style|color|budget)(_)(\d{0,})/i
		}
		
    return {
				//是否支持本地存储
				supportStorage:(function(){
						return window.sessionStorage?true:false;
				}()),
				/*
					入口函数：插件启动调用
					参数说明：配置对象，回调函数
				*/
				queryItem:function(options,fn,pfn){
						//合并参数
						$.extend(set,options);
						//初始化
						var winhash=window.location.hash,
								querystr,
								self=this;
								
						winhash=winhash.slice(1);
						if(winhash.length!==0&&set.initreg.test(winhash)){
								querystr=winhash.match(set.initreg);
								set.itemquery[querystr[1]]=querystr[3];
								this.initQueryItem(querystr[1],set);
								querystr=null;
						}else{
							//查询排序事件绑定(初始化)
							if(set.orderbywrap){
								var initob=set.orderbywrap.find('span').eq(0);
								initob.addClass(set.orderby_class).siblings().removeClass(set.orderby_class);
								set.orderby=initob.attr('data-orderby');
							}
						}
						//初始化查询
						if(fn&&typeof fn==='function'){
								fn.call(self,set,true);
						}
						
						//事件绑定
						//联合查询时间绑定
						var itemwrap=set.itemwrap;
						for(var i in itemwrap){
								itemwrap[i].delegate('span','click',function(){
										var $this=$(this);
										//防止重复点击查询
										if($this.hasClass(set.itemactive_class)){
												return false;
										}
										//正常操作
										var	$wrap=$this.parent(),
												curvalue=$this.attr('data-value').split('_');
												set.itemquery[curvalue[0]]=curvalue[1];
												$this.addClass(set.itemactive_class).siblings().removeClass(set.itemactive_class);
												//重置分页参数
												set.pageNum=1;
												set.total=0;
												if(!$wrap.hasClass(set.itemsel_class)){
														$wrap.addClass(set.itemsel_class);
												}					
												if(fn&&typeof fn==='function'){
														fn.call(self,set,false);
												}
								});
								itemwrap[i].delegate('div','click',function(){
										var $wrap=$(this).parent();
										$wrap.toggleClass(set.itemshow_class);
								});
								itemwrap[i].delegate('em','click',function(){
										//防止没有条件时也清除操作
										if($.isEmptyObject(set.itemquery)){
												return false;
										};
										
										var $self=$(this),
												$span=$self.prevAll(),
												$wrap=$self.parent();
												
										$.each($span,function(index,value){
											var $this=$(this);
											if($this.hasClass(set.itemactive_class)){
												$this.removeClass(set.itemactive_class);
												var curvalue=$this.attr('data-value').split('_');
												delete set.itemquery[curvalue[0]];
												$wrap.removeClass(set.itemsel_class);
												curvalue=null;
												if(fn&&typeof fn==='function'){
														fn.call(self,set,false);
												}
												return true;
											}
										});
										
								});
						}
						
						//更多查询条件显示隐藏
						if(set.itemmore){
								var $prev=set.itemmore.prevAll(),
										prevlen=$prev.size(),
										morelen=0;
								for(var j=0;j<prevlen;j++){
										if($prev.eq(j).hasClass(set.itemmore_class)){
												set.itemmore_set.push($prev.eq(j));
										}
								}
								morelen=set.itemmore_set.length;
								if(morelen!==0){
										set.itemmore.on('click',function(){
												if(set.itemmore.hasClass('queryitem-moreactive')){
														set.itemmore.removeClass('queryitem-moreactive');
												}else{
														set.itemmore.addClass('queryitem-moreactive');
												}
												for(var m=0;m<morelen;m++){
														if(set.itemmore_set[m].hasClass(set.itemmore_class)){
																set.itemmore_set[m].removeClass(set.itemmore_class);
														}else{
																set.itemmore_set[m].addClass(set.itemmore_class);
														}	
												}
										});
								}
						}
						
						//查询排序事件绑定
						if(set.orderbywrap){
							set.orderbywrap.delegate('span','click',function(){
									var $this=$(this);
											//防止重复排序
											if($this.hasClass(set.orderby_class)){
													return false;
											}
											
											//正常操作
											set.orderby=$this.attr('data-orderby');
											$this.addClass(set.orderby_class).siblings().removeClass(set.orderby_class);
											
											//重置分页参数
											set.pageNum=1;
											set.total=0;
	
											if(fn&&typeof fn==='function'){
													fn.call(self,set,false);
											}
							});
						}

						//绑定链接跳转事件（借助cookie或本地存储暂存数据）
						set.listwrap.delegate('a','click',function(e){
								var $this=$(this),
										id=$this.attr('data-id')||'';
										self.setParams(set.cookie,'id='+id+'&'+set.itemparams);
										if(pfn&&typeof pfn==='function'){
												//执行回调
												pfn.call($this,'id='+id+'&'+set.itemparams);
										}
										
						});
				},
				/*
					初始化页面效果
					参数说明：当前选择类型，配置对象
				*/
				initQueryItem:function(items,set){
						var itemwrap=set.itemwrap[items];
						if(itemwrap.find('div').length>=1){
							itemwrap.addClass(set.itemshow_class);
						}
						var value=set.itemquery[items];
						itemwrap.find('span').each(function(){
								var $this=$(this),
										curvalue=$this.attr('data-value').split('_');
								if(curvalue[1]==value){
										$this.addClass(set.itemactive_class);
										itemwrap.addClass(set.itemsel_class);
										return true;
								}
						});
						
						set.orderbywrap.find('span:first').addClass(set.orderby_class);
				},
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

		};
});