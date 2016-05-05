/***
name:column button render
author:yipin
栏目按钮布局渲染
***/
(function($,w){
		//扩展栏目按钮服务类(类方法)(按多少个计算，是否有最小值限制)
		$.ColumnBtnRender=function(n,flag){
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
				if(flag){
					return reswidth<90?90:reswidth;
				}else{
					return reswidth;
				}	
		}
		//对象方法(需要计算数值的元素，按多少个计算，是否有最小值限制)
		$.fn.columnBtnRender=function(str,n,flag){
			var curwidth=$.ColumnBtnRender(n,flag);
			this.find(str).each(function(){
					$(this).css({'height':curwidth+'px'});
			});
			return this;
		}
})(Zepto,window);