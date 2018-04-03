if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		var lidefault='<li data-type="amselect" class="rg-am-iconitem rg-offix rg-am-select"><span></span>送到这里去</li><li data-type="amdelete" class="rg-am-iconitem rg-am-delete"><span></span>删除</li><li data-type="amedit" class="rg-am-iconitem rg-am-edit"><span></span>修改</li>',
		lisel='<li data-type="amselect" class="rg-am-iconitem rg-offix rg-am-select rg-am-selectsel"><span></span>送到这里去</li><li data-type="amedit" class="rg-am-iconitem rg-am-edit"><span></span>修改</li>';
		/*添加事件*/
		$('#rg-am-btnadd').on(EventName.click,function(){
				window.location.href='../shopping/address_edit.html';
		});
		/*列表操作事件*/
		$('.rg-am-action').live(EventName.click,function(e){
			var c=e.target,cn=c.nodeName.toLowerCase(),$c,cdata,$cpar,param={};
			/*事件源对象修正*/
			if(cn=='ul'){
				return false;
			}else if(cn=='li'){
				$c=$(c);
			}else if(cn=='span'){
				$c=$(c).parent();
			}
			cdata=$c.attr('data-type');
			$cpar=$c.parent();
			switch(cdata){
					case 'amselect':
						var ttxt=$cpar.prev().prev().html().split('&nbsp;&nbsp;');
						param.name=ttxt[0];
						param.mobilephone=ttxt[1];
						param.address=$cpar.prev().text();
						/*
							to do
							ajax							
							
							$.ajax({
								url:"",
								async:false,
								type: "post",
								dataType:"json",
								data:param,
								success:function(datas){
									if(datas.res){
										$cpar.html('').append(lisel).parent().siblings().find('ul').html('').append(lidefault);
										setTimeout(function(){
											window.location.href='../shopping/order.html';
										},500);
									}
								},
								error:function(){
								}
							});
						*/
						$cpar.html('').append(lisel).parent().siblings().find('ul').html('').append(lidefault);
						window.location.href='../shopping/order.html';
						break;
					case 'amdelete':
						var tcflag=window.confirm('是否确要删除')
						if(tcflag){
							$cpar.parent().remove();
						}
						break;
					case 'amedit':
						var ttxt=$cpar.prev().prev().html().split('&nbsp;&nbsp;');
						param.name=ttxt[0];
						param.mobilephone=ttxt[1];
						param.address=$cpar.prev().text();
						/*
							to do
							ajax							
							
							$.ajax({
								url:"",
								async:false,
								type: "post",
								dataType:"json",
								data:param,
								success:function(datas){
									if(datas.res){
										setTimeout(function(){
											window.location.href='../shopping/order.html';
										},500);
									}
								},
								error:function(){
									
								}
							});
						*/
						window.location.href='../shopping/address_edit.html';
						break;
				
			}
			
		});
		
		
		
	});
})(Zepto);