/**
* 认证中心
* author : liyuzhong
*/
$(document).ready(function(e) {
	
	//加载用户信用认证信息
	init();
	
   function init(){
		$(".hastip").mouseenter(showtip);   
	} 
	
	//浮动提示信息
	function showtip(e){
		var $target = $(e.target), tip = $target.attr("alt");
		if(!tip){return;}
		var floattip = "<span class='floattip'><span>" + tip + "</span></span>";
		$target.append(floattip);
		$target.find(".floattip").fadeIn();	
		setTimeout(function(){$target.find(".floattip").replaceWith("");},3000);
	}
});