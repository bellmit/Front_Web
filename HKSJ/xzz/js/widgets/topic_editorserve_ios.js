/***
 name:editor serve
 author:yipin
 编辑器对象
 ***/

define(['jquery'],function($){

	return {

		/*
		 初始化内部数据
		 参数：opt:配置参数
		 */
		init:function(opt){
			var self=this;

			//合并参数
			$.extend(true,this,opt);

			//初始化正则对象
			//非空
			this.require=/^\s*\s*$/;
			//去除空
			this.trims=/\s*/gi;
			//html标签
			this.tagstr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

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
			this.$toolwrap=this.$editor_tool.closest('.editor-tools-wrap');

			//文字格式化工具条
			this.$formatitem=this.$editor_format.find('ul');

			//视口高度
			this.$win=$(window);
			this.winheight=this.$win.height();

			//软键盘高度
			this.kbheight=258;
			//软键盘效果
			this.kbeffect=50;


			//测试当前设备是pc还是手机
			if(/(iPhone|iPod|ios|iOS|iPad)/i.test(navigator.userAgent)){
				this.isMobile=true;
			}else{
				this.isMobile=false;
			}

			//保存操作步骤信息
			this.stepdata=[];

			//光标焦点所在位置
			this.focuspos='';

			//按键状态(默认为编辑输入状态)
			this.keystate='edit';

			//原生dom对象
			this.editwrap=document.getElementById(this.$article_content.selector.slice(1));


			//当前操作状态步骤索引
			this.index=-1;
			//选中子菜单索引
			this.secectindex=-1;
			this.prevselectindex=-1;

			//格式化样式索引
			this.format_map={
				'bold':'af-bold',
				'italic':'af-italic',
				'border_top':'af-border-top',
				'border_bottom':'af-border-bottom',
				'delete':'af-delete',
				'underline':'af-underline',
				'first_letter':'af-first-letter',
				'indent':'af-indent',
				'layout':'af-layout',
				'dot_list':'af-dot-list',
				'align_left':'af-align-left',
				'align_center':'af-align-center',
				'align_right':'af-align-right',
				'capitalize':'af-text-capitalize',
				'uppercase':'af-text-uppercase',
				'lowercase':'af-text-lowercase',
				'h1':'af-h1',
				'h2':'af-h2',
				'h3':'af-h3',
				'h4':'af-h4',
				'h5':'af-h5',
				'h6':'af-h6'
			};

			//格式化样式集合
			this.classmap={
				'bold':false,
				'italic':false,
				'border_top':false,
				'border_bottom':false,
				'delete':false,
				'underline':false,
				'first_letter':false,
				'indent':false,
				'layout':false,
				'dot_list':false,
				'align_left':false,
				'align_center':false,
				'align_right':false,
				'capitalize':false,
				'uppercase':false,
				'lowercase':false,
				'h1':false,
				'h2':false,
				'h3':false,
				'h4':false,
				'h5':false,
				'h6':false
			}

			//渲染
			this.render();

			//绑定事件
			this.bindEvents();
		},
		/*
		 事件绑定
		 */
		bindEvents:function(){

			var self=this;
			//绑定输入域事件
			this.$article_content.on('keyup focusout focusin',function(e){
				var type=e.type,
					$this=$(this);

				switch(type){

					//监听键盘事件
					case "keyup":
						var code= e.keyCode;

						if(code==8||code==46){
							//删除操作

							self.isRequire($this);
							self.keystate='delete';

							//检测编辑状态
							self.editStatus();
						}else if(code==13){
							e.preventDefault();
							//换行操作
							self.keystate='edit';
							self.setStepData('enter');
							//修正换行操作时光标定位错误问题
							self.correctCursorPos();
							return false;
						}else{
							self.keystate='edit';
						}
						break;


					//监听失去焦点事件
					case "focusout":
						self.focuspos='';
						//修正键盘
						if(self.isMobile){
							self.keyBoardPos('focus');
						}
						self.toolState(self.$toolitem);
						self.setStepData('out');
						break;

					//监听获取焦点事件
					case "focusin":
						self.focuspos='content';
						//修正键盘
						if(self.isMobile){
							self.keyBoardPos('focus');
						}
						self.toolState(self.$toolitem);
						break;
				}


			});

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


						//高亮效果
						$this.addClass('tool-active').siblings().removeClass('tool-active');
						setTimeout(function(){
							$this.removeClass('tool-active');
						},500);

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

						//高亮效果
						$this.addClass('tool-active').siblings().removeClass('tool-active');
						setTimeout(function(){
							$this.removeClass('tool-active');
						},500);
						break;

					case "font":
						//禁用标题状态或者默认状态下工具栏
						if((active=="edit"&&self.focuspos=='')||(active=="edit"&&self.isRequire(self.$article_content))){
							return false;
						}
						//格式化操作
						if(self.secectindex!=-1){
							(function(){
								var tempdata=self.stepdata[self.secectindex];
								if(tempdata!=undefined&&tempdata['type']=='txt'){
									if(self.$editor_format.hasClass('editor-format-wrapshow')){
										self.$editor_format.removeClass('editor-format-wrapshow');
									}else{
										//做选中样式操作
										self.$editor_format.addClass('editor-format-wrapshow');
										//执行样式判断操作
										self.doFormat();
									}
								}else{
									return false;
								}
							}());
						}else{
							return false;
						}


						//高亮效果
						$this.addClass('tool-active').siblings().removeClass('tool-active');
						setTimeout(function(){
							$this.removeClass('tool-active');
						},500);
						break;

					case "link":
						//标题时禁用
						if(active=="append"&&self.focuspos==''){
							return false;
						}
						//链接
						(function(){
							//执行一次保存操作
							self.setStepData('out');

							//开始弹框操作
							self.dia.content('<div class="linkinput"><input type="text" placeholder="请输入链接名称" id="linkname" ></div><div class="linkinput"><input type="text" placeholder="请输入链接地址" id="linkurl" ></div>').showModal();
							var linkname=document.getElementById('linkname'),
								linkurl=document.getElementById('linkurl');

							self.callback=function(){
								var nametxt=linkname.value,
									urltxt=linkurl.value;

								if(nametxt!=''&&urltxt!=''){

									var tempstep={};
									if(self.index==-1){
										(function(){
											self.index=0;
											tempstep['html']='';
											tempstep['value']=nametxt||'';
											tempstep['url']=urltxt||'';
											tempstep['type']='a';
											tempstep['format']= $.extend(true,{},self.classmap);
											tempstep['style']='';
											tempstep['id']=self.index;
											self.stepdata[self.index]=tempstep;
										}());
									}else{
										if(self.secectindex==-1){

											//自然插入链接
											(function(){
												var len=self.stepdata.length;
												if(self.stepdata[len - 1]==undefined){
													self.index=len - 1;
												}else{
													self.index=len;
												}
												tempstep['html']='';
												tempstep['value']=nametxt||'';
												tempstep['url']=urltxt||'';
												tempstep['type']='a';
												tempstep['format']=$.extend(true,{},self.classmap);
												tempstep['style']='';
												tempstep['id']=self.index;
												self.stepdata[self.index]=tempstep;
											}());
										}else{
											//选中插入链接
											(function(){
												//链表数据插入
												var data=self.stepdata[self.secectindex];
												if(data!=undefined&&data['type']=='txt'){
													var value=nametxt||'',
														url=urltxt||'',
														node=self.$article_content.find("p[data-id='"+self.secectindex+"']"),
														txt=node.text(),
														anode ='',
														atxt='';



													//过滤标签
													node.find('a').each(function(){
														var $tempthis=$(this);
														atxt+=$tempthis.text();
														anode+='<a data-id="'+self.secectindex+'" href="'+$tempthis.attr('href')+'" >'+atxt+'</a>';

													});
													txt=txt.replace(atxt,'');

													data['value']=txt + anode + '<a data-id="'+self.secectindex+'" href="'+url+'" >'+value+'</a>';

												}
											}());
										}
									}

									self.htmlShow();
									self.toolStepState(self.$toolitem);
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

							//高亮效果
							$this.addClass('tool-active').siblings().removeClass('tool-active');
							setTimeout(function(){
								$this.removeClass('tool-active');
							},500);


						}());
						break;

					case "image":
						//标题时禁用
						if(active=="append"&&self.focuspos==''){
							return false;
						}
						//上传图片
						if(getImage&&typeof getImage==='function'){
							getImage();
						}

						//高亮效果
						$this.addClass('tool-active').siblings().removeClass('tool-active');
						setTimeout(function(){
							$this.removeClass('tool-active');
						},500);
						break;
				}

			});

			//绑定格式化tap操作
			this.$editor_format.on($.EventName.click,'li',function(){
				if(self.secectindex==-1){
					return false;
				}else{
					var $this=$(this);
					(function(){
						var tempdata=self.stepdata[self.secectindex];
						if(tempdata!=undefined&&tempdata['type']=='txt'){
							self.doFormat($this);
							self.htmlShow();
						}
					}());
				}
			});

			//编辑器事件绑定
			this.$article_content.on($.EventName.click,function(e){

				if(self.$editor_format.hasClass('editor-format-wrapshow')){
					self.$editor_format.removeClass('editor-format-wrapshow');
				}

				var current=e.target,
					$this=$(current),
					index=$this.attr('data-id');

				if(index&&index!=-1){
					self.prevselectindex=self.secectindex;
					self.secectindex=index;
					//执行一次编辑完成操作且是步骤编码比较操作
					if(self.stepdata[self.secectindex]['type']=='txt'){
						self.setStepData('out','prevflag');
					}
				}else{
					self.prevselectindex=-1;
					self.secectindex=-1;
					//执行一次编辑完成操作
					self.setStepData('out');
					self.correctCursorPos();
				}
			});

			//绑定横竖屏切换或滚动条事件
			//绑定横竖屏切换或滚动条事件
			this.$win.on('scroll orientationchange',function(e){
				var type= e.type;
				if(type=='resize'||type=='orientationchange'){
					if(e.orientation=='portrait'){
						//竖屏

						//工具栏状态
						self.toolShow(self.$formatitem,'portrait');
						//标签面板

					}else if(e.orientation=='landscape'){
						//横屏

						//工具栏状态
						self.toolShow(self.$formatitem,'landscape');
					}
				}
				if(type=='scroll'&&self.isMobile&&self.focuspos!=''){
					setTimeout(function(){
						self.keyBoardPos('scroll');
					},0);
				}
			});
		},
		/*
		 * 操作格式化
		 * 参数：$this:当前操作对象
		 * */
		doFormat:function($this){
			var self=this;

			if($this!=undefined){
//添加高亮效果并识别是否是同一类格式化
				(function(){

					var format=$this.attr('data-format'),
						tempcurrent=self.stepdata[self.secectindex]['format'],
						type=$this.attr('data-type');


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
					//最终效果渲染
					$this.toggleClass('format-active');
					$this.hasClass('format-active')?tempcurrent[format]=true:tempcurrent[format]=false;
				}());
			}else{
				//执行判断操作
				(function(){
					var tempcurrent=self.stepdata[self.secectindex]['format'],
						$items=self.$formatitem.children();

					for(var i in tempcurrent){
						var classvalue=tempcurrent[i];
						$items.each(function(index){
							var $this=$(this),
								format=$this.attr('data-format');
							if(format==i){
								if(classvalue){
									$this.hasClass('format-active')?'':$this.addClass('format-active');
								}else{
									$this.hasClass('format-active')?$this.removeClass('format-active'):'';
								}
								return false;
							}
						});
					}
				}());
			}
		},
		/*
		 * 上传图片
		 * 参数：imageurl:图片地址url
		 * */
		imgUpload:function(imageurl){
			var self=this;
			//执行一次保存操作
			self.setStepData('out');
			if(imageurl!=''&&imageurl){
				var tempstep={};
				tempstep['html']='';
				tempstep['type']='img';
				tempstep['value']=imageurl;

				if(self.index==-1){
					self.index=0;
					tempstep['id']=self.index;
					self.stepdata[self.index]=tempstep;
				}else{
					if((self.secectindex==self.index&&self.secectindex!=-1)||self.secectindex==-1){

						//自然换行
						(function(){
							var len=self.stepdata.length;
							if(self.stepdata[len - 1]==undefined){
								self.index=len - 1;
							}else{
								self.index=len;
							}
							tempstep['id']=self.index;
							self.stepdata[self.index]=tempstep;
						}());
					}else{
						//选中换行
						(function(){
							//链表数据插入
							var tempdata;
							if(self.stepdata[self.secectindex]!=undefined){
								self.prevselectindex=self.secectindex;
								self.secectindex=parseInt(self.secectindex,10) + 1;
								tempdata=self.stepdata[self.secectindex - 1];
								tempstep['id']=self.secectindex;
								self.stepdata.splice(self.secectindex - 1,1,tempdata,tempstep);
							}else{
								self.prevselectindex=self.secectindex;
								tempstep['id']=self.secectindex;
								self.stepdata[self.secectindex]=tempstep;
							}
							var i=0,
								len=self.stepdata.length;
							self.index=len - 1;
							for(i;i<len;i++){
								self.stepdata[i]['id']=i;
							}
						}());
					}
				}
				self.toolStepState(self.$toolitem);
				self.htmlShow();
			}
		},
		/*
		 * 对外发布提交
		 *
		 * */
		publish:function(){
			var self=this,
				result='';

			if(self.isRequire(self.$article_content)){
				self.tip.content('<span class="g-c-err">请输入正文</span>').show();
				setTimeout(function(){
					self.tip.close();
					self.$article_content.focusin();
				},2000);
				return false;
			}else{
				//触发失去焦点
				if(this.focuspos=='content'){
					this.$article_content.focusout();
				}
				return self.getStepData();
			}
		},
		/*
		 * 判断是否是空数据
		 *参数：node:文本节点或者可编辑节点
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
			this.toolShow(this.$formatitem);
		},
		/*
		 * 获取操作步骤数据
		 * */
		getStepData:function(){
			var i= 0,
				data=this.stepdata,
				result={},
				htmlstr=[],
				urlstr=[];

			for(i;i<=this.index;i++){
				htmlstr.push(data[i]['html']);
				if(data[i]['type']=='img'){
					urlstr.push(data[i]['value']);
				}
			}
			result['content']=htmlstr;
			result['img']=urlstr;
			return result;
		},
		/*
		 * 将数据放入操作步骤
		 * 参数：type:光标位置状态,prevflag:上一次状态码
		 * */
		setStepData:function(type,prevflag){
			var self=this;
			if(this.index==-1){
				//第一次进来
				if(type=='out'){
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
							tempstep['value']=txt;
							tempstep['type']='txt';
							tempstep['id']=0;
							tempstep['style']='';
							tempstep['format']=$.extend(true,{},self.classmap);
							self.stepdata[0]=tempstep;
							self.htmlShow();
						}
					}());
				}else if(type=='enter'){
					//执行一次保存操作
					self.setStepData('out');
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
				if(type=='out'){
					if(prevflag!=undefined){
						//失去焦点(步骤编码比较)
						//to do 需后期扩展
						if(self.prevselectindex!=self.secectindex&&self.secectindex!=-1){
							(function(){

								if(self.prevselectindex===undefined){
									return false;
								}else if(self.stepdata.length==0){
									self.prevselectindex=-1;
									self.secectindex=-1;
									self.index=-1;
									self.$article_content.html('');
									return false;
								}

								var data=self.stepdata,
									datastep=data[self.prevselectindex],
									type='',
									node='',
									txt='',
									haschild,
									temphtml;

								if(datastep==undefined){
									return false;
								}

								type=datastep['type'];

								if(type=='a'||type=='txt'){
									node=type=='a'?self.$article_content.find("a[data-id='"+self.prevselectindex+"']"):self.$article_content.find("p[data-id='"+self.prevselectindex+"']");
									if(node.length==0){
										return false;
									}
									haschild=node.children().length;
									if(haschild==0){
										temphtml=node.text();
									}else{
										temphtml=node.html();
									}
									if(datastep['value']!=temphtml){
										datastep['value']=temphtml;
										self.htmlShow();
									}
								}
							}());
						}
					}else{
						//失去焦点
						(function(){
							var data=self.stepdata[self.secectindex],
								type,
								tempnode,
								haschild;
							if(data!=undefined){
								type=data['type'];
								tempnode=self.$article_content.find("p[data-id='"+self.secectindex+"']");
								haschild=tempnode.children().length;
								if(type=='txt'){
									//如果前一个元素是文本元素则继续追加
									if(haschild==0){
										self.stepdata[self.secectindex]['value']=tempnode.text();
									}else{
										self.stepdata[self.secectindex]['value']=tempnode.html();
									}
								}
							}else{
								data=self.stepdata[self.index];
								type=data['type'];
								tempnode=self.$article_content.find("p[data-id='"+self.index+"']");
								if(type=='txt'){
									//如果前一个元素是文本元素则继续追加
									if(haschild==0){
										self.stepdata[self.index]['value']=tempnode.text();
									}else{
										self.stepdata[self.index]['value']=tempnode.html();
									}
								}
							}
							self.htmlShow();
						}());
					}
				}else if(type=='enter'){
					//执行一次保存操作
					self.setStepData('out');
					//换行操作
					(function(){
						var tempstep={},
							txt=self.$article_content.text(),
							type='',
							data=null;


						//开始过滤操作
						for(var i=0;i<=self.index;i++){
							txt=txt.replace(self.stepdata[i]['value'],'');
						}
						txt=txt.replace(self.require,'');

						if((self.secectindex==self.index&&self.secectindex!=-1)||self.secectindex==-1){
							//自然换行
							data=self.stepdata[self.index];
						}else{
							//选中换行
							data=self.stepdata[self.secectindex];
						}
						type=data['type'];

						if(type=='txt'||type=='img'||type=='a'){
							//如果前一个元素是文本元素则继续追加
							if(data['value']==''&&type=='txt'&&txt!=''){
								//防止空标签
								data['value']=txt;
							}else{
								self.index++;
								tempstep['value']='';
								tempstep['type']='txt';
								tempstep['style']='';
								tempstep['format']=$.extend(true,{},self.classmap);

								if((self.secectindex==self.index&&self.secectindex!=-1)||self.secectindex==-1){
									//自然增长数据
									tempstep['id']=self.index;
									self.stepdata[self.index]=tempstep;
								}else{
									(function(){
										//链表数据插入
										self.prevselectindex=self.secectindex;
										self.secectindex=parseInt(self.secectindex,10) + 1;
										var tempdata=self.stepdata[self.secectindex - 1];


										tempstep['id']=self.secectindex;
										self.stepdata.splice(self.secectindex - 1,1,tempdata,tempstep);
										var i=0,
											len=self.stepdata.length;
										for(i;i<len;i++){
											self.stepdata[i]['id']=i;
										}
									}());
								}
							}
							self.htmlShow();
						}
					}());
				}
			}

			//更新状态
			this.toolStepState(this.$toolitem);
		},
		/*
		 *判断是否续写同时监听按键状态
		 *参数：code:键盘按键编码值
		 * */
		editStatus:function(code){
			var self=this;
			if(self.secectindex===undefined){
				//不是续写状态不做任何操作
				return false;
			}

			if(self.keystate=='delete'){
				if(self.secectindex==-1&&self.stepdata.length==0){
					self.prevselectindex=-1;
					self.index=-1;
					self.$article_content.html('');
				}else if(self.secectindex!=-1){

					var data=self.stepdata,
						type=data[self.secectindex]['type'],
						node='',
						txt='';

					if(type=='img'){
						(function(){
							data.splice(self.secectindex,1);
							self.prevselectindex=-1;
							self.secectindex=-1;
							var i= 0,
								len=data.length;
							self.index=len - 1;
							for(i;i<len;i++){
								data[i]['id']=i;
							}
							self.htmlShow();
						}());
					}else if(type=='a'||type=='txt'){

						(function(){
							node=type=='a'?self.$article_content.find("a[data-id='"+self.secectindex+"']"):self.$article_content.find("p[data-id='"+self.secectindex+"']");
							txt=node.text();
							if(txt==''){
								data.splice(self.secectindex,1);
								if(self.secectindex!=-1){
									self.index--;
									self.prevselectindex=self.secectindex;
									//处理连续删除时索引不存在情况
									self.secectindex--;
									var i= 0,
										len=data.length;
									for(i;i<len;i++){
										data[i]['id']=i;
									}
								}else{
									self.secectindex=-1;
									self.prevselectindex=-1;
									self.index=-1;
									data.length=0;
									self.$article_content.html('');
								}
							}else{
								data[self.secectindex]['value']=txt;
							}
						}());
					}else if(type=='span'){
						//后期扩展
					}
				}
			}

		},
		/*
		 * 工具栏在标题状态下的状态控制
		 * 参数：$tool：工具栏容器
		 * */
		toolState:function($tool){
			//禁用标题状态或者默认状态下工具栏
			var self=this;

			$tool.each(function(index){
				var $this=$tool.eq(index),
					active=$this.attr('data-active');

				if(self.focuspos==''){
					if(active=='edit'||active=='append'){
						$this.addClass('tool-disabled');
					}
				}else{
					if(active=='edit'||active=='append'){
						$this.removeClass('tool-disabled');
					}
				}
			});

		},
		/*
		 * 工具栏操作步骤状态控制
		 * 参数：$tool：工具栏容器
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
		 * 参数：wrap:html容器，ctype:屏幕旋转状态
		 * */
		toolShow:function(wrap,ctype){
			var $items=wrap.children(),
				step=50,
				selector=wrap.selector,
				items_width=(function(){
					var tempwidth='100%';
					tempwidth=parseInt($items.eq(0).width() * $items.length,10) + 10;
					step=200;
					wrap.css({'min-width':tempwidth});
					return tempwidth;
				}()),
				parent_width=wrap.parent().width();

			if(ctype){
				wrap.css({'left':0});
			}

			if(parent_width<items_width){
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
			}else{
				wrap.off('swipeleft swiperight');
				wrap.css({'left':0});
			}

		},
		/*
		 * 显示数据(显示html)
		 *参数：type:当前操作步骤索引[不必须]
		 * */
		htmlShow:function(type){
			var temphtml=this.dataRender(type);
			$(temphtml.join('')).appendTo(this.$article_content.html(''));
		},
		/*
		 *数据渲染
		 *参数：type:当前操作步骤索引[不必须]
		 * */
		dataRender:function(type){
			var i= 0,
				data=this.stepdata,
				len=type?type:this.index,
				result=[];

			for(i;i<=len;i++){
				var type=data[i]['type'],
					format=data[i]['format'],
					style='',
					classname='',
					temphtml='';
				if(format){
					for(var j in format){
						if(format[j]){
							classname+=this.format_map[j]+' ';
						}
					};
					classname=classname.replace(/\s*$/,'');
				};

				if(type=='txt'){
					style=data[i]['style'];
					style=style.replace(self.trims,'');
					if(classname.replace(self.trims,'')==''){
						if(style==''){
							temphtml='<p data-id="'+data[i]['id']+'" >'+data[i]['value']+'</p>';
						}else{
							temphtml='<p data-id="'+data[i]['id']+'" style="'+style+'" >'+data[i]['value']+'</p>';
						}
					}else{
						if(style==''){
							temphtml='<p class="'+classname+'" data-id="'+data[i]['id']+'" >'+data[i]['value']+'</p>';
						}else{
							temphtml='<p class="'+classname+'" data-id="'+data[i]['id']+'" style="'+style+'" >'+data[i]['value']+'</p>';
						}
					}
					data[i]['html']=temphtml;
				}else if(type=='a'){
					if(classname.replace(self.trims,'')==''){
						temphtml='<a data-id="'+data[i]['id']+'" href="'+data[i]['url']+'" >'+data[i]['value']+'</a>';
					}else{
						temphtml='<a class="'+classname+'" data-id="'+data[i]['id']+'" href="'+data[i]['url']+'" >'+data[i]['value']+'</a>';
					}
					data[i]['html']=temphtml;
				}else if(type=='img'){
					temphtml='<p data-id="'+data[i]['id']+'" ><img data-id="'+data[i]['id']+'" alt="" src="'+data[i]['value']+'" ></p>';
					data[i]['html']=temphtml;
				}
				result.push(temphtml);
			}
			return result;
		},
		/*
		 * 获取键盘高度和渲染事件
		 * 参数：str:获取的软键盘高度，获取的软键盘渲染时间
		 * */
		getKBHeight:function(str,time){
			if(str){
				this.kbheight=parseInt(str,10);
			}else{
				this.kbheight=258;
			}
			if(time){
				this.kbeffect=parseInt(time);
			}else{
				this.kbeffect=50;
			}
		},
		/*
		 *检测软键盘位置
		 *参数：type:调用软键盘时的状态
		 * */
		keyBoardPos:function(type){
			var self=this;
			if(!type||type=='focus'){
				(function(){
					if(self.focuspos==''){
						self.$toolwrap.removeClass('tools-wrap-iosactive').css({
							'top':'auto'
						});
					}else if(self.focuspos=='title'||self.focuspos=='content'){
						var temptop=self.$win.scrollTop();
						if(temptop>=5){
							self.$toolwrap.addClass('tools-wrap-iosactive').css({
								'top':self.winheight - temptop
							});
						}else{
							self.$toolwrap.addClass('tools-wrap-iosactive').css({
								'top':self.winheight - self.kbheight
							});
						}
					}
				}());

			}else if(type=='scroll'){
				(function(){
					if(self.focuspos==''){
						return false;
					}else if(self.focuspos=='title'||self.focuspos=='content'){
						var temptop=self.$win.scrollTop();
						if(temptop>=5){
							self.$toolwrap.addClass('tools-wrap-iosactive').css({
								'top':temptop + self.$win.height() - self.kbheight - 50
							});
						}else{
							self.$toolwrap.addClass('tools-wrap-iosactive').css({
								'top':self.winheight  - self.kbheight - 50
							});
						}
					}
				}());

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
