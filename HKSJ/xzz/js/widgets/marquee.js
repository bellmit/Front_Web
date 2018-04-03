/*
author:yipin,
name:marquee
图库浏览
*/
define(['jquery'],function ($) {
	

		
    return {
				/*
				*
				* 初始化方法
				* */
				init:function(opt){
					var self=this;

					//合并参数
					$.extend(true,this,opt);

					this.winwidth=$(window).width();
					this.index=0;
					this.winheight=$(window).height();

					//初始化提示对象
					this.callback=null;

					//存放所有图集信息
					this.listdata=[];
					this.len=this.listdata.length;

					//绑定事件
					this.bindEvents();

				},
				/*
				 事件绑定
				 */
				bindEvents:function(){

					var self=this;


					//绑定左右滑动查看
					this.$marquee_wrap.on('swipeleft swiperight',function(e){
						var type= e.type,
							current=e.target,
							node=current.nodeName.toLowerCase(),
							$this,
							index=0;

						if(node=='ul'){
							return false;
						}else if(node=='li'){
							$this=$(current);
							index=$this.index();
						}else if(node=='img'||node=='div'){
							$this=$(current).closest('li');
							index=$this.index();
						}

						switch(type){
							case 'swipeleft':
								if(index==self.len - 1){
									return false;
								}else{
									var tempindex=parseInt((index + 1),10);
									self.index=tempindex + 1;
									self.$marquee_wrap.animate({
										'left':-(tempindex * self.winwidth)
									},200);
									self.$marquee_number.text(self.index+'/'+self.len);

								}
								break;
							case 'swiperight':
								if(index==0){
									return false;
								}else{
									var tempindex=parseInt((index - 1),10);
									self.index=tempindex + 1;
									self.$marquee_wrap.animate({
										'left':-(tempindex * self.winwidth)
									},200);
									self.$marquee_number.text(self.index+'/'+self.len);
								}
								break;
						}
					});


					//绑定横竖屏切换
					$(window).on('orientationchange',function(e){
						self.winwidth=$(window).width();
						self.winheight=$(window).height();
						self.$marquee_number.text('1/'+self.len);
						self.$marquee_wrap.css({'left':'0'}).children().each(function(){
							$(this).css({'width':self.winwidth+'px','line-height':self.winheight+'px'});
						});
					});

				},
				/*
					渲染界面
				*/
				render:function(opt){
					var self=this;
					if(self.len==0){
						$.ajax({
							url:opt['url'],
							type:"post",
							data:opt['params'],
							dataType:"json",
							async:false,
							success:function(res){
								self.listdata=res['imgList'];
								self.len=self.listdata.length;
								$('<li style="'+self.winwidth+'px;line-height:'+self.winheight+'px;"><img alt="" src="'+self.listdata.join('" ></li><li style="'+self.winwidth+'px;line-height:'+self.winheight+'px;"><img alt="" src="')+'" ></li>').appendTo(self.$marquee_wrap);
								self.$marquee_wrap.css({
									'width':self.winwidth * self.len
								});

								self.$marquee_number.text('1/'+self.len);



							},
							error:function(){
								self.$marquee_wrap.html('');
								self.$marquee_number.text('');
							}
						});
					}
				},
				/*
					设置内部参数：设置请求参数到Stroage
					参数说明：key索引，value请求字符串
				*/
				setParams:function(key,value){
					window.sessionStorage.setItem(key,value);
				},
				/*
				 获取内部参数：从Stroage中获取请求参数
				 参数说明：key索引
				 返回获取的字符串值
				 */
				getParams:function(key){
					return window.sessionStorage.getItem(key)||'';
				},
				/*
				 删除内部参数：从Stroage中删除请求参数
				 参数说明：key索引
				 */
				removeParams:function(key){
					window.sessionStorage.removeItem(key);
				},
				/*
				 获取内部参数：从Stroage中获取请求id
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

					if(id==''){
						params=window.location.search.slice(1);
						console.log('bbb');
						if(params!=''){
							for(var i=0;i<params.length;i++){
								var tempparams=params[i].split('=');
								if(tempparams[0].indexOf('id')!=-1){
									id=tempparams[1];
									return id;
								}
							}
						}
					}
					return id;
				}
		}
				
});