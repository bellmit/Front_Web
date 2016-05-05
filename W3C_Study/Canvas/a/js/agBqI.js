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
    var TRAMPOLINE_HEIGHT   = 80;//trampoline_height
    var BALL_RADIUS         = 10;//ball_radius
    var WALL_BOUNCE         = true;//wall_bounce
  	var TRAMPOLINE_COLOUR   = "#000000";//trampoline_colour
	var BALL_COLOUR         = "#000000";//ball_colour
	var BACK_COLOUR         = "#FFFFFF";//back_colour
	var WALL_ABSORBTION     = 0.8;//wall_absorbtion
	var TRAMPOLINE_FRICTION = 0.01;//trampoline_friction
    var GRAVITY             = 0.1;//gravity
    var TRAMPOLINE_SPRING   = 0.4;//trampoline_spring
    var canvas, context, width, height, ball;

		var loop = function() {

				context.fillStyle = BACK_COLOUR;
				context.fillRect(0, 0, width, height);

				ball.tick();

				requestAnimFrame(loop);
			};

		var Ball = function(radius) {
				this.x  = width * Math.random();
				this.y  = height / 2 - TRAMPOLINE_HEIGHT;
				this.vx = 0;
				this.vy = 0;
			};

		Ball.prototype.tick = function() {

			var bounce = false;

			this.vy += GRAVITY;

			if(this.y + BALL_RADIUS >= height - TRAMPOLINE_HEIGHT) {
				this.vy -= TRAMPOLINE_SPRING;
				this.vx += (this.vy < 50) ? 
          ((this.x - width / 2) / (width * 10)) * -1 :
          this.vx;
				if(this.vx < 0) this.vx += TRAMPOLINE_FRICTION;
				if(this.vx > 0) this.vx -= TRAMPOLINE_FRICTION;
				bounce = true;
			}

			if(this.x - BALL_RADIUS < 0) {
				if(WALL_BOUNCE) {
					if(this.vx > 0) this.vx += WALL_ABSORBTION;
					this.vx *= -1

				}
				this.x = BALL_RADIUS;
			}

			if(this.x + BALL_RADIUS > width) {
				if(WALL_BOUNCE) {
					if(this.vx < 0) this.vx -= WALL_ABSORBTION;
					this.vx *= -1;

				}
				this.x = width - BALL_RADIUS;
			}

			this.x += this.vx;
			this.y += this.vy;

			var midx = (bounce) ? this.x : width / 2;
			var midy = (bounce) ? this.y + BALL_RADIUS : height - TRAMPOLINE_HEIGHT;


			context.fillStyle = BALL_COLOUR;
			context.strokeStyle = TRAMPOLINE_COLOUR;
			context.beginPath();
			context.moveTo(0, height - TRAMPOLINE_HEIGHT);
			context.quadraticCurveTo(
			0, height - TRAMPOLINE_HEIGHT, midx, midy);
			context.quadraticCurveTo(
			midx, midy, width, height - TRAMPOLINE_HEIGHT);
			context.stroke();
			context.beginPath();
			context.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2, true);
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
				canvas.height = (h) ? h :500;
				canvas.width = (w) ? w :900;
				width = canvas.width;
				height = canvas.height;

				document.onkeydown = function(e) {
					if(e.keyCode == 37) {
						ball.vx -= 0.2;
					}
					if(e.keyCode == 39) {
						ball.vx += 0.2;
					}
					return false;
				}

				setTimeout(function() {
					ball = new Ball();
					loop();
				}, 100);
			}
		};
	}();

trampoline.init('c', 800, 300);