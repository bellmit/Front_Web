var requestAnimatFrame=function(){
		return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(aparms){window.setTimeout(aparms,1000/60)}}();
var particles = new Array(4000), pi2 = Math.PI * 2;
var can, ctx, map;
window.onload = function() {
  can = document.getElementById("canvas");
  if(!canvas.getContext){
	  	var imgs=document.getElementById("notags")
		imgs.style.display="block";
		imgs.parentNode.parentNode.style.backgroundColor="#fff";
		document.getElementById("showin").style.display="none";
		return;
  }
  can.width=window.innerWidth*(96/100);
  can.height=500;
  ctx = can.getContext('2d');
  map = new Array(can.width * can.height);
  for (var i = 0; i < particles.length; i++)
    particles[i] = new Particle();
  makeMap(document.getElementById('showin').value);
	document.getElementById('showin').onkeyup = function() {
		makeMap(document.getElementById('showin').value);

	}
	loop();
}
function makeMap(text) {
	var canT = document.createElement('canvas');
	canT.width = can.width;
	canT.height = can.height;
	var ctxT = canT.getContext('2d');
	ctxT.fillStyle = 'rgb(255,255,255)';
	ctxT.font = '500px 宋体';
	ctxT.textAlign = 'left';
	ctxT.textBaseline = 'middle';
	ctxT.fillText(text, 20, canT.height / 2);
	var pixT = ctxT.getImageData(0, 0, canT.width, canT.height).data;
	for (var i = 0, n = canT.width * canT.height; i < n; i++) {
		map[i] = pixT[i * 4] > 0;
	}
}

function Particle() {
	this.x = Math.random() * can.width;
	this.y = Math.random() * can.height;
	this.vx = Math.random() * 3 - 1.5;
	this.vy = Math.random() * 3 - 1.5;
	this.c = 'rgba(0,0,0,.5)';
	this.r = 0;
	this.ins =false;
}

Particle.prototype.update = function() {
	this.x += this.vx;
	this.y += this.vy;
	if (this.x < 0 || this.x > can.width)
		this.vx = -this.vx;
	if (this.y < 0 || this.y > can.height)
		this.vy = -this.vy;
	this.ins  =map[~~this.y * can.width + ~~this.x];
	if (this. ins &&this.r < 12)
		this.r++;
	else if (!this. ins &&this.r > 0)
		this.r--;
	if (this.r) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, pi2, true);
		ctx.closePath();
	ctx.fill();
	}
}
  Particle.prototype.drawinset=function(){
	if (this.r) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r*.8, 0, pi2, true);
		ctx.closePath();
		ctx.fill();
	}
	
}

  
function loop() {
  can.width = can.width;
  ctx.shadowColor = '#88b';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

	ctx.fillStyle = '#888';
	for (var i = 0, n = particles.length; i < n; i++)
		particles[i].update();
	ctx.fillStyle = '#fff';
  ctx.shadowColor="transparent";
  	for (var i = 0, n = particles.length; i < n; i++)
		particles[i].drawinset();
	requestAnimatFrame(loop);
}
