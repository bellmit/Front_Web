// JavaScript Document
$(function(){
	var drag_target1=$("#drag_target1"),drag_target2=$("#drag_target2"),drag_wrap=$("#drag_wrap");
	var wrap_width=drag_wrap.width(),wrap_height=drag_wrap.height(),win_width=(window.innerWidth-21)/2,win_height=parseInt(drag_wrap.css("top"));
	var  cur_left=win_width-wrap_width/2
	drag_target1.draggable({
		revert:false,
		deltaX:cur_left,
		deltaY:135
	}).draggable({
		onStopDrag:function(e,source){
			var current_obj=$(this),cur_width=current_obj.width(),cur_height=current_obj.height();
			current_obj.css({"left":function(){
				var temp_left=parseInt(this.style.left);
				if(temp_left<cur_left){
					return cur_left;
				}else if(temp_left>cur_left+wrap_width-cur_width-20){
					return cur_left+wrap_width-cur_width-20;
				}else{
					return temp_left;
				}
			},"top":function(){
				var temp_top=parseInt(this.style.top);
				if(temp_top<135){
					return 135;
				}else if(temp_top>135+wrap_height-cur_height-20){
					return 135+wrap_height-cur_height-20;
				}else{
					return temp_top;
				}
			}});
		}
	});
	drag_target2.draggable({
		revert:true,
		deltaX:cur_left+$(this).width(),
		deltaY:135
	});
});