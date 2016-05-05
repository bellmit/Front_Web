/***
name:editor
author:yipin
表单文本编辑组件
***/
(function($,w){
		
		$.extend($,{
				//初始化方法
				EditorInit:function(param){
						var $textarea=param.textarea,
								$edit=param.edit
								$container=param.container,
								$state=param.state,
								$sure=param.sure;
						
						var txtwidth=$textarea.width(),
								txtheight=$textarea.height(),
								inittxt=$.RenderToText($textarea,$container).join(''),
								inithtml,
								currentstate='edit';
								
						if(inittxt==''){
								$textarea.val('');
						}else{
								$textarea.val(inittxt);
						}
		
						
						//绑定编辑器显示隐藏切换事件
						$edit.css({
							'top':-(txtheight + 65),
							'height':txtheight
						}).on($.EventName.click,function(){
								var $this=$(this);
								if($this.hasClass('editor-state-edit')){
										$this.removeClass('editor-state-edit');
										$state.html('当前状态：编辑');
										currentstate='edit';
										$textarea.css({
											'z-index':20
										});
										$container.css({
											'height':0,
											'display':'none',
											'top':-62
										});
								}else{
										$this.addClass('editor-state-edit');
										$state.html('当前状态：排版');
										currentstate='layout';
										$textarea.css({
											'z-index':-1
										});
										$container.css({
											'display':'block',
											'height':txtheight + 4,
											'top':-(txtheight + 66)
										});
								}
						});
						
						//绑定编辑图文排版
						$container.delegate('span',$.EventName.click,function(e){
								var $this=$(this),
										subindex=$this.index(),
										$parent=$this.parent(),
										prev,
										next,
										prevlen,
										nextlen,
										$clone;
										if(subindex==0){
												prev=$parent.prev();
												prevlen=prev.length;
												if(prevlen==0){
													return false;
												}
												$parent.insertBefore(prev);
										}else if(subindex==1){
												next=$parent.next();
												nextlen=next.length;
												if(nextlen==0){
													return false;
												}
												$parent.insertAfter(next);
										}
						});
						
						//绑定保存图文排版结果
						$sure.on($.EventName.click,function(){
								var edit_html;
								if(currentstate=='edit'){
										edit_html=$.RenderToHtml($textarea,$container).join('');								
										$(edit_html).appendTo($container.html(''));
								}else if(currentstate=='layout'){
										$textarea.val($.RenderToText($textarea,$container).join(''));
										edit_html=$.RenderToHtml($textarea,$container).join('');
										$(edit_html).appendTo($container.html(''));
								}
						});
						
				},
				//文本渲染方法
				RenderToText:function($textarea,$container){
					  var txtarr=[];
						$container.find('div').each(function(){
								var $this=$(this),
										$last=$this.children(':last-child');
										node=$last.get(0).nodeName.toLowerCase();
										txtstr='';
										if(node=='img'){
												txtstr='#图片#\n';
										}else if(node=='p'){
												txtstr=$last.text()+'\n';
										}
										txtarr.push(txtstr);
						});
						return txtarr;
				},
				//标签渲染方法
				RenderToHtml:function($textarea,$container){
						var imgarr=$.RenderGetImg($textarea,$container),
								txtstr=$textarea.val(),
								txtarr=[];
						if(txtstr!=''){
							txtarr=txtstr.replace(/\n/g,'\n').split('\n');
							var i=0,len=txtarr.length,temparr=[],j=0;
							for(i;i<len;i++){
									if(txtarr[i]=='#图片#'){
										temparr.push('<div><span></span><span></span>'+imgarr[j]+'</div>');
										j++;
									}else if(txtarr[i]!=='#图片#'&&txtarr[i]!==''){
										temparr.push('<div><span></span><span></span><p>'+txtarr[i]+'</p></div>');
									}		
							}
						}
						return temparr;
				},
				//渲染图片
				RenderGetImg:function($textarea,$container){
						var txtarr=[];
						$container.find('div').each(function(){
								var $this=$(this),
										$last=$this.children(':last-child');
										node=$last.get(0).nodeName.toLowerCase();
										txtstr='';
										if(node=='img'){
												txtarr.push($this.html().replace(/(<span>|<\/span>)/ig,''));
										}
						});
						return txtarr;
				},
				//获取最终文本值
				GetTemplate:function($container){
						var txtarr=[];
						$container.find('div').each(function(){
								txtarr.push($(this).html().replace(/(<span>|<\/span>)/ig,''));
						});
						return txtarr;
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
										fn($(current).clone());
								}
								$wrap.toggle();
				});
				return this;
		}
})(Zepto,window);