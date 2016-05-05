var c = document.getElementById('canvas');
if(!c.getContext){
		document.getElementById("notags").style.display="block";
}
   var ctx = c.getContext('2d'),
    cw = c.width =900,
    ch = c.height = 500,
    polygons = []
    polygonCount = 50,
    polygonTickMax = 5,
    polygonTick = polygonTickMax,
    minRadius = 10,
    maxRadius = 70,
    minPoints = 3,
    maxPoints = 10,
    globalTick = 0,
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };

ctx.lineWidth = 1;
ctx.lineJoin = 'round';

var compare = function(a, b) {
  if (a.angle < b.angle)
     return -1;
  if (a.angle > b.angle)
    return 1;
  return 0;
}
      
var Polygon = function(){
  this.reset();
};

Polygon.prototype.reset = function(){
  this.radius = rand(minRadius, maxRadius);
  this.x = rand(0, cw);
  this.y = -rand(0, ch) - this.radius;
  this.vy = 0;
  this.rotation = Math.random() * (Math.PI * 2);
  this.rotationSpeed = (rand(0, 100) - 50) / 700;
  this.alpha = rand(10, 50) / 100;
  this.points = [];
  var i = rand(minPoints, maxPoints);
  while(i--){
    var angle = Math.random() * (Math.PI * 2),
        x = Math.round(Math.cos(angle) * this.radius),
        y = Math.round(Math.sin(angle) * this.radius);
    this.points.push({
      x: x, 
      y: y,
      angle: angle
    });
    
  }
  this.points.sort(compare);
};

Polygon.prototype.update = function(){
  this.vy += this.radius/1200;
  this.y += this.vy;
  this.rotation += this.rotationSpeed;
  
  if(this.y > ch + this.radius){
    this.reset(); 
  }
}
    
Polygon.prototype.render = function(){
  var i = this.points.length - 1;
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.beginPath();  
  ctx.moveTo(this.points[i].x, this.points[i].y);
  while(i--){
    ctx.lineTo(this.points[i].x, this.points[i].y);    
  }
  ctx.closePath();
  ctx.fillStyle = 'hsla(0, 0%, 0%, '+this.alpha+')';
  ctx.fill();
  ctx.stroke();
  ctx.restore();  
};

var createPolygons = function(){
  if(polygons.length < polygonCount){
    if(polygonTick >= polygonTickMax){
      polygons.push(new Polygon());
      polygonTick = 0;
    } else {
      polygonTick++;
    }
  }
};

var updatePolygons = function(){
  var i = polygons.length;
  while(i--){
    polygons[i].update(); 
  }
}

var renderPolygons = function(){
  var i = polygons.length;
  while(i--){
    polygons[i].render(); 
  }
}
    
var clear = function(){
  ctx.clearRect(0, 0, cw, ch);
};

var loop = function(){
  window.requestAnimFrame(loop, c);
  clear();
  createPolygons();
  updatePolygons();
  renderPolygons();
  globalTick++;
}
    
window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
    
loop();