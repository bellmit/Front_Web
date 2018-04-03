(function($,w){
	
		var community={
				
				/*显示发起（回复）话题容器*/
				showWraps:function(wrap){
					wrap.animate({'top':'0'},200);
				},
				/*隐藏发起（回复）话题容器*/
				hideWraps:function(wrap){
					wrap.animate({'top':'100%'},200);
				},
				dzAnimate:function(wraptext,wrapani){
						var wrap=wraptext.next(),
								txt=wrap.text();
								
						if(txt==''||isNaN(txt)){
							txt=0;
						}
						txt=parseInt(txt);
						txt++;
						wrap.text(txt);
						wrapani.css({'visibility':'visible','z-index':'300'}).animate({'font-size':'300px'},500);
						/*延迟复位*/
						setTimeout(function(){
								wrapani.css({'font-size':'12px','visibility':'hidden','z-index':'-1'});
						},600);
				}
		}
		
		
		
		
		
		
		
		
		/*程序入口*/
		$(function(){
			
				//页面元素引用
				var $community_show=$('#community_show'),
						$communityPopWin=$('#communityPopWin'),
						$replyPopWin=$('#replyPopWin'),
						$praise_animate=$('#praise_animate');
						
				
				/*评论(回复)插件显示*/
				 $community_show.on($.EventName.click,function(){
						/*
						to do
						
						根据具体情况显示相应输入插件
						*/
						
						
						//评论容器显示
						community.showWraps($communityPopWin);
						
						
						//回复容器显示
						community.showWraps($replyPopWin);
				});
				
				/*评论(回复)插件隐藏*/
				$('#communityPopWin,#communityPopWin').on($.EventName.click,function(e){
					var current=e.target,node=current.nodeName.toLowerCase();
					if(node=='textarea'){
						return false;
					}else if(node=='section'){
						community.hideWraps($(this));
					}
				});
				$('#communityclose,#replyclose').on($.EventName.click,function(e){
						var id=e.target.id.slice(0,-5);
						community.hideWraps($('#'+id+'PopWin'));
				});
				
				/*点赞动画*/
				$('#praise').on($.EventName.click,function(){
						community.dzAnimate($(this),$praise_animate);	
					
				});
				
		});
		
		
})(Zepto,window);