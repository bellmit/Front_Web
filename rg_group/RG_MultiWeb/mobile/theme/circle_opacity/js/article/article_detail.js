(function($,w){
	
		/*文章评论、分享、点赞服务对象*/
		var article={
				/*点赞动画*/
				dzAnimate:function(wraptext,wrapani){
						var first_txt=wraptext.text();
						if(first_txt==''||isNaN(first_txt)){
							first_txt=0;
						}
						first_txt=parseInt(first_txt);
						first_txt++;
						wraptext.html(first_txt);
						wrapani.html('+1').animate({'top':'-30px','opacity':'0.2'},500);
						/*延迟复位*/
						setTimeout(function(){
								wrapani.html('').css({'top':'10px','opacity':'1'});
						},502);
				},
				/*显示评论（回复）容器*/
				showWraps:function(wrap){
					wrap.animate({'top':'0'},200);
				},
				/*隐藏评论（回复）容器*/
				hideWraps:function(wrap){
					wrap.animate({'top':'100%'},200);
				}
		}
		
		/*slide 服务对象*/
		var vr_slide={
			/*判断是否满足点击条件*/
			isSlide:function(n){
					var winwidth=parseInt(($(w).width()-20)*0.8);
					var itemwidth=n*46;
					return winwidth<itemwidth?true:false;
			},
			/*前*/
			slidePre:function(wrap){
					wrap.find('a').first().appendTo(wrap);
			},
			/*后*/
			slideNext:function(wrap){
				wrap.find('a').last().prependTo(wrap);
			},
			/*获取选项数量*/
			slideItem:function(wrap){
				return wrap.find('a').size();
			},
			/*初始化*/
			init:function(wrap){
				this.n=this.slideItem(wrap);
				this.isslide=this.isSlide(this.n);
				return this;
			}
		}
		
		
		
		
		
		
		/*程序入口*/
		$(function(){
			
				//页面元素引用
				var $doLike=$('#doLike'),
						$likeNum=$('#likeNum'),
						$addOne=$('#addOne'),
						$msgInputBtn=$('#msgInputBtn'),
						$btnCommentNum=$('#btnCommentNum'),
						$vr_prebtn=$('#vr_prebtn'),
						$vr_list=$('#vr_list'),
						$vr_nextbtn=$('#vr_nextbtn');
						$comment_show=$('#comment_show'),
						$commentPopWin=$('#commentPopWin'),
						$replyPopWin=$('#replyPopWin');
						
						
						

				/*初始化*/
				var isslide=false,n=0;
				vr_slide.init($vr_list);
				isslide=vr_slide.isslide;
				n=vr_slide.n;
				

				//点赞
				$doLike.on($.EventName.click,function(e){
						article.dzAnimate($likeNum,$addOne);
				});
				//评论
				$msgInputBtn.on($.EventName.click,function(e){
						article.showWraps($commentPopWin);
				});
				
				/*图像轮循*/
				$(w).resize(function(){
						isslide=vr_slide.isSlide(n);
				});
				/*前*/
				$vr_prebtn.on($.EventName.click,function(){
						if(!isslide){
								return false;
						}else{
							vr_slide.slidePre($vr_list);
						}
				});
				/*后*/
				$vr_nextbtn.on($.EventName.click,function(){
						if(!isslide){
								return false;
						}else{
							vr_slide.slideNext($vr_list);
						}
				});
				
				
				/*评论(回复)插件显示*/
				$comment_show.on($.EventName.click,function(){
						/*
						to do
						
						根据具体情况显示相应输入插件
						*/
						
						
						//评论容器显示
						article.showWraps($commentPopWin);
						
						
						//回复容器显示
						article.showWraps($replyPopWin);
				});
				
				/*评论(回复)插件隐藏*/
				$('#commentPopWin,#replyPopWin').on($.EventName.click,function(e){
					var current=e.target,node=current.nodeName.toLowerCase();
					if(node=='textarea'){
						return false;
					}else if(node=='section'){
						article.hideWraps($(this));
					}
				});
				
				
				
				
		});
		
		
})(Zepto,window);