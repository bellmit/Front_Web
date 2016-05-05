// JavaScript Document
$(function(){
	var op_container=document.getElementById("op_canvas");
	if(op_container.getContext){
		var cmode=op_container.getContext("2d");
	}else{
		alert("no <canvas></canvas> tag")
	}
	cmode.fillStyle="rgba(200,0,0,0.8)";
	cmode.fillRect(100,50,200,100);
	cmode.fillStyle="rgba(0,150,0,0.5)";
	cmode.fillRect(280,100,120,240);
	var fx=150*Math.pow(Math.sin(Math.PI*7/45),2);
	var fy=150*Math.sin(Math.PI*7/45);
	cmode.fillStyle="rgba(0,0,250,0.6)";
	cmode.moveTo(450,100);
	cmode.lineTo(450-fx,250-fy);
	cmode.lineTo(450,250);
	cmode.lineTo(450+fx,250-fy);
	cmode.lineTo(450,100);
	cmode.fill();
	cmode.save();
});
