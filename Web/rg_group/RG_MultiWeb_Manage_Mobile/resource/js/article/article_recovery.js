(function($,w){
	$(function() {
			//页面元素引用
			var $search_wrap=$('#search_wrap'),
					$site_search=$('#site_search'),
					$search_clear=$('#search_clear'),
					$article_list=$('#article_list');
					
			//文章列表模板
			var template_html='<li data-id="$site-id"  data-href="$site-href"><div><img alt="" src="$img"><h3>$site-name</h3><p>所属栏目：$column</p><div><span>$count</span><span>$date-time</span></div></div><div><div><span class="recovery-btn">&#xf013a;</span><span class="delete-btn">&#xf013f;</span></div></div></li>';
			
			//搜索框事件绑定(包含容器、删除按钮、回调函数、相关参数)
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
			
			
			//恢复或删除文章
			$article_list.delegate('span',$.EventName.click,function(e){
					var $this=$(this);
							if($this.hasClass('recovery-btn')){
									//执行恢复操作
									$.modal({
										title:'恢复文章',
										content:'是否确实需要恢复此文章?',
										okfn:function(){
												//to do  发送相关ajax操作
												var $wrap=$this.closest('li'),
														cid=$wrap.attr('data-id');
														$wrap.html('').remove();
																		$.modal({
																				content:'恢复成功',
																				okfn:function(){}
																		},1);
																		return false;
												$.ajax({
														url: APP_SITE_URL + "/index.php?act=admin_category&op=recovery&cid=" + cid,
														type: 'post',
														dataType: "json",
														success: function (res) {
																if (res.tip_code == 1) {
																		$wrap.html('').remove();
																		$.modal({
																				content:'恢复成功',
																				okfn:function(){}
																		},1);
																} else {
																		$.modal({
																				content:'恢复失败',
																				okfn:function(){}
																		},1);
																}
														},
														error: function () {
																$.modal({
																		content:'恢复失败',
																		okfn:function(){}
																},1);
														}
												});
										},
										nofn:function(){}
									},0);
							}else if($this.hasClass('delete-btn')){
									//执行恢复操作
									$.modal({
										title:'删除文章',
										content:'是否确实需要删除此文章(<span class="g-c-red2">永远删除、不可恢复</span>)?',
										okfn:function(){
												//to do  发送相关ajax操作
												var $wrap=$this.closest('li'),
														cid=$wrap.attr('data-id');
												$.ajax({
														url: APP_SITE_URL + "/index.php?act=admin_category&op=del&cid=" + cid,
														type: 'post',
														dataType: "json",
														success: function (res) {
																if (res.tip_code == 1) {
																		$wrap.html('').remove();
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
							}
			});
			
			
			//加载更多
			//to do
					
	});
})(Zepto,window)







