// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas=document.createElement("canvas");
canvas.id="canvas";
var nodeimgs=document.createElement("img");
nodeimgs.alt="no html5 tag";
nodeimgs.src="images/no-html5.png";
nodeimgs.id=nodeimgs.className="notags";
if(!canvas.getContext){
	nodeimgs.style.display="block";
	document.getElementById("showcanvas").appendChild(canvas.appendChild(nodeimgs));
}
	document.getElementById("showcanvas").appendChild(canvas);
    var c = canvas.getContext('2d'),
    WIDTH = canvas.width = window.innerWidth*(96/100),
    HEIGHT = canvas.height = 500,
    MAX_CIRCLES = Number.MAX_INT,
    circles = [],
    i = 0,
    len = 0;
window.addEventListener('resize', function () {
    WIDTH = canvas.width = window.innerWidth*(96/100);
    HEIGHT = canvas.height = 500;
});

function Circle (posx, posy) {
    this.pos = {
        x: posx || WIDTH/2,
        y: posy || HEIGHT/2
    };
    
    this.vel = {
        x: (Math.random() * 19) + 1,
        y: (Math.random() * 19) + 1
    };
    
    this.angle = (Math.random() * (359)) + 1;
    this.mass = 0;
    this.drag = 1;
    this.gravity = 0;
    this.radius = (Math.random() * 14) + 1;
    this.color = '#000000';
}

Circle.prototype = {
    update: function () {
        var radians = this.angle * Math.PI/180;
        
        this.vel.x *= this.drag;
        this.vel.y *= this.drag;
        
        this.vel.y += Math.sin(radians) * this.gravity;

        this.pos.x += Math.cos(radians) * this.vel.x;
        this.pos.y += Math.sin(radians) * this.vel.y;
        
        this.testWallCollision();
      
    },
    
    render: function (c) {
        c.save();
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
        c.fill();
        c.closePath();
        c.restore();
    },
    
    testWallCollision: function () {
        if ( (this.pos.x + this.radius) > WIDTH || (this.pos.x + this.radius) < 0 ) {
            this.vel.x *= -1;
        } else if ( (this.pos.y + this.radius) > HEIGHT || (this.pos.y + this.radius) < 0 ) {
            this.vel.y *= -1;
        }
    }
};


function createCircles (n) {
    if (!n) return;
    var circles = [];
    for (var i = 0; i < n; i++) circles.push(new Circle());
    return circles;
}

function loop () {
    c.clearRect(0, 0, WIDTH, HEIGHT);
    
    for (i = 0, len = circles.length; i < len; i++) {
        circles[i].update(c);
        circles[i].render(c);
    }
    
    while (circles.length > MAX_CIRCLES) circles.shift();
}

Array.prototype.push.apply(circles, createCircles(1000));


(function animloop(){
  requestAnimFrame(animloop);
  loop();
})();