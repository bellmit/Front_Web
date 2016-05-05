/*global  window,document,setInterval */

 (function() {

    var MAX_ACTORS = 200;
    var WIDTH = 900;
    var HEIGHT = 500;
    var FPS = 30;
   
    var actors = [];
    var stage = {};
    var context = null;

    var radius = 300;
    var tradius = WIDTH/3;
    var offsetX = WIDTH/2;
    var offsetY = HEIGHT/2;
    var max = 60;

    // STAGE Object
    function Stage() {
        this.c = "#000000"; // color
    }

    Stage.prototype = {

        render: function() {
            
            var obj = null;
            var obj2 = null;
            var dx = 0;
            var dy = 0;

            this.clear();
            
            radius += (tradius - radius) * 0.2;

            // draw each actor
            for (var i = 0; i < MAX_ACTORS; i++) {

                obj = actors[i];
                obj.calc();
                obj.draw();
                
                for (var j = i + 1; j < MAX_ACTORS; ++j) {
                    obj2 = actors[j];
                    dx = obj.x - obj2.x;
                    dy = obj.y - obj2.y;
                    var dif = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dif < max) {
                        context.lineWidth = (max - dif) * 0.05;
                        context.beginPath();
                        context.moveTo(offsetX + obj.x, offsetY + obj.y);
                        context.lineTo(offsetX + obj2.x, offsetY + obj2.y);
                        context.stroke();
                    }
                }

                // move current obj
                obj.x += obj.incX;
                obj.y += obj.incY;
                var objDistance = Math.sqrt((obj.x * obj.x) + (obj.y * obj.y));
                if (objDistance > radius) {
                    var mp = (1 / objDistance) * 100;
                    obj.x = -obj.x * mp;
                    obj.y = -obj.y * mp;
                    obj.incX = (Math.random() - 0.5) * obj.s;
                    obj.incY = (Math.random() - 0.5) * obj.s;
                }
            }
        },

        clear: function() {
            //context.fillStyle = this.c;
            context.fillRect(0, 0, WIDTH, HEIGHT);
            context.fillStyle = "rgba(0,0,0, 0.1)";
            
            context.strokeStyle = 'rgba(255,255,255, 1)';
        }
    };


    // ACTOR Object
    function Actor() {
        this.x = 0;
        this.y = 0;
        this.incX = 0;
        this.incy = 0;
        this.r = 1; // radius
        this.s = Math.random() * 10; // speed
    }

    Actor.prototype = {
        calc: function() {},
        draw: function() {}
    };

    function init() {

        var canvas = document.getElementById('canvas');
		if(!canvas.getContext){
			document.getElementById("notags").style.display="block";
			return;
		}
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        context = canvas.getContext("2d");

        var stage = new Stage();

        // create set of actors
        for (var i = 0; i < MAX_ACTORS; i++) {
            var act = new Actor();
            var angle = Math.random() * Math.PI * 2;
            var speed = Math.random() * 10;
            var distance = Math.random() * radius;

            act.x = Math.cos(angle) * distance;
            act.y = Math.sin(angle) * distance;
            act.incX = Math.cos(angle) * speed;
            act.incY = Math.sin(angle) * speed;
  
            actors.push(act);
        }

        function tick() {
            stage.render();
        }

        window.setInterval(tick, 1000 / FPS);
    }

    window.onload = init;
   
}());