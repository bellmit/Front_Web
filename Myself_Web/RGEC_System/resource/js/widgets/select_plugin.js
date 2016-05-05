/*
author:yipin,
name:select plugin
下拉框插件
*/
define(function () {
		//参数：(需要获取结果的元素，是否多选（默认为单选）)
    $.fn.selfSelect=function($selector,flag){
				var res={},
					arr=[],
					$input=$selector,
					txt=$input.val()||$input.text(),
					self=this;
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
										$this.attr('data-checked','true').removeClass().addClass('selfplug-item-sel');
									}
									
								});
							}
					}else{
						res[txt]=txt;
						this.find('li').each(function(){
							var $this=$(this),
								value=$this.attr('data-value');
							if(txt==value){
								$this.attr('data-checked','true').removeClass().addClass('selfplug-item-sel');
								return false;
							}
							
						});
					}
				}
				//绑定点击事件
				if(flag){
						this.delegate('li','click',function(e){
								var $this=$(this),
										check=$this.attr('data-checked'),
										value=$this.attr('data-value');
										if(check=='true'){
											$this.attr('data-checked','false');
											$this.removeClass('selfplug-item-sel');
											if(res.hasOwnProperty(value)){
												delete res[value];
											}
										}else if(check=='false'){
											$this.attr('data-checked','true');
											if(value!=''){
												$this.addClass('selfplug-item-sel');
												res[value]=value;
											}
										}
										arr.length=0;
										for(var i in res){
											arr.push(res[i]);
										}
										arr.length==0?$input.val(''):$input.val(arr);
						});
				}else{
						this.delegate('li','click',function(e){
								var $this=$(this),
										check=$this.attr('data-checked'),
										value=$this.attr('data-value');
										if(check=='true'){
											$this.attr('data-checked','false').siblings().attr('data-checked','false');
											$this.removeClass('selfplug-item-sel').siblings().removeClass();
											$input.val('');
										}else if(check=='false'){
											$this.attr('data-checked','true').siblings().attr('data-checked','false');
											if(value!=''){
												$this.addClass('selfplug-item-sel').siblings().removeClass();
												$input.val(value);
											}
										}
						});
				}
				//绑定显示隐藏事件
				$selector.on('click',function(){
						self.slideToggle();
				});
				this.on('mouseleave',function(){
						self.slideUp();
				});
				
				
				return this;
		}
});