/***
name:img select
author:yipin
缩略图下拉选择
***/
(function($,w){
		//对象方法
		//图像按钮事件
		$.fn.selectImgBtn=function(){
			this.on($.EventName.click,function(){
					$(this).next().toggle();
			});
			return this;
		}
		//图片选择事件
		$.fn.selectImgSel=function($selector){
			var $wrap=this;
			this.on($.EventName.click,function(e){
					var source=e.target,
							node=source.nodeName.toLowerCase(),
							src='',
							$this;
							if(node=='img'){
									$selector.val($(source).attr('alt'));
									$wrap.hide();
							}else if(node=='div'){
									$this=$(source);
								  var iswrap=$this.hasClass('selectimg-plugin-img');
									if(iswrap){
											$wrap.hide();
									}else{
											$selector.val($this.attr('data-src'));
									}
							}
			});
			return this;
		}
})(Zepto,window);