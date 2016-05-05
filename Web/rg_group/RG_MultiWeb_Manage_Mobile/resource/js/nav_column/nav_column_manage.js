(function($,w){
	$(function(){	
			/*页面元素引用*/
			var $nav_column_wrap=$('#nav_column_wrap');
			
			
			
			/*按钮形状*/
			$nav_column_wrap.columnBtnRender('li',3);
			var tempi=0;
			$(w).on('resize',function(){
					tempi++;
					if(tempi==1){
						  //延迟执行主要为了防止频繁切换窗口大小和缓慢切换窗口大小
							setTimeout(function(){
									$nav_column_wrap.columnBtnRender('li',3);
									tempi=0;
							},250);
					}
			});
			
			
			/*绑定长按事件
			此处不用a标签的目的是浏览器中不能阻止事件的默认行为
			*/
			/*
			用 ( new Function( "return " + '"'+$.EventName.click+ ' longTap"') )() 
			代替
			eval('"'+$.EventName.click+ ' longTap"')
			*/
			$nav_column_wrap.delegate('li>div',( new Function( 'return "'+$.EventName.click+ ' longTap"' ))(),function(e){
					var $this=$(this),
							$span=$this.find('span'),
							$item;
							if($span.length==0||$span==null){
								//如果是最后一个按钮则跳转
								//to do  还需要做数量上的判断，如果大于设置的栏目数怎么不进行添加操作
								var $wrap=$this.closest('ul')
								len=$wrap.find('li').size() - 1;
								if(len>=10){
									$.modal({
										content:'您已经添加了'+len+'个栏目了，不能再继续添加！',
										okfn:function(){}
									},1);
								}else{
									w.location.href=$this.attr('data-href');
								}
								return false;
							}
							if(e.type=='tap'||e.type=='click'){
									if($span.hasClass('nc-delete-btn')){
											//执行删除操作
											$.modal({
												title:'删除栏目',
												content:'是否确实需要删除此导航栏目?',
												okfn:function(){
														//to do  发送相关ajax操作
														var cid=$this.attr('data-id');
														$.ajax({
																url: APP_SITE_URL + "/index.php?act=admin_category&op=del&cid=" + cid,
																async: false,
																type: 'get',
																dataType: "json",
																success: function (res) {
																		if (res.tip_code == 1) {
																				$this.parent().html('').remove();
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
											//执行默认的链接跳转
											w.location.href=$this.attr('data-href');
									}
							}else if(e.type=='longTap'){
								$span.hasClass('nc-delete-btn')?$span.removeClass('nc-delete-btn'):$span.addClass('nc-delete-btn');
							}
			});
			

	});
})(Zepto,window);












