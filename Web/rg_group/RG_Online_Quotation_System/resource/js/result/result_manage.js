/*程序入口*/
(function($,w){
		$(function() {
				/*页面元素引用*/
				var $datestart=$('#datestart'),
						$dateend=$('#dateend'),
						$query_btn=$('#query_btn'),
						$dpdate_show=$('#dpdate_show'),
						$dpitem_start=$('#dpitem_start'),
						$dpitem_end=$('#dpitem_end'),
						$dpitem_startwrap=$('#dpitem_startwrap'),
						$dpitem_endwrap=$('#dpitem_endwrap'),
						$result_list=$('#result_list');
			
				
				var calendarobj={
						stxt:$datestart,
						etxt:$dateend,
						swrap:$dpitem_startwrap,
						ewrap:$dpitem_endwrap,
						wrap:$dpdate_show
				}
								
				
				//日历控件事件初始化绑定
				$.Calendar.calendarInit(calendarobj,2);
				/*日历控件展现*/
				$datestart.on('focus',function(){
						$dpdate_show.show();
						$dpitem_end.hide();
						$dpitem_start.show();
				});
				$dateend.on('focus',function(){
						$dpdate_show.show();
						$dpitem_start.hide();
						$dpitem_end.show();
				});
				/*日历关闭*/
				$.each([$dpitem_start,$dpitem_end],function(){
					var self=this,
						$close=self.find('>div').first();
						$close.on($.EventName.click, function(e) {
							$dpdate_show.hide();
						});
				});
				
				/*点击查询事件*/
				$query_btn.on($.EventName.click,function(e){
					$.each([$datestart,$dateend],function(index){
						var self=this,
							txt=this.val(),
							tip='';
						if(txt==''){
							index==0?tip='初始':tip='截止';
							$.modal({
								content:'<span class="g-c-orange1 g-btips-warn">申报'+tip+'月份不能为空！</span>',
								okfn:function(){}
							},1);
							return false;
						}
						
						//to do
						//ajax 开发阶段填充相关搜索业务
						
					});				
				});

				//列表显示与隐藏
				$result_list.delegate('li>h4',$.EventName.click,function(){
						$(this).parent().toggleClass('listsel');
				});
		});
})(Zepto,window);















