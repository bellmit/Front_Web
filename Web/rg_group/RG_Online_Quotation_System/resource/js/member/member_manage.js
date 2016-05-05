/*程序入口*/
(function($,w){
		$(function() {
				/*页面元素引用*/
				var $member_btn=$('#member_btn'),
						$member_list=$('#member_list'),
						$search_wrap=$('#search_wrap'),
						$member_search=$('#member_search'),
						$search_clear=$('#search_clear'),
						$search_btn=$('#search_btn');
			
				
				//专卖店显示与隐藏
				$member_btn.on($.EventName.click,function(){
						var $this=$(this);
						$this.toggleClass('memberinfosel');
						$this.next().toggle();
				});
				
				
				/*查询搜索（搜索容器，清除按钮，查询按钮，回调函数）*/
				$member_search.searchInit($search_wrap,$search_clear,$search_btn,function(str){
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
				$member_list.delegate('li>h4',$.EventName.click,function(){
						$(this).parent().toggleClass('listsel');
				});
				
				
				
		});
})(Zepto,window);















