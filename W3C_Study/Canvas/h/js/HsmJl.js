var canvas = document.getElementById('canvas');
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
   canvas.width=900,canvas.height=500;
   var ctx = canvas.getContext('2d'),
    points = [{x:75, y:150}],
    r = 50,
    n = 6,
    x, 
    y;

ctx.lineWidth = 4;
ctx.lineCap = 'round';
ctx.shadowColor = '#000';
ctx.shadowBlur= 16;
ctx.fillStyle = 'rgba(0,0,0,.5)';

ctx.moveTo(points[0].x, points[0].y);

for (var j = 0; j < 8; j++) {
  ctx.beginPath();
  ctx.fillStyle = 'rgb(' + j * 45 + ',' + j * 25 + ',' + j * 5 + ')';

	for (var i = 0; i < n +1; i++) {
  	x = Math.round(points[j].x + r * Math.cos(2 * Math.PI * i / n));
  	y = Math.round(points[j].y + r * Math.sin(2 * Math.PI * i / n));
  	ctx.lineTo(x, y);
  
  	if (i === 0) {
    	points.push({x:x, y:y});
  	}
	}
  
  ctx.fill();
}