(function($,w){
	$(function() {
			//页面元素引用
			var $search_wrap=$('#search_wrap'),
					$site_search=$('#site_search'),
					$search_clear=$('#search_clear'),
					$community_list=$('#community_list');
					
			//微网站列表模板
			var template_html='<li data-id="$site-id" class="$site-state"><div><img alt="" src="$img"><h3>$site-name</h3><div><span>$count</span><span>$date-time</span></div></div><div><div><span class="share-btn"></span><span class="state-btn">&#xf018c;</span><span class="comment-btn" data-href="$site-href">&#xf00b1;<em>$comment</em></span></div></div></li>';
			
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
												if('禁用状态'){
													//禁用
													tempres.push(template_html.replace('$site-id',res[i].id).replace('$site-state','disabled-state').replace('$img',res[i].img).replace('$site-name',res[i].name).replace('$count',res[i].count).replace('$date-time',res[i].datatime).replace('$site-href',res[i].href).replace('$comment',res[i].comment));
												}else{
													//激活
													tempres.push(template_html.replace('$site-id',res[i].id).replace('$site-state','').replace('$img',res[i].img).replace('$site-name',res[i].name).replace('$count',res[i].count).replace('$date-time',res[i].datatime).replace('$site-href',res[i].href).replace('$comment',res[i].comment));
												}	
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
			
			
			//禁止与激活,跳转评论页面,分享等操作
			$community_list.delegate('span',$.EventName.click,function(e){
					var $this=$(this);
							//激活与禁止
							if($this.hasClass('state-btn')){
									var $wrap=$this.closest('li'),
											cid=$wrap.attr('data-id'),
											isactive=false,
											tempaction='',
											temphandler='',
											tempclass='';
											if($wrap.hasClass('disabled-state')){
													//激活
													isactive=true;
													tempaction='激活';
													temphandler='active';
													tempclass='g-c-green1';
											}else{
													//禁止
													isactive=false;
													tempaction='禁止';
													temphandler='disabled';
													tempclass='g-c-red2';
											}
											//
											$.modal({
												title:tempaction+'话题',
												content:'是否确实需要<span class="'+tempclass+'">'+tempaction+'</span>此话题?',
												okfn:function(){
														//to do  发送相关ajax操作
														
														$.ajax({
																url: APP_SITE_URL + '/index.php?act=admin_category&op='+temphandler+'&cid=' + cid,
																type: 'post',
																dataType: "json",
																success: function (res) {
																		if (res.tip_code == 1) {
																				isactive?$wrap.removeClass('disabled-state'):$wrap.addClass('disabled-state');
																				$.modal({
																						content:tempaction+'成功',
																						okfn:function(){}
																				},1);
																		} else {
																				$.modal({
																						content:tempaction+'失败',
																						okfn:function(){}
																				},1);
																		}
																},
																error: function () {
																		$.modal({
																				content:tempaction+'失败',
																				okfn:function(){}
																		},1);
																}
														});
												},
												nofn:function(){}
											},0);
							}else if($this.hasClass('comment-btn')){
									//跳转到评论页面
									var $wrap=$this.closest('li');
											if($wrap.hasClass('disabled-state')){
													$.modal({
														content:'<span class="g-c-red2">"禁用状态"</span>下不能查看话题的评论！',
														okfn:function(){}
													},1);
											}else{
													window.location.href=$this.attr('data-href');
											}								
							}else if($this.hasClass('share-btn')){
									var $wrap=$this.closest('li');
											if($wrap.hasClass('disabled-state')){
													$.modal({
														content:'<span class="g-c-red2">"禁用状态"</span>下不能分享话题！',
														okfn:function(){}
													},1);
											}else{
													//to do
													//相关分享操作
											}	
							}
			});
			
			
			//加载更多
			//to do
					
	});
})(Zepto,window)







