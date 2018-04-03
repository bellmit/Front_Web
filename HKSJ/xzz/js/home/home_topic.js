/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		/*类库依赖模块*/
		'jquery':'lib/jquery/jquery-2.1.4.min',
		/*弹出框模块*/
		'dialog':'lib/artDialog/dialog',
		/*菜单模块*/
		'menu':'widgets/menu',
		/*搜索模块*/
		'search':'widgets/serach',
		/*文章详细解析模块*/
		'resolve':'widgets/resolveHtml',
		/*正则表达式规则模块*/
		'rule':'widgets/rules'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','menu','search','resolve','rule'],function($,undefined,Menu,undefined,Resolve,Rule) {
	$(function(){

		//dom对象引用
			/*侧边栏菜单导航上部*/
		var $main_menu=$('#main_menu'),
			/*侧边栏菜单导航下部*/
			$sub_menu=$('#sub_menu'),
			/*主显示区用户菜单导航*/
			$main_menu_wrap=$('#main_menu_wrap'),
			/*显示主题(文章类型或类型)*/
			$side_list_theme=$('#side_list_theme'),
			/*显示标签*/
			$tag_panel_show=$('#tag_panel_show'),
			/*删除标签*/
			$tag_panel_delete=$('#tag_panel_delete'),
			/*添加标签*/
			$tag_panel_add=$('#tag_panel_add'),
			/*列表数据*/
			$side_list_show=$('#side_list_show'),
			/*搜索字符*/
			$main_serach_text=$('#main_serach_text'),
			/*清空搜索字符*/
			$main_serach_empty=$('#main_serach_empty'),
			/*关注*/
			$main_attention_btn=$('#main_attention_btn'),
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
			"type":"1",
			"tag":null,
			"url":"../../json/home_list.json"
		},
		/*文章查询条件对象 */
		articleObj={
			"type":"1",
			"id":null,
			"tag":null,
			"detail_url":"../../json/home_article.json",//查询文章详情地址
			"comment_url":"../../json/home_comment.json",//查询评论地址
			"reply_url":"../../json/home_reply_comment"//回复评论地址
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


			//查询标签 /* to do */
			$.ajax({
				url:'../../json/home_tag.json',
				type:'post',
				dataType:"json",
				async:false,
				success: function(data){
					var tag=data['tag'],
						len=tag.length,
						selstr='',
						defaultstr='',
						showstr='';
					if(len!==0){
						for(var i=0;i<len;i++){
							if(i<=3){
								//默认选中标签
								if(i==0){
									selstr+='<li data-tag="'+tag[i]['id']+'" >'+tag[i]['name']+'</li>';
									showstr+='<li class="tag-panel-showactive" data-tag="'+tag[i]['id']+'" >'+tag[i]['name']+'</li>';
									queryObj['tag']=tag[i]['id'];
									articleObj['tag']=tag[i]['id'];

									//查询文章列表
									queryList(queryObj,$side_list_show);
								}else{
									selstr+='<li data-tag="'+tag[i]['id']+'" >'+tag[i]['name']+'</li>';
									showstr+='<li data-tag="'+tag[i]['id']+'" >'+tag[i]['name']+'</li>';
								}
							}else{
								//未选中标签
								defaultstr+='<li data-tag="'+tag[i]['id']+'" >'+tag[i]['name']+'</li>';
							}
						}
						if(selstr!==''){
							$tag_panel_delete.html(selstr);
							$tag_panel_show.html(showstr);
						}
						if(defaultstr!==''){
							$tag_panel_add.html(defaultstr);
						}
					}
				},
				error: function(){
					throw "no tag";
				}
			});


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

		//绑定切换查询不同的主题 /* to do */
		$side_list_theme.on('click','div',function(){
			var $this=$(this),
				type=$this.attr('data-type');


			//防止重复查询
			if($this.hasClass('list-themeactive')){
				return false;
			}

			//改变查询条件
			queryObj['type']=type;
			articleObj['type']=type;
			//查询不同类型ajax
			queryList(queryObj,$side_list_show);

			//切换主题样式
			$this.addClass('list-themeactive').siblings().removeClass('list-themeactive');

		});

		//绑定标签添加 /* to do */
		$tag_panel_add.on('click','li',function(){
			var $this=$(this),
				$child=$tag_panel_delete.children(),
				len=$child.length,
				counts=6;
			if(len==0){
				$this.clone().addClass('tag-panel-showactive').appendTo($tag_panel_show);
			}else if(len>=counts){
				dia.content('<span class="g-btips-warn g-c-warn">最多只能定制 '+counts+' 个标签</span>').show();
				setTimeout(function(){
					dia.close();
				},2000);
				return false;
			}else{
				$this.clone().appendTo($tag_panel_show);
			}
			$this.appendTo($tag_panel_delete);
		});

		//绑定标签删除 /* to do */
		$tag_panel_delete.on('click','li',function(){
			var $this=$(this),
				tag=$this.attr('data-tag'),
				$child;

			$this.appendTo($tag_panel_add);

			$child=$tag_panel_delete.children();
			if($child.length==0){
				//全部删除完成，标签查询条件为全查询
				queryObj['tag']=null;
				articleObj['tag']=null;
			}
			$tag_panel_show.find('li[data-tag="'+tag+'"]').remove();
		});

		//绑定标签点击查询 /* to do */
		$tag_panel_show.on('click','li',function(){
			var $this=$(this),
				tag=$this.attr('data-tag');

			//防止重复查询
			if($this.hasClass('tag-panel-showactive')){
				return false;
			}


			//改变查询条件
			queryObj['tag']=tag;
			articleObj['tag']=tag;
			//查询不同类型ajax
			queryList(queryObj,$side_list_show);

			 $this.addClass('tag-panel-showactive').siblings().removeClass('tag-panel-showactive');
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
				//评论列表交互
				/*
				*
				* <dt>
				 <div class="comment-list-info">
				 <div><img alt="" src="../../images/5.jpg" ></div>
				 <p>为你担心</p>
				 <p>2015-12-21 15:52:00</p>
				 </div>
				 <div class="comment-list-detail">我从来不敢给你任何诺言，是因为我知道我们太年轻，你追求的是一种浪漫感觉，还是那不必负责任的热情，心中的话到现在才对你表明，不知道你是否会因此而清醒，让身在远方的我，不必为你担心，一颗爱你的心，时时刻刻为你转不停，我的爱也曾经，深深温暖你的心灵，你和他之间，是否已经有了真感情，别隐瞒，对我说，别怕我伤心</div>
				 <div class="comment-list-action">
				 <div><span>52</span><em>回复</em></div>
				 <p class="g-d-hidei">
				 <textarea data-type="reply-parent" class="article-comment-text" placeholder="说说你看法"></textarea>
				 </p>
				 </div>
				 </dt>
				*
				*
				* */





				dia.content('<span class="g-btips-succ g-c-green1">发表评论成功</span>').show();
				setTimeout(function(){
					dia.close();
				},2000);
			}
		});


		//绑定评论框相关事件
		//绑定选择表情/* to do */
		$article_emoji.on('click','img',function(){
			$(this).clone().appendTo($article_comment_text);
		});



		//绑定回复评论,切换回复评论
		$article_comment_list.on('click keydown',function(e){
			var current= e.target,
				etype= e.type,
				$this,
				nname=current.nodeName.toLowerCase();

			if(etype=='click'){
				if(nname=='em'){
					$this=$(current);
					var $textarea=$this.closest('div').next('p');
					if($textarea.hasClass('g-d-hidei')){
						//显示回复
						$textarea.removeClass('g-d-hidei');
					}else{
						//隐藏回复
						$textarea.addClass('g-d-hidei');
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
						replyComment(articleObj,detailObj);
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
							str+='<li data-id="'+list[i]['id']+'"><p>'+list[i]['nickname']+'<span>'+list[i]['create_time']+'</span></p><h3>'+list[i]['title']+'</h3><div><span>'+list[i]['read_sum']+'</span><span>'+list[i]['comment_sum']+'</span><span>'+list[i]['praises_sum']+'</span></div><img alt="" src="'+list[i]['url']+'"></li>';
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
													'<div><span class="'+(function(){
														var status=parseInt(item['status'],10);
														if(isNaN(status)){
															return '';
														}
														if(status==1){
															return "g-c-red1";
														}else if(status==0){
															return "";
														}
												}())+'">'+item['praises_sum']+'</span><em>回复</em></div>'+
													'<p class="g-d-hidei"><textarea class="article-comment-text" placeholder="说说你看法"></textarea></p>'+
												'</div>'+
											 '</dt>';


											//解析评论回复
											var replylen=reply.length,
												m=0;
											if(replylen!==0){
												str+='<dd data-id="'+i+'">';
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


		//回复评论/* to do */
		function replyComment(params,wrap){


		}
	});
});



