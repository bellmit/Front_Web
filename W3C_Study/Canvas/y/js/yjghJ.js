var screenWidth = 900,
  screenHeight =500,
	groundPositionX =400,
	centerX =900/2;

var snowMan = [
	{ yPosition: screenHeight - 150, radius : 100 },
	{ yPosition: screenHeight - 280, radius : 80 },
	{ yPosition: screenHeight - 390, radius : 60 },
	{ xPosition: centerX - 20 },
	{ xPosition: centerX + 20 },
	{ xPosition: centerX - 40, yPosition: screenHeight - 493, width: 80, height: 60 },
	{ xPosition: centerX - 80, yPosition: screenHeight - 433, width: 160, height: 10 },
	{ button: screenHeight - 300, },
	{ button: screenHeight - 270 },
	{ moveToX: centerX - 170, moveToY: screenHeight - 360, lineToX: centerX - 70, lineToY: screenHeight - 320 },
	{ moveToX: centerX - 150, moveToY: screenHeight - 380, lineToX: centerX - 130, lineToY: screenHeight - 345 },
	{ moveToX: centerX - 180, moveToY: screenHeight - 330, lineToX: centerX - 110, lineToY: screenHeight - 335 },
	{ moveToX: centerX + 170, moveToY: screenHeight - 360, lineToX: centerX + 70, lineToY: screenHeight - 320 },
	{ moveToX: centerX + 150, moveToY: screenHeight - 380, lineToX: centerX + 110, lineToY: screenHeight - 337 },
	{ moveToX: centerX + 180, moveToY: screenHeight - 330, lineToX: centerX + 130, lineToY: screenHeight - 345 },
];

window.onload = function () {
	var canvas = document.createElement('canvas');
	var wraps=document.getElementById("showcanvas");
	canvas.id="canvas";
	var nodeimgs=document.createElement("img");
	nodeimgs.alt="no html5 tag";
	nodeimgs.src="images/no-html5.png";
	nodeimgs.id=nodeimgs.className="notags";
	if(!canvas.getContext){
		nodeimgs.style.display="block";
		wraps.appendChild(canvas.appendChild(nodeimgs));
		return;
	}
	wraps.appendChild(canvas);
	canvas.width =900;
	canvas.height =500;

	ctx = canvas.getContext('2d');

	ctx.fillStyle = '#b3e7ff';
	ctx.fillRect(0, 0, screenWidth, screenHeight);

	ctx.fillStyle = '#e7ebee';
	ctx.fillRect(0, groundPositionX, screenWidth, 100);

	// draw the circles	
	for (var i = 0; i < 3; i++) {
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		ctx.arc(centerX , snowMan[i]['yPosition'], snowMan[i]['radius'], 0, 2 * Math.PI, false);
		ctx.shadowColor = "#ddd";
	    ctx.shadowBlur = 5;
	    ctx.shadowOffsetX = 0;
	    ctx.shadowOffsetY = 2;
		ctx.fill();
		ctx.closePath();
	}
        
    // draw the eyes
    for (var i = 3; i < 5; i++) {
    	ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.arc(snowMan[i]['xPosition'] , screenHeight - 390, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
    }

	// hat
	for (var i = 5; i < 7; i++) {
		ctx.beginPath();
		ctx.fillStyle = '#222';
		ctx.fillRect(snowMan[i]['xPosition'] , snowMan[i]['yPosition'], snowMan[i]['width'], snowMan[i]['height'] );
		ctx.fill;
	}

    // buttons
    for (var i = 7; i < 9; i++) {
    	ctx.beginPath();
		ctx.fillStyle = '#8d2d2e';
		ctx.arc(centerX , snowMan[i]['button'] , 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
    }

    // arms
  	for (var i = 9; i < 15; i++) {
    	ctx.beginPath();
		ctx.moveTo(snowMan[i]['moveToX'], snowMan[i]['moveToY']);
		ctx.lineTo(snowMan[i]['lineToX'], snowMan[i]['lineToY']);
		ctx.lineWidth = 2;
		ctx.stroke();	
    }

    // nose
    ctx.beginPath();
	ctx.fillStyle = '#FF4500';
	ctx.arc(centerX , screenHeight - 365, 5, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();
};