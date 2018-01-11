/*背景动画*/
(function ($) {
    'use strict';
    var RAF_Obj = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }/*兼容定时器*/,
        RandomGen = {
            randomize: function (a, b) {
                return Math.random() * (b - a) + a;
            },

            randomInt: function (a, b) {
                return Math.floor(this.randomize(a, b));
            },

            getDirVec: function (x, y) {
                var angle = this.randomize(0, (2 * Math.PI));
                return new Vector(Math.sin(angle) * x, -Math.cos(angle) * y);
            }
        }/*工具类*/,
        toggle_canvas = document.getElementById('hs_toggle_canvas'),
        ctx = null,
        particles = [],
        pi2 = Math.PI * 2,
        $win = $(window),
        $hs_menuitem = $('#hs_menuitem'),
        toggleindex=null,
        width,
        height;

    /*矢量类*/
    function Vector(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /*矢量增*/
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
    };
    /*矢量乘*/
    Vector.prototype.mult = function (v) {
        this.x *= v.x;
        this.y *= v.y;
    };


    /*颗粒类*/
    function Particle(x, y, isSmall) {
        this.pos = new Vector(x, y)/*颗粒位置*/;
        this.size = isSmall ? RandomGen.randomize(.2, 2) : RandomGen.randomize(1, 8)/*颗粒大小*/;

        var tempdir = RandomGen.randomize(0, this.size);
        this.dir = RandomGen.getDirVec(tempdir, tempdir)/*颗粒运动方向*/;
        this.lifetime = RandomGen.randomize(20, 80)/*颗粒生命持续时间*/;
    }

    /*绘制颗粒*/
    Particle.prototype.draw = function () {
        ctx.strokeStyle = 'rgba(0,0,0,.4)'/*线条颜色*/;
        ctx.fillStyle = "rgba(0,0,0,.1)"/*填充颜色*/;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, pi2, true)/*画弧形*/;
        //ctx.rect(this.pos.x, this.pos.y, this.size, this.size)/*画矩形*/;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    /*更新颗粒*/
    Particle.prototype.update = function () {
        this.lifetime--;
        this.dir.mult(new Vector(.97, .97));
        this.pos.add(this.dir);
        this.draw();
    };


    /*初始化*/
    function init() {
        if (!toggle_canvas.getContext) {
            return;
        }
        ctx = toggle_canvas.getContext('2d');
        width = $win.width();
        height = $win.height() - 23;

        toggle_canvas.width = width;
        toggle_canvas.height = height;

        /*绑定事件*/
        bindHandlers();
        /*绘制*/
        draw();
    }

    /*事件绑定*/
    function bindHandlers() {
        /*监听点击*/
        toggle_canvas.addEventListener('click', function (e) {
            /*创建大礼花*/
            createParticles(e.pageX, e.pageY, false);
        }, false);
        /*监听鼠标移动*/
        toggle_canvas.addEventListener('mousemove', function (e) {
            /*创建小礼花*/
            createParticles(e.pageX, e.pageY, true);
        }, false);
        /*$win.on('resize',function () {
            width = $win.width();
            height = $win.height() - 23;

            toggle_canvas.width = width;
            toggle_canvas.height = height;
        })*/
        /*绑定背景切换*/
        $hs_menuitem.on('click', 'li', function (e) {
            toggleindex=$(this).index();
            createParticles(e.pageX, e.pageY, false);
        }).find('>li:first-child').trigger('click');
    }

    function createParticles(x, y, isSmall) {
        var amount = isSmall ? RandomGen.randomInt(1, 3) : RandomGen.randomInt(20, 50);
        for (var i = 0; i < amount; i++) {
            particles.push(new Particle(x, y, isSmall));
        }
    }

    /*绘制图片*/
    function toggoleImage() {
        if (toggleindex !== null) {
            var img = new Image();   // 创建img元素
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = 'images/show/' + (toggleindex + 1) + '.jpg'; // 设置图片源地址
        }
    }

    function draw() {
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            if (particles[i].lifetime < 0) {
                particles.splice(i, 1);
            }
        }
        ctx.fillStyle = "rgba(255,255,255,.5)";
        ctx.fillRect(0, 0, width, height);
        toggoleImage();
        RAF_Obj(draw);
    }

    /*初始化运行*/
    init();

})(jQuery);
