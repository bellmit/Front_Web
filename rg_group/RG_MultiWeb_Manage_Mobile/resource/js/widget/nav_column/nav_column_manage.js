/***
name:column button render
author:yipin
导航栏目按钮布局渲染
***/
(function($,w){
		//扩展导航栏目管理列表服务类(类方法)
		$.ColumnBtnRender=function(n){
				var winwidth=$(w).width(),
						itemwidth=(winwidth/n).toString(),
						tempwidth,
						reswidth;
				if(itemwidth.indexOf('.')!=-1){
						tempwidth=itemwidth.split('.');
						reswidth=tempwidth[0]-10+'.'+tempwidth[1].slice(0,5);
				}else{
						reswidth=itemwidth-10;
				}
				return reswidth<90?90:reswidth;
		}
		//对象方法
		$.fn.columnBtnRender=function(str,n){
			var curwidth=$.ColumnBtnRender(n);
			this.find(str).each(function(){
					$(this).css({'height':curwidth+'px'});
			});
			return this;
		}
})(Zepto,window);