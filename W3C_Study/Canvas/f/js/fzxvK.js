$(function() {
	var W = 900, H = 500, c = document.getElementById("canvas");
	
	$("#list").css({
		height: H + "px",
		width: W - H + "px"
	});
	if(!c.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
	c.height = H; c.width = W;
	c = c.getContext("2d");
	
	balls = [];
	ballCount = 50;
	
	function Ball() {
		this.x = Math.random() * W;
		this.y = Math.random() * H;
		this.vx = -1 + Math.random() * 2;
		this.vy = -1 + Math.random() * 2;
		this.r = 10;
		this.c = rColor();
	}
	function update() {
		paintCanvas();
		
		for(var i = 0; i < balls.length; i++) {
			p = balls[i];
			
			p.x += p.vx;
			p.y += p.vy;
		
			c.fillStyle = p.c;
			c.beginPath();
			c.arc(p.x,p.y,p.r,0 * Math.PI, 2 * Math.PI, false);
			c.fill();
			
			if (p.x + p.r > W || p.x - p.r < 0) p.vx = p.vx * - 1 + 0.05;
			if (p.y + p.r > H || p.y - p.r < 0) p.vy = p.vy * - 1 + 0.05;
			
			if		(p.x + p.r > W) p.vx -= 0.05;
			else if	(p.x - p.r < 0) p.vx += 0.05;
			
			if		(p.y + p.r > H) p.vy -= 0.05;
			else if	(p.y - p.r < 0)	p.vy += 0.05;
			
			for(var j = i + 1; j < balls.length; j++) {
				p2 = balls[j];
				
				var	dist,
					dx = p.x - p2.x,
					dy = p.y - p2.y,
					color;
				
				dist = Math.sqrt(dx * dx + dy * dy);
							
				if(dist <= p.r * 2) {
					p2.c = p.c;
					color = p.c;
					
					var ax = dx / 1000,
						ay = dy / 1000;
					
					p.x += ax;
					p.y += ay;
				}
				else if(dist <= p.r * 2 + 50) {
					c.lineWidth = 1.5;
					c.strokeStyle = p.c;
					c.beginPath();
					c.moveTo(p.x,p.y);
					c.lineTo(p2.x,p2.y);
					c.stroke();
					c.beginPath();
					
					p.r += 0.005;
					p2.r -= 0.005;
					
					if(p.r > 50) p.r -= 0.01;
					if(p2.r < 5) p2.r += 0.01;
				}
			}
		}
	}
	function rgb() {
		return Math.round(Math.random() * 256);
	}
	function rColor() {
		return "rgb("+rgb()+","+rgb()+","+rgb()+")";
	}
	function paintCanvas() {
		c.fillStyle = "rgba(0,0,0,1)";
		c.fillRect(0,0,W,H);
	}
	for(i = 0; i < ballCount; i++) 
		balls.push(new Ball());
	setInterval(function() {
		update();
	},5);
});