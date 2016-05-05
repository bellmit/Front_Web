var canvas, ctx, cw, ch, pix, pixImg, blank;
var keyLeft = false, keyRight = false, keyUp = false, keyDown = false, keySpace = false;
var asteroids = [], lasers = [], particles = [], gameMode = 1, counter = 0, shooting=false;

function keydown(e) {
  switch(e.keyCode) {
    case 37:
    case 65:
			keyLeft = true;
			break;
		case 39:
		case 68:
			keyRight = true;
			break;
		case 38:
		case 87:
			keyUp = true;
			break;
		case 40:
		case 83:
			keyDown = true;
			break;
		case 32:
			keySpace = true;
			break;
	}
}

function keyup(e) {
	switch(e.keyCode) {
		case 37:
		case 65:
			keyLeft = false;
			break;
		case 39:
		case 68:
			keyRight = false;
			break;
		case 38:
		case 87:
			keyUp = false;
			break;
		case 40:
		case 83:
			keyDown = false;
			break;
		case 32:
			keySpace = false;
      shooting = false;
			break;
	}
}

/*
 *  Start of Vector Class
 */
function Vec(x, y) {
	this.x = x;
	this.y = y;
}

Vec.prototype.unit = function() {
	var vecL = Math.sqrt(this.x * this.x + this.y * this.y);
	return new Vec(this.x / vecL, this.y / vecL);
}
Vec.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;
}
Vec.prototype.add = function(vec) {
	this.x += vec.x;
	this.y += vec.y;
}
Vec.prototype.sub = function(vec) {
	this.x -= vec.x;
	this.y -= vec.y;
}
Vec.prototype.len = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}
Vec.prototype.mult = function(mult) {
	return new Vec(this.x * mult, this.y * mult);
}
Vec.prototype.multv = function(vec) {
	return new Vec(this.x * vec.y, this.y * vec.x);
}
Vec.prototype.clone = function() {
	return new Vec(this.x, this.y);
}
Vec.prototype.opp = function() {
	return new Vec(-this.x, -this.y);
}
Vec.prototype.normal = function() {
	return new Vec(this.y, -this.x);
}
/*
 *  End of Vector Class
 */

/*
 * Start of Laser Class
 */
function Laser(pos, dir) {
	this.name = 'laser';
	this.speed = 5;
	this.pos = pos.clone();
	this.dir = dir.clone();
	this.rot = 0;
	this.mesh = [[0, 3], [.5, .5], [3, 0], [.5, -.5], [0, -3], [-.5, -.5], [-3, 0], [-.5, .5]];
	this.alive = true;
}

Laser.prototype.update = function() {
	this.rot += .3
	this.pos.add(this.dir.clone().mult(5));
	this.alive = !(this.pos.x > cw || this.pos.x < 0 || this.pos.y > ch || this.pos.y < 0);
	for (var i = 0; i < asteroids.length; i++) {
		var astPos = asteroids[i].pos.clone();
		astPos.sub(this.pos);
		if (asteroids[i].onscreen && astPos.len() < asteroids[i].sizes[asteroids[i].level] + 3) {
			asteroids[i].hit(this.dir);
			this.alive = false;
			break;
		}

	}
}
Laser.prototype.draw = function() {
	drawObject(this);
}
/*
 * End of Laser Class
 */

/*
 * Start of Asteroid Class
 */
function Asteroid(pos, dir, level) {
	this.pos = pos.clone();
	this.rot = 0;
	this.rotSpeed = Math.random() * .3 - .15;
	this.dir = dir.clone();
	this.alive = true;
	this.onscreen = false;
	this.level = level;
	this.mesh = [];
	this.sizes = [4, 7, 13, 20];
	var rPos = 0, rDist = 0;
	while (rPos < Math.PI * 1.8) {
		rPos += Math.random() * Math.PI * .2;
		rDist = Math.random() * (this.sizes[this.level] / 4) + this.sizes[this.level];
		this.mesh.push([Math.sin(rPos) * rDist, Math.cos(rPos) * rDist]);
	}

}

Asteroid.prototype.update = function() {
	this.rot += this.rotSpeed;
	this.pos.add(this.dir);
	var r = this.sizes[this.level] / 2;
	if (!this.onscreen)
		this.onscreen = (this.pos.x < cw - r && this.pos.x > r && this.pos.y < ch - r && this.pos.y > r );
	if (this.onscreen && (this.pos.x > cw - r || this.pos.x < r)) {
		this.dir.x = -this.dir.x;
	}
	if (this.onscreen && (this.pos.y > ch - r || this.pos.y < r)) {
		this.dir.y = -this.dir.y;
	}
}
Asteroid.prototype.draw = function() {
	drawObject(this);
}
Asteroid.prototype.hit = function(laserDir) {
	this.alive = false;
	player.score += 5;
	if (this.level > 0) {
		var newAngle1 = Math.random() * Math.PI;
		var dirX1 = laserDir.x + Math.sin(newAngle1);
		var dirY1 = laserDir.y + Math.cos(newAngle1);

		var dir1 = new Vec(dirX1, dirY1);
		if (dir1.len() < .5)
			dir1 = dir1.mult(.5 / dir1.len());
		var newAngle2 = Math.random() * Math.PI;
		var dirX2 = laserDir.x + Math.sin(newAngle2);
		var dirY2 = laserDir.y + Math.cos(newAngle2);
		var dir2 = new Vec(dirX2, dirY2);
		if (dir2.len() < .5)
			dir2 = dir2.mult(.5 / dir2.len());
		asteroids.push(new Asteroid(this.pos, dir1, this.level - 1));
		asteroids.push(new Asteroid(this.pos, dir2, this.level - 1));

	}
	emitParticles(this.pos, 50, 100, 0, Math.PI * 2, 0, 2, 10, 40);
}
/*
 * End of Asteroid Class
 */

/*
 * Start of Particle Class
 */
function Particle(pos, dir, life) {
	this.pos = pos.clone();
	this.dir = dir;
	this.life = life;
	this.alive = true;
}

Particle.prototype.update = function() {
	this.pos.add(this.dir);
	this.alive = --this.life > 0 && this.pos.x > 0 && this.pos.x < cw && this.pos.y > 0 && this.pos.y < ch;
}
Particle.prototype.draw = function() {
	var pPos = (Math.floor(this.pos.y) * cw + Math.floor(this.pos.x)) * 4;
	pix[pPos] = pix[pPos + 1] = pix[pPos + 2] = pix[pPos + 3] = 255;
}
/*
 * End of Particle CLass
 */
function emitParticles(pos, minAmount, maxAmount, minAngle, maxAngle, minSpeed, maxSpeed, minLife, maxLife) {
	for (var i = 0, n = Math.random() * (maxAmount - minAmount) + minAmount; i < n; i++) {
		var angle = Math.random() * (maxAngle - minAngle) + minAngle;
		var speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		var dir = new Vec(Math.sin(angle) * speed, -Math.cos(angle) * speed);
		particles.push(new Particle(pos, dir, Math.random() * (maxLife - minLife) + minLife));
	}
}

function drawObject(object) {
	ctx.save();
	ctx.translate(object.pos.x, object.pos.y);
	ctx.rotate(object.rot);
	ctx.beginPath();
	ctx.moveTo(object.mesh[0][0], object.mesh[0][1]);
	for (var i = 1; i < object.mesh.length; i++) {
		ctx.lineTo(object.mesh[i][0], object.mesh[i][1]);
	}
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

var player = {
	name : 'player',
	score : 0,
	life : 100,
	dispLife : 0,
	hit : 0,
	speed : 2,
	pos : new Vec(0, 0),
	rot : 0,
	dir : new Vec(0, 0),
	travel : new Vec(0, 0),
	mesh : [[0, -20], [10, 0], [12, -13], [14, 4], [10, 0], [0, 10], [-10, 0], [-12, -13], [-14, 4], [-10, 0]],
	init : function(x, y, r) {
		this.pos.set(x, y);
		this.rot = r;
		this.dir.set(Math.sin(this.rot), -Math.cos(this.rot));
		this.hit = 0;
		this.life = 100;
		this.dispLife = 0;
		this.score = 0;
		this.travel = new Vec(0, 0);
	},
	rotate : function(degrees) {
		this.rot += degrees;
		this.dir.set(Math.sin(this.rot), -Math.cos(this.rot));
		particlePos = this.pos.clone();
		particlePos.x += this.dir.unit().y * (degrees < 0 ? -14 : 14);
		particlePos.y += this.dir.unit().x * (degrees < 0 ? 14 : -14);
		emitParticles(particlePos, 2, 4, this.rot + Math.PI - .03, this.rot + Math.PI + .03, 1, 3, 5, 20);
	},
	accelerate : function() {
		this.travel.add(this.dir.mult(.2));
		var particlePos = this.pos.clone();
		particlePos.add(this.dir.unit().mult(-10));
		emitParticles(particlePos, 5, 10, this.rot + Math.PI - .1, this.rot + Math.PI + .1, 0, 3, 5, 50);
	},
	shoot : function() {
    if (!shooting){
		var laserPos = this.pos.clone();
		laserPos.add(this.dir.unit().mult(20));
		lasers.push(new Laser(laserPos, this.dir));
    shooting=true;
    }
	},
	update : function() {
		this.hit -= this.hit > 0 ? 1 : 0;
		this.pos.add(this.travel);
		this.travel = this.travel.mult(.99);
		if (this.pos.x > cw || this.pos.x < 0) {
			this.pos.x = (this.pos.x + cw) % cw;
		}
		if (this.pos.y > ch || this.pos.y < 0) {
			this.pos.y = (this.pos.y + ch) % ch;
		}

		for (var i = 0; i < asteroids.length && this.hit <= 0; i++) {
			var astPos = asteroids[i].pos.clone();
			astPos.sub(this.pos);
			if (asteroids[i].onscreen && astPos.len() < asteroids[i].sizes[asteroids[i].level] + 10) {
				this.life -= asteroids[i].sizes[asteroids[i].level] * 1.5 + 5;
				this.life = Math.floor(this.life);
				if (this.life <= 0)
					gameMode = 3;
				this.hit = 100;

			}

		}
	},
	draw : function() {
		if (!(this.hit > 0 && Math.floor(this.hit / 3) % 2 == 0)) {
			drawObject(this);
		}
	}
}
function init() {
	asteroids = [];
	lasers = [];
	particles = [];
	player.init(cw / 2, ch / 2, 0);
	createAsteroid();
}

window.onload = function() {
	canvas = document.getElementById('canvas');
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
	ctx = canvas.getContext('2d');
	cw = canvas.width=900;
	ch = canvas.height=500;
  blank=ctx.createImageData(cw,ch);
  pixImg=ctx.createImageData(cw,ch);
  pix=pixImg.data;
	document.onkeydown = keydown;
	document.onkeyup = keyup;
	updateLoop();
}
function updateArray(array) {
	for (var i = 0; i < array.length; i++) {
		array[i].update();
		if (array[i].alive) {
			array[i].draw();
		} else {
			array.splice(i, 1);
			i--;
		}
	}
}

function updateLoop() {
	canvas.width = canvas.width;
	var sTime = new Date().getTime();
	switch(gameMode) {
		case 1:
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.font = "60px 'Audiowide'";
			ctx.fillText('canvasteroids', cw / 2, ch / 2-90);
			ctx.font = "20px 'Audiowide'";
			ctx.fillText('arrow keys for control',cw/2,ch/2-20);
			ctx.fillText('space for lasers',cw/2,ch/2+20);
			counter++;
			if (counter > 100 && ~~(counter / 20) & 1) {
				ctx.font = "30px 'Audiowide'";
				ctx.fillText('press space', cw / 2, ch / 2 + 90);

			}
			if (keySpace) {
				init();
				gameMode = 2;
				keySpace = false;
				counter = 0;
			}
			break;
		case 2:
			if (keyLeft) {
				player.rotate(-.1);
			}
			if (keyRight) {
				player.rotate(.1);
			}
			if (keyUp) {
				player.accelerate();
			}
			if (keySpace) {
				player.shoot();
				keySpace = false;
			}
			pix.set(blank.data);
			updateArray(particles);
			ctx.putImageData(pixImg, 0, 0);
			ctx.font = "20px 'Audiowide'";
			ctx.textAlign = 'left';
			ctx.textBaseline = 'hanging';
			ctx.fillStyle = 'rgba(255,255,255,.3)';
			ctx.fillText(player.score, 10, 10);
			ctx.strokeStyle = 'rgba(255,255,255,.3)';
			ctx.lineWidth = 30;
			ctx.beginPath();
			player.dispLife += player.dispLife < player.life ? 1 : (player.dispLife > player.life ? -1 : 0);
			var energyCirc = (100 - player.dispLife) / 100 * Math.PI;
			ctx.arc(cw - 60, 60, 30, -Math.PI + Math.PI / 2 + energyCirc, Math.PI + Math.PI / 2 - energyCirc, false);
			ctx.stroke();
			ctx.strokeStyle = "rgb(255,255,255)";
			ctx.lineWidth = 2;
			ctx.lineJoin = "bevel";
			updateArray(lasers);
			updateArray(asteroids);
			player.update();
			player.draw();
			break;
		case 3:
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.font = "60px 'Audiowide'";
			ctx.fillText('game over', cw / 2, ch / 2 - 90);
			ctx.fillText(player.score, cw / 2, ch / 2);
			counter++;
			if (counter > 100) {
				if (~~(counter / 20) &1) {
					ctx.font = "30px 'Audiowide'";
					ctx.fillText('press space', cw / 2, ch / 2 + 90);
				}
				if (keySpace) {
					init();
					gameMode = 2;
					keySpace = false;
					counter = 0;
				}
			}
			break;
	}
	setTimeout(updateLoop, 20 - (new Date().getTime() - sTime));
}

function createAsteroid() {
	if (asteroids.length < (5+player.score/100)) {
		var pos = new Vec(Math.random() * (cw - 50) + 25, Math.random() * (ch - 50) + 25);
		var dirX = Math.random() * 2 - 1;
		var dirY = Math.random() * 2 - 1;
		var dir = new Vec(dirX, dirY);
		if (dir.len() < .5)
			dir = dir.mult(.5 / dir.len());
		var rX = ((dir.x < 0 ? cw - pos.x : pos.x) + 30) / dir.x;
		var rY = ((dir.y < 0 ? ch - pos.y : pos.y) + 30) / dir.y;
		var d = Math.abs(rX) < Math.abs(rY) ? rX : rY;
		pos.add(dir.mult(-Math.abs(d)));
		asteroids.push(new Asteroid(pos, dir, Math.floor(Math.random() * 3) + 1));
	}
	setTimeout(createAsteroid, Math.floor(Math.random() * 1500) + 1500);
}
