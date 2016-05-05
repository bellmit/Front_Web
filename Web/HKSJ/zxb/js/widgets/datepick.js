/*
author:yipin,
name:datepick 
时间日期查询
*/
define(['jquery'],function($){
	$.extend({
		//selector：调用日历的表单对象数组，flag：是否限制开始日期和结束日期的大小
		datePick:function(selector,flag){
			var len=selector.length;
					$.each(selector,function(index){
						var $this=$(this);
						$this.val('');
						$this.on('click',function(e){
							var curid=e.target.id,
									temepid=curid.toLowerCase();
							if((temepid.indexOf('start')!=-1||temepid.indexOf('from')!=-1||index==0)&&len==2){
								//绑定开始日期
								WdatePicker({
										onpicked:function(dp){
											e.target.value=dp.cal.getNewDateStr();
										},
										maxDate:flag?'%y-%M-%d':'#F{$dp.$D(\''+selector[1].selector.slice(1)+'\')}',
										position:{left:0,top:2}
								});
							}else if((temepid.indexOf('end')!=-1||temepid.indexOf('to')!=-1||index==1)&&len==2){
								//绑定结束日期
								WdatePicker({
										onpicked:function(dp){
											e.target.value=dp.cal.getNewDateStr();
										},
										minDate:'#F{$dp.$D(\''+selector[0].selector.slice(1)+'\')}',
										maxDate:flag?'%y-%M-%d':'',
										position:{left:0,top:2}
								});
							}else if(len==1){
								//绑定单个日期
								WdatePicker({
										onpicked:function(dp){
											e.target.value=dp.cal.getNewDateStr();
										},
										maxDate:flag?'%y-%M-%d':'',
										position:{left:0,top:2}
								});
							}
						});
					});
		}
	});
	return $;
});