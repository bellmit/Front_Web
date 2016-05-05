/*程序入口*/
(function($,w){
	$(function() {
		//选中模板的编号
		var currentid='';
		//页面元素引用
		var $template_selcet=$('#template_selcet'),
				$template_save=$('#template_save');
		
		//初始化选择模板
		$template_selcet.find('li').each(function(){
      	var $this=$(this);
				if($this.hasClass('template-item-select')){
						currentid=$this.attr('data-id');
						return true;
				}
    });
		//绑定选择模板
		$template_selcet.delegate('li',$.EventName.click,function(){
				var $this=$(this);
				$this.addClass('template-item-select').siblings().removeClass('template-item-select');
				currentid=$this.attr('data-id');
		});
		
		//绑定保存选择模板
		$template_save.on($.EventName.click,function(){
				if(currentid==''){
						$.modal({
							content:'你还未选中相关模板',
							okfn:function(){}
						},1);
				}else{
					// to do
					// send ajax request
					$.get(APP_SITE_URL+"/index.php?act=admin_template&op=set_template&template_id="+currentid, function(resp){
							if( resp ){
									switch(parseInt(resp.tip_status) ){
											case 1://设置模板成功
													$.modal({
														content:'设置模板成功',
														okfn:function(){
															window.location.reload();
														}
													},1);
													break;
											case 0://设置模板失败
													$.modal({
														content:'设置模板失败',
														okfn:function(){}
													},1);
													break;
											case -1://错误的模板编号
													$.modal({
														content:'错误的模板编号',
														okfn:function(){}
													},1);
													break;
									}
							}
					}, "json");
					
					
				}
		});

	});
})(Zepto,window);















