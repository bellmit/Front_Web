var ancho=0;
var alto=0;
var mousePos;
var ctx;
var monstruo=new Array();
var controladorMonstruo;
controladorMonstruo={
  	numSegments:30,
		segLength:50,
		segWidth:10,
		cap:'round',
		refresco:true,
		color:"rgba(0, 0, 0,0.5)",
		setup:function(){
			console.log(this.color);
				for(var i=0;i<monstruo.length;i++){
				monstruo[i].numSegments=this.numSegments;
				monstruo[i].segLength=this.segLength;
				monstruo[i].segWidth=this.segWidth;	
				monstruo[i].setup();
				}
			}
	};
function Tentacle(posxini,posyini){
this.numSegments = controladorMonstruo.numSegments;
this.x=new Array();
this.y=new Array();
this.angle=new Array();
this.anchtrazo=new Array();
this.targetX = 0;
this.targetY = 0;
this.colors = new Array();
this.posxini_o=posxini;
this.posyini_o=posyini;
this.posinix=this.posxini_o;
this.posiniy=this.posyini_o;
this.segLength =controladorMonstruo.segLength;
this.segWidth =controladorMonstruo.segWidth;
this.setup=function(){
	this.targetX=0;
	this.targetY=0;
	this.posinix=this.posxini_o;
	this.posiniy=this.posyini_o;
	this.x=new Array();
	this.y=new Array();
for(var i=0; i<this.numSegments; i++){
		this.x[i]=0;
		this.y[i]=0;
		this.angle[i]=0;
		this.colors[i]=ctx.strokeStyle = controladorMonstruo.color;
		var anch=i*0.5+this.segWidth;	
		this.anchtrazo[i]=anch;	
	}
	this.x[this.x.length-1]=this.posinix;
	this.y[this.y.length-1]=this.posiniy;
}
	this.setup();
}
Tentacle.prototype={
	cdraw:function(){
	this.reachSegment(0,mousePos.x,mousePos.y);
	for(var i=1; i<this.numSegments; i++){
		this.reachSegment(i,this.targetX,this.targetY);
	}
	for(var i=this.x.length-1; i>=1; i--){	
		this.positionSegment(i, i-1);	
	}
	ctx.moveTo(this.posinix, this.posiniy);
	for(var i=this.x.length-1; i>=0; i--){	
		this.segment(i, this.x[i], this.y[i]);	
	}
	},
	segment:function(i, xini, yini){
	var tetx=xini+Math.cos(this.angle[i])*this.segLength;
	var tety=yini+Math.sin(this.angle[i])*this.segLength;
	  ctx.beginPath();
        ctx.moveTo(xini, yini);
        ctx.lineTo(tetx,tety);
       	//ctx.lineWidth =i*2;
		ctx.lineWidth =this.anchtrazo[i];
		ctx.strokeStyle = this.colors[i];
    ctx.strokeStyle = "rgba("+Math.random(0,20)+", "+Math.random(0,20)+", "+Math.random(0,20)+", 1)";
	    ctx.stroke();
	},
	reachSegment:function(i, xin, yin){	
	var dx = xin - this.x[i];
	var dy = yin - this.y[i];	
	this.angle[i] = Math.atan2(dy,dx); 	
	this.targetX = xin - Math.cos(this.angle[i]) * this.segLength;
	this.targetY = yin - Math.sin(this.angle[i]) * this.segLength;
	
	},//end reachSegment
	positionSegment:function(a,b){
	this.x[b] = this.x[a] + Math.cos(this.angle[a]) * this.segLength;
	this.y[b] = this.y[a] + Math.sin(this.angle[a]) * this.segLength;
	
	}
}
function getMousePos(canvas, evt){
	var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };	
}
function csetup(){
	var canvas = document.getElementById('canvas');
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
	canvas.width=900;
	canvas.height=500;
	ctx = canvas.getContext('2d');
	ctx.lineWidth =5.0;//5.0
	ctx.lineCap = controladorMonstruo.cap;
	//ctx.strokeStyle = "rgba(20, 20, 20, 0.1)";
	ancho=canvas.width;
	alto=canvas.height;
	monstruo.push(new Tentacle(ancho/2,alto));	
	canvas.addEventListener('mousemove', function(evt){
	mousePos = getMousePos(canvas, evt);
	if(controladorMonstruo.refresco){
	ctx.clearRect(0, 0, ancho, alto);
	};
	for(var i=0;i<monstruo.length;i++){
		monstruo[i].cdraw(mousePos, ctx);	
	}
	},false);
	canvas.addEventListener("click",function(evt){
	monstruo.push(new Tentacle(mousePos.x,mousePos.y));
	},false);
}
$(document).ready(function(){csetup();});
