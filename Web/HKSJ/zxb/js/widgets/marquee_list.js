/*
author:yipin,
name:marquee
图库详情浏览
*/
define(['jquery'],function ($) {
	
		var set={
				//主题显示界面
				marquee_theme:null,
				//图片显示容器
				marquee_show:null,
				//图片上一张按钮
				marquee_prevbtn:null,
				//图片下一张按钮
				marquee_nextbtn:null,
				//图片展示
				marquee_image:null,
				//当前图集上一个子图片
				imageset_currentprev:null,
				//当前图集下一个子图片
				imageset_currentnext:null,
				//图集容器
				imageset_currentwrap:null,
				//cookie key
				cookie:'marquee_params',
				//图集选中高亮样式
				setactive_class:'marquee-itemactive',
				//查询参数
				marqueeparams:'',
				//查询图集数量
				total:0,
				//每页图集数量
				pageSize:30,
				//当前第几页
				pageNum:1,
				//查询ID值
				marqueepagenumber:'',
				//查询条件
				marqueequery:'',
				//当前选中的id值
				marqueeid:'',
				//图集数据信息
				active:0,
				//存放所以图集
				listdata:[]
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
				marquee:function(options,fn){
						//合并参数
						$.extend(set,options);
						this.noop=fn;
						//初始化
						//从cookie或sessionStorage取数据
						var marqueestr=this.getParams(set.cookie),
								self=this;
						
						
						//判断是否是初始化数据
						if(marqueestr!==''){
								//组装请求参数
								var tempstr=marqueestr.split('&');
								for(var i=0;i<tempstr.length;i++){
										if(tempstr[i].toLowerCase().indexOf('pagenum')!=-1){
											set.marqueepagenumber=tempstr[i];
										}else if(tempstr[i].indexOf('id')!=-1){
											set.marqueeid=tempstr[i];
										}else{
											set.marqueequery+='&'+tempstr[i];
										}
								}
								set.marqueeparams=set.marqueepagenumber+'&'+set.marqueeid+set.marqueequery;
								
								
								//初始化查询
								if(fn&&typeof fn==='function'){
										/*
											回调函数
											参数说明：this指针对象，set配置参数，是否初始化标识
										*/
										fn.call(self,set,true);
								}
						}else{
								
								//事件监听查询
								if(fn&&typeof fn==='function'){
										fn.call(self,set,false);
								}
						}
						this.initMarquee();
				},
				//初始化展现或事件绑定
				initMarquee:function(){
					var self=this;
					//初始化渲染
					
					//事件绑定
					//图片展示区事件绑定
					var prevbtn=[set.marquee_prevbtn,set.imageset_currentprev],
							nextbtn=[set.marquee_nextbtn,set.imageset_currentnext];
					
					//向前切换子图片
					for(var i=0;i<2;i++){
							prevbtn[i].on('click',function(){
									if(!set.listdata||set.listdata.length==0){
										return false;
									};
									if(set.active===0){
										var isprev=self.getPrevData(set.pageSize);
										if(typeof self.noop==='function'&&self.noop&&isprev){
												self.noop.call(self,set,false);
										}
									}else{
										set.active--;
										self.doPrev();
									}
							});
					};
					
					//向后切换子图片
					for(var j=0;j<2;j++){
						nextbtn[j].on('click',function(){
								if(!set.listdata||set.listdata.length==0){
										return false;
								};
								if(set.active===set.listdata.length - 1){
										var isnext=self.getNextData(set.pageSize);
										if(typeof self.noop==='function'&&self.noop&&isnext){
												self.noop.call(self,set,false);
										}
								}else{
										set.active++;
										self.doNext();
								}
						});
					}
					
					//绑定单个事件
					set.imageset_currentwrap.delegate('em','click',function(){
						 if(!set.listdata||set.listdata.length==0){
									return false;
						 };
						 
						 var $this=$(this),
						 		 index=$this.index();
								
								 set.active=index;
								 self.doItem();
					});

				},
				//初始化渲染显示
				initRender:function(flag){
								data=set.listdata;
						if(set.listdata.length!==0){
							//设置图集数据
							this.doMarquee(flag);
						}else{
							set.marquee_prevbtn.css({'top':63});
							set.marquee_nextbtn.css({'top':63});
							set.marquee_show.css({'width':200,'height':200});
							set.marquee_image.html('');
							set.imageset_currentwrap.html('').css({'width':880,'left':0});
							set.active=0;
						}						
				},
				/*
					处理效果并辅助初始化渲染
				*/
				doMarquee:function(flag){								
							//引导列部分
							var len=set.listdata.length,
									i=0,
									str='';
									
							if(flag){
								var curid=set.marqueeid.split('=');
								for(i;i<len;i++){
									var images=set.listdata[i];
									if(images['id']==curid[1]){
											set.active=i;
											str+='<em class="'+set.setactive_class+'"><img src="'+images['bigImg']+'" data-id="'+images['id']+'" alt="'+images['name']+'"><i>'+parseInt(i+1)+'/'+len+'</i></em>';
									}else{
										str+='<em><img src="'+images['bigImg']+'" data-id="'+images['id']+'" alt="'+images['name']+'"><i>'+parseInt(i+1)+'/'+len+'</i></em>';
									}
								}
							}else{
								set.active=0;
								for(i;i<len;i++){
									var images=set.listdata[i];
									if(i==0){
											str+='<em class="'+set.setactive_class+'"><img src="'+images['bigImg']+'" data-id="'+images['id']+'" alt="'+images['name']+'"><i>'+parseInt(i+1)+'/'+len+'</i></em>';
									}else{
										str+='<em><img src="'+images['bigImg']+'" data-id="'+images['id']+'" alt="'+images['name']+'"><i>'+parseInt(i+1)+'/'+len+'</i></em>';
									}
								}
								
							}
									
							this.doRender();
							
							if(len>=10){
									if(flag&&set.active>=10){
										$(str).appendTo(set.imageset_currentwrap.html('').animate({'width':len * 80,'left':-(set.active-5)*80}),200);
									}else{
										$(str).appendTo(set.imageset_currentwrap.html('').animate({'width':len * 80,'left':0},200));
									}
									
							}else{
									$(str).appendTo(set.imageset_currentwrap.html('').animate({'width':880,'left':0},200));
							}	
				},
				/*
					辅助渲染方法：当前选中对象
				*/
				doRender:function(){
					var cur=set.listdata[set.active],
							$image=$('<img src="'+cur['bigImg']+'" alt="'+cur['name']+'" >');
					
					//设置显示值
					$image.appendTo(set.marquee_image.html(''));
					if(set.marquee_theme){
						set.marquee_theme.text(cur['name']);
					}
					
					
					//设置显示样式
					var curwidth=$image.width(),
							curheight=$image.height();
					set.marquee_prevbtn.animate({'top':curheight/2 - 37},200);
					set.marquee_nextbtn.animate({'top':curheight/2 - 37},200);
					set.marquee_show.animate({'width':curwidth,'height':curheight},200);
				},
				/*
					处理上一个
				*/
				doPrev:function(){
					this.doRender();
					var imageitem=set.imageset_currentwrap.find('em');
					imageitem.eq(set.active).addClass(set.setactive_class);	
					imageitem.eq(set.active + 1).removeClass(set.setactive_class);
					if(set.active>=10){
							set.imageset_currentwrap.animate({'left':-parseInt(set.active - 5) * 80},200);
					}else{
							set.imageset_currentwrap.animate({'left':0},200);
					}
				},
				/*
					处理下一个
				*/
				doNext:function(){
					this.doRender();
					
					var imageitem=set.imageset_currentwrap.find('em');
					imageitem.eq(set.active).addClass(set.setactive_class);
					imageitem.eq(set.active - 1).removeClass(set.setactive_class);
					if(set.active>=10){
							set.imageset_currentwrap.animate({'left':-parseInt(set.active - 5) * 80},200);
					}else{
							set.imageset_currentwrap.animate({'left':0},200);
					}
				},
				/*
					处理当个
				*/
				doItem:function(){
					this.doRender();

					var imageitem=set.imageset_currentwrap.find('em');
					imageitem.eq(set.active).addClass(set.setactive_class).siblings().removeClass(set.setactive_class);
					
					if(set.active>=10){
							set.imageset_currentwrap.animate({'left':-parseInt(set.active - 5) * 80},200);
					}else{
							set.imageset_currentwrap.animate({'left':0},200);
					}
				},
				/*
					向前获取n个图片记录
				*/
				getPrevData:function(n){
					var tempnum=set.marqueepagenumber.split('='),
							pagenumber=parseInt(tempnum[1],10) - 1,
							id=set.listdata[set.active]['id'];
							
							if(pagenumber>0){
									set.marqueeid='id='+id;
									set.marqueepagenumber=tempnum[0]+'='+pagenumber;
									set.marqueeparams=set.marqueepagenumber+'&'+set.marqueeid+set.marqueequery;
									this.setParams(set.cookie,set.marqueeparams);
									return true;
							}else{
								return false;
							}
				},
				/*
					向后获取n个图集记录
				*/
				getNextData:function(n){
					var tempnum=set.marqueepagenumber.split('='),
							pagenumber=parseInt(tempnum[1],10) + 1,
							id=set.listdata[set.active]['id'];
							
							var pagemax=set.total%n===0?set.total/n:parseInt(set.total/n) + 1;
							
							if(pagenumber<=pagemax){
									set.marqueeid='id='+id;
									set.marqueepagenumber=tempnum[0]+'='+pagenumber;
									set.marqueeparams=set.marqueepagenumber+'&'+set.marqueeid+set.marqueequery;
									this.setParams(set.cookie,set.marqueeparams);
									return true;
							}else{
								 return false;
							}
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
				},
				/*
					清除内部参数：去除请求参数到cookie或者Stroage
					参数说明：key索引
				*/
				removeParams:function(key){
					if(this.supportStorage){
							window.sessionStorage[key]='';
					}else{
						if(typeof $.cookie==='function'){
								$.removeCookie(key);
						}
					}
				}
		}
				
});