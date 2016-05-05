window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var c = document.getElementById('canvas');
if(!c.getContext){
	document.getElementById("notags").style.display="block";
}
var ctx = c.getContext('2d');
var cw = c.width = 900;
var ch = c.height = 500;
var rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);}
var plusses = [];
var count = 100;
var tick = 3;
var tickMax = 3;

var Plus = function(){
  this.init();
}
    
Plus.prototype.init = function(){
  this.x = cw/2;
  this.y = ch * .7;
  this.vx = (rand(0, 100)-50)/12;
  this.vy = -(rand(50, 100))/9;
  this.lightness = rand(0, 50);
  this.alpha = .1;
  this.fade = .015;
  this.scale = 1;
  this.growth = .06;
  this.rotation = rand(0, Math.PI*2);
  this.spin = (rand(0, 100)-50)/300;
}
    
Plus.prototype.update = function(i){
  this.x += this.vx;
  this.y += this.vy;
  this.vy += .15 * this.scale;
  if(this.alpha < 1){
    this.alpha += this.fade;
  }
  this.scale += this.growth;
  this.rotation += this.spin;
  
  if(this.y-30 >= ch){
    this.init();
  }
}
  
Plus.prototype.render = function(){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(this.scale, this.scale);
  ctx.rotate(this.rotation);
  
  ctx.fillStyle = 'hsla(0, 0%, '+this.lightness+'%, '+this.alpha+')';
  ctx.beginPath();
  ctx.rect(-3, -1, 6, 2);
  ctx.rect(-1, -3, 2, 6);
  ctx.fill();
  ctx.restore();
}
  
var createPlusses = function(){
  if(plusses.length < count){
    if(tick >= tickMax){
      plusses.push(new Plus());
      tick = 0;
    } else {
      tick++; 
    }
  }
}
    
var updatePlusses = function(){
  var i = plusses.length;
  while(i--){
    plusses[i].update(i);
  }
}
  
var renderPlusses = function(){
  var i = plusses.length;
  while(i--){
    plusses[i].render();
  }
}
    
var loop = function(){
  requestAnimFrame(loop);
  ctx.clearRect(0, 0, cw, ch);
  createPlusses();
  updatePlusses();
  renderPlusses();
}
        
loop();