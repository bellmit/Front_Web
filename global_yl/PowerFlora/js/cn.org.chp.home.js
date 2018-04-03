$(function(){
	/*left nav click event*/
	var seltor_Arr=[0,1,2,3,4,5,6];
	$("#nav_list li").click(function(){
		var sel_seltor=$(this);
		var sel_Index=sel_seltor.index();
		sel_seltor.addClass("nav_sel"+sel_Index).siblings().removeClass(function(){return this.className.length>8?this.className.split(/\s/)[1]:null});
	});

	//$("#home_list tbody tr:even").find("td").css({"background":"#f6f6f6"});


















});