var canvas = document.getElementById('canvas');
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
ctx = canvas.getContext('2d');
var height,width,mouseX,mouseY;

function resizeWindow() {
    canvas.height = height = 900;
    canvas.width = width = 500;
}
window.onresize = resizeWindow;
resizeWindow();
canvas.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

function draw() {

    var count = 128,
        padding = 32,
        cellWidth = width / count,
        cellHeight = height / count,
        intensity = 10;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgb(255,0,0)";
    for (var y = 0; y < count; y++) {
        for (var x = 0; x < count; x++) {
            ctx.save();
            var X = x * (padding + cellWidth),
                Y = y * (padding + cellHeight),
                jitter =  Math.random()*1.5;
            if ( (X*jitter > mouseX - 100 && X/jitter < mouseX + 100) &&
                 (Y*jitter > mouseY - 100 && Y/jitter < mouseY + 100)) {
                ctx.translate( Math.random() * intensity,
                               Math.random() * intensity);
              var r = Math.random()>0.5?64:0,
                  g = Math.random()>0.5?64:0,
                  b = Math.random()>0.5?64:0;
                ctx.fillStyle = "rgb("+r+","+g+","+b+")";
            } else {
                ctx.translate(Math.random() * intensity, 
                              Math.random() * intensity);
            }
            ctx.fillRect(X, Y, cellWidth, cellHeight);
            ctx.restore();
        }
    }
    setTimeout(draw, 1000 / 60);
}
draw();