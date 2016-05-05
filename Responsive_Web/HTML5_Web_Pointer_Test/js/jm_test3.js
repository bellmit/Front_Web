(function($){
	$(document).on('pagecreate',function(){
		var $t3f=$('#test3form'),$t3fs=$('#test3formsubmit');
		/*form submit*/
		/*$t3fs.on('tap',function(){
			var $this=$t3f;
			var sparms=$this.serialize().replace(/&+/g,',');
			alert(sparms);
			//window.JSON.parse(sparms)
			return false;
		});*/
		$t3f.submit(function(){
			var $this=$(this);
			var tparm=$this.serializeArray(),tlen=tparm.length,i=0,parms={};
			for(i;i<tlen;i++){
				parms[tparm[i]['name']]=tparm[i]['value'];
			}
			$.ajax({
				url:'jm_test1.html',
				type:'post',
				dataType:"json",
				data:parms,
				success:function(res){
					if(res){
						alert('成功');
					}else{
						alert('失败');
					}
				},
				error: function(event,request, settings){
					alert('错误');
				}
			});
			return false;	
		});
	});
	
	
	
})(jQuery);