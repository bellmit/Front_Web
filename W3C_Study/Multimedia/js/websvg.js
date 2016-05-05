// JavaScript Document
$(function(){
	$("#svg_s,#svg_v,#svg_g").click(function(){
		var current_data="click parts of img is:"+$(this).attr("id").split("_")[1].toUpperCase();
		alert(current_data);
	});
	
});
