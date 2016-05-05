    var cvs = document.getElementById("canvas");
	if(!canvas.getContext){
		document.getElementById("notags").style.display="block";
	}
    var ctx = cvs.getContext("2d");
    var w = 900,
        h = 500,
        s = 0;
    cvs.setAttribute("height", h);
    cvs.setAttribute("width", w);
    var make = function(o) {
        ctx.beginPath();
        ctx.fillStyle = o.fillStyle;
        ctx.translate(o.shiftX, o.shiftY);
        ctx.arc(0, 0, o.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };
    var draw = function() {
        ctx.save();
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, w, h);

        make({
            fillStyle: "rgb(0, 0, 0)",
            shiftX: w / 2,
            shiftY: h / 2,
            radius: 1
        });
        s = s + 0.001;
        var j = 1, k = 1;
        for (var i = 0; i < 127; i++) {
            var nv = [
                Math.floor(i * Math.random()),
                Math.floor(i * Math.random()),
                Math.floor(i * Math.random()),
                ];
            make({
                fillStyle: "rgba(" + nv[0] + ", " + nv[1] + ", " + nv[2] + ", " + Math.random() + ")",
                shiftX: Math.sin(i*s) * (i * j),
                shiftY: Math.cos(i*s) * (i * k),
                radius: i*((j/k)/5)
            });
            j++;
            k++;
            if (j > 2) j = 1;
            if (k > 3) k = 1;
        }

        ctx.restore();
        setTimeout(draw, 20);
    };
    draw();