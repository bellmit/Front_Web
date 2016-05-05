$(function(){
    lab();
});

var canvas = null; // canvas
var c = null; // context
var x  = 0; // fromX
var y  = 0; // fromY
var px = 0; // toX
var py = 0; // toY
var tx = 0; // targetX
var ty = 0; // targetY
var easing = 0.05; // easing

function lab(){

  canvas = document.getElementById("canvas");
  if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
	return;
  }
  c = canvas.getContext("2d");
  c.canvas.width  =900;
  c.canvas.height =500;
  c.strokeStyle = "#000";
  canvas.addEventListener('mousemove', function(evt){var mousePos = getMousePos(canvas, evt);tx = mousePos.x;ty = mousePos.y;}, false);
  loop();
}

function draw(){

  x += (tx - x) * easing;
  y += (ty - y) * easing;

  var distance = lineDistance( x, y, px, py );

  c.strokeStyle = 'black';
  c.lineWidth = 1 + (parseInt(distance)/4);
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(px, py);
  c.stroke();

  py = y;
  px = x;

}

function loop(){
  requestAnimationFrame(loop);
  draw();
}


$(window).resize(function(){
  var canvas = document.getElementById('canvas');
  canvas.width=window.innerWidth;
  canvas.height = window.innerHeight;
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX;
  var mouseY = evt.clientY;
  return {x: mouseX-500,y: mouseY-150}
}


function lineDistance( point1x, point1y, point2x, point2y ){
    var xs = 0;
    var ys = 0;
    xs = point2x - point1x;
    xs = xs * xs;
    ys = point2y - point1y;
    ys = ys * ys;
    return Math.sqrt( xs + ys );
}

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = ( function() {

          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();

}