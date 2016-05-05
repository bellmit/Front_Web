var canvas = document.getElementById('canvas');
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
canvas.width=900,canvas.height=500;
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(255, 255, 0)";
ctx.strokeStyle = "rgb(255, 200, 0)";

ctx.beginPath();
ctx.moveTo(195, 149);
ctx.arc(150, 170, 50, 5.8, 0.5, true);
ctx.lineTo(160, 170);
ctx.lineTo(195, 149);
ctx.fill();
ctx.stroke();

ctx.fillStyle = "rgb(200, 150, 0)";

ctx.beginPath();
ctx.arc(160, 145, 5, 0, Math.PI*2, true);
ctx.fill();

ctx.fillStyle = "rgba(0, 150, 0, 0.2)";
ctx.strokeStyle = "rgb(0, 150, 0)";

ctx.beginPath();
ctx.moveTo(150, 40);
ctx.quadraticCurveTo(150, 10, 180, 10);
ctx.lineTo(220, 10);
ctx.quadraticCurveTo(250, 10, 250, 40);
ctx.lineTo(250, 60);
ctx.quadraticCurveTo(250, 90, 220, 90);
ctx.quadraticCurveTo(220, 100, 200, 120);
ctx.quadraticCurveTo(215, 90, 180, 90);
ctx.quadraticCurveTo(150, 90, 150, 60);
ctx.lineTo(150, 40);
ctx.fill();
ctx.stroke();