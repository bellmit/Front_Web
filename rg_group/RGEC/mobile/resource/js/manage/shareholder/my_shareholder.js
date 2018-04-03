;(function(w,$){
		/*设备判断*/
		if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {
			var EventName = {"click": "tap"};
		}else{
			var EventName = {"click": "click"};
		}
		/*服务类*/
		var my_shareholder=my_shareholder||{
			/*初始化*/
			init:function(wrap){
					var winwidth=parseInt($(w).width())-20;
					if(winwidth<=260){
						winwidth=260;
					}else if(winwidth>=640){
						winwidth=640;
					}
					this.currentwidth=winwidth;
					this.render(wrap);
					wrap.height(winwidth).width(winwidth);
			},
			/*窗口缩放*/
			resize:function(wrap,text){
					this.init(wrap);
					this.handlerText(text);
			},
			/*渲染*/
			render:function(wrap){
					wrap.css({
						'border-radius':this.currentwidth/2+'px'
					});
			},
			/*处理波浪形文字*/
			handlerText:function(wrap){
				var text=wrap.val();
				if(text!=''&&text!=null){
					var temparr=text.split(''),resarr=[],len=temparr.length,i=0;
					for(i;i<len;i++){
							var tempnum=Math.random().toString().slice(-1);
							var tempflag=tempnum%2==0?'-':'';
							if(this.currentwidth<=260){
								tempnum=tempnum/5;
							}else if(this.currentwidth<=300&&this.currentwidth>260){
								tempnum=tempnum/4;
							}else if(this.currentwidth<=460&&this.currentwidth>300){
								tempnum=tempnum/3;
							}else if(this.currentwidth<=620&&this.currentwidth>460){
								tempnum=tempnum;
							}else{
								tempnum=tempnum*1.5;
							}
							resarr.push('<span style="top:'+tempflag+tempnum+'px;">'+temparr[i]+'</span>');
					}
					$(resarr.join('')).appendTo(wrap.next().html('').end());
				}
			}
		};
	
		/*事件绑定*/
		$(function(){
				/*页面元素引用*/
				var circle_wrap=$('#rg_sh_circle'),
						sh_data=$('#rg_sh_data');
				/*初始化*/
				my_shareholder.init(circle_wrap);
				/*处理波浪形文字*/
				my_shareholder.handlerText(sh_data);
				/*窗口缩放*/
				$(w).on('resize',function(){
						my_shareholder.resize(circle_wrap,sh_data);
				});
		});
})(window,Zepto);