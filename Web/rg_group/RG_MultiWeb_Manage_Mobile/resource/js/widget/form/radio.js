/***
name:radio plugin
author:yipin
表单单选框组件
***/
(function($,w){
		$.fn.radio=function($node){
			var $input=$node,
				txt=$input.val();
			//初始化查询	
			if(txt!=''){
				this.find('li').each(function(){
					var $this=$(this),
						value=$this.attr('data-value');
						if(value==txt){
							$this.addClass('radiosel').siblings().removeClass('radiosel');
							return false;
						}
				});
			}
			//绑定点击事件
			this.delegate('li',$.EventName.click,function(e){
					var $this=$(this),
							value=$this.attr('data-value');
							if(value!=''){
								$input.val(value);
							}
							$this.addClass('radiosel').siblings().removeClass('radiosel');
			});
			return this;
		}
})(Zepto,window);