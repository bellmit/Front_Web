var R = 0;
var R_flg = 0;
var ball_flg = 2;
var move_flg = 0;
var j = 270;
var rad = j * Math.PI / 180;
var g = 7;
var canvas = document.getElementById('canvas');
if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
}
canvas.width  = 900;
canvas.height = 500;
var x = canvas.width  / 2;
var y = canvas.height / 2;
var ctx = canvas.getContext("2d");

var ooooo = function () {
    if (R_flg === 1) {
        if (ball_flg === 2 && 270 >= j && move_flg === 1) {
            ball_flg = -2;
            j = 270;
            g = 7;
        }
        if (ball_flg === -2 && j >= 270 && move_flg === 0) {
            ball_flg = 2;
            j = 270;
            g = 7;
        }
        if (ball_flg === 2 && 0 >= g) {
            move_flg = 1;
        } else if (ball_flg === -2 && 0 >= g) {
            move_flg = 0;
        }
        if (move_flg === 0 && ball_flg === 2) {
            g -= 1;
        } else if (move_flg === 1 && ball_flg === -2) {
            g -= 1;
        } else if (move_flg === 1 && ball_flg === 2) {
            g += 1;
        } else if (move_flg === 0 && ball_flg === -2) {
            g += 1;
        }
        if (move_flg === 0) {
            j += 1.5 * g;
        } else if (move_flg === 1) {
            j -= 1.5 * g;
        }
        rad = j * Math.PI / 180;
    } else if (y >= x && x / 20 >= R && R_flg === 0) {
        R++;
    } else if (x >= y && y / 20 >= R && R_flg === 0) {
        R++;
    } else {
        R_flg = 1;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = -2; 3 > i; i++) {
        if (ball_flg === i && R_flg === 1) {
            x = x + y * Math.cos(rad);
            y = 0 - y * Math.sin(rad);
        } else {
            x = canvas.width / 2;
            y = canvas.height / 2;
        }
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + R * 2 * i + i, -20);
        ctx.lineTo(x + R * 2 * i, y);
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.beginPath();
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 20;
        ctx.shadowOffsetY = 10;
        ctx.shadowBlur    = 20;
        if (i !== 1 && i !== -1) {
            chrome(ctx, R, (x + R * 2 * i), y, j);
        } else {
            var grad = ctx.createRadialGradient(x+R*2*i-5, y-5, 0, x+R*2*i, y, R*0.9);
            grad.addColorStop(0, '#fff');
            grad.addColorStop(1, '#000');
            ctx.arc(x + R * 2 * i, y, R*0.9, 0, Math.PI * 2, false);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.stroke();
        }
    }
};

var chrome = function (ctx, radius, x, y) {
    var grad;
    //Green
    ctx.beginPath();
    ctx.arc(x, y, radius, 90 * Math.PI / 180, 210 * Math.PI / 180, false);
    ctx.arc(x, y, radius/2, 150 * Math.PI / 180, 30 * Math.PI / 180,true);
    ctx.arc(x, y, radius, 90 * Math.PI / 180, 210 * Math.PI / 180, false);
    grad  = ctx.createLinearGradient(x, y+radius, x, y);
    grad.addColorStop(0,'#5AC05C');
    grad.addColorStop(0.5,'#5AC05A');
    grad.addColorStop(1,'#459B50');
    ctx.fillStyle = grad;
    ctx.fill();
    //Red
    ctx.beginPath();
    ctx.arc(x, y, radius, 210 * Math.PI / 180, 330 * Math.PI / 180, false);
    ctx.arc(x, y, radius/2, 270 * Math.PI / 180, 150 * Math.PI / 180,true);
    ctx.arc(x, y, radius, 210 * Math.PI / 180, 211 * Math.PI / 180, false);
    grad  = ctx.createLinearGradient(x, y-radius/2, x, y);
    grad.addColorStop(0,'#EC262F');
    grad.addColorStop(0.5,'#F06352');
    grad.addColorStop(1,'#C2281E');
    ctx.fillStyle = grad;
    ctx.fill();
    //Yellow
    ctx.beginPath();
    ctx.arc(x, y, radius, 330 * Math.PI / 180, 90 * Math.PI / 180, false);
    ctx.arc(x, y, radius/2, 30 * Math.PI / 180, 270 * Math.PI / 180,true);
    ctx.arc(x, y, radius, 330 * Math.PI / 180, 331 * Math.PI / 180, false);
    grad  = ctx.createLinearGradient(x, y-radius/3, x, y+radius/2);
    grad.addColorStop(0,'#F3CB14');
    grad.addColorStop(0.5,'#FDD901');
    grad.addColorStop(1,'#DCA733');
    ctx.fillStyle = grad;  
    ctx.fill();
    //in White
    ctx.beginPath();
    ctx.arc(x, y, radius/2, 0, Math.PI*2, false);
    ctx.arc(x, y, radius/2.4, 0, Math.PI*2, true);
    grad  = ctx.createLinearGradient(x, y-radius/2, x, y+radius/2);
    grad.addColorStop(0,'#FAF6F7');
    grad.addColorStop(1,'#E3E4E6');
    ctx.fillStyle = grad;
    ctx.fill();
    //in Blue
    ctx.beginPath();
    ctx.arc(x, y, radius/2.4, 0, Math.PI*2, false);
    grad  = ctx.createLinearGradient(x, y-radius/2.4, x, y+radius/2.4);
    grad.addColorStop(0,'#8DBEE6');
    grad.addColorStop(1,'#2677AE');
    ctx.fillStyle = grad;
    ctx.fill();
};

window.onload = function () {setInterval(ooooo, 50); };