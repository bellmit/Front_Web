// JavaScript Document
var ids=document.getElementById("#a1");
function PPT(ids){
	if(0<ids<5){
		ids+=1;
		setTimeout("PPT(ids)",1000); 	
		}
	if(ids==5){
		setTimeout("PPT(ids)",1000); 
		ids=1;
		}
	}