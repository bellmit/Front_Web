/***
name:select focus,blur,valid
author:yipin
搜索框相关事件初始化
***/
(function($,w){
		//对象方法
		//搜索框获取或失去焦点
		$.fn.searchInit=function($selector1,$selector2,$selector3,fn){
			var $wrap=$selector1,
					$clear=$selector2,
					$btn=$selector3,
					$input=this;
					
			if($input.val()!=''){
					$wrap.addClass('search-have');
					$clear.addClass('search-clear');
			}else{
					$wrap.removeClass('search-have');
					$clear.removeClass('search-clear');
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
								$clear.removeClass('search-clear');	
							}else{
								$clear.addClass('search-clear');
							}
					}else if(type=='keydown'){
							if(e.which==13){
								e.preventDefault();
								if(txt==''){
									$.modal({
										content:'<span class="g-c-orange1 g-btips-warn">搜索内容不能为空!</span>',
										okfn:function(){}
									},1);
								}else{
									fn(txt);
								}
								return false;
							}
					}
			});
			$clear.on($.EventName.click,function(){
					var txt=$input.val();
						if(txt!==''){
							$input.val('').focus();
							$clear.removeClass('search-clear');
						}
			});
			$btn.on($.EventName.click,function(){
					var txt=$input.val();
					if(txt==''){
						$.modal({
							content:'<span class="g-c-orange1 g-btips-warn">搜索内容不能为空!</span>',
							okfn:function(){}
						},1);
					}else{
						fn(txt);
					}
			});
			return this;
		}

})(Zepto,window);