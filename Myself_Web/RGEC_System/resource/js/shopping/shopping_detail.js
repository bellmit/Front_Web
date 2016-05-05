/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'themetitle':'js/widgets/themetitle',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn',
		'gridaction':'js/widgets/gridaction'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'themetitle':{
				deps:['jquery','common']
		},
		'commonfn':{
				deps:['jquery','rule']
		},
		'gridaction':{
				deps:['jquery','dialog']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','themetitle','rule','commonfn','gridaction'], function($,$strap,undefined,undefined,undefined,Common,undefined,Rule,CommonFn,GridAction) {
	$(function() {
			//页面元素引用
			var $theme_title=$('#theme_title');
			
			
			//查看区域		
			var $choose_wrap=$('#choose_wrap'),
					$choose_imgshow=$('#choose_imgshow'),
					$imgshow=$choose_imgshow.find('img'),
					$choose_imglist=$('#choose_imglist'),
					$choose_scalewrap=$('#choose_scalewrap'),
					$choose_infoprice=$('#choose_infoprice'),
					$choose_infospec=$('#choose_infospec'),
					$choose_infominus=$('#choose_infominus'),
					$choose_infonumber=$('#choose_infonumber'),
					$choose_infoadd=$('#choose_infoadd'),
					$choose_infomoney=$('#choose_infomoney'),
					$choose_addcart=$('#choose_addcart');
					
					
			//初始化参数
			var price=0.00,
					number=1,
					spec=1,
					initwidth=$imgshow.width(),
					initheight=$imgshow.height(),
					initX=($(window).width()-$choose_wrap.width()+34)/2,
					initY=$('.headerbox').height()+$theme_title.parent().height()+($choose_imgshow.height()-initheight+65)/2;
			
			
			//初始化
			(function(){
				//价格参数初始化
				price=$choose_infoprice.text();
				number=$choose_infonumber.val();
				$choose_infospec.find('div').each(function(index,element) {
          if(index===0){
						var $this=$(this);
						
						spec=$this.attr('data-number');
						$this.addClass('infospec-active').siblings().removeClass('infospec-active');
						return false;
					}
        });
				
				
				//金额计算初始化
				var money=CommonFn.moneyMul(price,(function(){return number * spec;}()));
				money=CommonFn.moneyCorrect(money);
				$choose_infomoney.text(money[1]);
				
				
				//图片初始化
				var $li=$choose_imglist.children().eq(0),
						$img=$li.find('img'),
						imgsrc=$img.attr('src');
						
						$li.addClass('imgitem-active').siblings().removeClass('imgitem-active');
						$imgshow.attr('src',imgsrc);
						$choose_scalewrap.css({'background-image':'url('+imgsrc+')'});
						
						
			}());
			
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);	
			
			
			
			//切换屏幕时重置计算初始化参数
			$(window).resize(function(){
					initwidth=$imgshow.width();
					initheight=$imgshow.height();
					initX=($(window).width()-$choose_wrap.width()+34)/2;
					initY=$('.headerbox').height()+$theme_title.parent().height()+($choose_imgshow.height()-initheight+65)/2;
			});
			
			
			//选择不同的缩放图片
			$choose_imglist.delegate('li','click',function(){
			var $this=$(this),
					$img=$this.find('img'),
					imgsrc=$img.attr('src');
					
					$this.addClass('imgitem-active').siblings().removeClass('imgitem-active');
					$imgshow.attr('src',imgsrc);
					$choose_scalewrap.css({'background-image':'url('+imgsrc+')'});
			});
			
			
			
			//鼠标滑过显示隐藏放大面板
			$imgshow.on('mouseenter mouseleave',function(e){
					if(e.type==='mouseenter'){
							$choose_scalewrap.show();
					}else{
							$choose_scalewrap.hide();
					}
			});
			
			
			//鼠标移动商品缩放
			$imgshow.on('mousemove',function(e){
					var imgx=(e.pageX-initX)*100/initwidth,
							imgy=(e.pageY-initY)*100/initheight;
							
							if(imgx<0){
								imgx=0;
							}
							if(imgy<0){
								imgy=0;
							}
					
					$choose_scalewrap.css({'background-position':imgx+'% '+imgy+'%'});
			});
			
			
			
			//选择不同规格商品
			$choose_infospec.delegate('div','click',function(){
					var $this=$(this),
							money=0.00;
							
							
					price=price||$this.attr('data-price');
					spec=$this.attr('data-number');
					number=$choose_infonumber.val();
					$this.addClass('infospec-active').siblings().removeClass('infospec-active');
					//计算
					money=CommonFn.moneyMul(price,(function(){return number * spec;}()));
					//格式化金额
					money=CommonFn.moneyCorrect(money);
					
					//输出结果
					$choose_infomoney.text(money[1]);
				
			});
			
			
			
			//绑定商品数量输入限制
			$choose_infonumber.on('keyup',function(){
					this.value=this.value.replace(/[\D*]/g,'');
			});
			$choose_infonumber.on('focusout',function(){
					var temptxt=this.value.replace(/(^00{0,}$)/g,'1');
					
					if(temptxt==''){
						temptxt='1';
					}
					this.value=temptxt;
					number=temptxt;
					
					var $number=$choose_infospec.find('div.infospec-active'),
							spec=$number.length!=0?$number.attr('data-number'):1,
							money=0.00;
							
							//计算
							money=CommonFn.moneyMul(price,(function(){return number * spec;}()));
							//格式化金额
							money=CommonFn.moneyCorrect(money);
							//输出结果
							$choose_infomoney.text(money[1]);
			});
			
			
			
			//绑定数字加减
			$.each([$choose_infominus,$choose_infoadd],function(index,value){
					var selector=this.selector;
					
					this.on('click',function(){
							var value=$choose_infonumber.val();
							if(selector.indexOf('minus')!=-1){
									//减操作
									if(value<=1){
										return false;
									}else{
										$choose_infonumber.val(--value);
									}
							}else{
									//加操作
									if(value>=9999){
										return false;
									}else{
										$choose_infonumber.val(++value);
									}
							}
							number=value;
							var money=CommonFn.moneyMul(price,(function(){return number * spec;}()));
							money=CommonFn.moneyCorrect(money);
							$choose_infomoney.text(money[1]);
					});
			});
			
			
			
			
			
			//绑定加入购物车
			$choose_addcart.on('click',function(){
					//to do
					//send ajax
					//参数（这些参数都可直接获取，已经初始化了）：price：为单价，spec：为当前规格相当于多少个单价，number：为购买多少个规格数量
					
					
			});

			
			
			
	});
});
