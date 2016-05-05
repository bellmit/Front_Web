var c = document.getElementById("canvas");
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
var ctx = c.getContext("2d");
var intervalo = window.setInterval(drawC,100);
var counter = 0 ; 

function drawC() {
  color = get_random_color();
  drawCircle( (Math.random()*900), (Math.random()*500) , color , (Math.random()*10) );
	counter = counter +1 ;
}
function drawCircle( _x, _y , _color , _radius ){
	ctx.fillStyle=  _color;
	ctx.beginPath();
	ctx.arc( _x, _y, _radius, 0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}