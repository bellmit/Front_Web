(function($,w){
	/*事件*/
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))){
		var EventName = {"click": "tap"};
	}else{
		var EventName = {"click": "click"};
	}
	/*模块对象*/
	var rg_portal=rg_portal||{};
	/*公共模块*/
	rg_portal.common={
		/*菜单显示隐藏*/
		navTog:function(sou,tar){
			sou.on(EventName.click,function(e){
				tar.toggle();
			});
		},
		/*子菜单显示隐藏*/	
		subNavTog:function(sou,tar){
			sou.on(EventName.click,function(e){
				var sflag=tar.attr('data-show');
				if(sflag=='show'){
					sou.html('更多<span class="rg-g-color-red rg-g-text-uxtxt">&#459;</span>');
					tar.attr('data-show','hide').css({'height':'44px'});
				}else if(sflag=='hide'){
					sou.html('收回<span class="rg-g-color-red rg-g-text-uxtxt">&#456;</span>');
					tar.attr('data-show','show').css({'height':'auto'});
				}
			});
		},
		subNavFormat:function(sou,fs){
			var numarr=[],valuearr=[],navobj={},winwidth=$(w).width();
			sou.find('li').each(function(index,element){
				var $this=$(element),tempnav=$this.find('a'),links=tempnav.attr('href'),txt=tempnav.text(),num=0,tnobj1={};
				if(txt==''){
					num=0;
				}else{
					num=txt.split('').length;
				}
				tnobj1['values']=txt;
				tnobj1['href']=links;
				tnobj1['num']=num;
				navobj[index+'_'+num]=tnobj1;
				numarr.push(num);
			});
			numarr.sort(function(a,b){
				return b-a;
			});
			console.log(numarr);
			console.log(valuearr);
			console.dir(navobj);
		},
		/*菜单高亮*/
		subNavLH:function(sou){
			sou.on(EventName.click,function(e){
				var nodename=e.target.nodeName.toLowerCase(),$this;		
				if(nodename=='ul'){
					$this=$(e.target).find('a');
				}else if(nodename=='li'){
					$this=$(e.target).find('a');
				}else if(nodename=='a'){
					$this=$(e.target);
				}
				$this.addClass('rg-navoptionsel').parent().siblings().find('a').removeClass('rg-navoptionsel');
			});
		},
		/*搜索显示隐藏*/
		searchTog:function(sou,tar){
			sou.on(EventName.click,function(e){
				tar.toggle();
			});
		}
	};
	/*详细查看模块对象*/
	rg_portal.detail={
		/*点赞，分享，评论*/
		articleActive:function(sou,fn,p){
			sou.on(EventName.click,function(e){
				var nodename=e.target.nodeName.toLowerCase(),$this,datatype='',animateobj,dataobj,tempdata=0,fnobj=p['fn_obj'];		
				if(nodename=='ul'){
					$this=$(e.target).find('li');
				}else if(nodename=='li'){
					$this=$(e.target);
				}else if(nodename=='span'||nodename=='div'){
					$this=$(e.target).parent();
				}
				datatype=$this.attr('data-type');
				if(datatype=='good'){
					/*回调函数*/
					/*通过回调函数判断能否点赞，并执行点赞动画*/			
					animateobj=$this.find('div:last');
					dataobj=$this.find('span:first');
					if(typeof fn[0]==='string'){
						fnobj[fn[0]]({
							'animateobj':animateobj,
							'dataobj':dataobj
						});
					}else if(typeof fn[0]==='function'){
						fn[0].call(fnobj,{
							'animateobj':animateobj,
							'dataobj':dataobj
						});
					}
				}else if(datatype=='comment'){
					/*评论动画*/
					p['comment_wrap'].animate({'top':'0'},200);
					var fnobj=p['fn_obj'];
					p['send_type']='comment';
					if(typeof fn[1]==='string'){
						fnobj[fn[1]](p);
					}else if(typeof fn[1]==='function'){
						fn[1].call(fnobj,p);
					}
				}
			});
		},
		/*绑定评论弹出事件*/
		commentShow:function(sou,fn,p){
			sou.on(EventName.click,function(e){
				p['comment_wrap'].animate({'top':'0'},200);
				var fnobj=p['fn_obj'];
				p['send_type']='comment';
				if(typeof fn==='string'){
					fnobj[fn](p);
				}else if(typeof fn==='function'){
					fn.call(fnobj,p);
				}
			});
		},
		/*绑定回复列表事件*/
		replyList:function(sou,fn,p){
			sou.on(EventName.click,function(e){
				var nodename=e.target.nodeName.toLowerCase(),$this,dsequence=0,daction='',len=sou.size(),i=0,classname=e.target.className;
				if(nodename=='ul'){
					return false;
				}else if(nodename=='li'){
					$this=$(e.target);
				}else if(nodename=='span'){
					$this=$(e.target).parent();
				}
				dsequence=$this.attr('data-sequence');
				daction=$this.attr('data-action');
				var comment_wrap=p['comment_wrap'];
				if(daction=='reply'){
					/*回复分支*/
					comment_wrap.animate({'top':'0'},200);
					var fnobj=p['fn_obj'];
					p['send_type']='reply';
					p['reply_sequence']=dsequence;
					if(typeof fn==='string'){
						fnobj[fn](p);
					}else if(typeof fn==='function'){
						fn.call(fnobj,p);
					}
				}else if(daction=='hide'){
					/*显示子列表分支*/
					$this.attr('data-action','show').html('<span>&#456;</span>隐藏').parent().next().show();
					for(i;i<len;i++){
						if(i!=dsequence){
							$(sou[i]).find('li').eq(1).attr('data-action','hide').html('<span>&#459;</span>显示').parent().next().hide();
						}
					}
				}else if(daction=='show'){
					/*隐藏子列表分支*/
					$this.attr('data-action','hide').html('<span>&#459;</span>显示').parent().next().hide();
				}
			});
		},
		/*评论事件绑定*/
		commentAction:function(sou){
			sou.on(EventName.click,function(e){
				var nodename=e.target.nodeName.toLowerCase(),classname=e.target.className,textarea=sou.find('textarea');
				/*窗口关闭或者取消评论*/
				if((nodename=='section'&&classname=='rg-comment-plugins')||(nodename=='div'&&classname=='rg-c-pfooter')||(nodename=='button'&&classname.indexOf('rg-c-pcance')!=-1)){
					textarea.val('');
					sou.animate({'top':'100%'},200);
				}
			});
		}
		
	};
	/*其他模块定义*/
	w.rg_portal=rg_portal;
})(Zepto,window);