window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

	var canvas = document.getElementById('canvas');
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
	}
    var context = canvas.getContext('2d'),
    canvasWidth = canvas.width = 900,
    canvasHeight = canvas.height = 500,  
    cellWidth = 20,
	  cellHeight = 30,
	  columns = Math.ceil(canvasWidth / cellWidth),
	  rows = Math.ceil(canvasHeight / cellHeight),
	  counter = 0,
	  iCol, iRow;
		
var loop = function(){
  window.requestAnimFrame(loop);
	counter++;	
	for(iCol = 0; iCol < columns; iCol++){
		for(iRow = 0; iRow < rows; iRow++){	
      var hue = ( (iCol / columns + iRow / rows) / 2) * 360 + counter;
			context.beginPath();
			context.rect(iCol * cellWidth, iRow * cellHeight, cellWidth, cellHeight);		
			context.fillStyle = 'hsl(' + hue + ', 80%, 55%)';
      context.strokeStyle = 'hsl(' + hue + ', 100%, 85%)';
			context.fill();
      context.stroke();					
		};
	};
};

loop();