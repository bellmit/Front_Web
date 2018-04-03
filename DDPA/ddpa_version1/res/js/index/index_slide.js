(function($){
	$(function(){
		/*初始化参数*/
		var slide_id=setInterval(slide_play,6000),slide_hover_id,slide_imgwrap=$("#slide_img"),slide_img=slide_imgwrap.find("li"),slide_tagleft=$("#slide_tagleft"),slide_tagright=$("#slide_tagright"),slide_wrap=$("#slide_wrap"),index_arr=[],slide_count=(function(){var j=0;return function(){return ++j;};}()),slide_wrapbg=$("#slide_wrapbg"),tag_index=0,slide_info=$("#slide_info"),infosize=slide_info.find("a").size(),info_index=0;
		var slideimg_index=slide_img.index();
		/*图片初始化*/
		slide_imgwrap.css({"width":slide_img.size()*1000});
		var init_imgurl=slide_img.eq(0).find("img").attr("src");
		slide_wrapbg.css({"background":"#fff url("+init_imgurl+") repeat 0 0","opacity":"0.01"}).animate({"opacity":"0.1"},500);
		/*slide 播放*/
		function slide_play(){
			var n=0;
			arguments.length==1?n=arguments[0]:n=slide_count();
			n>slideimg_index?n%=slideimg_index+1:n;
			slide_imgwrap.animate({"left":-n*1000},500);
			var tempimg_url=slide_img.eq(n).find("img").attr("src");
			slide_wrapbg.css({"background":"#fff url("+tempimg_url+") repeat 0 0","opacity":"0.01"}).animate({"opacity":"0.1"},500);
		}
		/*选项按钮事件监听*/
		slide_tagleft.click(function(e){
			e.preventDefault();
			tag_play("left");
		});
		slide_tagright.click(function(e){
			e.preventDefault();
			tag_play("right");
		});
		/*选项按钮播放*/
		function tag_play(names){
			var n=tag_index;
			if(names=="right"){
				n--;
				if(n==-1){
					n=slideimg_index;
				}
			}else if(names=="left"){
				n++;
				if(n==slideimg_index+1){
					n=0;
				}
			}
			tag_index=n;
			slide_imgwrap.animate({"left":-n*1000},500);
			index_arr.length==0?index_arr.push(n):index_arr.splice(0,1,n);
			var tempimg_url=slide_img.eq(n).find("img").attr("src");
			slide_wrapbg.css({"background":"#fff url("+tempimg_url+") repeat 0 0","opacity":"0.01"}).animate({"opacity":"0.1"},500);
		}
		/*鼠标移入移出事件监听*/
		slide_wrap.hover(function(){
			clearInterval(slide_id);
			clearInterval(slide_hover_id);
		},function(){
			if(typeof index_arr[0]=="undefined"){
				slide_hover_id=setInterval(slide_play,6000);
			}else{
				clearInterval(slide_hover_id);
				slide_id=setInterval(function(){
					var m=(function(){
						return function(){return ++index_arr[0];}	
					}())();
					slide_play(m);
				},6000);
			}
		});
		/*系统消息轮播*/
		function info_play(){
			var n=info_index,prnn=n;
			n++;
			if(n==infosize){
				n=0;
			}
			info_index=n;
			slide_info.find("a").eq(n).slideDown().end().eq(prnn).slideUp();
		}
		var info_id=setInterval(function(){
			info_play();
		},8000);
		slide_info.hover(function(){
			clearInterval(info_id);
		},function(){
			info_id=setInterval(function(){
				info_play();
			},8000);
		});
	});
})(jQuery);