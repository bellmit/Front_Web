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
var ctx = c.getContext('2d'),
cw = c.width = 900,
ch = c.height = 500,




rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);},
crawlers = [],
crawlCount = 70,
maxVelocity = 5,
Crawler = function(arg){
  this.x = arg.x || cw / 2;
  this.y = arg.y || ch / 2;
  this.lx = arg.x || cw / 2;
  this.ly = arg.y || ch / 2;
  this.vx = arg.vx || 0;
  this.vy = arg.vy || 0;
  this.hue = arg.hue || 0;
  this.saturation = arg.saturation || 75;
  this.lightness = arg.lightness || 30;
  this.alpha = arg.alpha || .5;
  this.width = arg.width || .5;
},
updateCrawlers = function(){
  var i = crawlers.length;
  while(i--){crawlers[i].update()}
},
renderCrawlers = function(){
	var i = crawlers.length;
  while(i--){crawlers[i].render()}
},
clear = function(){
  ctx.clearRect(0, 0, cw, ch);
},
loop = function(){
  requestAnimFrame(loop, c);
  updateCrawlers();
  renderCrawlers();
}
    
Crawler.prototype = {
	update: function(){
    this.lx = this.x;
    this.ly = this.y;
  	this.vx += ((rand(0, 1000) - 500) / 1000);
  	this.vy += ((rand(0, 1000) - 500) / 1000);
    this.x += this.vx;
    this.y += this.vy;
    if(this.vx > maxVelocity){
    	this.vx = maxVelocity; 
    }
    if(this.vx < -maxVelocity){
    	this.vx = -maxVelocity; 
    }
    if(this.vy > maxVelocity){
    	this.vy = maxVelocity; 
    }
    if(this.vy < -maxVelocity){
    	this.vy = -maxVelocity; 
    }
    if(this.x >= cw || this.x <= 0){
      this.vx = -this.vx;
    }
    if(this.y >= ch || this.y <= 0){
      this.vy = -this.vy;
    }  
	},
  render: function(){
    ctx.beginPath();
    var i = crawlers.length;
		while(i--){
        var c2 = crawlers[i];
        var dx = c2.x - this.x;
        var dy = c2.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist <= 150){       
    			ctx.moveTo(this.lx, this.ly);
          ctx.lineTo(c2.x, c2.y);         
        }   
		}
    ctx.lineWidth = this.width;
   	ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
    ctx.stroke();
    
  }
}
while(crawlCount--){
  crawlers.push(new Crawler({
    x: rand(0, cw),
    hue: rand(300, 390),
    saturation: 65,
    lightness: rand(5, 30),
    alpha: rand(1, 20)/100,
    width: rand(50, 150)/100
 }));
}
$(window).click(clear);
ctx.globalCompositeOperation = 'lighter';
loop();