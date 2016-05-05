/*
author:yipin,
name:gridaction 
数据表格中的相关操作，依赖于jquery和dialog
*/
define(function () {
		var dia=dialog(),
		actionobj={
			'delete':'删除',
			'back':'退货',
			'change':'换货',
			'cancel':'取消',
			'add':'添加',
			'restore':'恢复'
		};
		
    return {
			//需要选中input的按钮点击方法，参数(绑定的元素，选中数据，回调函数,是否支持批量处理)
			gridAciton:function(selector,datas,fn,flag){
						var actiontxt=selector.attr('data-action'),
								values,
								isaction=false,
								txt='';
								
						
						
						
						if(!flag){
							//非批量操作
										
							//非操作按钮
							if(!actiontxt||actiontxt==''){
									return false;
							}
							values=selector.attr('data-value');
							if(!values||values==''){
									return false;
							}
							
							//数据一致性
							if(datas.length==1&&datas[0]==values){
								isaction=true;
							}else if(datas.length==0){
									txt='<span class="g-c-red4 g-btips-error">没有选中相关数据</span>';
									isaction=false;
							}else if(datas.length>=2){
									txt='<span class="g-c-red4 g-btips-error">数据不支持批量操作</span>';
									isaction=false;
							}else if(datas.length==1&&datas[0]!=values){
									txt='<span class="g-c-red4 g-btips-error">选中数据与操作数据不一致</span>';
									isaction=false;
							}
						}else{
							//批量操作
							
							//数据一致性
							if(datas.length>=1){
								isaction=true;
							}else if(datas.length==0){
									txt='<span class="g-c-red4 g-btips-error">没有选中相关数据</span>';
									isaction=false;
							}
							
						}
						
						//提示信息
						if(!isaction){
							dia.content(txt).show();
							setTimeout(function(){
								dia.close();
							},3000);
							return false;
						}else{
								if(typeof actionobj[actiontxt]==='string'){
										var tempdia=dialog({
													content:'<span class="g-c-red4 g-btips-warn">是否真需要 "'+actionobj[actiontxt]+'" 此项数据</span>',
													width:300,
													okValue: '确定',
													ok: function () {
															if(fn&&typeof fn==='function'){
																	//执行回调
																	fn.call(selector,{
																			action:actiontxt,
																			value:values,
																			dialog:tempdia
																	});
															}
															return false;
													},
													cancelValue: '取消',
													cancel: function () {}
										}).showModal();
								}else{
									if(fn&&typeof fn==='function'){
											//执行回调
											fn.call(selector,{
													action:actiontxt,
													value:values
											});
									}
								}
						}

			},
			//不需要选中input的按钮点击方法，参数(绑定的元素，回调函数)
			gridHandler:function(selector,fn){
				var actiontxt=selector.attr('data-action');

						//非操作按钮
						if(!actiontxt||actiontxt==''){
								return false;
						}
						if(typeof actionobj[actiontxt]==='string'){
								var tempdia=dialog({
											content:'<span class="g-c-red4 g-btips-warn">是否真需要 "'+actionobj[actiontxt]+'" 此项数据</span>',
											width:300,
											okValue: '确定',
											ok: function () {
													if(fn&&typeof fn==='function'){
															//执行回调
															fn.call(selector,{
																	action:actiontxt,
																	dialog:tempdia
															});
													}
													return false;
											},
											cancelValue: '取消',
											cancel: function () {}
								}).showModal();
						}else{
							if(fn&&typeof fn==='function'){
									//执行回调
									fn.call(selector,{
											action:actiontxt
									});
							}
						}
			}
			
			
			
			
		};
});