/*
author:yipin,
name:datepick 
时间日期查询
*/
define(function(){
	$.extend({
		datePick:function(selector){
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
										maxDate:'#F{$dp.$D(\''+selector[1].selector.slice(1)+'\')}',
										position:{left:0,top:2}
								});
							}else if((temepid.indexOf('end')!=-1||temepid.indexOf('to')!=-1||index==1)&&len==2){
								//绑定结束日期
								WdatePicker({
										onpicked:function(dp){
											e.target.value=dp.cal.getNewDateStr();
										},
										minDate:'#F{$dp.$D(\''+selector[0].selector.slice(1)+'\')}',
										maxDate:'%y-%M-%d',
										position:{left:0,top:2}
								});
							}else if(len==1){
								//绑定单个日期
								WdatePicker({
										onpicked:function(dp){
											e.target.value=dp.cal.getNewDateStr();
										},
										maxDate:'%y-%M-%d',
										position:{left:0,top:2}
								});
							}
						});
					});
		}
	});
	return;
});