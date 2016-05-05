// JavaScript Document
$(function(){
	var op_container=document.getElementById("op_canvas");
	if(op_container.getContext){
		var cmode=op_container.getContext("2d");
	}else{
		document.getElementById("notags").style.display="block";
		return;
	}
	clockinit(cmode);
});
function clockinit(cvs){
	var now = new Date();
	var secs = now.getSeconds();  
	var mins = now.getMinutes();  
	var hors  = now.getHours(); 
	clock(cvs,secs++,mins,hors);
	setInterval(function(){clock(cvs,secs++,mins,hors)},1000);	
}
function clock(ctx,secs,mins,hors){
	  ctx.save();  
	  ctx.clearRect(0,0,800,500);//设置透明区域
	  ctx.translate(450,250);//定位绘图区域
	  ctx.rotate(-Math.PI/2);
	  //旋转画布 
	  ctx.fillStyle = "white";//设置填充颜色
	  ctx.lineCap = "round";//设置线条圆角样式  
	  // Hour marks  
	  ctx.save();  
	  for (var i=0;i<12;i++){
		  ctx.beginPath();
		  ctx.rotate(Math.PI/6);
		  ctx.moveTo(200,0);
		  if(i==11){
			  ctx.strokeStyle = "#FF8C00";
			  ctx.lineWidth = 6;//设置线条大小
			  ctx.lineTo(228,0); 
		  }else{
			  ctx.strokeStyle = "black";//设置线条(线框)颜色
			  ctx.lineWidth = 4;//设置线条大小
			  ctx.lineTo(220,0); 
		  }  
			ctx.stroke();//绘制形状外框  
	  }  
	  ctx.restore();//恢复，回到上一次绘制的状态 	  
	  // Minute marks  
	  ctx.save();  
	  ctx.lineWidth = 2;  
	  for (i=0;i<60;i++){  
		if (i%5!=0) {  
		  ctx.beginPath();  
		  ctx.moveTo(217,0);  
		  ctx.lineTo(220,0);  
		  ctx.stroke();  
		}  
		ctx.rotate(Math.PI/30);  
	  }  
	  ctx.restore(); 
	  ctx.beginPath();  
	  ctx.lineWidth = 1;  
	  ctx.strokeStyle = '#000';  
	  ctx.arc(0,0,178,0,Math.PI*2,true);
	  ctx.stroke();
	  ctx.beginPath();
	  ctx.strokeStyle = '#999'; 
	  ctx.arc(0,0,184,0,Math.PI*2,true);
	  ctx.stroke();
		
	   
	  hors = hors>=12 ? hors-12 : hors;  
	  
	  ctx.fillStyle = "#000";
	  ctx.strokeStyle = "#000";   
	  
	  // write Hours  
	  ctx.save();
	  var h=hors*(Math.PI/6);
	  var m=(Math.PI/360)*mins;
	  var s=(Math.PI/21600)*secs;
	  ctx.rotate(h+m+s);
	  ctx.lineWidth = 8;  
	  ctx.beginPath();  
	  ctx.moveTo(-20,0);  
	  ctx.lineTo(120,0);  
	  ctx.stroke();  
	  ctx.restore();  
	  
	  // write Minutes  
	  ctx.save();
	  var mm=(Math.PI/30)*mins;
	  var ss=(Math.PI/1800)*secs;
	  ctx.rotate(mm+ss); 
	  ctx.lineWidth = 6;  
	  ctx.beginPath();  
	  ctx.moveTo(-30,0);  
	  ctx.lineTo(150,0);  
	  ctx.stroke();  
	  ctx.restore();  
		
	  // Write seconds  
	  ctx.save();  
	  ctx.rotate(secs * Math.PI/30);  
	  ctx.strokeStyle = "#D40000";  
	  ctx.fillStyle = "#D40000";  
	  ctx.lineWidth = 4;  
	  ctx.beginPath();  
	  ctx.moveTo(-30,0);  
	  ctx.lineTo(190,0);  
	  ctx.stroke();
	  
	  ctx.beginPath();   
	  ctx.arc(0,0,12,0,Math.PI*2,true);  
	  ctx.fill();
	  ctx.beginPath();
	  ctx.fillStyle = "#fff";  
	  ctx.arc(0,0,6,0,Math.PI*2,true);  
	  ctx.fill();  

	  ctx.beginPath(); 
	  ctx.fillStyle = "#7FFF00";
	  ctx.lineWidth = 2;  
	  ctx.arc(170,0,4,0,Math.PI*2,true);  
	  ctx.fill(); 
	  ctx.stroke();
	  ctx.restore();   
	  
	  ctx.beginPath();  
	  ctx.lineWidth = 6;  
	  ctx.strokeStyle = '#000';  
	  ctx.arc(0,0,240,0,Math.PI*2,true);  
	  ctx.stroke();
	  ctx.restore();
};