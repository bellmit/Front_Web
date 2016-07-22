
/*自定义扩展*/
(function($){
	'use strict';
	/*工具函数类*/
	var public_tool=window.public_tool||{};


	/*本地存储*/
	//缓存对象
	public_tool.cache={};
	//判断是否支持本地存储
	public_tool.supportStorage=(function(){
		return sessionStorage?true:false;
	}());
	//设置本地存储
	public_tool.setParams=function(key,value,flag){
		if(this.supportStorage){
			if(flag){
				sessionStorage.setItem(key,value);
			}else{
				sessionStorage.setItem(key,JSON.stringify(value));
			}
		}
	};
	//获取本地存储
	public_tool.getParams=function(key,flag){
		if(this.supportStorage){
			if(flag){
				return sessionStorage.getItem(key)||null;
			}else{
				return JSON.parse(sessionStorage.getItem(key))||null;
			}
		}
		return null;
	};
	//删除本地存储
	public_tool.removeParams=function(key){
		if(this.supportStorage){
			sessionStorage.removeItem(key);
		}
	};
	//清除本地存储
	public_tool.clear=function(){
		if(this.supportStorage){
			sessionStorage.clear();
		}
	};
	//遍历本地存储
	public_tool.getEachParams=function(flag){
		if(this.supportStorage){
			var len=sessionStorage.length,
				i= 0,
				res=[],
				key,
				value;
			if(len!==0){
				for(i;i<len;i++){
					key=sessionStorage.key(i);
					if(flag){
						value=sessionStorage.getItem(key);
					}else{
						value=JSON.parse(sessionStorage.getItem(key));
					}
					res.push(value);
				}
				return res;
			}else{
				return null;
			}
		}
		return null;
	};


	/*弹窗*/
	//是否支持弹窗
	public_tool.supportDia=(function(){
		return (typeof dialog==='function'&&dialog)?true:false;
	}());
	//弹窗确认
	public_tool.dialog=function(){
		if(!this.supportDia){
			return null;
		}

		//缓存区对象
		var keyflag=false,
			seq_id=null,
			fn_cache={},
			res={};

		fn_cache.isFn=false;

		var dia=dialog({
			title:'温馨提示',
			cancelValue:'取消',
			okValue:'确定',
			width:300,
			ok:function(){
				var self=this;
				if(keyflag){
					if(fn_cache[seq_id].fn&&typeof fn_cache[seq_id].fn==='function'){
						fn_cache[seq_id].fn.call(self);
						delete fn_cache[seq_id].fn;
					}else{
						self.close();
						fn_cache[seq_id].fn=fn_cache[seq_id].FN;
					}
				}else{
					if(fn_cache.fn&&typeof fn_cache.fn==='function'){
						fn_cache.fn.call(self);
						delete fn_cache.fn;
					}else{
						self.close();
						fn_cache.fn=fn_cache.FN;
					}
				}
				return false;
			},
			cancel:function(){
				var self=this;
				self.close();
				return false;
			}
		});
		//设置对外接口
		/*设置回调*/
		var setFn=function(newfn,key){
			if(typeof key==='string'){
				keyflag=true;
				seq_id=key;
				fn_cache[seq_id]={};
				fn_cache[seq_id].isFn=true;
				fn_cache[seq_id].fn=fn_cache[seq_id].FN=newfn;
			}else{
				keyflag=false;
				seq_id=null;
				fn_cache.isFn=true;
				fn_cache.fn=fn_cache.FN=newfn;
			}
		}
		/*设置回调判断*/
		var isFn=function(key){
			return (key===seq_id	&&	key)?fn_cache[seq_id].isFn:fn_cache.isFn;
		}

		//返回对外接口
		res={
			dialog:dia,
			setFn:setFn,
			isFn:isFn
		}
		return res;
	};



	/*工具类*/
	//判断闰年
	public_tool.isLeapYear=function(y, m) {
		var m_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var isly = (y % 4 == 0 && y % 100 != 0 )? true : y % 400 == 0 ? true : false;
		isly ? m_arr.splice(1, 1, 29) : m_arr.splice(1, 1, 28);
		return m?{isly: isly,months: m_arr,m: m_arr[parseInt(m, 10) - 1]}:{isly: isly,months: m_arr}
	};
	//将人民币转换成大写
	public_tool.toUpMoney=function(str,wraps){
		var cn_zero = "零",
			cn_one = "壹",
			cn_two = "贰",
			cn_three = "叁",
			cn_four = "肆",
			cn_five = "伍",
			cn_six = "陆",
			cn_seven = "柒",
			cn_height = "捌",
			cn_nine = "玖",
			cn_ten = "拾",
			cn_hundred = "佰",
			cn_thousand = "仟",
			cn_ten_thousand = "万",
			cn_hundred_million = "亿",
			cn_symbol="",
			cn_dollar = "元",
			cn_ten_cent = "角",
			cn_cent = "分",
			cn_integer = "整",
			integral,
			decimal,
			outputCharacters,
			parts,
			digits,
			radices,
			bigRadices,
			decimals,
			zeroCount,
			i,
			p,
			d,
			quotient,
			modulus,
			tvs=str.toString(),
			formatstr = tvs.replace(/^0+/,""),
			parts =formatstr.split(".");

		if (parts.length > 1) {
			integral = parts[0];
			decimal = parts[1];
			decimal = decimal.slice(0, 2);
		}else {
			integral = parts[0];
			decimal = "";
		}
		digits =[cn_zero, cn_one, cn_two, cn_three, cn_four, cn_five, cn_six, cn_seven, cn_height, cn_nine];
		radices =["", cn_ten, cn_hundred, cn_thousand];
		bigRadices =["", cn_ten_thousand, cn_hundred_million];
		decimals =[cn_ten_cent,cn_cent];
		outputCharacters = "";
		if (Number(integral) > 0) {
			zeroCount = 0;
			for (i = 0; i < integral.length; i++) {
				p = integral.length - i - 1;
				d = integral.substr(i, 1);
				quotient = p / 4;
				modulus = p % 4;
				if (d == "0") {
					zeroCount++;
				}else {
					if (zeroCount > 0){
						outputCharacters += digits[0];
					}
					zeroCount = 0;
					outputCharacters += digits[Number(d)] + radices[modulus];
				}
				if (modulus == 0 && zeroCount < 4){
					outputCharacters += bigRadices[quotient];
				}
			}
			outputCharacters += cn_dollar;
		}
		if (decimal != "") {
			for (i = 0; i < decimal.length; i++) {
				d = decimal.substr(i, 1);
				if (d != "0") {
					outputCharacters += digits[Number(d)] + decimals[i];
				}
			}
		}
		if (outputCharacters == "") {
			outputCharacters = cn_zero + cn_dollar;
		}
		if (decimal == "") {
			outputCharacters += cn_integer;
		}
		outputCharacters = cn_symbol + outputCharacters;

		if(wraps){
			return wraps.innerHTML=outputCharacters;
		}else{
			return outputCharacters;
		}
	};
	//银行卡格式化
	public_tool.cardFormat=function(str){
		var cardno=str.toString().replace(/\s*/g,'');
		if(cardno==''){
			return '';
		}
		cardno=cardno.split('');
		var len=cardno.length,
			i=0,
			j=1;
		for(i;i<len;i++){
			if(j%4==0&&j!=len){
				cardno.splice(i,1,cardno[i]+" ");
			}
			j++;
		}
		return cardno.join('');
	};
	//手机格式化
	public_tool.phoneFormat=function(str){
		var phoneno=str.toString().replace(/\s*/g,'');
		if(phoneno==''){
			return '';
		}
		phoneno=phoneno.split('');

		var len=phoneno.length,
			i=0;
		for(i;i<len;i++){
			var j=i+2;
			if(i!=0){
				if(i==2){
					phoneno.splice(i,1,phoneno[i]+" ");
				}else if(j%4==0&&j!=len+1){
					phoneno.splice(i,1,phoneno[i]+" ");
				}
			}
		}
		return phoneno.join('');
	};


	/*左侧菜单导航*/
	//加载左侧菜单
	public_tool.loadSideMenu=function($menu,$wrap,url){
		var self=this,
			cacheMenu=self.getParams('menu_module');

		if(cacheMenu){
			/*如果存在缓存，则读取缓存*/
			//放入dom中
			$(cacheMenu).appendTo($menu.html(''));
			//初始化
			self.initSideMenu($wrap);
			return;
		}else{
			/*如果不存在缓存，则重新请求并放入缓存*/
			$.ajax({
				url:url||"../json/common/menu.json",
				async:true,
				type:"post",
				dataType:"json"
			}).done(function(data){
				var menu=data.menu,
					len=menu.length,
					menustr='',
					i=0,
					j=0,
					k=0,
					key='menuitem',
					suffix='.html',
					link='',
					item=null,
					sublen='',
					templen='',
					subitem=null,
					path=(function(){
						var winurl=location.pathname,
							modulepos=winurl.lastIndexOf('/'),
							modulesuffix=winurl.indexOf('.'),
							res=winurl.slice(modulepos + 1,modulesuffix);
						return res;
					}());


				for(i;i<len;i++){
					item=menu[i];
					link=item.link;
					if(i===0){
						//首页数据
						//如果是当前路径和当前模块一致
						if(path==='index'&&link===path){
							menustr='<li><a href=\"'+item.link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a></li>';
						}else{
							//如果是当前路径和当前模块不一致
							menustr='<li><a href=\"../'+item.link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a></li>';
						}
					}else{
						//其他模块
						//如果是当前路径和当前模块一致
						if(link===path){
							menustr+='<li class="has-sub"><a href=\"'+link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a>';
						}else{
							menustr+='<li class="has-sub"><a href=\"../'+item.module+'/'+link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a>';
						}
						//子菜单循环
						if(typeof (subitem=item[key])!=='undefined'){
							menustr+="<ul>";
							sublen=subitem.length;
							j=0;
							for(j;j<sublen;j++){

								item=subitem[j];
								if(link===path){
									menustr+='<li><a href=\"'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
								}else{
									menustr+='<li><a href=\"../'+item.module+'/'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
								}

								/*if(typeof (subitem=item[key])!=='undefined'){
								 menustr+="<ul>";
								 templen=subitem.length;
								 k=0;
								 for(k;k<templen;k++){
								 item=subitem[k];
								 if(link===path){
								 menustr+='<li><a href=\"'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
								 }else{
								 menustr+='<li><a href=\"../'+item.module+'/'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
								 }
								 }
								 menustr+="</ul>";
								 }*/
							}
							menustr+="</li></ul>";
						}
					}
				}

				//放入本地存储
				self.setParams('menu_module',menustr);

				//放入dom中
				$(menustr).appendTo($menu.html(''));

				//调用菜单渲染
				self.initSideMenu($wrap);

			}).fail(function(){
				console.log('error');
			});
		}
	};
	//卸载左侧菜单条
	public_tool.removeSideMenu=function($menu){
		//清除dom节点
		$menu.html('');
		//清除本地存储缓存
		this.removeParams('menu_module');
	};
	//初始化左侧导航
	public_tool.initSideMenu=function($wrap){
		var self=this;
		if($wrap.length){
			var $items_with_subs = $wrap.find('li:has(> ul)'),
				toggle_others = $wrap.hasClass('toggle-others');

			$items_with_subs.filter('.active').addClass('expanded');

			$items_with_subs.each(function(i, el){
				var $li = $(el),
					$a = $li.children('a'),
					$sub = $li.children('ul');
				$li.addClass('has-sub');
				$a.on('click', function(ev){
					ev.preventDefault();

					if(toggle_others){
						/*其他节点操作*/
						self.siblingsSideMenu($li,$wrap);
					}

					if($li.hasClass('expanded') || $li.hasClass('opened')){
						/*收缩*/
						self.collapseSideMenu($li, $sub,$wrap);
					}else{
						/*展开*/
						self.expandSideMenu($li, $sub,$wrap);
					}

				});
			});
		}
	};
	//导航展开服务类
	public_tool.expandSideMenu=function($li,$sub,$wrap){
		var self=this;
		if($li.data('is-busy') || ($li.parent('.main-menu').length && $wrap.hasClass('collapsed'))){
			return;
		}

		$li.addClass('expanded').data('is-busy', true);
		$sub.show();

		var $sub_items 	  = $sub.children(),
			sub_height	= $sub.outerHeight(),

			win_y			 = $(window).height(),
			total_height	  = $li.outerHeight(),
			current_y		 = $wrap.scrollTop(),
			item_max_y		= $li.position().top + current_y,
			fit_to_viewpport  = $wrap.hasClass('fit-in-viewport');

		$sub_items.addClass('is-hidden');
		$sub.height(0);


		TweenMax.to($sub,0.2, {
			css: {
				height: sub_height
			},
			onUpdate:self.scrollUpdate.call(self,true,$wrap),
			onComplete: function(){
				$sub.height('');
			}
		});

		var interval_1 = $li.data('sub_i_1'),
			interval_2 = $li.data('sub_i_2');

		window.clearTimeout(interval_1);

		interval_1 = setTimeout(function(){
			$sub_items.each(function(i, el){
				var $sub_item = $(el);
				$sub_item.addClass('is-shown');
			});

			var finish_on = 150 * $sub_items.length,
				t_duration = parseFloat($sub_items.eq(0).css('transition-duration')),
				t_delay = parseFloat($sub_items.last().css('transition-delay'));

			if(t_duration && t_delay){
				finish_on = (t_duration + t_delay) * 1000;
			}

			window.clearTimeout(interval_2);

			interval_2 = setTimeout(function(){
				$sub_items.removeClass('is-hidden is-shown');

			}, finish_on);


			$li.data('is-busy', false);

		}, 0);

		$li.data('sub_i_1', interval_1);
		$li.data('sub_i_2', interval_2);

	};
	//导航收缩服务类
	public_tool.collapseSideMenu=function($li, $sub,$wrap){
		var self=this;
		if($li.data('is-busy')){
			return;
		}

		var $sub_items = $sub.children();

		$li.removeClass('expanded').data('is-busy', true);
		$sub_items.addClass('hidden-item');

		TweenMax.to($sub, 0.2, {
			css: {
				height: 0
			},
			onUpdate:self.scrollUpdate.call(self,true,$wrap),
			onComplete: function() {
				$li.data('is-busy', false).removeClass('opened');

				$sub.attr('style', '').hide();
				$sub_items.removeClass('hidden-item');

				$li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');

				self.scrollUpdate(true,$wrap);
			}
		});

	};
	//导航切换服务类
	public_tool.siblingsSideMenu=function($li,$wrap){
		var self=this;
		$li.siblings().not($li).filter('.expanded, .opened').each(function(i, el){
			var $_li = $(el),
				$_sub = $_li.children('ul');

			self.collapseSideMenu($_li, $_sub,$wrap);
		});
	};
	//模拟滚动条更新
	public_tool.scrollUpdate=function(flag,$wrap){
		var self=this;
		if(isxs()){
			return;
		}
		if($.isFunction($.fn.perfectScrollbar)){
			if($wrap.hasClass('collapsed')){
				return;
			}

			$wrap.find('.sidebar-menu-inner').perfectScrollbar('update');

			if(flag){
				this.scrollDestroy($wrap);
				this.scrollInit($wrap);
			}
		}
	};
	//模拟滚动条初始化
	public_tool.scrollInit=function($wrap){
		if(isxs()){
			return;
		}


		if($.isFunction($.fn.perfectScrollbar)){
			if($wrap.hasClass('collapsed') || ! $wrap.hasClass('fixed')){
				return;
			}

			$wrap.find('.sidebar-menu-inner').perfectScrollbar({
				wheelSpeed: 2,
				wheelPropagation:true
			});
		}
	};
	//模拟滚动条摧毁
	public_tool.scrollDestroy=function($wrap){
		if($.isFunction($.fn.perfectScrollbar)){
			$wrap.find('.sidebar-menu-inner').perfectScrollbar('destroy');
		}
	};

	window.public_tool=public_tool;
})(jQuery);



var public_vars = public_vars || {};

;(function($, window, undefined){

	"use strict";
	//初始化加载
	$(function(){

		public_vars.$body                 = $("body");
		public_vars.$pageContainer        = public_vars.$body.find(".page-container");
		public_vars.$horizontalNavbar     = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$horizontalMenu       = public_vars.$horizontalNavbar.find('.navbar-nav');

		public_vars.$mainFooter           = public_vars.$body.find('footer.main-footer');

		public_vars.$userInfoMenuHor      = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$userInfoMenu         = public_vars.$body.find('nav.navbar.user-info-navbar');

		public_vars.$settingsPane         = public_vars.$body.find('.settings-pane');
		public_vars.$settingsPaneIn       = public_vars.$settingsPane.find('.settings-pane-inner');



		public_vars.defaultColorsPalette = ['#68b828','#7c38bc','#0e62c7','#fcd036','#4fcdfc','#00b19d','#ff6264','#f7aa47'];



		//自定义扩展变量
		var $main_menu=$('#main_menu'),
			$main_menu_wrap=$('#main_menu_wrap'),
			$page_loading_wrap=$('#page_loading_wrap'),
			$main_content=$('#main_content');



		//加载成功隐藏动画
		if ($page_loading_wrap.length) {
			$(window).load(function() {
				$page_loading_wrap.addClass('loaded');
			});
		}

		//加载失败
		window.onerror = function() {
			$page_loading_wrap.addClass('loaded');
		};


		//加载左侧导航
		/*var currentfile=location.pathname,
		 cp_prefix=currentfile.lastIndexOf('/'),
		 cp_suffix=currentfile.lastIndexOf('.'),
		 currenturl=currentfile.slice(cp_prefix + 1,cp_suffix);
		 if(currenturl.indexOf('index')!==-1){
		 public_tool.loadSideMenu($main_menu,$main_menu_wrap,'../json/common/menu.json');
		 }else{
		 public_tool.loadSideMenu($main_menu,$main_menu_wrap);
		 }*/
		public_tool.loadSideMenu($main_menu,$main_menu_wrap);




		//计算左侧菜单滚动条
		if (public_vars.$mainFooter.hasClass('sticky')) {
			stickFooterToBottom($main_content,$main_menu_wrap);
			$(window).on('xenon.resized',{
				$content:$main_content,
				$wrap:$main_menu_wrap
			},stickFooterToBottom);
		}


		//模拟滚动条
		if ($.isFunction($.fn.perfectScrollbar)) {
			if ($main_menu_wrap.hasClass('fixed')){
				public_tool.scrollInit($main_menu_wrap);
			}

			// Scrollable
			$("div.scrollable").each(function(i, el) {
				var $this = $(el),
					max_height = parseInt(attrDefault($this, 'max-height', 200), 10);

				max_height = max_height < 0 ? 200 : max_height;

				$this.css({
					maxHeight: max_height
				}).perfectScrollbar({
					wheelPropagation: true
				});
			});
		}


		//计算左侧菜单滚动条
		if (public_vars.$mainFooter.hasClass('fixed')) {
			$main_content.css({
				paddingBottom: public_vars.$mainFooter.outerHeight(true)
			});
		}



		//返回顶部
		$('body').on('click', 'a[rel="go-top"]', function(ev) {
			ev.preventDefault();

			var obj = {
				pos: $(window).scrollTop()
			};

			TweenLite.to(obj, 0.3, {
				pos: 0,
				ease: Power4.easeOut,
				onUpdate: function() {
					$(window).scrollTop(obj.pos);
				}
			});
		});




		//用户信息下拉列表
		if(public_vars.$userInfoMenu.length){
			public_vars.$userInfoMenu.find('.user-info-menu > li').css({
				minHeight: public_vars.$userInfoMenu.outerHeight() - 1
			});
		}


		//表单验证
		if($.isFunction($.fn.validate)) {
			$("form.validate").each(function(i, el) {
				var $this = $(el),
					opts = {
						rules: {},
						messages: {},
						errorElement: 'span',
						errorClass: 'validate-has-error',
						highlight: function (element) {
							$(element).closest('.form-group').addClass('validate-has-error');
						},
						unhighlight: function (element) {
							$(element).closest('.form-group').removeClass('validate-has-error');
						},
						errorPlacement: function (error, element)
						{
							if(element.closest('.has-switch').length) {
								error.insertAfter(element.closest('.has-switch'));
							}
							else if(element.parent('.checkbox, .radio').length || element.parent('.input-group').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
					},
					$fields = $this.find('[data-validate]');

				$fields.each(function(j, el2) {
					var $field = $(el2),
						name = $field.attr('name'),
						validate = attrDefault($field, 'validate', '').toString(),
						_validate = validate.split(',');


					for(var k in _validate){
						var rule = _validate[k],
							params,
							message;

						if(typeof opts['rules'][name] == 'undefined'){
							opts['rules'][name] = {};
							opts['messages'][name] = {};
						}



						if($.inArray(rule, ['required', 'url', 'email', 'number', 'date','zh_phone','poe','money','num']) != -1){
							opts['rules'][name][rule] = true;

							message = $field.data('message-' + rule);

							if(message){
								opts['messages'][name][rule] = message;
							}
						} else if(params = rule.match(/(\w+)\[(.*?)\]/i)) {
							if($.inArray(params[1], ['min', 'max', 'minlength', 'maxlength', 'dotminlength', 'dotmaxlength', 'equalTo']) != -1) {
								opts['rules'][name][params[1]] = params[2];


								message = $field.data('message-' + params[1]);

								if(message) {
									opts['messages'][name][params[1]] = message;
								}
							}
						}
					}
				});



				if(public_tool.cache){
					public_tool.cache['form_opt_'+i]=opts;
				}else{
					$this.validate(opts);
				}

			});
		}


		//登陆获取焦点隐藏默认文字
		$(".login-form .form-group:has(label)").each(function(i, el)
		{
			var $this = $(el),
				$label = $this.find('label'),
				$input = $this.find('.form-control');

			$input.on('focus', function()
			{
				$this.addClass('is-focused');
			});

			$input.on('keydown', function()
			{
				$this.addClass('is-focused');
			});

			$input.on('blur', function()
			{
				$this.removeClass('is-focused');

				if($input.val().trim().length > 0)
				{
					$this.addClass('is-focused');
				}
			});

			$label.on('click', function()
			{
				$input.focus();
			});

			if($input.val().trim().length > 0)
			{
				$this.addClass('is-focused');
			}
		});







	});



	function stickFooterToBottom($content,$wrap){
		public_vars.$mainFooter.add($content).add( $wrap).attr('style', '');

		if(isxs()){
			return false;
		}

		if(public_vars.$mainFooter.hasClass('sticky')){
			var win_height				 = jQuery(window).height(),
				footer_height			= public_vars.$mainFooter.outerHeight(true),
				main_content_height	  = public_vars.$mainFooter.position().top + footer_height,
				main_content_height_only = main_content_height - footer_height,
				extra_height			 = public_vars.$horizontalNavbar.outerHeight();


			if(win_height > main_content_height - parseInt(public_vars.$mainFooter.css('marginTop'), 10))
			{
				public_vars.$mainFooter.css({
					marginTop: win_height - main_content_height - extra_height
				});
			}
		}
	}




})(jQuery, window);

//设置属性
function attrDefault($el, data_var, default_val){
	if(typeof $el.data(data_var) !=='undefined'){
		return $el.data(data_var);
	}
	return default_val;
}










