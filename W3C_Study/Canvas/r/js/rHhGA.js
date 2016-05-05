var can, ctx, twoPI, width=900, height=500, haare=[]; 

  window.onload = function(){
  can = document.getElementById('canvas');
  if(!can.getContext){
	document.getElementById("notags").style.display="block";
	return;
  }
    ctx = can.getContext('2d'),
    twoPI = Math.PI * 2,
    width=can.width=900, 
    height=can.height=500;
    loop();
  }
function Ast(x, y, finalLength) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.rot = Math.random() * .05 + .02;
    this.finalLength = finalLength;
    this.length = 0;
    this.startLeft = Math.random() < .5 ? true : false;
    this.startDir = Math.PI;
    this.gone = false;
    this.parts = [];
    var totallength = 0;
    while (totallength < this.finalLength) {
        var newPart = Math.random() * (this.finalLength / 4);
        totallength += newPart;
        this.parts.push(totallength);
    }
}

Ast.prototype.draw = function() {
    var cx = this.x,
        cy = this.y,
        cdir = this.startDir,
        cleft = this.startLeft,
        partindex = 0,
        cdx = new Array(this.length),
        cdy = new Array(this.length);
    ctx.fillStyle = "#000";
        ctx.beginPath();
  ctx.moveTo(cx,cy);
  for (var i = 0; i < this.length; i++) {
        var cr = ((this.length - i) / this.length) * 1;
        var cd = ((i) / this.length) / 6 + .01;
        cx+= cdx[i]=Math.sin(cdir);
        cy += cdy[i]=Math.cos(cdir);
        ctx.lineTo(cx+cdy[i]*cr, cy-cdx[i]*cr);
        cdir += cleft ? cd : -cd;
        if (i >= this.parts[partindex]) {
            partindex++;
            cleft = !cleft;
        }
    }
  for (var i=this.length-1;i>=0;i--){
    cx-=cdx[i];
    cy-=cdy[i];
        ctx.lineTo(cx, cy);
  
  }
        ctx.closePath();
        ctx.fill();

}
Ast.prototype.fall = function() {
    this.vy += .5;
    this.y += this.vy;
    this.startDir += (this.startLeft ? this.rot : -this.rot)*(this.vy*.1);
    if (this.y > (height+100)) this.gone = true;
}

Ast.prototype.grow = function() {
    if (this.length < this.finalLength) this.length++;
    else this.fall();
}




function loop() {
    if (Math.random()<.2) haare.push(new Ast(Math.random() * width, Math.random() * height, Math.random() * 300 + 100));
    ctx.clearRect(0, 0, width, height);
    var stime = new Date().getTime();
    for (var i = 0; i < haare.length; i++) {
        if (haare[i].gone) {
            haare.splice(i, 1);
            i--;
        } else {
            haare[i].grow();
            haare[i].draw();
        }
    }
    setTimeout(loop, 40 - (new Date().getTime() - stime));
}