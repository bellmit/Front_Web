(function($,w){
		/*好友印象服务对象*/
		var impression={
				/*初始化自身数据*/
				init:function(wrap){
						this.stylepos={
								'left':50,
								'top':50
						}
						this.template='<li class="impress-item" style="$style"><img alt="" src="$imgsrc" ><p>$content</p></li>';
						this.imgsrc='../../theme/default/images/web_iconmark.png';
						this.changeData(wrap);
				},
				/*随机生成坐标*/
				randomPos:function(){
						var self=this;
						var styleitem,temppos=0;
						this.items.each(function(index,item){
								styleitem=item.style;
								self.mathPos(index);
								styleitem.left=self.stylepos['left']+'%';
								styleitem.top=self.stylepos['top']+'px';
						});
				},
				/*坐标计算*/
				mathPos:function(index){
						var templeft=parseInt(Math.random()*100),tempsup=parseInt(Math.random()*20);
						if(tempsup==0||tempsup==1){
							tempsup=5;
						}else if(tempsup==2){
							tempsup=tempsup*2;
						}else if(tempsup==3){
							tempsup=tempsup*2;
						}else if(tempsup>=15&&tempsup<=20){
							tempsup=10;
						}
						if(templeft>80){
							templeft=parseInt(templeft/tempsup);
						}
						this.stylepos['left']=templeft;
						this.stylepos['top']=index==0?20:index*45;
				},
				/*更新自身数据*/
				changeData:function(wrap){
						this.items=wrap.find('li');
						this.size=this.items.size();
						var wrapheight=this.size*50;
						if(this.size<8||this.size==0){
							wrapheight=200;
						}
						wrap.css({'height':wrapheight});
				},
				/*添加新评论*/
				addComment:function(params){
						if(params.content==''){
								return false;
						}
						this.commentAjax(params);
				},
				/*发送ajax*/
				commentAjax:function(params){
							var self=this;
							$.ajax({
								url:params.url,
								async:false,
								type: "post",
								dataType:"json",
								data:{
										'sendid':params.sendid,
										'commentid':params.commentid,
										'content':params.content,
								},
								success:function(res){
										if(res){
											self.commentResult('success',res,params);
										}else{
											self.commentResult('fail',res,params);
										}
								},
								error:function(res){
										self.commentResult('error',res,params);
								}
						});
				},
				commentResult:function(str,res,params){
						if(str=='error'){
								var wrap=params.wrap,
										no=params.no,
										content=params.content;
								/*如果已评论的条数大于等于显示条数，则按堆栈处理*/
								if(this.size>=no){
									wrap.find('li').first().remove();
									this.mathPos(parseInt(Math.random()*(no-1))+1);
								}else{
									/*小于显示条数，则按数组处理，且更新数据*/
									this.changeData(wrap);
									this.mathPos(this.size);
								}
								var template=this.template;
								if(1<0){
									/*
									to do
									微信用户条件，记得开发时需要改条件
									*/
										template=template.replace('$imgsrc','微信用户图像');
								}else{
										template=template.replace('$imgsrc',this.imgsrc);	
								}
								template=template.replace('$style','left:'+this.stylepos['left']+'%;top:'+this.stylepos['top']+'px;').replace('$content',content);
								var tempitem=$(template);
								setTimeout(function(){
										tempitem.removeClass('impressionsel');
								},3000);
								tempitem.addClass('impressionsel');
								tempitem.appendTo(wrap);
						}
				}
		}
		
		
		
		/*程序入口*/
		$(function(){
				//页面元素引用
				var $impression=$('#impression_wrap'),$comment_text=$('#comment_text'),$comment_btn=$('#comment_btn');
				//初始化
				impression.init($impression);
				//设置定位
				impression.randomPos();
				//添加新印象
				$comment_btn.on($.EventName.click,function(){
						var text=$comment_text.val();
						impression.addComment({
							wrap:$impression,
							no:20,
							content:text,
							url:'http://localhost:86/web/default/impression.html',
							sendid:'0',
							commentid:'0'
						});
				});
		});
})(Zepto,window);