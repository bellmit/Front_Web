/*程序入口*/
(function($Z,w){
	$Z(function(){
			/*加载flash资源以及相关初始化*/
			ZeroClipboard.setMoviePath( '../resource/js/plugins/ZeroClipboard/ZeroClipboard.swf' );
    	ZeroClipboard.setMoviePath( '../resource/js/plugins/ZeroClipboard/ZeroClipboard10.swf' );
			var clip = new ZeroClipboard.Client();
			clip.setText('');
			clip.setHandCursor(true);
			clip.setCSSEffects(true);
		
			/*页面元素引用*/
			var $Zaction_link=$Z('#action_link'),
				$Zaction_share=$Z('#action_share')
				$Zmember_url=$Z('#member_url');
				
				
			//复制链接
			clip.addEventListener('complete',function(client, text) {
						$Z.modal({
							title:'复制成功',
							content:'复制内容：'+text,
							okfn:function(){}
						},1);  
						clip.destroy();
						setTimeout(function(){
							clip.glue('action_link');
						},5);
			});
			clip.setText($Zmember_url.attr('href'));
		  clip.glue('action_link');
			
			/*调整窗口时，重置flash大小及定位*/
			var tempcount=0;
			$Z(w).on('resize',function(){
					tempcount++;
					if(tempcount==1){
						//控制每次调整窗口都只执行一次flash渲染
						clip.destroy();
						setTimeout(function(){
							clip.glue('action_link');
							tempcount=0;
						},500);
					}
			})
			//分享        
			$Zaction_share.on($Z.EventName.click,function(){
					//to do
					console.log('分享');
			});

		});
})(Zepto,window);



    









