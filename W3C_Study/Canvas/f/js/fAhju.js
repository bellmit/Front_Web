window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas, ctx, time;

var circles = [];
var max = 70;




  
  


function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var circle = {
  x: 0,
  y: Math.sin(this.x*Math.PI/180),
}

var createCircles = function(){
  var randCol = "rgb("+getRandomInt(0, 255)+","+getRandomInt(0, 255)+","+getRandomInt(0, 255)+")";
  var randA = getRandomArbitary(30,200);
  var radius = getRandomInt(5,15);
  var x = getRandomInt(0, canvas.width);
	if(circles.length < max){
		circles.push({
			x: x,
			y: circle.y,
			r: radius,
			c: randCol,
			a: randA
		});
	}
}

var updateCircles = function(){
	var i = circles.length;
	while(i--){
		var c = circles[i];
		c.y = Math.sin(c.x*Math.PI/180);
		if(c.y >= 0){
			c.y = canvas.height/2 - (c.y-0) * c.a;
		}
		if(c.y < 0){
			c.y = canvas.height/2 + (0 - c.y) * c.a;
		}
		c.x++;
		if(c.x > canvas.width){
			circles.splice(i, 1);
      

		}
	}
}

var renderCircles = function(){
	var i = circles.length;
	while(i--){
		var c = circles[i];
		ctx.beginPath();
		ctx.arc(c.x,c.y, c.r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = c.c;
		ctx.shadowBlur = 20;
		ctx.shadowColor = c.c;
		ctx.fill();
	}
}
canvas = document.getElementById("canvas");
function draw(){
  if(!canvas.getContext){
	  document.getElementById("notags").style.display="block";
	  return;
  }  
  ctx = canvas.getContext("2d");
  canvas.width=900;
  canvas.height=500;
  ctx.globalCompositeOperation = "source-over";
	ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';
			//Call our super awesome animation method, because setTimeout is for suckers
			requestAnimFrame(draw);
			var now = new Date().getTime();
			var dt = now - (time || now);
			time = now;
		
		createCircles();
		updateCircles();
		renderCircles();
	}

draw();
