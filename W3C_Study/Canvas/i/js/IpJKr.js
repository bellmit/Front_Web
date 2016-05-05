	  var canv=$('canvas');
	  if(!canv.getContext){
			document.getElementById("notags").style.display="block";
	  }
      var ctx=canv.getContext('2d');
      var fuzzies=new Array();
      var canvWidth=900;
      var canvHeight=500;
      var maxSpeed=40;
      
      var mx=canvWidth/2;
      var my=canvHeight/2;
      var curX=mx;
      var curY=my;
      var moveTime=0;
      
      function Fuzzy(x,y,r,hue)
      {
        this.x=x;
        this.y=y;
        this.r=r;
        this.hue=hue;
        this.xv=0; //x velocity
        this.yv=0;
        this.xf=0; //x force
        this.yf=0;
        this.color=hsvToRgb(this.hue,100,100);
        this.index=-1;
        this.locked=null;
        this.life=1;
      }
      
      Fuzzy.prototype.draw=function()
      {
        var grad=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
        grad.addColorStop(0,"rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.life +")");
        grad.addColorStop(1,"rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ",0)");
        
        ctx.fillStyle=grad;
        ctx.fillRect(this.x-this.r,this.y-this.r,this.r*2,this.r*2);
        
        //ctx.fillStyle="rgb(" + this.c + ")";
        //ctx.beginPath();
        //ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        //ctx.fill();
      }
      
      Fuzzy.prototype.move=function()
      {
        if(this.locked==null)
        {
          this.xv+=this.xf;
          this.yv+=this.yf;
          this.xf=0;
          this.yf=0;
          
          var speed=Math.sqrt(Math.pow(this.xv,2)+Math.pow(this.yv,2));
          if(speed>maxSpeed)
          {
            var angle=Math.atan2(this.yv,this.xv);
            this.xv=maxSpeed*Math.cos(angle);
            this.yv=maxSpeed*Math.sin(angle);
          }
          
          this.x+=this.xv;
          this.y+=this.yv;
        }
        else
        {
          this.x=this.locked.x;
          this.y=this.locked.y;
          //this.locked.xf+=this.xf;
          //this.locked.yf+=this.yf;
          //this.xf=0;
          //this.yf=0;
        }
      }
      
      Fuzzy.prototype.mouseAttract=function()
      {
        var dx=mx-this.x;
        var dy=my-this.y;
        var dist=Math.pow(Math.pow(dx,2)+Math.pow(dy,2),1/2);
        var angle=Math.atan2(dy,dx);
        
        this.xf+=this.r*dist * Math.cos(angle) * 0.0001;
        this.yf+=this.r*dist * Math.sin(angle) * 0.0001;
      }
      
      Fuzzy.prototype.repel=function(f)
      {
        var dx=f.x-this.x;
        var dy=f.y-this.y;
        var distSquared=Math.pow(dx,2)+Math.pow(dy,2);
        var angle=Math.atan2(dy,dx);
        
        if(distSquared>3600)
        {
          var force=this.r*f.r/distSquared * 3;
        }
        else
        {
          if(distSquared>400)
          {
            var force=-5; //-this.r*f.r*distSquared*0.1;
          }
          else
          {
            var force=0;
            f.locked=this;
            f.x=this.x;
            f.y=this.y;
          }
        }
        
        this.xf-=force * Math.cos(angle);
        this.yf-=force * Math.sin(angle);
        f.xf+=force * Math.cos(angle);
        f.yf+=force * Math.sin(angle);
      }
      
      function canv_mousemove(evt)
      {
        curX=evt.clientX-canv.offsetLeft;
        curY=evt.clientY-canv.offsetTop;
        moveTime=(new Date()).getTime();
        canv.style.cursor='default';
      }
      
      function canv_mousedown(evt)
      {
        fuzzies[fuzzies.length]=new Fuzzy(curX,curY,Math.random()*50+50,Math.random()*360)
      }
    
      function $(id)
      {
        return document.getElementById(id);
      }
      
      function body_resize()
      {
        canvWidth=document.body.clientWidth+10;
        canvHeight=document.body.clientHeight;
        canv.width=canvWidth;
        canv.height=canvHeight;
      }
      
      function mainLoop()
      {
        var curTime=(new Date()).getTime();
        
        mx+=(curX-mx)/5;
        my+=(curY-my)/5;
        
        for(var i=0;i<fuzzies.length;i++)
        {
          fuzzies[i].index=i;
          //fuzzies[i].life-=0.001;
          if(fuzzies[i].life<=0)
          {
            for(var j=0;j<fuzzies.length;j++)
            {
              if(fuzzies[j].locked==fuzzies[i])
              {
                fuzzies[j].locked=null;
                fuzzies[j].xv=fuzzies[i].xv;
                fuzzies[j].yv=fuzzies[i].yv;
              }
            }
            fuzzies.splice(i,1);
          }
          else
          {
            for(var j=i+1;j<fuzzies.length;j++)
            {
              fuzzies[i].repel(fuzzies[j]);
            }
          }
        }
        
        ctx.clearRect(0,0,canvWidth,canvHeight);
        for(i in fuzzies)
        {
          fuzzies[i].mouseAttract();
          fuzzies[i].move();
          fuzzies[i].draw();
        }
        
        if(curTime-moveTime > 1500)
        {
          canv.style.cursor='default';
        }
        
        setTimeout(mainLoop,33);
      }
      
      function init()
      {
        var num=Math.random()*10+5;
        for(var n=0;n<num;n++)
        {
          fuzzies[n]=new Fuzzy(Math.random()*canvWidth,Math.random()*canvHeight,Math.random()*50+50,Math.random()*360);
        }
        
        canv.width=canvWidth;
        canv.height=canvHeight;
        
        ctx.globalCompositeOperation="lighter";
        
        mainLoop();
   }
function hsvToRgb(h, s, v) {
  var r, g, b;
  var i;
	var f, p, q, t;
	
	// Make sure our arguments stay in-range
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));
	s /= 100;
	v /= 100;
	
	if(s == 0) {
		r = g = b = v;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	
	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i;
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));

	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
			
		case 1:
			r = q;
			g = v;
			b = p;
			break;
			
		case 2:
			r = p;
			g = v;
			b = t;
			break;
			
		case 3:
			r = p;
			g = q;
			b = v;
			break;
			
		case 4:
			r = t;
			g = p;
			b = v;
			break;
			
		default:
			r = v;
			g = p;
			b = q;
	}
	
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
      
      init();