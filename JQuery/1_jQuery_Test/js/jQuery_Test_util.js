// JavaScript Document
function allTrim(str){
	var arr2=str.split("");
	var str2="";
	for(var i=0;i<arr2.length;i++){
		str2+=$.trim(arr2[i]);
	}
	return str2;
}