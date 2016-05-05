/*
author:yipin,
name:search 
搜索服务类
*/
define(function () {
		//选择器数组，提示显示时间，回调函数，是否需要全部成立
		$.fn.queryListData=function(selectors,times,fn,flag){
				var len=selectors.length,
						btns=this;
				this.on('click',function(e){
					var searchobj=[],
							nullres=[],
							queryitem=[];
					$.each(selectors,function(index,value){
							var $this=this,
									txt='',
									theme=$this.attr('data-theme'),
									type=$this.attr('data-type')||'text',
									names=$this.attr('name');
									
							switch(type){
								case 'text':
										txt=$this.val();
										break;
								case 'select':
										txt=$this.find('option:selected').val();
										break;
							}
							
							if(txt==''||txt==null){
								theme=theme?theme:'"查询数据"';
								nullres.push(theme);
								queryitem.push({items:this,values:true});
							}else{
								queryitem.push({items:this,values:false});
								searchobj.push({
									name:names?names:'searchstr',
									value:txt
								});
							}
					});
					
					
					if(!flag){
							if(len==nullres.length&&len!=0){
										var dia='';
										dia=dialog({
											content:'<span class="g-c-red4">"'+nullres[0]+'" 不能为空!</span>'
										}).show();
										selectors[0].removeClass('Validform_error').addClass('Validform_error');
										setTimeout(function(){
												dia.close().remove();
										},times||3000);
							}else{
									if(fn&&typeof fn==='function'){
										 e.preventDefault();
										 fn.call(btns,searchobj);
									}else{
										 btns.closest('form').submit();
									}
									selectors[0].removeClass('Validform_error');
							}
					}else{
							if(nullres.length!=0&&len!=0){
										var dia='';
										dia=dialog({
											content:'<span class="g-c-red4">"'+nullres.join('、')+'" 不能为空!</span>'
										}).show();
										setTimeout(function(){
												dia.close().remove();
										},times||3000);
										
										$.each(queryitem,function(index,value){
												if(queryitem[index]['values']){
														queryitem[index]['items'].removeClass('Validform_error').addClass('Validform_error');
												}else{
														queryitem[index]['items'].removeClass('Validform_error');
												}
										});
										
							}else{
									if(fn&&typeof fn==='function'){
										 e.preventDefault();
										 fn.call(btns,searchobj);
									}else{
										 btns.closest('form').submit();
									}
									$.each(selectors,function(index,value){
											selectors[index].removeClass('Validform_error');
									});
									
							}
					}
				});
				return this;
		}
    return;
});