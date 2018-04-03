(function($,w){
	$(function() {
			//页面元素引用
			var $community_reply=$('#community_reply');
					
			//微网站列表模板
			var template_html='<li data-id="$site-id" class="$site-state"><div><img alt="" src="$img"><h3>$site-name</h3><div><span>$count</span><span>$date-time</span></div></div><div><div><span class="state-btn">&#xf018c;</span></div></div></li>';
			
			
			
			//禁止与激活,跳转评论页面
			$community_reply.delegate('span',$.EventName.click,function(e){
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
												title:tempaction+'回复',
												content:'是否确实需要<span class="'+tempclass+'">'+tempaction+'</span>此回复?',
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
							}
			});
			
			
			//加载更多
			//to do
					
	});
})(Zepto,window)







