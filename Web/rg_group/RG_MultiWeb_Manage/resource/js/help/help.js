/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog',
		'common':'common/common'
	},
	shim:{
		'dialog':{
			deps:['jquery']
		},
		'common':{
				deps:['jquery']
		}
	}
});


define('slide',function(require){
		/*内部依赖*/
		require('dialog');
		/*内部初始化处理*/
		var ls=window.localStorage;
		var templs=(function(){
					if(ls){
						if(ls.getItem('website_manage_help')==null){
							ls.setItem('website_manage_help','help_img');
							return true;
						}else{
							return false;
						}
					}else{
						return false;
					}
		}());
		var tempdl=(function(){
				return templs?dialog({
					width:30,
					height:30
				}):'';
		}());

		var objs={
				slidesize:0,
				itemheight:0,
				itemwidth:0,
				slidewidth:0,
				loadflag:templs,
				dl:tempdl,
				/*初始化*/
				init:function(wrap,menu,params){
						this.slidesize=wrap.find('li').size();
						this.itemwidth=params.width;
						this.slidewidth=this.slidesize*this.itemwidth;
						wrap.width(this.slidewidth);
						this.render(wrap,menu,params.index);
						this.loaderImageEnd();
				},
				/*渲染*/
				render:function(wrap,menu,index){
					this.itemheight=wrap.find('li').eq(index).height();
					wrap.animate({
							'left':-index*this.itemwidth
					},200).parent().height(this.itemheight);
					menu.find('li').eq(index).addClass('help-menusel').siblings().removeClass('help-menusel');
				},
				/*图片加载开始*/
				loaderImageStart:function(){
					if(this.loadflag&&typeof this.dl!=='string'){
							this.dl.showModal();
					}
				},
				/*图片加载结束*/
				loaderImageEnd:function(){
					if(this.loadflag&&typeof this.dl!=='string'){
							this.dl.close().remove();
					}
				}
		}
		/*内部私有初始化*/
		objs.loaderImageStart();
		return objs;
});


/*程序入口*/
require(['jquery','common','slide'],function($,undefined,Slide) {
	$(function() {
			/*页面元素引用*/
			var $help_slide=$('#help_slide'),
					$help_menu=$('#help_menu');
			/*常用变量*/
			var url_hash=window.location.hash,
					url_value=url_hash!=''?url_hash.slice(1).split('=')[1]:0;
			/*初始化查询*/
			Slide.init($help_slide,$help_menu,{
				width:860,
				index:url_value
			});
			/*点击导航菜单*/
			$help_menu.click(function(e){
					var current=e.target,
							nodename=current.nodeName.toLowerCase(),
							index=0,
							$wrap,
							$current;
					if(nodename=='ul'){
						return
					}else if(nodename=='li'){
						$current=$(current);
					}else if(nodename=='a'){
						e.preventDefault();
						$current=$(current).parent();
					}
					index=$current.index();
					Slide.render($help_slide,$help_menu,index);
					return false;
			});
			
	});
});












