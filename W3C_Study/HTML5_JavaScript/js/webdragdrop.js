// JavaScript Document
$(function(){
	document.addEventListener('dragstart', function(event) {
	  event.dataTransfer.setData('text', 'Customized text');
	  event.dataTransfer.effectAllowed = 'copy';
	}, false);
	var dataa=document.getElementById("content_a");
	var datab=document.getElementById("content_b");
	var tempstr="";
	dataa.ondragstart=function(event){
		tempstr=datab.innerHTML;
		datab.innerHTML=dataa.innerHTML;
		dataa.innerHTML=tempstr;
	};
	datab.ondragstart=function(event){
		tempstr=dataa.innerHTML;
		dataa.innerHTML=datab.innerHTML;
		datab.innerHTML=tempstr;
	};
});









