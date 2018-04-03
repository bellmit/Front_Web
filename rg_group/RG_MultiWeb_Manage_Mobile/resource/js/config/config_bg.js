(function($,w){
	$(function() {
			//选中模板的编号
			var currentid='';
		
		
			//自定义插件
			var $config_upload=$('#config_upload');
					
			//隐藏元素
			var $config_selcet=$('#config_selcet'),
				$config_default=$('#config_default'),
				$config_save=$('#config_save');
			
			//图像上传事件绑定(相关限制配置对象,回调函数(处理上传成功的情况))
			$config_upload.fileupload({
					type:'png,jpg,jpeg',
					size:120
			},function(objs,reader){
					//回调函数两个参数分别为图片对象，数据流对象
					$config_default.attr('src',reader.result);
					$config_selcet.find('li').eq(0).addClass('config-item-select').siblings().removeClass('config-item-select');
					$.modal({
						content:'上传成功',
						okfn:function(){}
					},1);
			});
			
			
			//初始化图片选择绑定
			$config_selcet.find('li').each(function(){
					var $this=$(this);
					if($this.hasClass('config-item-select')){
							currentid=$this.attr('data-id');
							return true;
					}
			});
			
			//绑定图片选择
			$config_selcet.delegate('li',$.EventName.click,function(){
					var $this=$(this);
					$this.addClass('config-item-select').siblings().removeClass('config-item-select');
					currentid=$this.attr('data-id');
			});
			
			//绑定保存选择图片
			$config_save.on($.EventName.click,function(){
				if(currentid==''){
						$.modal({
							content:'你还未选中相关背景图片',
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
														content:'设置背景成功',
														okfn:function(){
															window.location.reload();
														}
													},1);
													break;
											case 0://设置模板失败
													$.modal({
														content:'设置背景失败',
														okfn:function(){}
													},1);
													break;
											case -1://错误的模板编号
													$.modal({
														content:'错误的背景编号',
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

