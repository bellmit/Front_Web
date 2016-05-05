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


				//测试当前设备是pc还是手机
				if(/(android|Android)/i.test(navigator.userAgent)) {
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

				//标签容器
				this.$labelitems=this.$editor_label.children();
				this.$labelwrap=this.$editor_label.parent();

				//选中的标签
				this.selecttag={};

				//公开的权限
				this.selectvisible=0;

				//权限不同icon类名
				this.classicon={
					0:'tool-visible-all',
					1:'tool-visible-about',
					9:'tool-visible-self'
				}

				//当前操作状态步骤索引
				this.index=-1;
				//选中子菜单索引
				this.secectindex=-1;
				this.prevselectindex=-1;

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
									self.keystate='delete';
									//检测编辑状态
									self.editStatus();
								}else if(code==13){
									e.preventDefault();
									//换行操作
									self.keystate='edit';
									if(wrap=='content'){
										self.setStepData('enter');
										//修正换行操作时光标定位错误问题
										self.correctCursorPos();
									}
									return false;
								}else{
									self.keystate='edit';
								}
								break;
							//监听失去焦点事件
							case "focusout":
								self.focuspos='';
								self.toolState(self.$toolitem);
								if(wrap=='content'){
									self.setStepData('out');
								}
								break;

							//监听获取焦点事件
							case "focusin":
								self.focuspos=wrap;
								self.toolState(self.$toolitem);
								if(wrap=='content'&&self.index==-1){
									self.setStepData('in');
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
						case "link":
							//标题时禁用
							if(active=="append"&&self.focuspos=='title'){
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


							}());

							break;

						case "image":
							//标题时禁用
							if(active=="append"&&self.focuspos=='title'){
								return false;
							}
							//上传图片
							if(MyJsBridge.UploadImage&&typeof MyJsBridge.UploadImage==='function'){

								MyJsBridge.UploadImage();
							}
							break;

						case "label":
							//文章标签
							setTimeout(function(){
								self.$labelwrap.addClass('editor-label-wrapshow');
							},200);
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

				//编辑器事件绑定
				this.$article_content.on($.EventName.click,function(e){
					var current=e.target,
						$this=$(current),
						index=$this.attr('data-id');

					if(index&&index!=-1){
						self.prevselectindex=self.secectindex;
						self.secectindex=index;

						//android绑定图片删除
						var node=current.nodeName.toLowerCase(),
							type;
						if(node=='img'){
							$this=$this.parent();
							type=$this.hasClass('af-imgwrap');
							if(type){
								$this.hasClass('af-imgstate-delete')?$this.removeClass('af-imgstate-delete'):$this.addClass('af-imgstate-delete');
							}
						}else if(node=='p'){
							type=$this.hasClass('af-imgwrap');
							if(type){
								$this.hasClass('af-imgstate-delete')?$this.removeClass('af-imgstate-delete'):$this.addClass('af-imgstate-delete');
							}else{
								//如果是编辑状态
								//执行一次编辑完成操作且是步骤编码比较操作
								self.setStepData('out','prevflag');
							}
						}else if(node=='span'){
							$this=$this.parent();
							type=$this.hasClass('af-imgwrap');
							//执行删除操作
							if(type&&$this.hasClass('af-imgstate-delete')){
								self.editStatus('delete');
							}
						}else if(self.stepdata[self.secectindex]['type']=='txt'){
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


				//绑定标签显示隐藏,绑定标签加载更多
				this.$labelwrap.on($.EventName.click,function(e){
					var current= e.target,
						node=current.nodeName.toLowerCase();

					if(node=='ul'||node=='section'){
						self.$labelwrap.removeClass('editor-label-wrapshow');
					}else if(node=='li'){
						var $this=$(current),
							tag=$this.attr('data-tag');

						if($this.hasClass('editor-tag-active')){
							$this.removeClass('editor-tag-active');
							if(self.selecttag[tag]){
								delete self.selecttag[tag];
							}
						}else{
							(function(){
								var temparr=[];
								for(var i in self.selecttag){
									temparr.push(self.selecttag[i]);
								}
								//超过三个数据
								if(temparr.length>=3){
									self.tip.content('<span class="g-c-warn">最多只能选中 3 个标签</span>').show();
									setTimeout(function(){
										self.tip.close();
									},2000);

								}else{
									//少于3个数据
									$this.addClass('editor-tag-active');
									self.selecttag[tag]=tag;
								}
							}());

						}
					}else if(node=='div'){
						self.loadtag.currentPage++;
						self.loadTag();
					}

				});


				//绑定控制可见权限
				this.$editor_visible.on($.EventName.click,'li',function(e){
					var $this=$(this),
						visible=$this.attr('data-visible'),
						txt=$this.text(),
						$wrap=self.$toolitem.last();

					$this.addClass('visible-active').siblings().removeClass('visible-active');
					$wrap.removeClass(self.classicon[self.selectvisible]).addClass(self.classicon[visible]).html(txt);
					self.selectvisible=visible;
					self.$editor_visible.hide();
				});

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
				if(self.isRequire(self.$article_title)){
					self.tip.content('<span class="g-c-err">请输入标题</span>').show();
					setTimeout(function(){
						self.tip.close();
						self.$article_title.focusin();
					},2000);
					return false;
				}else if(self.isRequire(self.$article_content)){
					self.tip.content('<span class="g-c-err">请输入正文</span>').show();
					setTimeout(function(){
						self.tip.close();
						self.$article_content.focusin();
					},2000);
					return false;
				}else{
					//触发失去焦点
					if(this.focuspos=='title'){
						this.$article_title.focusout();
					}else if(this.focuspos=='content'){
						this.$article_content.focusout();
					}
					result=self.getStepData();
					if(result['tag']==''){
						self.tip.content('<span class="g-c-err">请选择标签</span>').show();
						setTimeout(function(){
							self.tip.close();
							self.$labelwrap.addClass('editor-label-wrapshow');
						},2000);
						return false;
					}else{
						return result;
					}
				}
			},
			/*
			 * 取消发布提交
			 * */
			cancelPublish:function(){
				var result=JSON.stringify(this.getStepData());
				//保存到草稿箱
				MyJsBridge.OnCancel(result);
			},
			/*
			 * 获取草稿箱数据
			 * 参数：obj:从草稿箱获取的数据
			 * */
			getFromDraft:function(obj){
				var self=this;
				if(obj!==undefined){
					(function(){
						var content=obj['content'],
							len=content.length,
							auth=obj['auth'],
							tag=obj['tag'],
							title=obj['title'];

						//反向解析标签并生成对应html标签
						if(len!==0){
							for(var i= 0;i<len;i++){
								self.resolveHtml(content[i],i);
							};
						}

						//反向解析标题
						if(title!==''||title!==undefined){
							self.$article_title.text(title);
						}

						//反向解析权限
						if(auth!==''||auth!==undefined){
							self.resolveAuth(auth);
						}

						//反向解析标签
						if(tag!==''||tag!==undefined){
							//此处需要做延时操作，因为初始化方法在标签调用之前执行，需要把反向解析标签添加到队列的末尾,这样就保证先查询标签，然后解析标签，否则解析标签会没有内容可解析.同时可能由于异步请求的结果还没有返回
							setTimeout(function(){
								self.resolveTag(tag);
							},50);
						}
					}());
				}
			},
			/*
			 *反向解析字符串为标签
			 *参数：str:需要解析的字符串,id为当前历史记录值或对应操作步骤id
			 * */
			resolveHtml:function(str,id){
				var self=this,
					len=str.length;
				if(str===''||str===undefined){
					return false;
				}
				if ( str.charAt(0) === "<" && str.charAt(len - 1 ) === ">" && len >= 3 ) {
					//如果是标签
					if(this.tagstr.test(str)){
						(function(){
							var $temphtml=$(str),
								tempid=$temphtml.attr('data-id'),
								tempobj={},
								$tempchild=$temphtml.children(),
								sublen=$tempchild.length;

							//修正id值
							if(tempid!==undefined||typeof tempid!=='undefined'||tempid!==null){
								if(tempid!==id&&id!==undefined){
									//纠正步骤ID值与数据库id值不一致情况
									tempid=id;
								}
							}else if(tempid===undefined||typeof tempid==='undefined'||tempid===null){
								if(id!==undefined){
									//纠正步骤ID值与数据库id值不一致情况
									tempid=id;
								}
							}
							//开始数据解析
							//赋值容器标签并设置操作步骤id
							$temphtml.attr('data-id',tempid);
							self.index=tempid;
							tempobj['id']=tempid;
							//设置当前样式
							tempobj['style']=(function(){
								var css=$temphtml.attr('style');
								if(css!==undefined&&css!==''){
									return css;
								}else{
									return '';
								}
							}());
							//设置结构
							tempobj['html']='';

							//数据过滤
							if(sublen!==0){
								//存在子元素
								(function(){
									var $img=$temphtml.find('img'),
										$a=$temphtml.find('a');

									if($img.length!==0){
										$img.attr('data-id',tempid);
										if(self.isMobile){
											$('<span data-id="'+tempid+'"></span>').insertBefore($img);
											$temphtml.addClass("af-imgwrap");

										}
										//设置历史记录
										tempobj['value']=$img.attr('src');
										tempobj['type']='img';
									}else if($a.length!==0){
										//过滤标签
										$a.each(function(){
											//修正索引
											$(this).attr('data-id',tempid);
										});
										tempobj['value']=$temphtml.html();
										tempobj['type']='txt';
									}else{
										if(  str.charAt(1) === "p" && str.charAt(len - 2 ) === "p"){
											tempobj['value']=$temphtml.html();
											tempobj['type']='txt';
										}else{
											tempobj['value']=$temphtml.html();
											tempobj['type']='txt';
										}
									}
									self.stepdata[self.index]=tempobj;
									//将值放入编辑器中
									$temphtml.appendTo(self.$article_content);
								}());
							}else{
								if( str.charAt(1) === "a" && str.charAt(len - 2 ) === "a"){
									tempobj['value']=$temphtml.text();
									tempobj['type']='a';
								}else if(  str.charAt(1) === "p" && str.charAt(len - 2 ) === "p"){
									tempobj['value']=$temphtml.html();
									tempobj['type']='txt';
								}else{
									tempobj['value']=$temphtml.html();
									tempobj['type']='txt';
								}
								//设置历史记录
								self.stepdata[self.index]=tempobj;
								//将值放入编辑器中
								$temphtml.appendTo(self.$article_content);
							}

						}());
					}
				}else{
					//如果不是标签
					(function(){
						var childtag=self.tagstr.exec(str),
							$temphtml,
							tempobj={};


						//开始数据解析
						//赋值容器标签并设置操作步骤id
						self.index=id;
						tempobj['id']=id;
						//设置当前样式
						tempobj['style']='';
						//设置结构
						tempobj['html']='';

						//构造父子标签
						if(childtag!==null){
							$temphtml=$("<p data-id="+id+">"+str+"</p>");
							$(childtag[1]).attr('data-id',id);
							/*此处有有疑问*/
							tempobj['type']='txt';
						}else if(/(\.{1,})(jpg|jpeg|png|gif)/.test(str)){
							if(self.isMobile){
								$temphtml=$("<p class='af-imgwrap' data-id='"+id+"'><span data-id='"+id+"'></span><img alt='' src='"+str+"' data-id='"+id+"'></p>");
							}else{
								$temphtml=$("<p data-id='"+id+"'><img alt='' src='"+str+"' data-id='"+id+"'></p>");
							}
							tempobj['type']='img';
						}else{
							$temphtml=$("<p data-id="+id+">"+str+"</p>");
							tempobj['type']='txt';
						}
						tempobj['value']=str;
						//设置历史记录
						self.stepdata[self.index]=tempobj;

						//将值放入编辑器中
						$temphtml.appendTo(self.$article_content);

					}());
				}
			},
			/*
			 * 反向解析权限:通过已经选中的标签名，高亮显示标签并初始化内部数据
			 * 参数:str:选择的权限
			 *
			 * */
			resolveAuth:function(str){
				var self=this,
					$wrap=self.$toolitem.last();
				if(str!==undefined){
					str=parseInt(str,10);
					if(str===0||str===1||str===9){
						this.$editor_visible.children().each(function(){
							var $this=$(this),
								visible=parseInt($this.attr('data-visible'),10);

							if(str===visible){
								$this.addClass('visible-active').siblings().removeClass('visible-active');
								self.selectvisible=visible;
								$wrap.removeClass(self.classicon[visible]).addClass(self.classicon[visible]).html($this.text());
								return false;
							}
						});
					}
				}
			},
			/*
			 * 反向解析标签:通过已经选中的标签名，高亮显示标签并初始化内部数据
			 * 参数:str:选中的标签字符串
			 *
			 * */
			resolveTag:function(str){
				if(str!==''&&str!==undefined&&str!==null){
					var self=this,
						tagsel=str.indexOf(',')!==-1?str.split(','):[str],
						len=tagsel.length,
						$label=this.$editor_label.children();


					if(len>3){
						//防止存入数数据出现超过3个以上的情况，如果超过则截取
						tagsel.length=3;
						len=3;
					}


					for(var i= 0;i<len;i++){
						//遍历高亮显示
						$label.each(function(){
							var $this=$(this),
								tag=$this.attr('data-tag');

							if(tag===tagsel[i]){
								$this.addClass('editor-tag-active');
								//设置选中值
								self.selecttag[tag]=tag;
								return false;
							}
						});
					}

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


			},
			/*
			 * 加载标签
			 * 参数：opt:请求的配置参数
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
						pageNum:self.loadtag.currentPage
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
				result['tag']=tagstr.join(',')||'';
				result['auth']=this.selectvisible;
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
								tempstep['style']='';
								tempstep['id']=0;
								tempstep['value']=txt;
								tempstep['type']='txt';
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
									haschild=tempnode.children().length;
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

				if(self.keystate=='delete'&&code==undefined){
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
				}else if(code!=undefined){
					if(self.secectindex==-1&&self.stepdata.length==0){
						self.prevselectindex=-1;
						self.index=-1;
						self.$article_content.html('');
					}else if(self.secectindex!=-1){

						var data=self.stepdata,
							type=data[self.secectindex]['type'];

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

					if(self.focuspos=='title'){
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
					result=[]
					;

				for(i;i<=len;i++){
					var type=data[i]['type'],
						temphtml='',
						style='';

					if(type=='txt'){
						style=data[i]['style'];
						style=style.replace(self.trims,'');

						if(style==''){
							temphtml='<p data-id="'+data[i]['id']+'" >'+data[i]['value']+'</p>';
						}else{
							temphtml='<p data-id="'+data[i]['id']+'" style="'+style+'" >'+data[i]['value']+'</p>';
						}
						data[i]['html']=temphtml;
					}else if(type=='a'){
						temphtml='<a data-id="'+data[i]['id']+'" href="'+data[i]['url']+'" >'+data[i]['value']+'</a>';
						data[i]['html']=temphtml;
					}else if(type=='img'){
						if(this.isMobile){
							temphtml='<p class="af-imgwrap" data-id="'+data[i]['id']+'" ><span data-id="'+data[i]['id']+'"></span><img data-id="'+data[i]['id']+'" alt="" src="'+data[i]['value']+'" ></p>';
						}else{
							temphtml='<p data-id="'+data[i]['id']+'" ><img data-id="'+data[i]['id']+'" alt="" src="'+data[i]['value']+'" ></p>';
						}
						data[i]['html']=temphtml;
					}
					result.push(temphtml);
				}
				return result;
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
