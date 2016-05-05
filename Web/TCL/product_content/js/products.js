$(function(){
	var slide_id=setInterval(slide_play,8000),slide_hover_id,slide_imgwrap=$("#slide_img"),slide_img=slide_imgwrap.find("li"),slide_tag=$("#slide_tag li"),slide_wrap=$("#slide_wrap"),index_arr=[],slide_count=(function(){var j=0;return function(){return ++j;};}()),slide_tips=$("#slide_tips"),auto_animates;
	var slideimg_index=slide_img.index();
	/*img init*/
	slide_imgwrap.css({"width":slide_img.size()*918});
	/*text init*/
	/*slide plays*/
	function slide_play(){
		var n=0;
		arguments.length==1?n=arguments[0]:n=slide_count();
		n>slideimg_index?n%=slideimg_index+1:n;
		slide_imgwrap.animate({"left":-n*918},500);
		slide_tag.eq(n).addClass("slidetag_sel").siblings().removeClass("slidetag_sel");
	}
	/*tag click*/
	slide_tag.click(function(e){
		var cur_index=$(this).index();
		slide_imgwrap.animate({"left":-cur_index*918},500);
		slide_tag.eq(cur_index).addClass("slidetag_sel").siblings().removeClass("slidetag_sel");
		index_arr.length==0?index_arr.push(cur_index):index_arr.splice(0,1,cur_index);
		e.preventDefault();
	});
	/*mouse hover,out event*/
	slide_wrap.hover(function(){
		slide_tips.stop(auto_animates,true,false);
		clearInterval(slide_id);
		clearInterval(slide_hover_id);
	},function(){
		if(typeof index_arr[0]=="undefined"){
			slide_hover_id=setInterval(slide_play,8000);
		}else{
			clearInterval(slide_hover_id);
			slide_id=setInterval(function(){
				var m=(function(){
					return function(){return ++index_arr[0];}	
				})()();
				slide_play(m);
			},8000);
		}
	});
	

	/*pro_tab click*/
	var pro_tag=$("#pro_tag li"),pro_show=$("#pro_show li");
	pro_tag.click(function(){
		var pro_tag_obj=$(this);
		var pro_tag_index=pro_tag_obj.index();
		pro_tag_obj.addClass("tag_sel").siblings().removeClass("tag_sel");
		pro_show.eq(pro_tag_index).show().siblings().hide();
	});
});