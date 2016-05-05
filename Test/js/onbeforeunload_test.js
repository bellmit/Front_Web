/*$(function(){
	$("#showouter").click(function(e){
		e.stopPropagation();
		$("#showouterwrap").html("<h1 style=\"width:400px;height:100px;line-height:100px;text-align:center;font-size:30px;color:#f00;\">这是脚本生成的内容</h1>").show();	
	});	
	$("#showinner").click(function(e){
		e.stopPropagation();
		$("#showinnerwrap").show();	
	});
	
	
	
	
});*/

function showOuter(){
	document.getElementById("showouterwrap").innerHTML="<h1 style=\"width:400px;height:100px;line-height:100px;text-align:center;font-size:30px;color:#f00;\">这是脚本生成的内容</h1>";
}
var showflag=0;
function showInner(){
	var sinner_obj=document.getElementById("showinnerwrap");
	showflag=showflag==1?0:1;
	showflag==1?sinner_obj.style.display="block":sinner_obj.style.display="none";
}

function popUnload(){
	alert("ni mei");
	//event.returnValue="确定离开当前页面吗？";
}