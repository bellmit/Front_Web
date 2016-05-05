$(function() {
	function distance(p1, p2) {		
		var x = p1.x - p2.x;
		var y = p1.y - p2.y;
		
		return Math.round(Math.sqrt(x * x + y * y));
	}
	var W = window.innerWidth, H = window.innerHeight;
	var p1 = {
		x: W / 2,
		y: H / 2
	};
	var c = document.getElementById("canvas");
	c.height = H;
	c.width = W;
	if(!c.getContext){
		document.getElementById("notags").style.display="block";
		return;
	}
	canvas = c.getContext("2d");
	
	canvas.fillStyle = "rgba(0,0,0,0.1)";
	canvas.strokeStyle = "rgba(255,255,255,1)";
	canvas.fillRect(0,0,W,H);
	
	$("#canvas").mousemove(function(e) {
		var p2 = {
			x: e.pageX,
			y: e.pageY
		};
		
		canvas.fillRect(0,0,W,H);
		canvas.lineWidth = distance(p1,p2);
		canvas.beginPath();
		canvas.moveTo(p1.x,p1.y);
		canvas.lineTo(p2.x,p2.y);
		canvas.stroke();
		$("#pos").html('P1<i>'+p1.x+","+p1.y+"</i><br>P2<i>"+p2.x+","+p2.y+"</i><br/>D<i>"+canvas.lineWidth+'</i>');
    
	});
	$("#canvas").click(function(e) {
		p1.x = e.pageX;
		p1.y = e.pageY;
	});
});