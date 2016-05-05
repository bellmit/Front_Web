(function(){
	var canvas=document.getElementById("canvas");
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
	canvas.width=900;
	canvas.height=500;
	var dataSourceA=document.getElementById("source_a"),dataSourceB=document.getElementById("source_b"),cv=canvas.getContext("2d");
	/*canvas text*/
	cv.font="40px 宋体";
	cv.fillText("反转像素",150,60,200);
	cv.font="40px 黑体";
	var font_lg=cv.createLinearGradient(600,60,700,60);
	font_lg.addColorStop(0,"#006699");
	font_lg.addColorStop(1.0,"#0066dd");
	cv.fillStyle=font_lg;
	cv.fillText("随机像素",600,60,200);
	/*canvas img*/
	cv.lineWidth=1;
	cv.strokeStyle="#fff";
	cv.lineCap="round";
	cv.shadowBlur=3;
	cv.shadowColor="#333";
	cv.shadowOffsetX=1;
	cv.shadowOffsetY=1;
	cv.beginPath();
	cv.strokeRect(20,80,400,300);
	/*1*/
	cv.drawImage(dataSourceA,20,80);
	var dataimga=cv.getImageData(20,80,dataSourceA.width,dataSourceA.height);
	for(var i=0;i<dataimga.data.length;i+=4){
		dataimga.data[i]=255-dataimga.data[i];
		dataimga.data[i+1]=255-dataimga.data[i+1];
		dataimga.data[i+2]=255-dataimga.data[i+2];
		dataimga.data[i+3]=255;
	}
	cv.putImageData(dataimga,20,80);
	/*2*/
	cv.beginPath();
	cv.strokeRect(480,80,400,300);
	cv.drawImage(dataSourceB,480,80);
	var dataimgb=cv.getImageData(480,80,dataSourceB.width,dataSourceB.height);
	for(var i=0;i<dataimga.data.length;i+=4){
		dataimgb.data[i+3]=Math.ceil(Math.random()*255);
	}
	cv.putImageData(dataimgb,480,80);
})();