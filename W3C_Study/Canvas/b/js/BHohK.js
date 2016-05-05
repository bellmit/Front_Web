var balls = function() {
  
  /* configuration */
  var BALL_NUMBER    = 40;
  var BALL_SIZE      = 60;
  var BALL_COLOR     = "#70CDFF";
  var BACK_COLOR     = "#f9f9f9";
  var GRAVITY_X      = 0;
  var GRAVITY_Y      = 0.5;
  var MOUSE_REPEL    = false;
  var MOUSE_STRENGTH = 1.4;
  var BOUNCINESS     = 0.8;
  var FRICTION       = 1.01;
  var WALL_STICK     = false;
  var WALL_BOUNCE    = true;
  var STICKINESS     = 50;

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
  
  var pixels, mouseX, mouseY, mouseDown = false, balls = [], canvas, context, width, height;
	
	var loop = function() {
		
		pixels = new Array(width * height);
		
    context.fillStyle = BACK_COLOR;
    context.fillRect(0,0,width,height);
		
		for (var i = 0; i < BALL_NUMBER; i++) {
			balls[i].tick();
		}
		
		requestAnimFrame(loop);
	};

	var Ball = function(radius) {
		
		this.x 	= Math.random() * width;
		this.y 	= Math.random() * height;
		this.fx = 0;
		this.fy = 0;
		this.dx = 0;
		this.dy = 0;
	};

	Ball.prototype.tick = function() {
		
		if (mouseDown) {
			var dx = this.x - mouseX;
			var dy = this.y - mouseY;
			var d = Math.sqrt(dx * dx + dy * dy)/(MOUSE_STRENGTH);
			if (d < BALL_SIZE * 4) {
        if(MOUSE_REPEL) {
          this.dx += dx / d;
          this.dy += dy / d;
        }
        else {
          this.dx -= dx / d;
          this.dy -= dy / d;
        }
			}
		}
		
		this.fy += GRAVITY_Y;
		this.fx += GRAVITY_X;
		this.x  += this.fx;
		this.y  += this.fy;
		
		if (this.x < BALL_SIZE * .5) {

      if(WALL_STICK) {
        this.x = BALL_SIZE * .5;
        this.fy /= FRICTION*STICKINESS;
      }
      else if(WALL_BOUNCE) {
        this.x = BALL_SIZE * .5;
        this.fx = this.fx * (-1) * BOUNCINESS;
        this.fy /= FRICTION;
      }
      else {
        this.dx += (BALL_SIZE * .5 - this.x);
      }
		}
		else if (this.x > width - BALL_SIZE * .5) {

      if(WALL_STICK) {
        this.x = width - BALL_SIZE * .5;
        this.fy /= FRICTION*STICKINESS;
      }
      else if(WALL_BOUNCE) {
        this.x = width - BALL_SIZE * .5;
        this.fx = this.fx * (-1) * BOUNCINESS;
        this.fy /= FRICTION;
      }
      else {
        this.dx -= (this.x - width + BALL_SIZE * .5);
      }
		}
		
		if (this.y < BALL_SIZE * .5) {
              
      if(WALL_STICK) {
        this.y = BALL_SIZE * .5;
        this.fx /= FRICTION*STICKINESS;
      }
      else if(WALL_BOUNCE) {
        this.y = BALL_SIZE * .5;
        this.fy = this.fy * (-1) * BOUNCINESS;
        this.fx /= FRICTION;
      }
      else {
        this.dy += (BALL_SIZE * .5 - this.y);
      }
		}
		else if (this.y > height - BALL_SIZE * .5) {
            
      if(WALL_STICK) {
        this.y = height - BALL_SIZE * .5;
        this.fx /= FRICTION*STICKINESS;   
      }
      else if(WALL_BOUNCE) {
        this.y = height - BALL_SIZE * .5;
        this.fy = this.fy * (-1) * BOUNCINESS;
        this.fx /= FRICTION;
      }
      else {
        this.dy -= (this.y - height + BALL_SIZE * .5);
      }
		}
		
		var inwidth  = Math.round(this.x / BALL_SIZE);
		var inheight = Math.round(this.y / BALL_SIZE);
		
		for (var a = inwidth - 1; a <= inwidth + 1; a++) {
			for (var b = inheight - 1; b <= inheight + 1; b++) {
				var g = pixels[b * width + a] || [];
				for (j = 0, l = g.length; j < l; j++) {
					var that = g[j];
					var dx  = that.x - this.x;
					var dy  = that.y - this.y;
					var d   = Math.sqrt(dx * dx + dy * dy);
					if (d < BALL_SIZE && d > 0) {
						dx = (dx / d) * (BALL_SIZE - d) * .25;
						dy = (dy / d) * (BALL_SIZE - d) * .25;
						this.dx -= dx;
						this.dy -= dy;
						that.dx += dx;
						that.dy += dy;
					}
				}
			}
		}

		if (!pixels[inheight * width + inwidth]) {
			pixels[inheight * width + inwidth] = [this];
		}
		else {
			pixels[inheight * width + inwidth].push(this);
		}
		
		this.x 	+= this.dx;
		this.y 	+= this.dy;
		this.fx += this.dx;
		this.fy += this.dy;
		this.dx = 0;
		this.dy = 0;

		context.beginPath();
		context.fillStyle = BALL_COLOR;
		context.arc(this.x, this.y, BALL_SIZE / 2, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
	};

	return {
		
		init: function(canvas, w, h) {
			
		  canvas 	      = document.getElementById(canvas);
		  if(!canvas.getContext){
			document.getElementById("notags").style.display="block";
			return;
		  }
			context   	  = canvas.getContext('2d');
			canvas.height = (h) ? h : window.innerHeight;
			canvas.width  = (w) ? w : window.innerWidth;
			width         = canvas.width;
			height        = canvas.height;
            
			canvas.addEventListener('mousedown', function(e) {
				if (e.preventDefault) e.preventDefault();
				mouseDown = true;
				return false;
			}, false);
            
			canvas.addEventListener('mouseup', function(e) {
				mouseDown = false;
				return false;
			}, false);

			canvas.addEventListener('mousemove', function(e) {
        if(e.offsetX) {
          mouseX = e.offsetX;
          mouseY = e.offsetY;
        }
        else if(e.layerX) {
          mouseX = e.layerX;
          mouseY = e.layerY;
        }
				return false;
			}, false);

			window.onresize = function() {
				init(c,w,h);
				return false;
			}

			setTimeout(function() {
				for (var i = 0; i < BALL_NUMBER; i++) {
					balls[i] = new Ball(20);
				}
				loop();
			}, 100);
		}
	};
}();

balls.init('canvas');		
		
		