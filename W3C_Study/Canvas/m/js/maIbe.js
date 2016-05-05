var $canvas=document.getElementById('canvas');
if(!$canvas.getContext){
	document.getElementById("notags").style.display="block";
}
var $ctx=$canvas.getContext('2d');
$ctx.canvas.width  = 900;
$ctx.canvas.height = 500;
var $stars=[],
    $numStars=100,
    $centerX=$canvas.width/2,
    $centerY=$canvas.height/2;

//returns random hex color
function randomHexColor(){
  var $color='#';
  for (var i=0;i<6;i++) {
    $val=Math.ceil(Math.random()*15);
    switch ($val) {
      case 10:
        $val='A';
        break;
      case 11:
         $val='B';
        break;
      case 12:
        $val='C';
        break;
      case 13:
         $val='D';
         break;
      case 14:
         $val='E';
         break;
      case 15:
         $val='F';
         break;
    }
    $color+=$val;
  }
  return $color;
}

//object constructor
function star(){
  this.x=0;
  this.y=0;
  this.w=Math.ceil(Math.random()*2);
  this.h=Math.ceil(Math.random()*2);
  //this.color=randomHexColor();
 this.color='rgba(255,255,255,0.1)';
  this.angle=Math.ceil(Math.random()*1440-720);
  this.movmentRadius=Math.ceil(Math.random()*$canvas.width);
  this.speed=1/Math.ceil(Math.random()*10+10);
}
function populateSky() {
  for (var i=0;i<$numStars;i++){
    var $newStar=new star();
    $stars.push($newStar);
  }
}

//actual drawing of the sky
function drawStars() {
  
  for (var i=0;i<$numStars;i++){
    
    $stars[i].x=$centerX+Math.cos($stars[i].angle*Math.PI/180)*$stars[i].movmentRadius;
    $stars[i].y=$centerY+Math.sin($stars[i].angle*Math.PI/180)*$stars[i].movmentRadius;
    
    $ctx.fillStyle=$stars[i].color;
    $ctx.fillRect($stars[i].x,$stars[i].y,$stars[i].w,$stars[i].h);
    
    $stars[i].angle+=$stars[i].speed;
  }
  
}
populateSky();
setInterval(drawStars,1);

