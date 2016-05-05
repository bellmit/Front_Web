// Grab the Canvas and Drawing Context
var canvas = document.getElementById('canvas');
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
canvas.width=900;
canvas.height=500;
var ctx = canvas.getContext('2d');



// Create an image element
var img = document.createElement('IMG');

// When the image is loaded, draw it
img.onload = function () {

    // Save the state, so we can undo the clipping
    ctx.save();
    
    
    // Create a shape, of some sort
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(900, 0);
    ctx.lineTo(900, 500);
    ctx.lineTo(0,500);
	ctx.scale(1.5,1.2);
    ctx.closePath();
    // Clip to the current path
    ctx.clip();
    
    
    ctx.drawImage(img, 0, 0);
    
    // Undo the clipping
    ctx.restore();
}

// Specify the src to load the image
img.src = document.getElementById("notags").src;

