// JavaScript Document
$(function(){
	var layout_wrap=$("#layout_wrap");
	layout_wrap.layout({
		split:true,
		resize:function(){
			alert("ni mei");
		}
	});	   
});