// Flower
// Ported from flash project - http://wonderfl.net/c/ys87J/
//
function Flower(){
	
	var canvas;
	var context;
  
  var width = 900;
	var height = 500;

	var mouse = {x: width/2 - 20, y: height/2};
	var points = [];
	var radius = 1.0;
	
	var interval;
	
	var count = 300;
	
	this.initialize = function(){
		canvas  = document.getElementById("canvas");
		if(!canvas.getContext){
			document.getElementById("notags").style.display="block";
			return;
		}
		context = canvas.getContext('2d');
			
		width = 900;
		height = 500;
		
		canvas.width = width;
		canvas.height = height;
		
		createPoints(width/60, height/60);
				
		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('click', MouseDown, false);
		
		//Set interval - Bad! - I know!
		var interval = setInterval(Draw, 20);
	}
	
	var createPoints = function(points_x, points_y){
		
		var w = (width - radius * 2)  / points_x;
		var h = (height - radius * 2) / points_y;
		
		var i, j;
		
		//Create new points
		for(i = 0; i < points_y; i++){
			for (j = 0; j < points_x; j++){	
				points.push(new Point(j * w + radius, i * h + radius));
			}
		}	
	}
	
	//Point class.
	var Point = function(x, y){
		this.x = x;
		this.y = y;
		this.pX = x;
		this.pY = y;
	}
	
	var Draw = function(){
		drawPoints();
	}
	
	var drawPoints = function(){
		
		var i;
		
		var r = Math.floor((count % 100) / 100 * 255);
		var g = Math.floor((count % 200) / 200 * 255);
		var b = Math.floor((count % 400) / 400 * 255);
		
		for (i = 0; i < points.length; i++){
			
			//The point we are dealing with
			var p = points[i];
			
			var theta = Math.atan2(p.y - mouse.y, p.x - mouse.x);
			
			var dist = 900 / Math.sqrt((mouse.x - p.x) * (mouse.x - p.x) +
									   (mouse.y - p.y) * (mouse.y - p.y));
									   
		
			//Where the magic happens!
			p.x += Math.cos(theta) * dist + (p.pX - p.x) * 0.05;
			p.y += Math.sin(theta) * dist + (p.pY - p.y) * 0.05;
			
			var radius_radio = dist / 1;
					
			context.fillStyle = 'rgba(' + r + ',' + g + ',' +  b + ',' + ' 1)';
			context.strokeStyle = "#FFFFFF";
			context.lineWidth = 2;
			context.beginPath();
			context.arc(p.x, p.y, radius * 2 + radius_radio ,0 , Math.PI*2, true);
			context.closePath();
			context.stroke();
	    	context.fill();
			
		}
		
		count++;
	
	}
		
	var MouseMove = function(e) {
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
	}
	
	//Clear the screen, 
	var MouseDown = function(e) {
		e.preventDefault();
		context.fillStyle = 'rgba(255, 255, 255, 1.0)';
		context.beginPath();
		context.rect(0, 0, width, height);
		context.closePath();
		context.fill();	
	}		
}

var app = new Flower();
app.initialize();