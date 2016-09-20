(function($){
	'use strict';
	var win=window;



	/*构造类*/
	function Slide(){};

		Slide.prototype.slideToggle=function(options){

			var settings = $.extend({},{
					minwidth:1024,
					size:5,
					curindex:0,
					isresize:true,
					slide_id:null,
					slide_hover_id:null,
					$wrap:null,
					$slide_img:null,
					$items:null,
					$btnwrap:null,
					$btn:null,
					isBackground:false,
					$slide_tipwrap:null,
					$slide_tip:null,
					tipheight:0,
					itemheight:0,
					winwidth:$(win).width(),
					isblur:'',
					img_alt:false,
					tip_text:[],
					isTouch:false,
					isMobile:(function(){
						if(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i.test(navigator.userAgent)){
							return true;
						}else{
							return false;
						}
					}()),
					btn_action:false,
					btn_active:'slidebtn-active',
					eff_time:500,
					times:6000,
					auto_animates:null
				},options),
				self=this;

			//初始化
			self.slideInit(settings);

			//事件绑定
			if(settings.size>1){


				if(settings.isMobile&&settings.isTouch){
					/*移动端*/
					//绑定指针悬停与离开停止动画
					settings.$wrap.on('mouseenter mouseleave',function(e){
						e.preventDefault();
						if(e.type==='mouseenter'){
							mEnter(settings);
						}else if(e.type==='mouseleave'){
							mLeave(settings,self);
						}
					});
					//绑定触摸事件
					settings.$wrap.delegate('ul','swipeleft swiperight',function(e){
						e.preventDefault();
						var cindex=settings.curindex;
						if(e.type==='swipeleft'){
							if(cindex===settings.size - 1){
								cindex=0;
							}else{
								cindex++;
							}
						}else if(e.type==='swiperight'){
							if(cindex===0){
								cindex=settings.size - 1;
							}else{
								cindex--;
							}
						}
						settings.curindex=cindex;
						settings.$slide_img.animate({
							"left":-settings.curindex * settings.winwidth
						},settings.eff_time);

						settings.$btn.eq(settings.curindex).addClass(settings.btn_active)
							.siblings()
							.removeClass(settings.btn_active);
					});
				}else{
					//绑定指针悬停与离开停止动画
					settings.$wrap.hover(function(e){
						e.preventDefault();
						pEnter(settings);
					},function(e){
						e.preventDefault();
						pLeave(settings,self);
					});

					/*tab 点击切换 pc机*/
					settings.$btnwrap.delegate('li','click',function(e){
						e.preventDefault();
						var $this=$(this);

						settings.curindex=$this.index();
						settings.btn_action=true;
						settings.$slide_img.animate({
							"left":-settings.curindex * settings.winwidth
						},settings.eff_time);

						$this.addClass(settings.btn_active)
							.siblings()
							.removeClass(settings.btn_active);

						if(settings.img_alt){
							self.slideEffect(settings);
						}else{
							settings.$slide_tipwrap.css({
								"opacity":"0.4",
								"top":settings.itemheight
							});
						}
					});
				}
			}else if(settings.size===1){
				settings.$btn.css({'display':'none'});
			}

			//绑定窗口大小事件
			if(settings.isresize){
				$(win).resize(function(){
					settings.winwidth=$(this).width();
					settings.winwidth=settings.winwidth<settings.minwidth?settings.minwidth:settings.winwidth;
					settings.$items.css({"width":settings.winwidth});
					settings.itemheight=settings.$wrap.height();
					settings.$slide_img.css({
						"width":settings.size*settings.winwidth,
						"left":-settings.curindex*settings.winwidth
					});
					settings.$slide_tipwrap.css({
						"opacity":"0.4",
						"top":settings.itemheight
					})
				});
			}

		};

	/*初始化类*/
		Slide.prototype.slideInit=function(settings){
			var self=this;

			settings.$items=settings.$slide_img.find("li");

			settings.winwidth=settings.winwidth<settings.minwidth?settings.minwidth:settings.winwidth;
			settings.$items.css({"width":settings.winwidth});

			settings.size=settings.$items.size();


			settings.$btn=settings.$btnwrap.find('li');
			settings.$slide_img.css({
				"width":settings.size*settings.winwidth
			});
			settings.tipheight=settings.$slide_tipwrap.height();
			settings.itemheight=settings.$items.eq(0).height();
			settings.$slide_tip=settings.$slide_tipwrap.find("p");

			/*添加模糊效果*/
			if(settings.isblur!==''){
				settings.$items.each(function(){
					$(this).addClass('filter-blur').find("img").addClass(settings.isblur);
				});
			}

			if(settings.isBackground){
				settings.$items.each(function(){
					var $this=$(this),
						src=$this.attr('data-src');
					$this.css({"background-image":'url('+src+')'});
				});
			}else{
				if(settings.$items.eq(0).find("img").attr("alt")){
					settings.img_alt=true;
					settings.$items.find("img").each(function(index){
						settings.tip_text.push($(this).attr("alt")||'');
					});
					settings.$slide_tip.text(settings.tip_text[0]);
				}else{
					settings.img_alt=false;
					settings.tip_text.length=0;
					settings.$slide_tip.text('');
					settings.$slide_tipwrap.css({
						"opacity":"0.4",
						"top":settings.itemheight
					})
				}
			}
			settings.slide_id=setInterval(function(){
				self.slidePlay(settings);
			},settings.times);
		};

	/*播放类*/
		Slide.prototype.slidePlay=function(settings){
			settings.curindex++;
			settings.curindex=settings.curindex>=settings.size?0:settings.curindex;
			settings.$slide_img.animate({
				"left":-settings.curindex*settings.winwidth
			},settings.eff_time);

			settings.$btn.eq(settings.curindex).addClass(settings.btn_active).siblings().removeClass(settings.btn_active);

			if(settings.img_alt){
				self.slideEffect(settings);
			}else{
				settings.$slide_tipwrap.css({
					"opacity":"0.4",
					"top":settings.itemheight
				});
			}


		};

	/*效果类*/
		Slide.prototype.slideEffect=function(settings){
			var is_show=parseInt(settings.$slide_tipwrap.css("top"))+settings.tipheight;

			if(settings.btn_action){
				if(is_show===settings.itemheight){

					settings.$slide_tipwrap.animate({
						"opacity":"0.4",
						"top":settings.itemheight
					},settings.eff_time);

					setTimeout(function(){
						settings.$slide_tip.text(settings.tip_text[settings.curindex]);
					},settings.eff_time);

					settings.$slide_tipwrap.animate({
						"opacity":"0.6",
						"top":settings.itemheight-settings.tipheight
					},settings.eff_time);
				}else{
					settings.$slide_tip.text(settings.tip_text[settings.curindex]);

					settings.$slide_tipwrap.animate({
						"opacity":"0.6",
						"top":settings.itemheight-settings.tipheight
					},settings.eff_time);
				}
			}else{
				if(is_show===settings.itemheight){

					settings.$slide_tipwrap.animate({
						"opacity":"0.6",
						"top":settings.itemheight
					},settings.eff_time);

					setTimeout(function(){
						settings.$slide_tip.text(settings.tip_text[settings.curindex]);
					},settings.eff_time);

					settings.auto_animates=settings.$slide_tipwrap.animate({
							"opacity":"0.6",
							"top":settings.itemheight-settings.tipheight
						},settings.eff_time)
						.delay(settings.times-(3*settings.eff_time))
						.animate({
							"opacity":"0.4",
							"top":settings.itemheight
						},settings.eff_time);

				}else{
					settings.auto_animates=settings.$slide_tipwrap.animate({
						"opacity":"0.6",
						"top":settings.itemheight-settings.tipheight
					},settings.eff_time);
					settings.$slide_tip.text(settings.tip_text[settings.curindex]);

					settings.$slide_tipwrap.delay(settings.times-(2*settings.eff_time))
						.animate({
							"opacity":"0.4",
							"top":settings.itemheight
						},settings.eff_time);

				}
			}

		}



		//服务类
		//指针移入
		function pEnter(opt){
			opt.$slide_tipwrap.stop(opt.auto_animates,true,false);
			clearInterval(opt.slide_id);
			opt.slide_id=null;
			if(opt.isblur!==''){
				removeIFB(opt);
			}
		}
		function mEnter(opt){
			clearInterval(opt.slide_id);
			opt.slide_id=null;
			if(opt.isblur!==''){
				removeIFB(opt);
			}
		}
		//指针移出
		function pLeave(opt,self){
			clearInterval(opt.slide_id);
			opt.slide_id=null;
			opt.slide_id=setInterval(function(){
				opt.btn_action=false;
				self.slidePlay(opt);
			},opt.times);
			if(opt.isblur!==''){
				addIFB(opt);
			}
		}
		function mLeave(opt,self){
			clearInterval(opt.slide_id);
			opt.slide_id=null;
			opt.slide_id=setInterval(function(){
				opt.btn_action=false;
				self.slidePlay(opt);
			},opt.times);
			if(opt.isblur!==''){
				addIFB(opt);
			}
		}
		/*指针模糊*/
		function addIFB(opt){
			opt.$items.eq(opt.curindex).find('img').addClass(opt.isblur);
		}
		function removeIFB(opt){
			opt.$items.eq(opt.curindex).find('img').removeClass(opt.isblur);
		}

		win.slidePlay=win.slidePlay||new Slide();

})(jQuery);