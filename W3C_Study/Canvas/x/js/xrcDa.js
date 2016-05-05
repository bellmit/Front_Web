var topPosition = 0,
  leftPosition = 0,
	red,
	green,
	blue,
	color,
	radius;

window.onload = function () {
	var canvas = document.getElementById('canvas');
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
	var ctx = canvas.getContext('2d');

	canvas.width =900;
	canvas.height = 500;

	canvas.onmousemove = function (e) {
		topPosition = e.pageY-100,
		leftPosition = e.pageX-500;

		// generate random colors
		red = Math.random() * 255 >> 0;
		green = Math.random()* 255 >> 0;
		blue = Math.random()* 255 >> 0;
		color = "rgba(" + red + ", " + green + ", " + blue + ", 0.5)";

		// generate random size
		radius = Math.random()*50+20;

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(leftPosition, topPosition, radius, 0 , 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}	
}