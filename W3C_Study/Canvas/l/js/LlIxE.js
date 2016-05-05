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
	wraps.appendChild(c.appendChild(nodeimgs));
}
wraps.appendChild(c);
var ctx = c.getContext('2d'),
cw = c.width =900,
ch = c.height =500,
pi2 = Math.PI * 2,
rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);},
rand_color = function(alpha) {return 'hsla(' + rand(1, 360) + ',' + rand(60, 100) + '%,' + rand(30, 100) + '%,' + alpha + ')'},
color_count = 0,
paused = false,
blur = true,
things = [],
thingCount = 150,
Thing = function(i){
  this.vx = -(rand(10, 35000)/1000);
  this.vy = 5;
  this.x = rand(0, cw);
  this.y = ch/2 - Math.abs(this.vx)*5; 
  this.radius = Math.abs(this.vx*3);
  this.hue = 0;
  this.saturation = 0;
  this.lightness = 100;
  this.alpha = .25;
  
  this.blur = false;
}

Thing.prototype = {
  update: function(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x - this.radius > cw){ this.x = -this.radius; }
    if(this.y - this.radius > ch){ this.y = -this.radius; }
    if(this.x + this.radius < 0){ this.x = cw + this.radius; }
    if(this.y + this.radius < 0){ this.y = ch + this.radius; }
    
    this.blur = blur;
    
    if (this.blur) {
      this.hue = rand_color(.015);
    }
  },
  render: function(){
    
    if (color_count++ > thingCount) {
      if (!this.blur) {
        this.hue = rand_color(.045);
      }
      this.vy *= -1;
      this.vy += 10;
      this.vx *= -1;
      color_count = 0;
      
      if (this.vy > 50) {
        this.vy = 5;
      }
    }
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, pi2, false);  
    ctx.fillStyle = this.hue;
    ctx.fill();
    
    if (this.blur) {
      ctx.beginPath();
      ctx.arc(this.x + 15, this.y - 15, this.radius, 0, pi2, false);  
      ctx.fillStyle = this.hue;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(this.x - 15, this.y + 15, this.radius, 0, pi2, false);  
      ctx.fillStyle = this.hue;
      ctx.fill();
    }
  }
}
  
var updateThings = function(){
  var i = things.length;
  while(i--){
    things[i].update(); 
  }
}
      
var renderThings = function(){
  var i = things.length;
  while(i--){
    things[i].render(); 
  } 
}

var loop = function(){
  if (!paused) {
    requestAnimFrame(loop, c);
    updateThings();
    renderThings();
  }
}
    
for(var i = 0; i < thingCount; i++){
  things.push(new Thing(i));    
}    
loop();
$('canvas').click(function() {
  paused = !paused;
  if (paused) {
    blur = !blur;
  }
  loop();
});