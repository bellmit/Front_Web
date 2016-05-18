/***
name:editor serve
author:yipin
编辑器对象
***/

define(['jquery','upload'],function($,Upload){

		return {

			/*
			 初始化内部数据
			 需要传入的对象
			 */
			init:function(opt){
				var self=this;

				//合并参数
				$.extend(true,this,opt);

				//初始化正则对象
				///(^<br>*<br>+$)|(^<br>+<br>*$)/
				this.require=/^\s*\s*$/;

				//初始化提示对象
				this.callback=null;
				this.dia=dialog({
					title:'温馨提示',
					okValue: '确定',
					ok: function () {
						if(self.callback&&typeof self.callback==='function'){
							self.callback.call(self);
						}
						this.close();
						return false;
					},
					cancelValue: '取消',
					cancel: function () {
						this.close();
						return false;
					}
				});

				this.tip=dialog({cancel:false});

				//工具栏菜单条
				this.$toolitem=this.$editor_tool.children();

				//保存操作步骤信息
				this.stepdata=[];

				//光标焦点所在位置
				this.focuspos='';


				//原生dom对象
				this.editwrap=document.getElementById(this.$article_content.selector.slice(1));



				//标签容器
				this.$labelitems=this.$editor_label.children();
				this.$labelwrap=this.$editor_label.parent();


				//选中的标签
				this.selecttag={};



				//标签jsonp回调函数
				window.tagCallBack=function(result){
					//to do
				}

				//公开的权限
				this.selectvisible='全部好友';


				//当前操作状态步骤索引
				this.index=-1;
				//选中子菜单索引
				this.secectindex=-1;



				//样式索引
				this.format_map={
					'border-top':'af-border-top',
					'border-bottom':'af-border-bottom',
					'bold':'af-bold',
					'italic':'af-italic',
					'delete':'af-delete',
					'underline':'af-underline',
					'h1':'af-h1',
					'h2':'af-h2',
					'h3':'af-h3',
					'h4':'af-h4',
					'h5':'af-h5',
					'h6':'af-h6',
					'layout':'af-layout'
				};

				//初始化上传组件
				this.$input=this.$editor_tool.find('input[type="file"]');
				Upload.fileUpload({
					dia:this.dia,
					$input:this.$input,
					type:'png|jpg|jpeg|gif',
					size:2048
				},function(reader){
					if(self.index==-1){
						self.index=0;
					}else if(typeof self.stepdata[self.index]!='undefined'){
						self.index++;
					}
					var tempstep={};
					tempstep['html']='';
					tempstep['type']='img';
					tempstep['id']=self.index;
					tempstep['value']=reader.result;
					self.stepdata[self.index]=tempstep;
					self.toolStepState(self.$toolitem);
					self.htmlShow();
				});

				//渲染
				this.render();

				//绑定事件
				this.bindEvents();

			},
			/*
			 事件绑定
			 */
			bindEvents:function(){

				var self=this,
					inputs={
						title:{
							node:this.$article_title,
							wrap:'title'
						},
						content:{
							node:this.$article_content,
							wrap:'content'
						}
					};

				//绑定输入域事件
				for(var i in inputs){
					inputs[i]['node'].on('keyup focusout focusin',inputs[i],function(e){
						var type=e.type,
							wrap= e.data['wrap'],
							node= e.data['node'];

						switch(type){

							//监听键盘事件
							case "keyup":
								var code= e.keyCode;
								if(code==8||code==46){
									//删除操作
									self.isRequire(node);
								}else if(code==13){
									//换行操作
									if(wrap=='content'){
										self.setStepData('enter');
										//修正换行操作时光标定位错误问题
										self.correctCursorPos();
									}
								}
								break;


							//监听失去焦点事件
							case "focusout":
								self.focuspos='';
								self.toolState(self.$toolitem);
								if(wrap=='content'){
									self.setStepData('out');
								}
								if(wrap=='title'){
									if(self.$editor_format.css('display')=='block'){
										self.$editor_format.hide();
									}
								}
								break;

							//监听获取焦点事件
							case "focusin":
								self.focuspos=wrap;
								self.toolState(self.$toolitem);
								if(wrap=='content'){
										self.setStepData('in');
								}else if(wrap=='title'){
									if(self.$editor_format.css('display')=='block'){
										self.$editor_format.hide();
									}
								}
								break;

						}


					});
				};


				//绑定工具栏tap操作
				this.$editor_tool.on($.EventName.click,'li',function(){
					var $this=$(this),
						tool=$this.attr('data-tool'),
						active=$this.attr('data-active');

					switch (tool){
						case "prev":
							//上一步操作
							if($this.hasClass('tool-disabled')){
								return false;
							}
							//做分步操作处理
							self.index--;
							//状态更改
							self.toolStepState(self.$toolitem);
							//更新页面
							if(self.index==-1){
								self.$article_content.html('');
							}else{
								self.htmlShow();
							}

							break;

						case "next":
							//下一步操作
							if($this.hasClass('tool-disabled')){
								return false;
							}
							//做分步操作处理
							self.index++;
							//状态更改
							self.toolStepState(self.$toolitem);
							//更新页面
							self.htmlShow();
							break;

						case "font":
							//禁用标题状态或者默认状态下工具栏
							if((active=="edit"&&self.focuspos=='title')||(active=="edit"&&self.isRequire(self.$article_content))){
								return false;
					}
							//格式化操作
							if(self.secectindex!=-1){
								self.$editor_format.toggle(0);
							}
							break;

						case "line":
							//禁用标题状态或者默认状态下工具栏
							if((active=="edit"&&self.focuspos=='title')||(active=="edit"&&self.isRequire(self.$article_content))){
								return false;
							}
							//分割线
							if(self.secectindex!=-1){
								(function(){

									self.dia.content('<span id="linetop" class="lineinput">上边线：</span><span class="lineinput" id="linebottom">下边线：</span>').showModal();

									var toptxt='',
										bottomtxt='',
										$linetop=$('#linetop'),
										$linebottom=$('#linebottom');

									$linetop.on($.EventName.click,function(){
										if($linetop.hasClass('lineinput-checked')){
											$linetop.removeClass('lineinput-checked');
											toptxt='';
										}else{
											$linetop.addClass('lineinput-checked');
											toptxt='top';
										}
									})

									$linebottom.on($.EventName.click,function(){
										if($linebottom.hasClass('lineinput-checked')){
											$linebottom.removeClass('lineinput-checked');
											bottomtxt='';
										}else{
											$linebottom.addClass('lineinput-checked');
											bottomtxt='bottom';
										}
									});

									self.callback=function(){
										//取消绑定
										$linetop.off($.EventName.click);
										$linebottom.off($.EventName.click);
										var tempstep=self.stepdata[self.secectindex];

										if(toptxt==''&&bottomtxt==''){
											return false;
										}else if(toptxt!=''&&bottomtxt!=''){
											tempstep['format']['border-top']=true;
											tempstep['format']['border-bottom']=true;
										}else if(toptxt!=''&&bottomtxt==''){
											tempstep['format']['border-top']=true;
											tempstep['format']['border-bottom']=false;
										}else if(toptxt==''&&bottomtxt!=''){
											tempstep['format']['border-top']=false;
											tempstep['format']['border-bottom']=true;
										}
										self.htmlShow();
										self.callback=null;
									}

								}());
							};
							break;

						case "link":
							//标题时禁用
							if(active=="append"&&self.focuspos=='title'){
								return false;
							}
							//链接
							self.dia.content('<div class="linkinput"><input type="text" placeholder="请输入链接名称" id="linkname" ></div><div class="linkinput"><input type="text" placeholder="请输入链接地址" id="linkurl" ></div>').showModal();
							var linkname=document.getElementById('linkname'),
								linkurl=document.getElementById('linkurl');

							self.callback=function(){
								var nametxt=linkname.value,
									urltxt=linkurl.value;
								if(nametxt!=''&&urltxt!=''){
									if(self.index==-1){
										self.index=0;
									}else if(typeof self.stepdata[self.index]!='undefined'){
										self.index++;
									}
									var tempstep={};
									tempstep['type']='a';
									tempstep['id']=self.index;
									tempstep['value']=nametxt||'';
									tempstep['url']=urltxt||'';
									tempstep['format']={
										'border-top':false,
										'border-bottom':false,
										'bold':false,
										'italic':false,
										'delete':false,
										'underline':false,
										'h1':false,
										'h2':false,
										'h3':false,
										'h4':false,
										'h5':false,
										'h6':false,
										'layout':false
									};
									self.stepdata[self.index]=tempstep;
									self.htmlShow();
									self.callback=null;
								}else{
									setTimeout(function(){
										self.tip.content('<span class="g-c-err">请输入链接名称或者地址</span>').show();
										setTimeout(function(){
											self.tip.close();
											self.dia.showModal();
										},2000);
									},0);
								}
							}

							break;

						case "image":
							//上传图片
							break;

						case "label":
							//文章标签
							setTimeout(function(){
								self.$labelwrap.css({
									'left':'0'
								});
							},50);
							break;


						case "visible":
							//可见性
							self.$editor_visible.slideToggle();
							break;


					}

					//高亮效果
					$this.addClass('tool-active').siblings().removeClass('tool-active');
					setTimeout(function(){
						$this.removeClass('tool-active');
					},500);
				});

				//绑定格式化tap操作
				this.$editor_format.on($.EventName.click,'li',function(){
					if(self.secectindex==-1){
						return false;
					}else{

						var $this=$(this),
							format=$this.attr('data-format'),
							tempcurrent=self.stepdata[self.secectindex]['format'];


						//添加高亮效果并识别是否是同一类格式化
						(function(){
							var type=$this.attr('data-type');
							if(type&&type!=''){
								var $items=$this.parent().children(),
									tempindex=$this.index();
								$items.each(function(index){
									if(tempindex!==index){
										var $current=$(this),
											temptype=$current.attr('data-type');
										if(temptype==type){
											tempcurrent[$current.attr('data-format')]=false;
											$current.removeClass('format-active');
										}
									}
								});
							}
						}());


						//最终效果渲染
						$this.toggleClass('format-active');
						$this.hasClass('format-active')?tempcurrent[format]=true:tempcurrent[format]=false;
						self.htmlShow();
					}

				});

				//编辑器事件绑定
				this.$article_content.on($.EventName.click,function(e){
					if(self.$editor_format.css('display')=='block'){
						self.$editor_format.hide();
					}
					var current=e.target,
						node=current.nodeName.toLowerCase();

console.log(current.getClientRects());
					if(node=='p'||node=='span'||node=='a'){
						var $this=$(current),
							index=$this.attr('data-id');

						self.secectindex=index;
					}else{
						self.secectindex=-1;
					}
				});

				//绑定横竖屏切换
				$(window).on('orientationchange',function(e){

					if(e.orientation=='portrait'){
						//竖屏

						//工具栏状态
						self.toolShow(self.$editor_tool,'portrait');
						self.toolShow(self.$editor_format.find('ul'),'portrait');
						//标签面板

					}else if(e.orientation=='landscape'){
						//横屏

						//工具栏状态
						self.toolShow(self.$editor_tool,'landscape');
						self.toolShow(self.$editor_format.find('ul'),'landscape');
					}
				});


				//绑定标签显示隐藏,绑定标签加载更多
				this.$labelwrap.on($.EventName.click,function(e){
					var current= e.target,
						node=current.nodeName.toLowerCase();

					if(node=='ul'||node=='section'){
						setTimeout(function(){
							self.$labelwrap.css({
								'left':'-100%'
							});
						},50);
					}else if(node=='li'){
						var $this=$(current),
							tag=$this.attr('data-tag');

						if($this.hasClass('editor-tag-active')){
							$this.removeClass('editor-tag-active');
							if(self.selecttag[tag]){
								delete self.selecttag[tag];
							}
						}else{
							$this.addClass('editor-tag-active');
							self.selecttag[tag]=tag;
						}
					}else if(node=='div'){
						self.loadtag.currentPage++;
						self.loadTag();
					}

				});



				//绑定控制可见权限
				this.$editor_visible.on($.EventName.click,'li',function(e){
					var $this=$(this),
						visible=$this.attr('data-visible');

					$this.addClass('visible-active').siblings().removeClass('visible-active');
					self.selectvisible=visible;
				});


			},
			/*
			 * 对外发布提交
			 *
			 * */
			publish:function(){
				var self=this;
				setTimeout(function(){
					if(self.isRequire(self.$article_title)){
						self.tip.content('<span class="g-c-err">请输入标题</span>').show();
						setTimeout(function(){
							self.tip.close();
						},2000);
						return false;
					}else if(self.isRequire(self.$article_content)){
						self.tip.content('<span class="g-c-err">请输入正文</span>').show();
						setTimeout(function(){
							self.tip.close();
						},2000);
						return false;
					}else{
						return self.getStepData();
					}
				},1);
			},
			/*
			 * 取消发布提交
			 *参数：回调函数
			 * */
			cancelPublish:function(fn){
				var self=this;
				if((self.stepdata.length!=0&&self.index!=0)||!this.isRequire(this.$article_title)){
					if(fn&&typeof fn==='function'){
						self.callback=function(){
							fn.call(null,self.getStepData());
						};
						self.dia.content('是否放弃此次编辑？').showModal();
					}
				}else{
					if(fn&&typeof fn==='function'){
						fn.call(null,'');
					}
				}
			},
			/*
			 * 判断是否是空数据
			 *
			 * */
			isRequire:function(node){
				var html=node.html(),
					str=node.text();

					html=html.replace(this.require,'');
					str=str.replace(this.require,'');

				if(html==''){
					if(str==''){
						node.html('');
						return true;
					}else{
						return false;
					}
				}else if(html=='<br>'){
					node.html('');
					return true;
				}else{
					return false;
				}
			},
			/*
			 * 渲染
			 * */
			render:function(){
				//工具栏状态
				this.toolState(this.$toolitem);
				this.toolStepState(this.$toolitem);

				//工具栏显示适配
				this.toolShow(this.$editor_tool);
				this.toolShow(this.$editor_format.find('ul'));

				//渲染标签页

			},
			/*
			 * 加载标签
			 * */
			loadTag:function(opt){
				var self=this;
				if(opt){
					if(typeof this.loadtag==='undefined'){
						this.loadtag=opt;
					}
				}
				$.ajax({
					url:self.loadtag.url,
					data:{
						parentId:self.loadtag.parentId,
						currentPage:self.loadtag.currentPage
					},
					dataType:'json',
					type:'post',
					success:function(res){

						var list= res['rs'],
							len=list.length;
						if(len!=0){
							var str='',
								i=0;
							for(i;i<len;i++){
								str+='<li data-tag="'+list[i]['id']+'">'+list[i]['name']+'</li>';
							}
							$(str).appendTo(self.$editor_label);
						}
					},
					error:function(){
						throw 'select tag error';
					}
				});
			},
			/*
			 * 获取操作步骤数据
			 * */
			getStepData:function(){
				var i= 0,
					data=this.stepdata,
					result={},
					htmlstr=[],
					urlstr=[],
					tagstr=[];

				result['title']=this.$article_title.text();
				for(i;i<=this.index;i++){
					htmlstr.push(data[i]['html']);
					if(data[i]['type']=='img'){
						urlstr.push(data[i]['value']);
					}
				}
				result['content']=htmlstr;
				result['img']=urlstr;

				for(var j in this.selecttag){
					tagstr.push(this.selecttag[j]);
				}
				result['tag']=tagstr.join(',');
				result['visible']=this.selectvisible;
				return result;
			},
			/*
			 * 将数据放入操作步骤
			 * */
			setStepData:function(type){
				var self=this;
				if(this.index==-1){
					//第一次进来
					if(type=='in'){
						console.log(document.activeElement);
						//获取焦点
						(function(){
							var tempstep={};
							tempstep['value']='';
							tempstep['type']='txt';
							tempstep['id']=0;
							tempstep['format']={
								'border-top':false,
								'border-bottom':false,
								'bold':false,
								'italic':false,
								'delete':false,
								'underline':false,
								'h1':false,
								'h2':false,
								'h3':false,
								'h4':false,
								'h5':false,
								'h6':false,
								'layout':false
							};
							self.stepdata[0]=tempstep;
							self.htmlShow(0);
						}());
					}else if(type=='out'){
						//失去焦点
						(function(){
							var tempstep={},
								txt=self.$article_content.text();

							txt=txt.replace(self.require,'');
							if(txt==''){
								//沒有做任何操作
								self.index=-1;
								self.stepdata.length=0;
								self.$article_content.html('');
							}else{
								self.index=0;
								self.stepdata[0]['id']=0;
								self.stepdata[0]['value']=txt;
								self.htmlShow();
							}
						}());
					}else if(type=='enter'){
						//换行
						(function(){
							var tempstep={},
								txt=self.$article_content.text();

							txt=txt.replace(self.require,'');
							if(txt==''){
								//沒有做任何操作
								self.index=-1;
								self.stepdata.length=0;
								self.$article_content.html('');
							}else{
								self.index=0;
								self.stepdata[0]['id']=0;
								self.stepdata[0]['value']=txt;
								self.htmlShow();
							}
						}());
					}
				}else{
					//拥有操作步骤的情况
					if(type=='in'){
						console.log(document.activeElement);
						//获取焦点
						(function(){
							var tempstep={},
								type=self.stepdata[self.index]['type'];

							if(type=='a'||type=='img'){
								//如果前一个元素是非文本元素，则创建一个新元素;
								self.index++;
								tempstep['value']='';
								tempstep['type']='txt';
								tempstep['id']=self.index;
								tempstep['format']={
									'border-top':false,
									'border-bottom':false,
									'bold':false,
									'italic':false,
									'delete':false,
									'underline':false,
									'h1':false,
									'h2':false,
									'h3':false,
									'h4':false,
									'h5':false,
									'h6':false,
									'layout':false
								};
								self.stepdata[self.index]=tempstep;
								self.htmlShow();
							}else if(type=='txt'){
								//如果前一个元素是文本元素则继续追加
								//此处可能有扩展情况
							}
						}());
					}else if(type=='out'){
						//失去焦点
						(function(){
								var txt=self.$article_content.text(),
									type=self.stepdata[self.index]['type'];

								//开始过滤操作
								for(var i=0;i<=self.index;i++){
									txt=txt.replace(self.stepdata[i]['value'],'');
								}
								txt=txt.replace(self.require,'');

							if(type=='a'||type=='img'){
								//如果前一个元素是非文本元素，则创建一个新元素;
								self.index--;
								self.stepdata.pop();
								self.htmlShow();
							}else if(type=='txt'){
								//如果前一个元素是文本元素则继续追加
								if(txt==''){
									//沒有做任何操作
									//后期扩展
								}else{
									self.stepdata[self.index]['value']=self.stepdata[self.index]['value']+txt;
									self.htmlShow();
								}
							}
						}());

					}else if(type=='enter'){
						//换行操作
						(function(){
							var tempstep={},
								txt=self.$article_content.text(),
								type=self.stepdata[self.index]['type'];

							//开始过滤操作
							for(var i=0;i<=self.index;i++){
								txt=txt.replace(self.stepdata[i]['value'],'');
							}
							txt=txt.replace(self.require,'');

							if(type=='a'||type=='img'){
								//如果前一个元素是非文本元素，则创建一个新元素;
							}else if(type=='txt'){
								//如果前一个元素是文本元素则继续追加
								if(self.stepdata[self.index]['value']==''){
									if(txt==''){
										//沒有做任何操作
										//后期扩展

										//防止空标签
										//self.isRequire(self.$article_content);
									}else{
										self.stepdata[self.index]['value']=txt;
										self.htmlShow();
									}
								}else{
									self.index++;
									tempstep['value']='';
									tempstep['type']='txt';
									tempstep['id']=self.index;
									tempstep['format']={
										'border-top':false,
										'border-bottom':false,
										'bold':false,
										'italic':false,
										'delete':false,
										'underline':false,
										'h1':false,
										'h2':false,
										'h3':false,
										'h4':false,
										'h5':false,
										'h6':false,
										'layout':false
									};
									self.stepdata[self.index]=tempstep;
									self.htmlShow();
								}
							}
						}());


					}
				}
				//更新状态
				this.toolStepState(this.$toolitem);
			},
			/*
			 * 工具栏在标题状态下的状态控制
			 * */
			toolState:function($tool){
				//禁用标题状态或者默认状态下工具栏
				var self=this;

				$tool.each(function(index){
					var $this=$tool.eq(index),
						active=$this.attr('data-active');

					if(self.focuspos=='title'){
						if(active=='edit'||active=='append'){
							$this.addClass('tool-disabled');
							self.$input.prop('disabled',true);
						}
					}else{
						if(active=='edit'||active=='append'){
							$this.removeClass('tool-disabled');
							self.$input.prop('disabled',false);
						}
					}
				});

			},
			/*
			 * 工具栏操作步骤状态控制
			 * */
			toolStepState:function($tool){
				var self=this;


				if(self.stepdata.length==0){
					$tool.eq(0).addClass('tool-disabled');
					$tool.eq(1).addClass('tool-disabled');
				}else{
					if(self.stepdata.length==1){
						$tool.eq(0).removeClass('tool-disabled');
						$tool.eq(1).addClass('tool-disabled');
					}else if(self.stepdata.length>=2){
						if(self.index==-1){
							$tool.eq(0).addClass('tool-disabled');
							$tool.eq(1).removeClass('tool-disabled');
						}else if(self.index==self.stepdata.length - 1){
							$tool.eq(0).removeClass('tool-disabled');
							$tool.eq(1).addClass('tool-disabled');
						}else{
							$tool.eq(0).removeClass('tool-disabled');
							$tool.eq(1).removeClass('tool-disabled');
						}

					}
				}

			},
			/*
			 * 获取操作步骤数据
			 * */
			toolShow:function(wrap,type){
				var $items=wrap.children(),
					selector=wrap.selector,
					items_width=(function(){
						if(selector=='#editor_tool'){
							return parseInt($items.eq(0).width() * 6,10) + 200;
						}else{
							return parseInt($items.eq(0).width() * $items.length,10);
						}
					}()),
					parent_width=wrap.parent().width(),
					step=50;

				if(type){
					wrap.css({'left':0});
				}


				if(parent_width<items_width){
					if(this.isAndroid){
						wrap.on($.EventName.click,function(e){
							var type= e.type,
								left=parseInt(wrap.css('left'),10),
								templeft=Math.abs(left);

							switch(type){
								case 'swipeleft':
									var limit=parseInt(templeft + parent_width,10);

									if(limit>=items_width){
										return false;
									}else{
										wrap.css({
											'left':function(){
												var tempstep=items_width - limit;
												if(tempstep<=step){
													return left=left - tempstep;
												}else{
													return left=left - step;
												}
											}
										});
									}
									break;

								case 'swiperight':
									if(left==0){
										return false;
									}else{
										wrap.css({
											'left':function(){
												if(templeft<=step){
													return left=0;
												}else{
													return left+=step;
												}
											}
										});
									}
									break;
							}
						});
					}else{
						wrap.on('swipeleft swiperight',function(e){
							var type= e.type,
								left=parseInt(wrap.css('left'),10),
								templeft=Math.abs(left);

							switch(type){
								case 'swipeleft':
									var limit=parseInt(templeft + parent_width,10);

									if(limit>=items_width){
										return false;
									}else{
										wrap.css({
											'left':function(){
												var tempstep=items_width - limit;
												if(tempstep<=step){
													return left=left - tempstep;
												}else{
													return left=left - step;
												}
											}
										});
									}
									break;

								case 'swiperight':
									if(left==0){
										return false;
									}else{
										wrap.css({
											'left':function(){
												if(templeft<=step){
													return left=0;
												}else{
													return left+=step;
												}
											}
										});
									}
									break;
							}
						});
					}
				}else{
					if(this.isAndroid){
						$('body').off('swipeleft swiperight',wrap);
					}else{
						wrap.off('swipeleft swiperight');
					}
					wrap.css({'left':0});
				}

			},
			/*
			 * 显示数据(显示html)
			 * */
			htmlShow:function(type){
				var i= 0,
					data=this.stepdata,
					len=type?type:this.index;

				this.$article_content.html('');
				for(i;i<=len;i++){
					var type=data[i]['type'],
						format=data[i]['format'],
						classname="",
						temphtml="";
					if(format){
						for(var j in format){
							if(format[j]){
								classname+=this.format_map[j]+' ';
							}
						};
					};
					if(type=='txt'){
						temphtml='<p class="'+classname+'" data-id="'+data[i]['id']+'" >'+data[i]['value']+'</p>';
						data[i]['html']=temphtml;
					}else if(type=='a'){
						temphtml='<a class="'+classname+'" data-id="'+data[i]['id']+'" href="'+data[i]['url']+'" >'+data[i]['value']+'</a>';
						data[i]['html']=temphtml;
					}else if(type=='img'){
						temphtml='<img data-id="'+data[i]['id']+'" alt="" src="'+data[i]['value']+'" >';
						data[i]['html']=temphtml;
					}
					$(temphtml).appendTo(this.$article_content);
				}

			},
			/*
			* 修正换行后光标定位到第一行第一个字符位置
			*
			* */
			correctCursorPos:function(){
				var self=this;
				setTimeout(function () {
					var sel,
						range;
					if (getSelection && document.createRange) {
						range = document.createRange();
						range.selectNodeContents(self.editwrap);
						range.collapse(true);
						range.setEnd(self.editwrap,self.editwrap.childNodes.length);
						range.setStart(self.editwrap,self.editwrap.childNodes.length);
						sel = getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
					} else if (document.body.createTextRange) {
						range = document.body.createTextRange();
						range.moveToElementText(self.editwrap);
						range.collapse(true);
						range.select();
					}
				},0);
			}
 		};

});
