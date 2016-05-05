	var c=document.createElement("canvas");
	var wraps=document.getElementById("showcanvas");
	c.id="canvas";
	var nodeimgs=document.createElement("img");
	nodeimgs.alt="no html5 tag";
	nodeimgs.src="images/no-html5.png";
	nodeimgs.id=nodeimgs.className="notags";
	if(!c.getContext){
		nodeimgs.style.display="block";
		wraps.style.backgroundColor="#fff";
		wraps.appendChild(c.appendChild(nodeimgs));
	}
	wraps.appendChild(c);

    var ctx = c.getContext('2d'),
    cw = c.width = 900,
  	ch = c.height = 500,
    rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);}

for(var w = 0; w < cw; w++){
	for(var h = 0; h < ch; h++){
    ctx.fillStyle = 'hsl(0, 0%, '+rand(90, 100)+'%)';
		ctx.fillRect(w, h, 1, 1);
    if(w % 2 === 0 && h % 2 === 0){
      ctx.fillStyle = 'hsla(0, 0%, 0%, .11)';
		  ctx.fillRect(w, h, 1, 1);
    }
	}
}