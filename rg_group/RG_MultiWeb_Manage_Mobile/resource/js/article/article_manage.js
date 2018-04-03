(function($,w){
	$(function() {
			//页面元素引用
			var $search_wrap=$('#search_wrap'),
					$site_search=$('#site_search'),
					$search_clear=$('#search_clear'),
					$article_list=$('#article_list');
					
			//文章列表模板
			var template_html='<li data-id="$site-id"  data-href="$site-href"><div><img alt="" src="$img"><h3>$site-name</h3><p>所属栏目：$column</p><div><span>$count</span><span>$date-time</span></div></div><div><div><span></span><span></span><span></span></div></div></li>';
			
			//搜索框事件绑定(包含容器、删除按钮、回调函数)
			$site_search.searchInit($search_wrap,$search_clear,function(str){
					//发送ajax, 此时str为搜索的文本值
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType: "json",
							success: function (res) {
									if (res.tip_code == 1) {
											var i=0,
											len=res.length,
											tempres=[];
											for(i;i<len;i++){
												tempres.push(template_html.replace('$site-id',res[i].id).replace('$site-href',res[i].href).replace('$img',res[i].img).replace('$site-name',res[i].name).replace('$column',res[i].column).replace('$count',res[i].count).replace('$date-time',res[i].datatime));
											}
											$(tempres.join('')).appendTo($article_list.html(''));
									} else {
											$.modal({
													content:'搜索失败',
													okfn:function(){}
											},1);
									}
							},
							error: function () {
									$.modal({
											content:'搜索失败',
											okfn:function(){}
									},1);
							}
					});

			});
			
			
			//删除文章
			$article_list.delegate('li',( new Function( 'return "'+$.EventName.click+ ' longTap"' ))(),function(e){
					var $this=$(this);
							if(e.type=='tap'||e.type=='click'){
									if($this.hasClass('article-delete-state')){
											//执行删除操作
											$.modal({
												title:'删除文章',
												content:'是否确实需要删除此文章?',
												okfn:function(){
														//to do  发送相关ajax操作
														var cid=$this.attr('data-id');
														$.ajax({
																url: APP_SITE_URL + "/index.php?act=admin_category&op=del&cid=" + cid,
																type: 'post',
																dataType: "json",
																success: function (res) {
																		if (res.tip_code == 1) {
																				$this.html('').remove();
																				$.modal({
																						content:'删除成功',
																						okfn:function(){}
																				},1);
																		} else {
																				$.modal({
																						content:'删除失败',
																						okfn:function(){}
																				},1);
																		}
																},
																error: function () {
																		$.modal({
																				content:'删除失败',
																				okfn:function(){}
																		},1);
																}
														});
												},
												nofn:function(){}
											},0);
									}else{
											//需要做路由操作
											var nodename=e.target.nodeName.toLowerCase();
											if(nodename=='span'){
													var $node=$(e.target),txt=$node.text(),index=-1;
													if(txt==''){
														index=$node.index();
														if(index==0){
															//to do
															
															
														}else if(index==1){
															//to do
															
															
														}else if(index==2){
															//to do
			
			
														}
														console.log('点击按钮操作：'+index);
													}else{
														//执行默认的链接跳转
														w.location.href=$this.attr('data-href');
													}
											}else{
													//执行默认的链接跳转
													w.location.href=$this.attr('data-href');
											}
									}
							}else if(e.type=='longTap'){
									$this.hasClass('article-delete-state')?$this.removeClass('article-delete-state'):$this.addClass('article-delete-state');
							}
			});
			
			
			//加载更多
			//to do
					
	});
})(Zepto,window)







