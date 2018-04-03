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
				//上一图集
				imageset_prev:null,
				//下一图集
				imageset_next:null,
				//当前图集上一个子图片
				imageset_currentprev:null,
				//当前图集下一个子图片
				imageset_currentnext:null,
				//图集容器
				imageset_currentwrap:null,
				//图集上一张按钮
				marquee_prev:null,
				//图集下一张按钮
				marquee_next:null,
				//cookie key
				cookie:'gallery_params',
				//图集选中高亮样式
				setactive_class:'marquee-itemactive',
				//查询参数
				marqueeparams:'',
				//查询图集数量
				total:0,
				//查询ID值
				marqueeid:'',
				//查询条件
				marqueequery:'',
				//图集数据信息
				setMap:{
					//当前选中的图集序号
					index:0,
					//当前图集中选中的索引值
					active:0,
					//保存的三个图集图片
					prev:[],
					current:[],
					next:[]
				},
				//存放所以图集
				listdata:[],
				filterdata:[],
				//提示信息
				tipinfo:''
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
						$.extend(true,set,options);
						this.noop=fn;
						//初始化
						//从cookie或sessionStorage取数据
						var marqueestr=this.getParams(set.cookie),
								self=this;
						
						
						//判断是否是初始化数据
						if(marqueestr!==''){
								//组装请求参数
								set.marqueeparams=marqueestr;
								set.setMap.index=0;
								set.setMap.active=0;
								
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
									if(!set.filterdata||set.filterdata.length==0){
										return false;
								  };
									if(set.setMap.index===0){
										//已经是第一个子图片
										if(set.setMap.active===0){
											return false;
										}else{
											set.setMap.active--;
											self.doPrev();
										}
										return false;
									}else{
										if(set.setMap.active===0){
											set.setMap.index--;
											self.initRender();
										}else{
											set.setMap.active--;
											self.doPrev();
										}
									}
							});
					};
					
					//向后切换子图片
					for(var j=0;j<2;j++){
						nextbtn[j].on('click',function(){
								if(!set.filterdata||set.filterdata.length==0){
										return false;
								};
								if(set.setMap.index===set.filterdata.length - 1){
									if(set.setMap.active===set.setMap.current.length - 1){
											return false;
									}else{
											set.setMap.active++;
											self.doNext();
									}
								}else{
									if(set.setMap.active===set.setMap.current.length - 1){
										set.setMap.index++;
										self.initRender();
									}else{
										set.setMap.active++;
										self.doNext();
									}
								}
						});
					}
					
					//绑定单个事件
					set.imageset_currentwrap.delegate('em','click',function(){
						if(!set.filterdata||set.filterdata.length==0){
								return false;
						};
						 var $this=$(this),
						 		 index=$this.index();
								
								 set.setMap.active=index;
								 self.doItem();
					});
					
					//绑定上图集
					set.imageset_prev.on('click',function(){
							if(!set.filterdata||set.filterdata.length==0){
										return false;
								};
							if(set.setMap.index===0){
								var isprev=self.getPrevData();
								if(typeof self.noop==='function'&&self.noop&&isprev){
										self.noop.call(self,set,false);
								}
							}else{
								set.setMap.index--;
								self.initRender();
							}
					});
					
					//绑定下图集
					set.imageset_next.on('click',function(){
						if(!set.filterdata||set.filterdata.length==0){
										return false;
								};
							if(set.setMap.index===set.filterdata.length - 1){
								var isnext=self.getNextData();
								set.setMap.index=0;
								if(typeof self.noop==='function'&&self.noop&&isnext){
										self.noop.call(self,set,false);
								}
							}else{
								set.setMap.index++;
								self.initRender();
							}
					});

				},
				//初始化渲染显示
				initRender:function(){
						var map=set.setMap;
						if(set.listdata){
							//合并数据
							this.filterData();
							//设置图集数据
							this.doMarquee();
						}else{
							set.marquee_prevbtn.css({'top':63});
							set.marquee_nextbtn.css({'top':63});
							set.marquee_show.css({'width':200,'height':200});
							set.marquee_image.html('');
							set.imageset_currentwrap.html('');
							set.imageset_prev.html('');
							set.imageset_next.html('');
							map.active=0;
							map.index=0;
						}						
				},
				/*
				过滤数据：将返回数据过滤成合适的数据
				*/
				filterData:function(){
						var resdata=set.listdata.splice(0);
						
						while(resdata.length>0){
							var outerid=resdata[0]['galleryId'],
									setobj=[],
									deladdress=[];
									
									setobj.push(resdata[0]);
									resdata.splice(0,1);
									var jlen=resdata.length,
											j=0;
									
									for(j;j<jlen;j++){
											var innerid=resdata[j]['galleryId'];
											if(outerid==innerid){
													setobj.push(resdata[j]);
													deladdress.push(j);                 
											}
									}
									set.filterdata.push(setobj);
									var i=deladdress.length - 1;
									if(i>=0){
											for(i;i>=0;i--){
													resdata.splice(deladdress[i],1);
											}
									}
						};
				},
				/*
					处理效果并辅助初始化渲染
				*/
				doMarquee:function(){
							//不同的事件切换
							var map=set.setMap,
								data=set.filterdata;
							
							map.active=0;
							map.current=data[map.index];
							
							if(map.index===0){
								map.next=data[map.index + 1];
								this.initNext();
								set.imageset_prev.html('');
							}else if(map.index===data.length-1){
								map.prev=data[map.index - 1];
								set.imageset_next.html('');
								this.initPrev();
							}else{
								map.prev=data[map.index - 1];
								map.next=data[map.index + 1];
								this.initPrev();
								this.initNext();
							}
						
							
							var cur_info=map.current[map.active],
							image=$('<img src="'+cur_info['bigImg']+'" alt="'+cur_info['name']+'" >');
							
							//设置显示值
							image.appendTo(set.marquee_image.html(''));
							set.marquee_theme.text(cur_info['name']);
							
							//设置显示样式
							var curwidth=image.width(),
									curheight=image.height();
							set.marquee_prevbtn.animate({'top':curheight/2 - 37},200);
							set.marquee_nextbtn.animate({'top':curheight/2 - 37},200);
							if(curwidth>1400){
								var tempsf=1400/curwidth;
								set.marquee_show.animate({'width':curwidth * tempsf,'height':curheight * tempsf},200);
							}else{
								set.marquee_show.animate({'width':curwidth,'height':curheight},200);
							}
							
							
							//引导列部分
							var len=map.current.length,
									i=0,
									str='';
							for(i;i<len;i++){
									var info=map.current[i];
									if(map.active===i){
											str+='<em class="'+set.setactive_class+'"><img src="'+info['bigImg']+'" alt="'+info['name']+'"><i>'+parseInt(i+1)+'/'+len+'</i></em>';
									}else{
										str+='<em><img src="'+info['bigImg']+'" alt="'+info['name']+'"><i>'+parseInt(i+1)+'/'+len+'</i></em>';
									}
							}
							if(len>=5){
									$(str).appendTo(set.imageset_currentwrap.html('').animate({'width':len * 80,'left':0},200));
							}else{
									$(str).appendTo(set.imageset_currentwrap.html('').animate({'width':400,'left':0},200));
							}	
				},
				/*
					处理初始化渲染上一个
				*/
				initPrev:function(){
					var prev=set.setMap.prev[0];
							
					$('<img src="'+prev['bigImg']+'" alt="'+prev['name']+'" ><i>'+set.setMap.prev.length+'张</i>').appendTo(set.imageset_prev.html(''));
				},
				/*
					处理初始化渲染下一个
				*/
				initNext:function(){
					var next=set.setMap.next[0];
							
					$('<img src="'+next['bigImg']+'" alt="'+next['name']+'" ><i>'+set.setMap.next.length+'张</i>').appendTo(set.imageset_next.html(''));
				},
				/*
					处理上一个
				*/
				doPrev:function(){
					var map=set.setMap,
							prev=map.current[map.active];
					
					$image=$('<img src="'+prev['bigImg']+'" alt="'+prev['name']+'" >');
					
					//设置显示值
					$image.appendTo(set.marquee_image.html(''));
					set.marquee_theme.text(prev['name']);
					
					//设置显示样式
					var curwidth=$image.width(),
							curheight=$image.height();
					set.marquee_prevbtn.animate({'top':curheight/2 - 37},200);
					set.marquee_nextbtn.animate({'top':curheight/2 - 37},200);
					if(curwidth>1400){
						var tempsf=1400/curwidth;
						set.marquee_show.animate({'width':curwidth * tempsf,'height':curheight * tempsf},200);
					}else{
						set.marquee_show.animate({'width':curwidth,'height':curheight},200);
					}
					
					var imageitem=set.imageset_currentwrap.find('em');
					imageitem.eq(map.active).addClass(set.setactive_class);	
					imageitem.eq(map.active + 1).removeClass(set.setactive_class);
					if(map.active>=5){
							set.imageset_currentwrap.animate({'left':-parseInt(map.active - 4) * 80},200);
					}
				},
				/*
					处理下一个
				*/
				doNext:function(){
					var map=set.setMap,
							next=map.current[map.active];	
					
					$image=$('<img src="'+next['bigImg']+'" alt="'+next['name']+'" >');
					
					//设置显示值
					$image.appendTo(set.marquee_image.html(''));
					set.marquee_theme.text(next['name']);
					
					//设置显示样式
					var curwidth=$image.width(),
							curheight=$image.height();
					set.marquee_prevbtn.animate({'top':curheight/2 - 37},200);
					set.marquee_nextbtn.animate({'top':curheight/2 - 37},200);
					if(curwidth>1400){
						var tempsf=1400/curwidth;
						set.marquee_show.animate({'width':curwidth * tempsf,'height':curheight * tempsf},200);
					}else{
						set.marquee_show.animate({'width':curwidth,'height':curheight},200);
					}
					
					var imageitem=set.imageset_currentwrap.find('em');
					imageitem.eq(map.active).addClass(set.setactive_class);
					imageitem.eq(map.active - 1).removeClass(set.setactive_class);
					if(map.active>=5){
							set.imageset_currentwrap.animate({'left':-parseInt(map.active - 4) * 80},200);
					}
				},
				/*
					处理当个
				*/
				doItem:function(){
					var map=set.setMap,
							current=map.current[map.active];
					
					$image=$('<img src="'+current['bigImg']+'" alt="'+current['name']+'" >');
					
					//设置显示值
					$image.appendTo(set.marquee_image.html(''));
					set.marquee_theme.text(current['name']);
					
					//设置显示样式
					var curwidth=$image.width(),
							curheight=$image.height();
					set.marquee_prevbtn.animate({'top':curheight/2 - 37},200);
					set.marquee_nextbtn.animate({'top':curheight/2 - 37},200);
					if(curwidth>1400){
						var tempsf=1400/curwidth;
						set.marquee_show.animate({'width':curwidth * tempsf,'height':curheight * tempsf},200);
					}else{
						set.marquee_show.animate({'width':curwidth,'height':curheight},200);
					}

					
					
					
					var imageitem=set.imageset_currentwrap.find('em');
					imageitem.eq(map.active).addClass(set.setactive_class).siblings().removeClass(set.setactive_class);
					var len=map.current.length,
							temppos=0;
					
					if(len>=6&&map.active>=4){
						temppos=-parseInt(len/2)*80;
					}else{
						temppos=0;
					}
					set.imageset_currentwrap.animate({'left':temppos},200);
				},
				/*
					向前获取10个图集记录
				*/
				getPrevData:function(){
					var tempstr=set.marqueeid.split('='),
							id=parseInt(tempstr[1],10) - 10;
							if(id>0){
									set.marqueeid=tempstr[0]+'='+id;
									set.marqueeparams=set.marqueeid+set.marqueequery;
									this.setParams(set.cookie,set.marqueeparams);
									return true;
							}else{
								return false;
							}
				},
				/*
					向后获取10个图集记录
				*/
				getNextData:function(){
					var tempstr=set.marqueeid.split('='),
							id=parseInt(tempstr[1],10) + 10;
							
							if(id<=set.total){
									set.marqueeid=tempstr[0]+'='+id;
									set.marqueeparams=set.marqueeid+set.marqueequery;
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