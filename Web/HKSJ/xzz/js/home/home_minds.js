/*
* 长文--首页
* */
/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		/*类库依赖模块*/
		'jquery':'lib/jquery/jquery-2.1.4.min',
		/*分享模块*/
		'share':'plugins/share',
		/*弹出框模块*/
		'dialog':'lib/artDialog/dialog',
		/*菜单模块*/
		'menu':'widgets/menu',
		/*搜索模块*/
		'search':'widgets/serach',
		/*文章详细解析模块*/
		'resolve':'widgets/resolveHtml',
		/*正则表达式规则模块*/
		'rule':'widgets/rules',
		/*html5图片上传*/
		'upload':'widgets/fileupload'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','share','dialog','menu','search','resolve','rule','upload'],function($,undefined,undefined,Menu,undefined,Resolve,Rule,Upload) {
	$(function(){

		//dom对象引用
		/*侧边栏菜单导航上部*/
		var $main_menu=$('#main_menu'),
		/*侧边栏菜单导航下部*/
			$sub_menu=$('#sub_menu'),
		/*主显示区用户菜单导航*/
			$main_menu_wrap=$('#main_menu_wrap'),
		/*显示标签*/
			$tag_panel_show=$('#tag_panel_show'),
		/*列表数据*/
			$side_list_show=$('#side_list_show'),
		/*搜索字符*/
			$main_serach_text=$('#main_serach_text'),
		/*清空搜索字符*/
			$main_serach_empty=$('#main_serach_empty'),
		/*登录注册*/
			$main_menu_action=$('#main_menu_action'),
			$main_menu_show=$('#main_menu_show'),
		/*关注*/
			$main_attention_btn=$('#main_attention_btn'),
		/*发表随记显示隐藏按钮*/
			$main_sendminds_toggle=$('#main_sendminds_toggle'),
		/*发表随记显示隐藏面板*/
			$main_send_minds=$('#main_send_minds'),
		/*发表随记文本*/
			$send_minds_text=$('#send_minds_text'),
		/*发表随记提交按钮*/
			$minds_btn=$('#minds_btn'),
		/*发表随记表情选择*/
			$minds_emoji=$('#minds_emoji'),
		/*发表随记图片预览*/
			$minds_image_show=$('#minds_image_show'),
			/*发表随记图片上传按钮*/
			$minds_image_btn=$('#minds_image_btn'),
		/*文章详情*/
			$article_show=$('#article_show'),
		/*文章广告*/
			$article_ad_wrap=$('#article_ad_wrap'),
		/*文章点赞（喜欢）*/
			$article_praises=$('#article_praises'),
		/*文章分享*/
			$article_share=$('#article_share'),
		/*相关链接*/
			$article_links=$('#article_links'),
		/*评论条数*/
			$article_comment_num=$('#article_comment_num'),
		/*评论输入文本框*/
			$article_comment_text=$('#article_comment_text'),
		/*发表评论按钮*/
			$article_comment_btn=$('#article_comment_btn'),
		/*发表评论表情选择*/
			$article_emoji=$('#article_emoji'),
		/*评论列表*/
			$article_comment_list=$('#article_comment_list'),
		/*加载更多评论*/
			$comment_load_more=$('#comment_load_more');



		//提示对象
		var dia=dialog();

		//查询对象
		/* 列表查询条件对象 */
		var queryObj={
				"type":"2",
				"tag":"new",
				"url":"../../json/home_list_minds.json"
			},
		/*文章查询条件对象 */
		articleObj={
			"type":"1",
			"id":null,
			"tag":"new",
			"detail_url":"../../json/home_article.json",//查询文章详情地址
			"comment_url":"../../json/home_comment.json",//查询评论地址
			"reply_url":"../../json/home_reply_comment.json",//回复评论地址
			"send_url":"../../json/home_reply_comment.json"//发表评论地址
		},
		/*文章详情显示容器对象*/
		detailObj={
			'article':$article_show,
			'ad':$article_ad_wrap,
			'praises':$article_praises,
			'share':$article_share,
			'links':$article_links,
			'praises_class':"article-praisesactive",
			'attention':$main_attention_btn,
			'comment_num':$article_comment_num,
			'comment_wrap':$article_comment_list,
			'comment_more':$comment_load_more,
			total:0,//分页总记录数
			currentPage:1,//当前页
			pageNum:5//每页多少条记录
		};
				

		//初始化查询
		(function(){
			//菜单高亮
			Menu.menuLight($main_menu,'menuactive');
			Menu.menuLight($sub_menu,'menuactive');
			Menu.menuLight($main_menu_wrap,'menuactive');


			//绑定初始化查询登录信息 /* to do */
			var account_random=parseInt(Math.random() * 10,10);
			if(account_random%2===0){
				//登录
				$main_menu_action.addClass('g-d-hidei');
				$main_menu_show.removeClass('g-d-hidei');
			}else{
				//未登录
				$main_menu_action.removeClass('g-d-hidei');
				$main_menu_show.addClass('g-d-hidei');
			}


			//查询不同类型ajax
			queryList(queryObj,$side_list_show);


			//绑定搜索查询 /* to do */
			$main_serach_text.searchInit({
				'btn':$main_serach_empty,
				'btnclass':'search-close',
				'tips':dia,
				'fn':function(str){
					//发送ajax 搜索
					console.log('开始搜索，搜索关键词为：'+str);
				}
			});


		}());

		//绑定标签点击查询 /* to do */
		$tag_panel_show.on('click','li',function(){
			var $this=$(this),
				tag=$this.attr('data-tag');

			//防止重复查询
			if($this.hasClass('tag-menu-active')){
				return false;
			}


			//改变查询条件
			queryObj['tag']=tag;
			articleObj['tag']=tag;
			//查询不同类型ajax
			queryList(queryObj,$side_list_show);

			$this.addClass('tag-menu-active').siblings().removeClass('tag-menu-active');
		});


		//绑定长文列表查看文章详情 /* to do */
		$side_list_show.on('click','li',function(){
			var $this=$(this),
				id=$this.attr('data-id');

				//改变查询条件
				articleObj['id']=id;
				//查询详情
				queryArticle(articleObj,detailObj);
		});


		//绑定关注和取消关注 /* to do */
		$main_attention_btn.on('click','p',function(){
			var $this=$(this);
			if($this.hasClass('main-about-already')){
				//取消关注
				//to do send ajax
				$this.removeClass('main-about-already');
			}else{
				//关注
				//to do send ajax
				$this.addClass('main-about-already');
			}

		});


		//切换显示隐藏发表随记面板/* to do */
		$main_sendminds_toggle.on('click',function(){
			var $this=$(this);
			if($this.hasClass('main-sendminds-toggleactive')){
				//隐藏
				$this.removeClass('main-sendminds-toggleactive');
				$main_send_minds.addClass('g-d-hidei');
			}else{
				//显示
				$this.addClass('main-sendminds-toggleactive');
				$main_send_minds.removeClass('g-d-hidei');
			}
		});


		//绑定发表随记/* to do */
		$minds_btn.on('click',function(){
			var content=$send_minds_text.html(),
				tempcontent=content.replace(Rule.editspace,'');

			if(content==''||tempcontent==''||Rule.allspace.test(tempcontent)||Rule.brmoz.test(tempcontent)||Rule.brwebkit.test(tempcontent)){
				$send_minds_text.html('');
				dia.content('<span class="g-btips-warn g-c-warn">发表随记不能为空</span>').show();
				setTimeout(function(){
					dia.close();
				},2000);
				return false;
			}else{
				//to do
				//发送随记交互ajax
				sendMinds();
				/*queryArticle(articleObj,detailObj)*/;
				//清空内容
				$send_minds_text.html('');
			}
		});


		//初始化发表随记上传图片/* to do */
		Upload.fileUpload({
			dia:dia,
			$input:$minds_image_btn,
			tiptime:2000,
			type:'png|jpg|jpeg|gif',
			size:500
		},function(reader){

			console.log(reader.result);

		});


		//绑定喜欢（点赞）/* to do */
		$article_praises.on('click',function(){
			var $this=$(this),
				$wrap=$this.find('span'),
				num=parseInt($wrap.text(),10)|| 0,
				tempnum=0;

			if($this.hasClass('article-praisesactive')){
				//取消点赞
				$this.removeClass('article-praisesactive');
				tempnum=num - 1;
				$wrap.text(tempnum);
				//to do
				//send ajax; 开发阶段调用取消点赞接口
			}else{
				//点赞
				if(num!==''||!isNaN(num)){
					$this.addClass('article-praisesactive');
					tempnum=num + 1;
					$wrap.text(tempnum);
					//to do
					//send ajax; 开发阶段调用点赞接口
				}
			}
		});


		//绑定发表评论/* to do */
		$article_comment_btn.on('click',function(){
			var content=$article_comment_text.html(),
				tempcontent=content.replace(Rule.editspace,'');

			if(content==''||tempcontent==''||Rule.allspace.test(tempcontent)||Rule.brmoz.test(tempcontent)||Rule.brwebkit.test(tempcontent)){
				$article_comment_text.html('');
				dia.content('<span class="g-btips-warn g-c-warn">发表评论不能为空</span>').show();
				setTimeout(function(){
					dia.close();
				},2000);
				return false;
			}else{
				//to do
				//发送评论交互ajax
				sendComment(articleObj,detailObj,{
					'content':content
				});
				//清空内容
				$article_comment_text.html('');
			}
		});


		//绑定评论框相关事件
		//绑定选择表情/* to do */
		$article_emoji.on('click','img',function(){
			$(this).clone().appendTo($article_comment_text);
		});



		//绑定回复评论,切换回复评论，点赞
		$article_comment_list.on('click keydown',function(e){
			var current= e.target,
				etype= e.type,
				$this,
				nname=current.nodeName.toLowerCase();

			if(etype=='click'){
				if(nname=='em'){
					//切换回复输入域显示与隐藏
					$this=$(current);
					var $textarea=$this.closest('div').next('p');
					if($textarea.hasClass('g-d-hidei')){
						//显示回复
						$textarea.removeClass('g-d-hidei');
					}else{
						//隐藏回复
						$textarea.addClass('g-d-hidei');
					}
				}else if('span'){
					//点赞
					$this=$(current);
					//判断是点赞按钮
					if($this.hasClass('praises')){
						//点赞或取消点赞
						commentPraises($this);
					}
				}
			}else if(etype=='keydown'){
				var keycode= e.keyCode,
					value='';
				if(e.ctrlKey && keycode == 13 && nname=='textarea'){
					//回复操作
					$this=$(current);
					value=$this.val();
					if(value==''||Rule.allspace.test(value)){
						dia.content('<span class="g-btips-warn g-c-warn">回复评论不能为空</span>').show();
						setTimeout(function(){
							dia.close();
						},2000);
						return false;
					}else{
						//to do
						//回复评论
						replyComment(articleObj,detailObj,{
							"textarea":$this,
							"content":value
						});
					}
				}
			}

		});


		//绑定加载更多记录
		$comment_load_more.on('click',function(){
			var $this=$(this);
			if($this.hasClass('comment-more-disabled')){
				//已经是最后页
				return ;
			}else{
				//查询下一页记录
				queryComment(articleObj,detailObj);
			}
		});


		//查询文章,随记，话题 列表 /* to do */
		function queryList(params,wraps){
			$.ajax({
				url:params['url'],
				type:'post',
				dataType:"json",
				data:{
					"type":params['type'],
					"tag":params['tag']
				},
				success: function(data){
					var list=data['list'],
						len=list.length,
						str='';
					if(len!==0){
						//注意正式环境下去掉下面的随机函数
						var i= parseInt(Math.random() * 10,10),
							j=0;
						if(i>=len){
							i=0;
						}
						for(i;i<len;i++){
							if(j==0){
								//设置默认查询文章id号
								articleObj['id']=list[i]['id'];
								//查询详情 /* to do */
								if(articleObj['id']!=null){
									queryArticle(articleObj,detailObj);
								}
							}
							str+='<li data-id="'+list[i]['id']+'">' +
								'<p>'+list[i]['nickname']+'<span>'+list[i]['create_time']+'</span></p>' +
								'<h3>'+list[i]['title']+'</h3>' +
								(function(){
									var imglist=list[i]['url'],
										sublen=imglist.length,
										substr='<div class="mind-img">';
									if(sublen!=0){
										sublen=sublen>3?3:sublen;
										for(var k=0;k<sublen;k++){
											substr+='<img alt="" src="'+imglist[k]+'">';
										};
										substr+='</div>';
										return substr;
									}
									return '';
								}())+
								'<div class="mind-action"><span>'+list[i]['read_sum']+'</span><span>'+list[i]['comment_sum']+'</span><span>'+list[i]['praises_sum']+'</span></div>' +
								'</li>';
							j++;
						}
						wraps.html(str);
					}
				},
				error: function(){
					throw "no article or mind or topic data";
				}
			});
		}


		//查询评论/* to do */
		function queryComment(params,wrap){
			var id=params['id'];
			$.ajax({
				url:params['comment_url'],
				type:'post',
				dataType:"json",
				async:false,
				data:{
					"type":params['type'],
					"tag":params['tag'],
					"id":id,
					"pageNum":wrap['pageNum'],
					"currentPage":wrap['currentPage']
				},
				success: function(data){
					var comment=data['comment'],
						len=comment.length;
					if(len!==0){
						for(var i=0;i<len;i++){
							var datalist=comment[i],
								tempid=datalist['id'];
							if(parseInt(tempid,10)===parseInt(id,10)&&tempid!==undefined){
								//设置评论记录数,分页总记录数,加载更多评论按钮
								var num=datalist['comment_sum'];
								wrap['comment_num'].html(num);
								wrap['total']=num;
								wrap['comment_more'].attr('data-total',num);

								var list=datalist['comment_list'],
									j= 0,
									sublen=list.length,
									str='';
									if(sublen!==0){
										//设置分页记录数
										if(num<=parseInt(wrap['pageNum'],10)){
											//赋值
											wrap['comment_more'].attr('data-count',num).addClass('comment-more-disabled');
										}else{
											//限制数据临界
											var count=parseInt(wrap['comment_more'].attr('data-count'),10),
												tempcount=count + sublen;
											if(tempcount>num){
												count=num;
												sublen=num - count;
												//赋值
												wrap['comment_more'].attr('data-count',count).addClass('comment-more-disabled');
											}else{
												count=tempcount;
												//赋值
												wrap['comment_more'].attr('data-count',count).removeClass('comment-more-disabled');
											}
										}

										for(j;j<sublen;j++){
											var item=list[j],
												reply=item['reply'];

										//解析评论主题
										str+='<dt data-id="'+i+'">'+
												'<div class="comment-list-info">'+
													'<div><img alt="" src="'+item['head_url']+'" ></div>'+
													'<p>'+item['nickname']+'</p>'+
													'<p>'+item['create_time']+'</p>'+
												'</div>'+
												'<div class="comment-list-detail">'+item['content']+'</div>'+
												'<div class="comment-list-action">'+
													'<div><span data-id="'+i+'" class="'+(function(){
														var status=parseInt(item['status'],10);
														if(isNaN(status)){
															return '';
														}
														if(status==1){
															return "praises g-c-red1";
														}else if(status==0){
															return "praises";
														}
												}())+'">'+item['praises_sum']+'</span><em>回复</em></div>'+
													'<p class="g-d-hidei"><textarea class="article-comment-text" placeholder="说说你看法"></textarea></p>'+
												'</div>'+
											 '</dt>';


											//解析评论回复
											var replylen=reply.length,
												m=0;
											if(replylen!==0){
												str+='<dd>';
												for(m;m<replylen;m++){
													var reply_item=reply[m];

													str+='<div class="comment-list-reply">'+
														    '<p>'+reply_item['from']+':@'+reply_item['to']+'<span>'+reply_item['content']+'</span></p>'+
															'<p>'+reply_item['create_time']+'</p>'+
													      '</div>';
												}
												str+='</dd>';
											}
										}

										//处理评论列表信息
										$(str).appendTo(wrap['comment_wrap']);
									}
								break;
							}
						}
					}
				},
				error: function(){
					throw "no article or mind or topic comment data";
				}
			});
		}


		//查询文章，随记，话题 详情 /* to do */
		function queryArticle(params,wrap){
			var id=params['id'];
			//查询文章详情
			$.ajax({
				url:params['detail_url'],
				type:'post',
				dataType:"json",
				async:false,
				data:{
					"type":params['type'],
					"tag":params['tag'],
					"id":id
				},
				success: function(data){
					var article=data['article'],
						len=article.length;
					if(len!==0){
						//注意正式环境下去掉下面测试函数
						for(var i= 0;i<len;i++){
							var tempid=article[i]['id'];
							if(parseInt(tempid,10)===parseInt(id,10)&&tempid!==undefined){
								Resolve.getFromTemplate(article[i],wrap);
								return true;
							}
						}
					}
				},
				error: function(){
					throw "no article or mind or topic detail data";
				}
			});


			//清空评论列表数据
			wrap['comment_wrap'].html('');
			wrap['comment_num'].html('');

			//重置分页对象
			wrap['total']=0;
			wrap['currentPage']=1;

			//重置加载更多评论按钮
			wrap['comment_more'].attr('data-total',0).attr('data-count',0);

			//查询文章评论
			queryComment(params,wrap);
		}


		//发表随记
		function sendMinds(){


		}


		//回复评论/* to do */
		function replyComment(params,wrap,obj){
			var reply_content=obj['content'],
				$textarea=obj['textarea'],
				$dt=$textarea.closest('dt'),
				from='用户登录名称',
				to=$dt.children().eq(0).find('p').eq(0).html();

			//发送回复请求
			$.ajax({
				url:params['reply_url'],
				type:'post',
				dataType:"json",
				async:false,
				data:{
					"type":0,
					"tag":params['tag'],
					"article_id":params['id'],
					"reply_content":reply_content
				},
				success: function(data){
					if(data['flag']||data['flag']=='true'||data['flag']==1){
						var $dd=$dt.next('dd'),
						str='',
						dateformat=(function(){
							var cdate=new Date(),
								cyear=cdate.getFullYear(),
								cmonth=cdate.getMonth() + 1,
								cday=cdate.getDate(),
								chour=cdate.getHours(),
								cminute=cdate.getMinutes(),
								csecond=cdate.getSeconds();
							return cyear+'-'+cmonth+'-'+cday+'  '+chour+':'+cminute+':'+csecond;
						}());
						if($dd.length!=0){
							//已经存在回复列表
							str='<div class="comment-list-reply">'+
									'<p>'+from+' :@'+to+'<span>'+reply_content+'</span></p>'+
									'<p>'+dateformat+'</p>'+
								'</div>';
							$(str).appendTo($dd);
						}else{
							//第一个回复，许创建一个回复列表
							str='<dd>' +
									'<div class="comment-list-reply">'+
										'<p>'+from+' :@'+to+'<span>'+reply_content+'</span></p>'+
										'<p>'+dateformat+'</p>'+
									'</div>' +
								'</dd>';
							$(str).insertAfter($dt);
						}
						//成功后清空回复值并隐藏回复输入域
						$textarea.val("").parent().addClass('g-d-hidei');
					}
				},
				error: function(){
					throw "no article or mind or topic comment reply data";
				}
			});

		}


		//评论区域点赞/* to do */
		function commentPraises(obj){
			var num=parseInt(obj.text(),10)|| 0;

			//发送评论点赞或取消点赞请求
			if(obj.hasClass('g-c-red1')){
				//取消点赞
				//to do
				$.ajax({
					url:'../../json/home_reply_comment.json',//开发阶段需填充点赞地址
					type:'post',
					dataType:"json",
					async:false,
					data:{
						"comment_id":obj.attr('data-id')
					},
					success: function(data){
						if(data['flag']||data['flag']=='true'||data['flag']==1){
							obj.removeClass('g-c-red1').text(num - 1);
						}
					},
					error: function(){
						throw "praises fail";
					}
				});
			}else{
				//点赞
				//to do
				$.ajax({
					url:'../../json/home_reply_comment.json',//开发阶段需填充点赞地址
					type:'post',
					dataType:"json",
					async:false,
					data:{
						"comment_id":obj.attr('data-id')
					},
					success: function(data){
						if(data['flag']||data['flag']=='true'||data['flag']==1){
							if(num!==''||!isNaN(num)){
								obj.addClass('g-c-red1').text(num + 1);
							}else{
								obj.addClass('g-c-red1').text(1);
							}
						}
					},
					error: function(){
						throw "praises fail";
					}
				});
			}
		}

		//发表评论/* to do */
		function sendComment(params,wrap,obj){
			$.ajax({
				url:params['send_url'],
				type:'post',
				dataType:"json",
				async:false,
				data:{
					"type":params['type'],
					"tag":params['tag'],
					"id":params['id'],
					"comment_content":obj['content']
				},
				success: function(data){
					if(data['flag']||data['flag']=='true'||data['flag']==1){

						//这部分为测试代码，正式环境请清除
						var num=parseInt(wrap['comment_num'],10) + 1,
							str='',
							dateformat=(function(){
								var cdate=new Date(),
									cyear=cdate.getFullYear(),
									cmonth=cdate.getMonth() + 1,
									cday=cdate.getDate(),
									chour=cdate.getHours(),
									cminute=cdate.getMinutes(),
									csecond=cdate.getSeconds();
								return cyear+'-'+cmonth+'-'+cday+'  '+chour+':'+cminute+':'+csecond;
							}());
						wrap['comment_num'].html(num);
						wrap['total']=num;
						wrap['currentPage']=1;
						wrap['comment_more'].attr('data-total',num).attr('data-count',0);
						str='<dt data-id="0">'+
								'<div class="comment-list-info">'+
									'<div><img alt="" src="../../images/4.jpg" ></div>'+
									'<p>用户登录名称</p>'+
									'<p>'+dateformat+'</p>'+
								'</div>'+
								'<div class="comment-list-detail">'+obj['content']+'</div>'+
								'<div class="comment-list-action">'+
									'<div><span data-id="0" class="praises">0</span><em>回复</em></div>'+
									'<p class="g-d-hidei">'+
									'<textarea class="article-comment-text" placeholder="说说你看法"></textarea>'+
									'</p>'+
								'</div>'+
							'</dt>';

						//渲染界面
						$(str).prependTo(wrap['comment_wrap']);

						//提示发表成功
						wrap['dia'].content('<span class="g-btips-succ g-c-green1">发表评论成功</span>').show();
						setTimeout(function(){
							wrap['dia'].close();
						},2000);



						/*//正式环境下需要调用查询评论方法(正式环境请开启下面部分)
						//wrap['comment_wrap'].html('');
						//wrap['comment_num'].html('');
						//重置分页对象
						//wrap['total']=0;
						//wrap['currentPage']=1;
						//重置加载更多评论按钮
						//wrap['comment_more'].attr('data-total',0).attr('data-count',0);
						//查询文章评论
						//queryComment(params,wrap);*/
					}


				},
				error: function(){
					throw "send comment fail";
				}
			});
		}
	});
});



