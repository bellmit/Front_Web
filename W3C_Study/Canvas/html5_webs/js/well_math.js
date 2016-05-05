$(function(){
	var canvas;
	var ctx;
	var canvasWidth = 900;
	var canvasHeight = 500;
	var circleR = 50;
	var timeout = 0;
	var often = 15;
	function init(){
		canvas = document.getElementById("canvas");
		if(!canvas.getContext){
			document.getElementById("notags").style.display="block";
			return;
		}
		canvas.width=900;
		canvas.height=500;
		ctx = canvas.getContext("2d");
		drawLines();
	}
	function drawLines() {
		ctx.fillRect(0,0,canvasWidth,canvasHeight);
		ctx.translate(450,250);
		for (var i = 0; i < 25; i++) {
			for (var a = -45; a <= 45; a+=often) {
				setTimeout(function(a){
						drawTimeout(a);
					},100 * timeout);
				timeout++;
			}
		}
	}
	function drawTimeout(a){
		ctx.beginPath();
		ctx.moveTo(0,circleR);
		var radians = Math.PI/180*a;
		var x = (circleR * Math.sin(radians)) / Math.sin(Math.PI/2 - radians);
		ctx.lineTo(x,0);
	
		if (Math.abs(a) == 45) {
			ctx.strokeStyle="rgb(255,255,255)";
			ctx.lineWidth=1;
		} else if (a == 0) {
			ctx.strokeStyle="rgb(200,200,200)";
			ctx.lineWidth=0.5;
		} else {
			ctx.strokeStyle="rgb(110,110,110)";
			ctx.lineWidth=0.2;
		}
		ctx.stroke();
		ctx.rotate((Math.PI/180)*15);
	}
	init();
});
