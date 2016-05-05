var b = document.body;
var c = document.getElementById("canvas");
if(!c.getContext){
	document.getElementById("notags").style.display="block";
}
var a = c.getContext('2d');
h=500;p=[];j=0;k=0;u=0;m=Math;q=function(e,b){return~~(m.random()*(b-e+1)+e)};d="Infinity";c.width=900;c.height=h;document.bgColor="#111";c.style.background="#000";c.addEventListener("mousemove",function(e){j=m.floor(e.pageX-c.offsetLeft-200);k=m.floor(e.pageY-c.offsetTop-h/2);e=-(-k/-j);u=m.floor(m.atan(e)*(180/m.PI));0>j&&0>k&&(u+=180);0>j&&0<k&&(u+=180);0<j&&0<k&&(u+=360);0>k&&e=="-"+d&&(u=90);0<k&&e==d&&(u=270);0>j&&"0"==e&&(u=180);isNaN(u)&&(u=0)});setInterval(function(){a.fillStyle="rgba(0,0,0,.1)";a.fillRect(0,0,900,h);var e=p.length;if(200>e)for(var b=200-e;b--;)p.push({a:q(25,350)/100,x:200,y:h/2,d:q(0,360),b:q(-75,75)/100,c:q(-40,40)});for(;e--;){b=p[e];a.beginPath();a.arc(b.x,b.y,b.a,0,2*m.PI);a.moveTo(200,h/2);a.lineTo(b.x,b.y);a.fillStyle="hsl("+(u+b.c)+",100%,50%)";a.fill();a.strokeStyle="hsla("+(u+b.c)+",100%,50%,.05)";a.stroke();b.a-=0.02;var f=b.d*m.PI/180,g=m.sin(f)*b.b;b.x+=m.cos(f)*b.b+j*b.a/175;b.y+=g+k*b.a/175;(b.y-b.a>h||b.y<-b.a||b.x>400+b.a||b.x<-b.a||0>b.a)&&p.splice(e,1)}},5);