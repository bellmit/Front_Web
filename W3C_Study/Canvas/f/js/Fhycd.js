"use strict";
(function(){
  var myCanvas = document.getElementById('canvas');
  if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
	return;
  }
  var ctx = myCanvas.getContext('2d');
  myCanvas.width=900,myCanvas.height=500;
  ctx.rect(0, 0, myCanvas.width, myCanvas.height);
  ctx.fillStyle = "#290008";
  ctx.fill();
  ctx.fillStyle = "#f06c21";
  ctx.fillRect(100, 100, 50, 100)

  ctx.beginPath();
  ctx.arc(150, 150, 50, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(275, 150, 53, 0, 2* Math.PI, false );
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f8a521";

  ctx.beginPath();
  ctx.arc(400, 150, 50, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();

  ctx.fillRect( 400, 100, 50, 100);

  ctx.beginPath();
  ctx.moveTo(450, 100);
  ctx.quadraticCurveTo(450, 125, 425, 150);
  ctx.quadraticCurveTo(450, 175, 450, 200);
  ctx.closePath();
  ctx.fillStyle = "#290008";
  ctx.fill();

  ctx.fillStyle = "#f8a521";
  ctx.beginPath();
  ctx.arc(525, 150, 53, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ef1931";
  ctx.fillRect(600, 100, 100, 100);

  ctx.beginPath();
  ctx.moveTo(600, 100);
  ctx.quadraticCurveTo(625, 100, 650, 125);
  ctx.quadraticCurveTo(675, 100, 700, 100);
  ctx.closePath();
  ctx.fillStyle = "#290008";
  ctx.fill();

  ctx.fillStyle = "#ef1931";
  ctx.beginPath();
  ctx.arc(775, 150, 53, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
})();
