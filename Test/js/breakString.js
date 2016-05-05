// JavaScript Document
$(function(){
	var dbtn=$("#databtn");
	var stext=$("#datasource");
	var entext=$("#dataen");
	var detext=$("#datade");
	dbtn.click(function(){
		if(stext.val()==""){
			return;
		}
		entext.val(encodeURIComponent(stext.val()));
		if(entext.val()==""){
			return;
		}
		detext.val(decodeURIComponent(entext.val()).replace(/[\n]/g,"@@"));
	});
});