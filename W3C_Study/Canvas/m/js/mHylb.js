var cvs = document.getElementById("canvas");
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
    ctx = cvs.getContext("2d");
    sA = (Math.PI / 180) * 45;
    sE = (Math.PI / 180) * 90;
    ca = canvas.width=900;
    ch = canvas.height=500;

function init(){     
    
    setInterval(function(){
        
       ctx.clearRect(0, 0, ca, ch);
       ctx.lineWidth = 15;
      
       ctx.beginPath();
       ctx.strokeStyle = "#ffffff";     
       ctx.shadowColor = "#eeeeee";
       ctx.shadowOffsetX = 2;
       ctx.shadowOffsetY = 2;
       ctx.shadowBlur = 5;
       ctx.arc(50, 50, 25, 0, 360, true);
       ctx.stroke();
       ctx.closePath();
        
       sE += 0.05; 
       sA += 0.05;
                
       ctx.beginPath();
       ctx.strokeStyle = "#aaaaaa";
       ctx.arc(50, 50, 25, sA, sE, false);
       ctx.stroke();
       ctx.closePath();   
        
    },1000/100);
    
}

init();