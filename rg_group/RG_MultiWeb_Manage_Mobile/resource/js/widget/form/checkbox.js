/***
name:checkbox plugin
author:yipin
表单多选框组件
***/
(function($,w){
		$.fn.checkbox=function($selector){
			var res={},
				arr=[],
				$input=$selector,
				txt=$input.val();
			//初始化查询	
			if(txt!=''){
				if(txt.indexOf(',')!=-1){
					var temparr=txt.split(','),
						i=0,
						len=temparr.length;
						for(i;i<len;i++){
							res[temparr[i]]=temparr[i];
							this.find('li').each(function(){
								var $this=$(this),
									value=$this.attr('data-value');
								if(temparr[i]==value){
									$this.attr('data-checked','true').removeClass('checkboxsel').addClass('checkboxsel');
									return false;
								}
								
							});
						}
				}else{
					res[txt]=txt;
					this.find('li').each(function(){
						var $this=$(this),
							value=$this.attr('data-value');
						if(txt==value){
							$this.attr('data-checked','true').removeClass('checkboxsel').addClass('checkboxsel');
							return false;
						}
						
					});
				}
			}
			//绑定点击事件
			this.delegate('li',$.EventName.click,function(e){
					var $this=$(this),
							check=$this.attr('data-checked'),
							value=$this.attr('data-value');
							if(check=='true'){
								$this.attr('data-checked','false');
								$this.removeClass('checkboxsel');
								if(res.hasOwnProperty(value)){
									delete res[value];
								}
							}else if(check=='false'){
								$this.attr('data-checked','true');
								if(value!=''){
									$this.addClass('checkboxsel');
									res[value]=value;
								}
							}
							arr.length=0;
							for(var i in res){
								arr.push(res[i]);
							}
							arr.length==0?$input.val(''):$input.val(arr);
			});
			return this;
		}
})(Zepto,window);