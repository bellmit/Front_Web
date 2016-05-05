window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var c=document.createElement("canvas");
var wraps=document.getElementById("showcanvas");
c.id="canvas";
var nodeimgs=document.createElement("img");
nodeimgs.alt="no html5 tag";
nodeimgs.src="images/no-html5.png";
nodeimgs.id=nodeimgs.className="notags";
if(!c.getContext){
	nodeimgs.style.display="block";
	wraps.style.backgroundColor="#fff";
	wraps.appendChild(c.appendChild(nodeimgs));
}
wraps.appendChild(c);
var ctx = c.getContext('2d');
var cw = c.width = 900;
var ch = c.height = 500;
var mx = cw/2;
var my = ch/2;
var mousedown = false;

var Circle = function(){
  this.x = cw/2;
  this.y = ch/2;
  this.vy = 1;
  this.r = 20;
  this.angle = 0;
}
    
Circle.prototype.update = function(){
  this.angle += (this.y/3000)*.65;
  this.x = cw/2 + Math.cos(this.angle)*360;
  this.y = ch/2 + (Math.sin(this.angle)*40) + Math.sin(this.angle)*14;
}
  
Circle.prototype.render = function(){
  ctx.save();
  ctx.translate(this.x, this.y);
  var scale = Math.sin(this.angle);
  ctx.scale(1 + scale * .6, 1 + scale * .6);
  ctx.beginPath();
  ctx.arc(0, 0, this.r, 0, Math.PI * 2, false);
  ctx.fillStyle = 'hsla(190, 100%, '+(50+(scale)*25)+'%, 1)';
  ctx.fill();
  ctx.restore();  
}
  
var circle = new Circle();

var clear = function(){
  ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
  ctx.fillRect(0, 0, cw, ch);
};

var loop = function(){
  requestAnimFrame(loop);
  clear();
  circle.update();
  circle.render();
}
    
var mousemoveCB = function(e) {mx = e.pageX; my = e.pageY; }   
var mousedownCB = function(){ mousedown = true; }    
var mouseupCB = function(){ mousedown = false; }
    
window.addEventListener('mousemove', mousemoveCB, false);
window.addEventListener('mousedown', mousedownCB, false);
window.addEventListener('mouseup', mouseupCB, false);
loop();