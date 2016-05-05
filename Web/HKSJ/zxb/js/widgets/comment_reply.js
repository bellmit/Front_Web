/*
author:yipin,
name:comment、reply
发表评论，回复评论插件
*/
define(['jquery','dialog','rule','validform','commonfn'],function ($,undefined,Rule,undefined,CommonFn) {
    return {
				/*
					初始化方法
				*/
				init:function(opt){
						//初始化dom节点引用
						this.$commentcontent=$('#evacontents');
						this.$commentcontent_size=$('#evacontents_size');
						this.$commentcontent_tip=$('#evacontents_tips');
						this.$commentform=$('#comment_form');
						//合并参数
						this.extendParams(opt);
						//初始化相关变量
						this.validobj=null;
						this.commentrule=[{
							ele:this.$commentcontent,
							datatype:"selfcomment",
							nullmsg: "评论内容不能为空",
							errormsg: "评论内容包含非法字符",
							sucmsg: ""
						}];
						this.dia=dialog({
								cancel:false
						});
						this.template={
								//评论html模板1
								comment_1:'<dd data-id="$id">'+
								'<div class="comment-imgwrap">'+
								'		<img src="$url" alt="">'+
								'</div>'+
								'<div class="comment-listitem">'+
								'    <h3>$resId<span>$evaTime</span><em class="reply-btn g-d-hide">回复</em></h3>'+
								'    <p>$evaContents</p>'+
								'    <ul class="reply-listwrap g-d-hide">$replylist</ul>'+
								'    <div class="reply-form g-d-hide">'+
								'		    <textarea name="reply" maxlength="140"></textarea>'+
								'       <span data-id="$id" class="reply-sure">确定</span>'+
								'       <span class="reply-cance">取消</span>'+
								'    </div>'+
								'</div>'+
								'</dd>',
								//评论html模板2
								comment_2:'<dd data-id="$id">'+
								'<div class="comment-imgwrap">'+
								'		<img alt="" src="$url">'+
								'</div>'+
								'<div class="comment-listitem">'+
								'		<h3>$resId'+
								'				<i class="article-number">[$articleNumber篇]</i>'+
								'				<i class="article-icon">人气</i>'+
								'				<em class="comment-icon g-d-hide" data-id="$id"><i></i>$commentNumber</em>'+
								'				<em class="store-icon g-d-hide" data-id="$id"><i></i>$storeNumber</em>'+
								'				<em class="brower-icon g-d-hide" data-id="$id"><i></i>$browerNumber</em>'+
								'		</h3>'+
								'		<p>'+
								'				<span>$aream<sup>2</sup></span>'+
								'				<span>$style</span>'+
								'				<span>$stage</span>'+
								'		</p>'+
								'		<ul class="reply-listwrap">$replylist</ul> '+
								'		<div class="reply-form g-d-hide">'+
								'				<textarea maxlength="500" name="reply"></textarea>'+
								'				<span class="reply-sure" data-id="$id">确定</span>'+
								'				<span class="reply-cance">取消</span>'+
								'		</div>'+
								'</div>'+
								'</dd>',
								//回复html模板1
								reply_1:'<li>$replycontent'+
								'		<i>$createTime</i>'+
								'</li>',
								//回复html模板2
								reply_2:'<li>$diaryContents'+
								'		<div>'+
								'				<span>$diaryAttachmentSize张</span>'+
								'				<img src="$diaryAttachment">'+
								'		</div>'+
								'		<p>$createTime</p>'+
								'</li>'
						}
						
						//事件绑定
						this.bindEvents();
				},
				/*
					添加或者合并参数
				*/
				extendParams:function(opt){
					//合并参数
					$.extend(true,this,opt);
				},
				/*
					事件绑定
				*/
				bindEvents:function(opt){
						var self=this;
						
						//内部表单校验
						this.validobj=this.$commentform.Validform({
								ajaxPost: true,
								datatype:{
									'selfcomment':function(gets,obj,curform,regxp){
											if(CommonFn.isRequire(gets)){
													return '内容不能为空';
											}else if(CommonFn.isInjection(gets)){
													return '内容不能包含特殊字符';
											}else{
													return true;
											}
									}
								},
								beforeSubmit:function(curform) {
									var str=self.$commentcontent.val();
									self.sendComment(opt);
									self.$commentcontent.val('');
									return false;
								},
								tiptype: function(msg,o) { 
									var curtype=o.type;
									if(curtype==1||curtype==3){
											self.$commentcontent_tip.text(msg);
									}else if(curtype==2){
											self.$commentcontent_tip.text('');
									}
								}
						});
						this.validobj.addRule(this.commentrule);
						
						//绑定技术剩余字符
						if(this.comment.charsize>0){
								this.$commentcontent.on('keydown',function(){
										var text=this.value,
										len=text.length;
										this.value=text.toString().slice(0,self.comment.charsize);
										self.$commentcontent_size.text(self.comment.charsize-len);
								});
						}
						
						//绑定回复评论显示隐藏，回复评论,收藏，点赞(to do)
						this.comment.wrap.delegate('em','click',function(e){
									var $this=$(this);
					
									if($this.hasClass('reply-btn')||$this.hasClass('comment-icon')){
										//模板1回复
										$this.closest('div').children('div').toggleClass('g-d-hide');
									}else if($this.hasClass('store-icon')){
										//模板2收藏
										//to do 收藏
										
									}else if($this.hasClass('brower-icon')){
										//模板2浏览数
										//to do
									}else{
										//无操作
										return false;
									}
									
						});
						
						//绑定回复评论
						this.comment.wrap.delegate('span','click',function(e){
										var $this=$(this);
										if($this.hasClass('reply-sure')){
												//提交回复
												var $form=$this.prev(),
														$parent=$this.parent(),
														$list=$parent.prev(),
														text=$form.val(),
														id=$this.attr('data-id');
														
														if(text==''){
															return false;
														}else{
															self.sendReply({
																	id:id,
																	$form:$form,
																	$list:$list,
																	text:text,
																	$parent:$parent
															});
														}										
										}else if($this.hasClass('reply-cance')){
											//关闭或隐藏回复
											var $parent=$this.parent(),
													$list=$parent.children();
													
													$list.eq(0).val('');
													$parent.addClass('g-d-hide');
													return false;
										}else{
											//非回复操作
											return false;
										}
						});
						//绑定回复评论,收藏，点赞(to do)	
				},
				/*
				获取评论(to do)
				*/
				getCommentData:function(){
						var resultset=[],
								self=this;
						$.ajax({
								url:self.comment.geturl,
								type:'get',
								dataType:"json",
								data:self.comment.data,
								async:false,
								success: function(result){
										var i=0,
												listdata=result[self.comment.dataname],
												len=listdata.length;
										if(len!==0){
												if(self.comment.action_template=='1'){
														for(i;i<len;i++){
																var htmlstr=self.getTemplate(self.comment.action_type,self.comment.action_template);
																resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
																.replace('$url',listdata[i]['url'])
																.replace('$resId',listdata[i]['resId'])
																.replace('$evaTime',listdata[i]['evaTime'])
																.replace('$evaContents',listdata[i]['evaContents'])
																.replace('$replylist',(function(){
																		var list=listdata[i]['replylist'];
																		if(list){
																			var j=0,
																					sublen=list.length,
																					sublist=[];
																					if(sublen!=0){
																						for(j;j<sublen;j++){
																							var subhtml=self.getTemplate(self.reply.action_type,self.reply.action_template);
																							sublist.push(subhtml.replace('$replycontent',list[j]['replycontent'])
																							.replace('$createTime',list[j]['createTime']));
																						}
																						return sublist.join('');
																					}else{
																						return '';
																					}
																		}else{
																			return '';
																		}
																}())));
														}		
														$('<dt>相关评论</dt>'+resultset.join('')).appendTo(self.comment.wrap.html(''));
												}else if(self.comment.action_template=='2'){
														for(i;i<len;i++){
																var htmlstr=self.getTemplate(self.comment.action_type,self.comment.action_template);
																resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
																.replace('$url',listdata[i]['url'])
																.replace('$resId',listdata[i]['resId'])
																.replace('$articleNumber',listdata[i]['articleNumber'])
																.replace('$commentNumber',listdata[i]['commentNumber'])
																.replace('$storeNumber',listdata[i]['storeNumber'])
																.replace('$browerNumber',listdata[i]['browerNumber'])
																.replace('$area',listdata[i]['area'])
																.replace('$style',listdata[i]['style'])
																.replace('$stage',listdata[i]['stage'])
																.replace('$replylist',(function(){
																		var list=listdata[i]['replylist'];
																		if(list){
																			var j=0,
																					sublen=list.length,
																					sublist=[];
																					if(sublen!=0){
																						for(j;j<sublen;j++){
																							var subhtml=self.getTemplate(self.reply.action_type,self.reply.action_template);
																							sublist.push(subhtml.replace('$diaryContents',list[j]['diaryContents'])
																							.replace('$diaryAttachmentSize',(function(){
																									var img=list[j]['diaryAttachmentSize'];
																									return img?img.length:0;
																							}()))
																							.replace('$diaryAttachment',list[j]['diaryAttachment'])
																							.replace('$createTime',list[j]['createTime']));
																						}
																						return sublist.join('');
																					}else{
																						return '';
																					}
																		}else{
																			return '';
																		}
																}())));
														}		
														$(resultset.join('')).appendTo(self.comment.wrap.html(''));
												}
										}else{
											if(self.comment.action_template=='1'){
													$('<dt>相关评论</dt>').appendTo(self.comment.wrap.html(''));
											}
										}
								},
								error:function(){
									if(self.comment.action_template=='1'){
											$('<dt>相关评论</dt>').appendTo(self.comment.wrap.html(''));
									}
								}
						});
				},
				/*
				发表评论(to do)
				*/
				sendComment:function(){
						var self=this,
						text=self.$commentcontent.val();
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:self.comment.sendurl,
								type:'post',
								dataType:"json",
								data:'evaContents='+text,
								success: function(data){
									//to do
									//如果是需要实时数据则开启下面行注释
									//self.getCommentData();
									
									//下面为测试代码，开发阶段可注释
									var htmlstr=self.getTemplate(self.comment.action_type,self.comment.action_template);
									if(self.comment.action_template=='1'){
											htmlstr=htmlstr.replace(/\$id/g,parseInt(Math.random()*100))
											.replace('$url','../../images/designer.jpg')
											.replace('$resId','呵呵！这是测试发表评论')
											.replace('$evaTime',parseInt(Math.random()*10)+'个小时')
											.replace('$evaContents',text)
											.replace('$replylist','');	
											$(htmlstr).insertAfter(self.comment.wrap.find('dt'));
									}else if(self.comment.action_template=='2'){
										
											htmlstr=htmlstr.replace(/\$id/g,parseInt(Math.random()*100))
											.replace('$url','../../images/designer.jpg')
											.replace('$resId','呵呵！这是测试发表评论')
											.replace('$articleNumber',parseInt(Math.random()*1000))
											.replace('$commentNumber',parseInt(Math.random()*1000))
											.replace('$storeNumber',parseInt(Math.random()*1000))
											.replace('$browerNumber',parseInt(Math.random()*1000))
											.replace('$area','180')
											.replace('$style','简约')
											.replace('$stage','装修中')
											.replace('$replylist','');	
											$(htmlstr).prependTo(self.comment.wrap);
									}
									self.dia.content('<span class="g-c-green1">评论成功</span>').show();
												
								},
								error: function(){
										self.dia.content('<span class="g-c-red4">评论失败</span>').show();
										
								}
						});
						setTimeout(function(){
							self.dia.close();
						},3000);
				},
				/*
				回复评论(to do)
				*/
				sendReply:function(){
						var self=this;
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码 回复评论ajax
						return false;
						$.ajax({
								url:self.reply.sendurl,
								type:'post',
								dataType:"json",
								data:'id='+id+'text='+text,
								async:true,
								success: function(data){
										if(data){									
												
										}else{
												
										}
								},
								error: function(){
										
								}
						});
				},
				/*
					模板方法
					参数：action_type:分为‘comment(评论)’，‘reply(回复)’两种类型
					action_template:获取评论或者回复的模板类型
				*/
				getTemplate:function(action_type,action_template){
						return this.template[action_type+'_'+action_template];
				},
				//是否支持本地存储
				supportStorage:(function(){
						return window.sessionStorage?true:false;
				}()),
				/*
					设置内部参数：设置请求参数到cookie或者Stroage
					参数说明：key索引，value请求字符串
				*/
				setParams:function(key,value){
					if(this.supportStorage){
							window.sessionStorage[key]=value;
					}else{
						if($.cookie(key)){
							$.removeCookie(key);
						}
						$.cookie(key,value);
					}
				},
				/*
					获取内部参数：从cookie或者Stroage中获取请求参数
					参数说明：key索引
					返回获取的字符串值
				*/
				getParams:function(key){
					if(this.supportStorage){
								return window.sessionStorage[key]?window.sessionStorage[key]:'';
					}else{
						if(typeof $.cookie==='function'){
								return $.cookie(key)?$.cookie(key):'';
						}
					}
					return '';
				}
		};
});