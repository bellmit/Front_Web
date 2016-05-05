/***
name:editor
author:yipin
表单文本编辑组件
***/
(function($,w){
		//已选择图片src值
		w.selectImage=[];
		//已选择表情src值
		w.selectFace=[];
		$.extend($,{
				//初始化方法
				EditorInit:function(param){
						var $textarea=param.textarea,
								$imgbtn=param.imgbtn,
								$imgwrap=param.imgwrap;
						
						
						//绑定显示上传图片事件
						$imgbtn.on($.EventName.click,function(){
								var $this=$(this),
								len=$this.find('img').size();
								if(len!=0){
										if($this.hasClass('editor-imgbtn')){
											$this.removeClass('editor-imgbtn');
											$imgwrap.hide();
										}else{
											$this.addClass('editor-imgbtn');
											$imgwrap.show();
										}
								}
						});
						
						//绑定选择上传图片事件
						$imgwrap.delegate('img',$.EventName.click,function(){
								var $this=$(this),
										index=$this.index();
								selectImage.push($this.attr('src'));
								$textarea.val($textarea.val()+'<img>'+parseInt(index+1,10)+'</img>\n');
						});
				}
		});
	                                                                                             

		
		
		
		
		
		
		//表情渲染
		$.fn.editorFace=function($selector,fn){
				var $wrap=$selector;
				//绑定点击事件
				this.on($.EventName.click,function(e){
						var current=e.target,
								node=current.nodeName.toLowerCase();
								if(node=='img'){
										fn($(current).attr('src'));
								}
								$wrap.toggle();
				});
				return this;
		}
})(Zepto,window);