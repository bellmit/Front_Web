/*程序入口*/
(function($,w){
		$(function() {
				/*页面元素引用*/
				var $result_storebtn=$('#result_storebtn'),
						$result_list=$('#result_list'),
						$search_wrap=$('#search_wrap'),
						$result_search=$('#result_search'),
						$search_clear=$('#search_clear'),
						$search_btn=$('#search_btn');
			
				
				//专卖店显示与隐藏
				$result_storebtn.on($.EventName.click,function(){
						var $this=$(this);
						$this.toggleClass('storeinfosel');
						$this.next().toggle();
				});
				
				
				/*查询搜索（搜索容器，清除按钮，查询按钮，回调函数）*/
				$result_search.searchInit($search_wrap,$search_clear,$search_btn,function(str){
						//to do
						//注意 此时str为搜索的文本值
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType: "json",
								success: function (res) {
										//to do
										//填充搜索业务逻辑
								},
								error: function () {
										$.modal({
												content:'<span class="g-c-orange1 g-btips-warn">搜索失败<span>',
												okfn:function(){}
										},1);
								}
						});
	
				});


				//列表显示与隐藏
				$result_list.delegate('li>h4',$.EventName.click,function(){
						$(this).parent().toggleClass('listsel');
				});
				
				
				//列表数据删除
				$result_list.delegate('div>span',$.EventName.click,function(){
						var $this=$(this),
								op=$this.attr('data-aciton'),
								id=$this.attr('data-id'),
								$item=$this.closest('li');
						//to do
						//开发阶段添加相关删除业务逻辑
						
						
						
						
						//下面测试代码，开发阶段需删除
						$.modal({
								content:'<span class="g-c-orange1 g-btips-warn">是否真需要删除此业绩申报？</span>',
								okfn:function(){
										var r=parseInt(Math.random()*10),
												tip='<span class="g-c-green5 g-btips-succ">正在删除中......</span>',m=$.modal({content:tip},0);
										if(r%2==0){
												tip='<span class="g-c-green5 g-btips-succ">删除成功</span>';			
										}else{
												tip='<span class="g-c-red1 g-btips-error">删除失败!</span>';
										}
										setTimeout(function(){
												m.remove();
												m=$.modal({content:tip},0);
												setTimeout(function(){
													if(r%2==0){
														$item.html('').remove();
													}
													m.remove();
													tip=null;
												},1000);
										},1000);
								}
						},2);
				});
				
		});
})(Zepto,window);















