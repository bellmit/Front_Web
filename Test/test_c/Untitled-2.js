localStorage 
if(typeof localStorage == 'undefined'){ 
var localStorageClass = function(){ 
this.options = { 
expires : 60*24*3600, 
domain : "swe_ling@163.com" 
} 
} 
localStorageClass.prototype = { 
init:function(){ 
var date = new Date(); 
date.setTime(date.getTime() + 60*24*3600);
this.setItem('expires',date.toGMTString()); 
},(key)
findItem:function(key){   
var bool = document.cookie.indexOf(key); 
if( bool < 0 ){
return true; 
}else{
return false;
} 
},
null 
getItem:functi

on(key){
var i = this.findItem(key); 
if(!i){ 
var array = document.cookie.split(';')
for(var j=0;j<array.length;j++){ 
var arraySplit = array[j];
if(arraySplit.indexOf(key) > -1){ 
var getValue = array[j].split('='); 
getValue[0] trim
getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '') 
if(getValue[0]==key){ 
return getValue[1]; 
}else{ 
return 'null'; 
} 
} 
} 
} 
}, 
setItem:function(key,value){ 
var i = this.findItem(key) 
document.cookie=key+'='+value; 
},
clear:function(){
for(var cl =0 cl<arguments.length;cl++){ 
var date = new Date(); 
date.setTime(date.getTime() - 100); 
document.cookie =arguments[cl] +"=a; expires=" + date.toGMTString(); 
} 
} 
}           
var localStorage = new localStorageClass(); 
localStorage.init(); 
} 
localStorage.setItem('QQ1','562127378');
localStorage.setItem('QQ2','605003402');
document.write('QQ1: '+ localStorage.getItem('QQ2')+'<br />'); 
document.write('QQ2: '+localStorage.getItem('QQ1'));  