var REFRESH_RATE=100000;
var DRAW_RATE = 1;
var COOL_FACTOR = 10;

function hsvToRgb(h, s, v) {var a,b,c,d,e,f,g,i,k;s/=100;v/=100;0==s&&(a=b=c=v,k=[Math.round(255*a),Math.round(255*b),Math.round(255*c)]);h/=60;d=Math.floor(h);e=h-d;f=v*(1-s);g=v*(1-s*e);i=v*(1-s*(1-e));switch(d){case 0:a=v;b=i;c=f;break;case 1:a=g;b=v;c=f;break;case 2:a=f;b=v;c=i;break;case 3:a=f;b=g;c=v;break;case 4:a=i;b=f;c=v;break;default:a=v,b=f,c=g}k =[Math.round(255*a),Math.round(255*b),Math.round(255*c)];return k;}

(function(){
    var c = document.getElementById('canvas');
	if(!c.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
    var ctx = c.getContext('2d');
    var x = 0;
  function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    setTimeout(function(){
      clearTable();
    },10);
    ctx.translate(c.width/2,c.height/2);
  }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
	var _int=0;
  var x = 0;
  var size=10;
  var y = 400;
  function drawStuff(){
_int = setInterval(function(){
      ctx.rotate((((x++%COOL_FACTOR)*Math.PI)/180));
      ctx.strokeStyle="hsl("+(x%361)+",80%,80%)";
      ctx.stroke();
      ctx.lineWidth=.3;
      ctx.fillStyle="hsv("+(x%361)+",80%,80%)";
      ctx.beginPath();
	  ctx.arc(x/Math.log(x), y%10, x%3+2, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();
  	  ctx.quadraticCurveTo(x/Math.log(x),y,x%c.width,x%c.height,220,10);
	},DRAW_RATE);
  }
  setInterval(clearTable,REFRESH_RATE);
    function clearTable(){
	  clearInterval(_int);
      x=0;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      c.width=c.width;
      ctx.restore();
      drawStuff();
    }
})();
