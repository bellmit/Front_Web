var startbutton = document.getElementById("start");
function BezierSim(){	
	var _this = this;
	var width = 900;
	var height = 500;
	var	canvas = document.getElementById('canvas');
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
		startbutton.style.display="none";
		return;
	}
	var mouse = {
	    x: 0,
	    y: 0
	};
	var request;
	var mouseDown = false;
	var selected = null;
	var started = false;
	this.context = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	var points = [];
	this.steps = 150;
	this.step = 0;
	this.showDetail = true;		
	this.init = function(){		
		canvas.addEventListener('dblclick', doubleClick, false);
		canvas.addEventListener('mousedown', mouseDown, false);
		canvas.addEventListener('mouseup', mouseUp, false);
		canvas.addEventListener('mousemove', mouseMove, false);
		renderPoints();
	}
	var renderPoints = function(){
		clearCanvas();	
		var i = 0;		
		for (i; i < points.length; i++){		
			drawPoint(points[i], 7);
			if (i + 1 < points.length){
				drawBetweenPoints(points[i], points[i + 1])
			}		
		}
	}
	this.start = function(){
		if (points.length > 0) {
			if (started == false) {
				started = true;
				loop();
			}
			else {
				started = false;
			}
		}
	}
	this.reset = function(){
		_this.step = 0;
		started = false;
		renderPoints();
	}
	var loop = function(){
		if (_this.step > _this.steps){
			_this.reset();		
			return;
		}
		if (started == false){
			return;
		}
	    requestAnimationFrame(loop);
	    animate();
	}
	var drawPoint = function(point, size){
		_this.context.fillStyle = 'rgba(0,0,0,1)';
		_this.context.lineWidth = 3;		
		_this.context.beginPath();
		_this.context.arc(point.x, point.y, size ,0 , Math.PI*2, true);
		_this.context.closePath();
		_this.context.stroke();	
	}
	var drawBetweenPoints = function(point1, point2){
		drawPoint(point1, 2);
		drawPoint(point2, 2);
		_this.context.lineWidth = 0.5;
		_this.context.beginPath();
		_this.context.moveTo(point1.x, point1.y);
		_this.context.lineTo(point2.x, point2.y);
		_this.context.stroke();	
			
	}
	var getPointBetween = function(epoch, points){
		var i = 0;
		var foundPoints = [];
		if (points.length > 1) {
			for (i = 0; i < points.length - 1; i++) {
				var point = {x:0, y:0};	
				point.x = points[i].x + epoch * (points[i + 1].x - points[i].x);
				point.y = points[i].y + epoch * (points[i + 1].y - points[i].y);
				if (_this.showDetail == true) {
					drawBetweenPoints(points[i], points[i + 1]);
				}
				foundPoints.push(point);
			}
			return getPointBetween(epoch, foundPoints);
			
		} else {
			return points[0];
		}
	}
	var animate = function(){
		if (_this.showDetail == true){		
			clearCanvas();
		}
		renderPoints();
		var epoch = _this.step/_this.steps;;
		var point = getPointBetween(epoch, points);
		if (_this.step != 0) {
			_this.context.fillStyle = 'rgba(255, 0, 0, 0.8)';
			_this.context.beginPath();
			_this.context.arc(point.x, point.y, 8, 0, Math.PI * 2, true);
			_this.context.closePath();
			_this.context.fill();
		}
		if (started == true){
			_this.step++;
		}
	}
	 var clearCanvas = function(){
		canvas.width = canvas.width;
	}
	this.loadData = function(dataString){
		var i = 1;
		var data = dataString.split('x');
		for (i; i < data.length; i++){
			var point = data[i].split('y');
			points.push({x:(width/parseFloat(point[0])), y:height/parseFloat(point[1])});		
		}
	}
	var mouseUp = function(event){
		mouseDown = false;
		selected = null;
	}
	var mouseMove = function(event){
		mouse.x = event.offsetX || (event.layerX - canvas.offsetLeft);
   		mouse.y = event.offsetY || (event.layerY - canvas.offsetTop);
		if (mouseDown == true && selected != null){
			points[selected].x = mouse.x;
			points[selected].y = mouse.y;
			clearCanvas();
			renderPoints();
			if(_this.step != 0){
				animate();
			}
		}			
	}
	var mouseDown = function(event){
		event.preventDefault();
		mouseDown = true;
		var i = 0;
		for (i; i < points.length; i++) {
			dx = points[i].x - mouse.x;
			dy = points[i].y - mouse.y;
			sqrDist = Math.sqrt(dx * dx + dy * dy);
			if (sqrDist < 30) {
				if (selected == null) {
					selected = i;
				}
			}
		}		
	}
	var doubleClick = function(event){
		var i = 0, dx, dy;
		mouse.x = event.offsetX || (event.layerX - canvas.offsetLeft);
   		mouse.y = event.offsetY || (event.layerY - canvas.offsetTop);
		if (points.length == 0){
			createPoint({x: mouse.x, y: mouse.y});
			return;
		}
		for (i; i < points.length; i++){
			dx = points[i].x - mouse.x;
            dy = points[i].y - mouse.y;
            sqrDist = Math.sqrt(dx * dx + dy * dy);
            if (sqrDist < 30) {
				removePoint(i);
				return;
			}		
		}
		createPoint({x: mouse.x, y: mouse.y});
	}
	var removePoint = function(index){
		points.splice(index, 1);
		renderPoints();
		animate();
	}	
	 var createPoint = function(point){
	 	points.push(point);
		renderPoints();
		animate();
	 }
	 this.clearPoints = function(){
		points = new Array();
		_this.reset();	
	}
}
if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame|| 
        window.webkitRequestAnimationFrame|| 
        window.mozRequestAnimationFrame|| 
        window.oRequestAnimationFrame|| 
        window.msRequestAnimationFrame|| 
        function(callback,element){
            return window.setTimeout(callback, 1000/60);
        };
})();
}
var bezierSim = new BezierSim();
bezierSim.loadData("x17.9y4.58x4.52y1.82x2.54y6.22x1.71y7.55x1.28y1.24x1.09y5.52");
bezierSim.init();
bezierSim.start();
startbutton.onclick = function() {
 bezierSim.start(); 
}