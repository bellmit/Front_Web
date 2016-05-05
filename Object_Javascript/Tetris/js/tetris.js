;(function(w,$){
	/*my namespace*/
	/*exist same namespace*/
	typeof yp==="undefined"?yp={tetris:{}}:yp={yp:yp,tetris:{}};
	/*init*/
	yp.tetris.info={
		version:'1.0',
		author:'yipin',
		dt:'2014-09-25'
	}
	/*extend tetris object of my namespace*/
	/*场景类*/
	yp.tetris.secne=function(){	
		this.$secne=$('#tgame_secne');
		this.width=400;
		this.height=600;
		this.type=parseInt(Math.random()*6+1);
		this.boxhtml=[
		'<tr><td><div class="t_box1"></div></td><td><div class="t_box1"></div></td></tr>',
		'<tr><td></td><td><div class="t_box2"></div></td></tr><tr><td><div class="t_box2"></div></td><td><div class="t_box2"></div></td></tr>',
		'<tr><td><div class="t_box3"></div></td><td><div class="t_box3"></div></td></tr><tr><td><div class="t_box3"></div></td><td><div class="t_box3"></div></td></tr>',
		'<tr><td></td><td><div class="t_box4"></div></td></tr><tr><td></td><td><div class="t_box4"></div></td></tr><tr><td><div class="t_box4"></div></td><td><div class="t_box4"></div></td></tr>',
		'<tr><td></td><td><div class="t_box5"></div></td><td></td></tr><tr><td><div class="t_box5"></div></td><td><div class="t_box5"></div></td><td><div class="t_box5"></div></td></tr>',
		'<tr><td><div class="t_box6"></div></td></tr><tr><td><div class="t_box6"></div></td></tr><tr><td><div class="t_box6"></div></td></tr><tr><td><div class="t_box6"></div></td></tr><tr><td><div class="t_box6"></div></td></tr>'
		];
		this.kc={
			right:39,
			down:40,
			left:37,
			cycle:13
		};
		/*服务类*/
		this.server=new yp.tetris.server();
	};
	
	/*初始化数据模型*/
	yp.tetris.secne.prototype.datainit=function(){
		var i=0,j=0,ilen=this.width/40,jlen=this.height/40;
		var datamodel=[],jarr=[];
		for(i;i<ilen;i++){
			jarr.push(0);
		}
		for(j;j<jlen;j++){
			datamodel.push(jarr.slice(0));
		}
		this.datamodel=datamodel;
		datamodel=null,jarr=null;
		this.ids=0;
		this.boxes=[];
		/*var dd=this;
		setInterval(function(){
			console.dir(dd.datamodel);
		},60000);*/
	}
	/*开始*/
	yp.tetris.secne.prototype.start=function(){
		this.create();
	};
	/*结束*/
	yp.tetris.secne.prototype.end=function(){
		this.datainit();
		
	};
	yp.tetris.secne.prototype.create=function(){
		this.ids++;
		this.boxes.push('t_box'+this.ids);
		var type=this.type;
		/*生成下一次*/
		var secondtype=parseInt(Math.random()*6+1);
		this.server.nextshape({
			html:this.boxhtml[secondtype-1]
		});
		this.type=secondtype;
		var boxhtml=this.boxhtml[type-1];
		var configs={
			width:this.width,
			height:this.height,
			parentdata:this.datamodel,
			type:type,
			ids:'t_box'+this.ids,
			speed:40,
			html:boxhtml,
			$parentwrap:this.$secne,
			kc:this.kc
		}
		/*实例化方块类*/
		var box=new yp.tetris.box(configs);
		
	};
	
	
	
	
	/*方块类*/
	yp.tetris.box=function(config){
		/*对象设置扩展*/
		var def={
			speed:40
		};
		var set=$.extend({},def,(function(c){return typeof yp!=='undefined'&&typeof c==='object'?c:{};})(config));
		/*对象初始化*/
		/*继承父属性*/
		this.parentwidth=set.width;
		this.parentheight=set.height;
		this.parentdata=set.parentdata;
		this.ids=set.ids;
		this.html=set.html;
		this.type=set.type;
		this.speed=set.speed;
		this.$parentwrap=set.$parentwrap;
		this.kc=set.kc;
		/*自身属性*/
		this.tid=null;
		this.left=160;
		this.top=0;
		this.parents=set
		this.width=80;
		this.height=40;
		this.rotate=0;
		this.moves='on';
		/*绑定*/

		/*渲染*/
		this.render();
		/*自身行为*/
		this.move();
		/*事件行为*/
		this.changs();
	}

	
	
	

	yp.tetris.box.prototype.render=function(){
		if(this.type==1){
			this.left=160;
			this.tw=80;
			this.th=40;
			this.width=80;
			this.height=40;
		}else if(this.type==2){
			this.left=160;
			this.tw=80;
			this.th=80;
			this.width=80;
			this.height=80;
		}else if(this.type==3){
			this.left=160;
			this.tw=80;
			this.th=40;
			this.width=80;
			this.height=80;
		}else if(this.type==4){
			this.left=160;
			this.tw=80;
			this.th=120;
			this.width=80;
			this.height=120;
		}else if(this.type==5){
			this.left=120;
			this.tw=120;
			this.th=80;
			this.width=120;
			this.height=80;
		}else if(this.type==6){
			this.left=200;
			this.tw=40;
			this.th=200;
			this.width=40;
			this.height=200;
		}
		this.$wrap=$('<table class="t_boxwrap"></table>').attr('id',this.ids);
		this.$dom=this.$wrap.html(this.html);
		this.$dom.css({'left':this.left,'top':this.top}).appendTo(this.$parentwrap);
	}
	/*向下运动(自身行为)*/
	yp.tetris.box.prototype.move=function(){
		var temp=this,ismove=false;
		//console.log('第'+parseInt(this.ids.slice(5))+'个对象：');
		this.tid=setInterval(function(){
			ismove=temp.overlap('timer');
			if(ismove){
				temp.top+=temp.speed;
				temp.$dom.css({'top':temp.top});
				if(temp.top>=temp.parentheight-temp.height){
					clearInterval(temp.tid);
					temp.tid=null;
					temp.moves='off';
					temp.dataupdate();
				}
			}else{
				clearInterval(temp.tid);
				temp.tid=null;
				temp.moves='off';
				temp.dataupdate();
			}
		},1000);
	}
	/*更新数据模型*/
	yp.tetris.box.prototype.dataupdate=function(){
		if(this.moves=='off'){
			var xy=this.dataxy();
			for(var i in xy){
				var x=xy[i][0],y=xy[i][1];
				this.parentdata[y].splice(x,1,1);
			}
		}
	}
	/*方块数据坐标计算*/
	yp.tetris.box.prototype.dataxy=function(cobj){
		var cur,xy={};
		if(typeof cobj==='undefined'){
			cur=this;
		}else if(typeof cobj==='object'){
			cur=cobj;
		}
		switch(cur.type){
			case 1:
				if(cur.rotate==0||cur.rotate==180){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40]
					}
				}else if(cur.rotate==90||cur.rotate==270){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40]
					}
				}
				break;
			case 2:
				if(cur.rotate==0){
					xy={
						xy1:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40]
					}
				}else if(cur.rotate==90){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40]
					}
				}else if(cur.rotate==180){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy3:[cur.left/40,parseInt(cur.top+40,10)/40]
					}
				}else if(cur.rotate==270){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40]
					}
				}
				break;
			case 3:
				xy={
					xy1:[cur.left/40,cur.top/40],
					xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
					xy3:[cur.left/40,parseInt(cur.top+40,10)/40],
					xy4:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40]
				}
				break;
			case 4:
				if(cur.rotate==0){
					xy={
						xy1:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40],
						xy3:[cur.left/40,parseInt(cur.top+80,10)/40],
						xy4:[parseInt(cur.left+40,10)/40,parseInt(cur.top+80,10)/40]
					}
				}else if(cur.rotate==90){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40],
						xy4:[parseInt(cur.left+80,10)/40,parseInt(cur.top+40,10)/40]
					}
				}else if(cur.rotate==180){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy3:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy4:[cur.left/40,parseInt(cur.top+80,10)/40]
					}
				}else if(cur.rotate==270){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy3:[parseInt(cur.left+80,10)/40,cur.top/40],
						xy4:[parseInt(cur.left+80,10)/40,parseInt(cur.top+40,10)/40]
					}
				}
				break;
			case 5:
				if(cur.rotate==0){
					xy={
						xy1:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40],
						xy4:[parseInt(cur.left+80,10)/40,parseInt(cur.top+40,10)/40]
					}
				}else if(cur.rotate==90){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40],
						xy4:[cur.left/40,parseInt(cur.top+80,10)/40]
					}
				}else if(cur.rotate==180){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy3:[parseInt(cur.left+80,10)/40,cur.top/40],
						xy4:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40]
					}
				}else if(cur.rotate==270){
					xy={
						xy1:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[parseInt(cur.left+40,10)/40,parseInt(cur.top+40,10)/40],
						xy4:[parseInt(cur.left+40,10)/40,parseInt(cur.top+80,10)/40]
					}
				}
				break;
			case 6:
				if(cur.rotate==0||cur.rotate==180){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[cur.left/40,parseInt(cur.top+40,10)/40],
						xy3:[cur.left/40,parseInt(cur.top+80,10)/40],
						xy4:[cur.left/40,parseInt(cur.top+120,10)/40],
						xy5:[cur.left/40,parseInt(cur.top+160,10)/40]
					}
				}else if(cur.rotate==90||cur.rotate==270){
					xy={
						xy1:[cur.left/40,cur.top/40],
						xy2:[parseInt(cur.left+40,10)/40,cur.top/40],
						xy3:[parseInt(cur.left+80,10)/40,cur.top/40],
						xy4:[parseInt(cur.left+120,10)/40,cur.top/40],
						xy5:[parseInt(cur.left+160,10)/40,cur.top/40]
					}
				}
				break;
		}
		return xy;
	}

	/*方块重叠判断*/
	yp.tetris.box.prototype.overlap=function(dir){
		var conf,xy,x,y,counts=0,types;
		switch(dir){
			case 'left':
				conf={
					type:this.type,
					rotate:this.rotate,
					left:this.left-40,
					top:this.top
				}
				break;
			case 'right':
				conf={
					type:this.type,
					rotate:this.rotate,
					left:parseInt(this.left+40,10),
					top:this.top
				}
				break;
			case 'down':
				conf={
					type:this.type,
					rotate:this.rotate,
					left:this.left,
					top:this.top
				};
				break;
			case 'timer':
				conf={
					type:this.type,
					rotate:this.rotate,
					left:this.left,
					top:parseInt(this.top+40,10)
				};
				break;
			case 'rotate':
				conf={
					type:this.type,
					rotate:this.rotate,
					left:this.left,
					top:this.top
				};
				break;
		}

		if(dir=='left'||dir=='right'||dir=='timer'||dir=='rotate'){
			xy=this.dataxy(conf),types=conf.type;
			for(var i in xy){
				x=xy[i][0];
				y=xy[i][1];
				if(this.parentdata[y][x]==0){
					counts++;
				}
			}
			if(types==1&&counts==2){
				return true;
			}else if(types==2&&counts==3){
				return true;
			}else if(types==3&&counts==4){
				return true;
			}else if(types==4&&counts==4){
				return true;
			}else if(types==5&&counts==4){
				return true;
			}else if(types==6&&counts==5){
				return true;
			}else{
				return false;	
			}
		}else if(dir=='down'){
			//console.log('rotate: '+this.rotate+' width: '+this.width+' height: '+this.height);
			var tlen=(this.parentheight-this.height)/40,j=this.height/40,types=conf.type;
			for(j=0;j<=tlen;j++){
				xy=this.dataxy(conf);
			}
			
			
			/*var tlen=(this.parentheight-this.height)/40,j=0,types=conf.type,res=[];
			for(j;j<=tlen;j++){
				counts=0;
				conf.top=j*40;
				xy=this.dataxy(conf);
				for(var i in xy){
					x=xy[i][0];
					y=xy[i][1];
					if(this.parentdata[y][x]=='1'){
						return j;
					}else if(this.parentdata[y][x]=='0'){
						counts++;
					}
				}
				//console.log(counts);
				if(types==1&&counts==2){
					res.push(counts);
				}else if(types==2&&counts==3){
					res.push(counts);
				}else if(types==3&&counts==4){
					res.push(counts);
				}else if(types==4&&counts==4){
					res.push(counts);
				}else if(types==5&&counts==4){
					res.push(counts);
				}else if(types==6&&counts==5){
					res.push(counts);
				}
			}
			if(res.length==tlen){
				return true;
			}*/
		}
			
	}
	/*方块旋转变化*/
	yp.tetris.box.prototype.rotatechange=function(){
		var isrotate=false;
		/*判断是否能变形*/
		if(this.type==3||(this.width>=this.height&&this.top>=this.parentheight-this.width-this.speed)||(this.width<this.height&&this.top>=this.parentheight-this.height-this.speed)){
			return false;
		}
		/*变形后，初始化参数*/
		switch(this.rotate){
			case 0:
				this.rotate=90;
				this.width=this.th;
				this.height=this.tw;
				isrotate=this.overlap('rotate');
				if(!isrotate){
					this.rotate=0;
					this.width=this.tw;
					this.height=this.th;
					return false;
				}
				break;
			case 90:
				this.rotate=180;
				this.width=this.tw;
				this.height=this.th;
				isrotate=this.overlap('rotate');
				if(!isrotate){
					this.rotate=90;
					this.width=this.th;
					this.height=this.tw;
					return false;
				}
				break;
			case 180:
				this.rotate=270;
				this.width=this.th;
				this.height=this.tw;
				isrotate=this.overlap('rotate');
				if(!isrotate){
					this.rotate=180;
					this.width=this.tw;
					this.height=this.th;
					return false;
				}
				break;
			case 270:
				this.rotate=0;
				this.width=this.tw;
				this.height=this.th;
				isrotate=this.overlap('rotate');
				if(!isrotate){
					this.rotate=270;
					this.width=this.th;
					this.height=this.tw;
					return false;
				}
				break;
		}
		/*处理宽度不够*/
		var tl=this.parentwidth-this.left,twh=this.width-this.height;
		if(this.width>this.height&&tl<this.width){
			this.left-=twh;
			this.$dom.css({'left':this.left});
		}
		/*不同类型方块变形*/
		switch(this.type){
			case 1:
				if(this.rotate==0||this.rotate==180){
					this.$dom=this.$wrap.html(this.html);
				}else{
					this.$dom=this.$wrap.html('<tr><td><div class="t_box1"></div></td></tr><tr><td><div class="t_box1"></div></td></tr>');
				}
				break;
			case 2:
				if(this.rotate==90){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box2"></div></td><td></td></tr><tr><td><div class="t_box2"></div></td><td><div class="t_box2"></div></td></tr>');
				}else if(this.rotate==180){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box2"></div></td><td><div class="t_box2"></div></td></tr><tr><td><div class="t_box2"></div></td><td></td></tr>');
				}else if(this.rotate==270){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box2"></div></td><td><div class="t_box2"></div></td></tr><tr><td></td><td><div class="t_box2"></div></td></tr>');
				}else if(this.rotate==0){
					this.$dom=this.$wrap.html(this.html);
				}
				break;
			case 4:
				if(this.rotate==90){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box4"></div></td><td></td><td></td></tr><tr><td><div class="t_box4"></div></td><td><div class="t_box4"></div></td><td><div class="t_box4"></div></td></tr>');
				}else if(this.rotate==180){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box4"></div></td><td><div class="t_box4"></div></td></tr><tr><td><div class="t_box4"></div></td><td></td></tr><tr><td><div class="t_box4"></div></td><td></td></tr>');
				}else if(this.rotate==270){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box4"></div></td><td><div class="t_box4"></div></td><td><div class="t_box4"></div></td></tr><tr><td></td><td></td><td><div class="t_box4"></div></td></tr>');
				}else if(this.rotate==0){
					this.$dom=this.$wrap.html(this.html);
				}
				break;
			case 5:
				if(this.rotate==90){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box5"></div></td><td></td></tr><tr><td><div class="t_box5"></div></td><td><div class="t_box5"></div></td></tr><tr><td><div class="t_box5"></div></td><td></td></tr>');
				}else if(this.rotate==180){
					this.$dom=this.$wrap.html('<tr><td><div class="t_box5"></div></td><td><div class="t_box5"></div></td><td><div class="t_box5"></div></td></tr><tr><td></td><td><div class="t_box5"></div></td><td></td></tr>');
				}else if(this.rotate==270){
					this.$dom=this.$wrap.html('<tr><td></td><td><div class="t_box5"></div></td></tr><tr><td><div class="t_box5"></div></td><td><div class="t_box5"></div></td></tr><tr><td></td><td><div class="t_box5"></div></td></tr><tr>');
				}else if(this.rotate==0){
					this.$dom=this.$wrap.html(this.html);
				}
				break;
			case 6:
				if(this.rotate==0||this.rotate==180){
					this.$dom=this.$wrap.html(this.html);
				}else{
					this.$dom=this.$wrap.html('<tr><td><div class="t_box1"></div></td><td><div class="t_box1"></div></td><td><div class="t_box1"></div></td><td><div class="t_box1"></div></td><td><div class="t_box1"></div></td></tr>');
				}
				break;
		}
	}
	/*方块键盘事件*/
	yp.tetris.box.prototype.changs=function(){
		var tc=this,ischang=false;
		$(document).keyup(function(e){
			if(tc.moves=='on'){
				if(e.keyCode==tc.kc.right){
					if(tc.left<tc.parentwidth-tc.width){
						ischang=tc.overlap('right');
						if(ischang){
							tc.left+=40;
							tc.$dom.css({'left':tc.left});
						}
					}
				}else if(e.keyCode==tc.kc.down){
					if(tc.top<tc.parentheight-tc.height){
						ischang=tc.overlap('down');
						clearInterval(tc.tid);
						tc.tid=null;
						console.log('ischang:  '+ischang);
						if(ischang){
							tc.top=tc.parentheight-tc.height;
							console.log('true'+tc.top);
							tc.$dom.css({'top':tc.top});
						}else if(typeof ischang==='number'){
							if(ischang==0){
								alert('游戏结束');
							}else{
								tc.top=(ischang-1)*40;
								console.log('number'+tc.top);
								tc.$dom.css({'top':tc.top});
							}
							
						}
						tc.moves='off';
						tc.dataupdate();
					}
				}else if(e.keyCode==tc.kc.left){
					if(tc.left>0){
						ischang=tc.overlap('left');
						if(ischang){
							tc.left-=40;
							tc.$dom.css({'left':tc.left});
						}
					}
				}else if(e.keyCode==tc.kc.cycle){
						tc.rotatechange();	
				}
			}
		});
		
	}

	yp.tetris.box.prototype.remove=function(){
		$('#'+this.ids).remove();
		clearInterval(this.tid);
		this.tid=null;
	}
	
	/*服务类*/
	yp.tetris.server=function(){
		this.nextwrap=$('#t_cnextshape');
	}
	/*生成下一个预览图形*/
	yp.tetris.server.prototype.nextshape=function(configs){
		var nhtml=configs.html.replace(/t_box(\d)*/g,'t_nextbox');
		this.nextwrap.html('').append('<table>'+nhtml+'</table>');
	}
	
	/*放入window域中*/
	$(function(){
		w.tetris=new yp.tetris.secne();
		w.tetris.datainit();
	})
})(window,jQuery);














