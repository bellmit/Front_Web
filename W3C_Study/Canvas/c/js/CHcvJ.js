window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

var trampoline = function() {

    /* config */
    var TRAMPOLINE_HEIGHT   = 200;
    var WALL_BOUNCE         = true;
  	var BACK_COLOUR         = "#FFFFFF";
		var WALL_ABSORBTION     = 0.8;
		var TRAMPOLINE_FRICTION = 0;
    var GRAVITY             = 0.15;
    var TRAMPOLINE_SPRING   = 0.8;
  
    var canvas, context, width, height, balls = [];

		var loop = function() {

				context.fillStyle = BACK_COLOUR;
				context.fillRect(0, 0, width, height);

				balls.forEach(function(b){
					b.tick();
				});

				requestAnimFrame(loop);
			};

		var Ball = function(radius) {
				this.x  = width * Math.random();
				this.y  = height / 2 - Math.floor(TRAMPOLINE_HEIGHT * (Math.random() * 3));
				this.vx = 0;
				this.vy = 0;
				this.spring = Math.random() * 0.6 + 0.4;
				this.radius = Math.floor(Math.random() * 6) + 4;
				this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
				this.tcolor = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
			};

		Ball.prototype.tick = function() {

			var bounce = false;

			this.vy += GRAVITY;

			if(this.y + this.radius >= height - TRAMPOLINE_HEIGHT) {
				this.vy -= this.spring;
				this.vx += (this.vy < 50) ? 
          ((this.x - width / 2) / (width * 10)) * -1 :
          this.vx;
				if(this.vx < 0) this.vx += TRAMPOLINE_FRICTION;
				if(this.vx > 0) this.vx -= TRAMPOLINE_FRICTION;
				bounce = true;
			}

			if(this.x - this.radius < 0) {
				if(WALL_BOUNCE) {
					if(this.vx > 0) this.vx += WALL_ABSORBTION;
					this.vx *= -1

				}
				this.x = this.radius;
			}

			if(this.x + this.radius > width) {
				if(WALL_BOUNCE) {
					if(this.vx < 0) this.vx -= WALL_ABSORBTION;
					this.vx *= -1;

				}
				this.x = width - this.radius;
			}

			this.x += this.vx;
			this.y += this.vy;

			var midx = (bounce) ? this.x : width / 2;
			var midy = (bounce) ? this.y + this.radius : height - TRAMPOLINE_HEIGHT;


			context.fillStyle = this.color;
			context.strokeStyle = this.tcolor;
			context.beginPath();
			context.moveTo(0, height - TRAMPOLINE_HEIGHT);
			context.quadraticCurveTo(
			0, height - TRAMPOLINE_HEIGHT, midx, midy);
			context.quadraticCurveTo(
			midx, midy, width, height - TRAMPOLINE_HEIGHT);
			context.stroke();
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		};

		return {

			init: function(canvas, w, h) {
				canvas = document.getElementById(canvas);
				if(!canvas.getContext){
					document.getElementById("notags").style.display="block";
					return;
				}
				context = canvas.getContext('2d');
				canvas.height = (h) ? h : window.innerHeight;
				canvas.width = (w) ? w : window.innerWidth;
				width = canvas.width;
				height = canvas.height;

				setTimeout(function() {
					for(var i = 0; i < 100; i++){
						balls.push(new Ball());	
					}
					loop();
				}, 100);
			}
		};
	}();

trampoline.init('canvas', 900, 500);
