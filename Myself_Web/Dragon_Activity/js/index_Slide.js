$(function(){
	var slide_id=setInterval(slide_play,6000),slide_hover_id,slide_imgwrap=$("#slide_img"),slide_img=slide_imgwrap.find("a"),slide_tag=$("#slide_tag img"),slide_wrap=$("#slide_wrap"),index_arr=[],slide_count=(function(){var j=0;return function(){return ++j;};}()),slide_tips=$("#slide_tips"),auto_animates,slide_bg=$("#slide_bg");
	var slideimg_index=slide_img.index(),initimg_alt=slide_img.eq(0).find("img").attr("alt"),initimg_temp="";
	/*img init*/
	slide_imgwrap.css({"width":slide_img.size()*1000});
	/*text init*/
	initimg_alt==""?initimg_temp="undefined":typeof initimg_alt=="undefined"?initimg_temp="undefined":initimg_temp="img";
	initimg_temp!="undefined"?slide_tips.find("p").text(initimg_alt):slide_tips.css({"opacity":"0.4","top":slide_img.height()});
	/*slide plays*/
	function slide_play(){
		var n=0;
		arguments.length==1?n=arguments[0]:n=slide_count();
		n>slideimg_index?n%=slideimg_index+1:n;
		slide_imgwrap.animate({"left":-n*1000},500);
		slide_tag.eq(n).addClass("slidetag_sel").siblings().removeClass("slidetag_sel");
		slide_bg.css({"background":"#fff url('images/home_slide/"+Number(n+1)+".jpg') repeat-x left center","opacity":"0.01"}).animate({"opacity":"0.1"},500);
		var playimg_alt=slide_img.eq(n).find("img").attr("alt"),playimg_temp="";
		playimg_alt==""?playimg_temp="undefined":typeof playimg_alt=="undefined"?playimg_temp="undefined":playimg_temp="img";
		playimg_temp!="undefined"?slide_effect(slide_tips,slide_img,n,500,6000):slide_tips.css({"opacity":"0.4","top":slide_img.height()});
	}
	/*tag click*/
	slide_tag.click(function(){
		var cur_index=$(this).index();
		slide_imgwrap.animate({"left":-cur_index*1000},500);
		slide_tag.eq(cur_index).addClass("slidetag_sel").siblings().removeClass("slidetag_sel");
		slide_bg.css({"background":"#fff url('images/home_slide/"+Number(cur_index+1)+".jpg') repeat-x left center","opacity":"0.01"}).animate({"opacity":"0.1"},500);
		var tagimg_alt=slide_img.eq(cur_index).find("img").attr("alt"),tagimg_temp="";
		tagimg_alt==""?tagimg_temp="undefined":typeof tagimg_alt=="undefined"?tagimg_temp="undefined":tagimg_temp="img";
		tagimg_temp!="undefined"?slide_effect(slide_tips,slide_img,cur_index,500):slide_tips.css({"opacity":"0.4","top":slide_img.height()});
		index_arr.length==0?index_arr.push(cur_index):index_arr.splice(0,1,cur_index);
	});
	/*effect*/
	function slide_effect(tips_objs,img_objs,obj_index,eff_timer,timers){
		var cur_text=img_objs.eq(obj_index).find("img").attr("alt"),tips_top=parseInt(tips_objs.css("top")),tips_height=tips_objs.height(),img_height=img_objs.height();
		var is_show=tips_top+tips_height;
		if(arguments.length==4){
			if(is_show==img_height){
				tips_objs.animate({"opacity":"0.4","top":img_height},eff_timer);
				setTimeout(function(){
					tips_objs.find("p").text(cur_text)
				},eff_timer);
				tips_objs.animate({"opacity":"0.6","top":img_height-tips_height},eff_timer);
			}else{
				tips_objs.find("p").text(cur_text).parent().animate({"opacity":"0.6","top":img_height-tips_height},eff_timer);
			}
		}else if(arguments.length==5){
			if(is_show==img_height){
				tips_objs.animate({"opacity":"0.6","top":img_height},eff_timer);
				setTimeout(function(){
					tips_objs.find("p").text(cur_text);
			    },eff_timer);
				auto_animates=tips_objs.animate({"opacity":"0.6","top":img_height-tips_height},eff_timer).delay(timers-(3*eff_timer)).animate({"opacity":"0.4","top":img_height},eff_timer);
			}else{
				auto_animates=tips_objs.animate({"opacity":"0.6","top":img_height-tips_height},eff_timer).find("p").text(cur_text).parent().delay(timers-(2*eff_timer)).animate({"opacity":"0.4","top":img_height},eff_timer);
			}		
		}
	}
	/*mouse hover,out event*/
	slide_wrap.hover(function(){
		slide_tips.stop(auto_animates,true,false);
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
});