/***
name:select focus,blur,valid
author:yipin
搜索框相关事件初始化
***/
(function($,w){
		//对象方法
		//搜索框获取或失去焦点
		$.fn.searchInit=function($selector1,$selector2,fn){
			var $wrap=$selector1,
					$btn=$selector2,
					$input=this;
					
			if($input.val()!=''){
					$wrap.addClass('search-have');
					$btn.addClass('search-clear');
			}else{
					$wrap.removeClass('search-have');
					$btn.removeClass('search-clear');
			}
			this.on('focus blur keyup keydown',function(e){
					var type=e.type,
							txt=$input.val();
					if(type=='focus'){
							$wrap.addClass('search-have');
					}else if(type=='blur'){
							if(txt==''){
								$wrap.removeClass('search-have');
							}
					}else if(type=='keyup'){
							if(txt==''){
								$btn.removeClass('search-clear');
								
							}else{
								$btn.addClass('search-clear');
							}
					}else if(type=='keydown'){
							if(e.which==13){
								e.preventDefault();
								if(txt==''){
									$.modal({
										content:'搜索内容不能为空',
										okfn:function(){}
									},1);
								}else{
									fn(txt);
								}
								return false;
							}
					}
			});
			$btn.on($.EventName.click,function(){
					var txt=$input.val();
						if(txt!==''){
							$input.val('').focus();
							$btn.removeClass('search-clear');
						}
			});
			
			return this;
		}

})(Zepto,window);