/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'cookie':'plugins/cookie',
		'checkbox_ul':'widgets/checkbox_ul',
		'gridaction':'widgets/gridaction'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','cookie','checkbox_ul','gridaction','common'],
function($,undefined,undefined,CheckBox_UL,GridAction,Common) {
	
	$(function() {
			//页面元素获取
			var $coupon_action=$('#coupon_action'),
					$coupon_list=$('#coupon_list'),
					dia=dialog();
			
		
			//绑定"添加","修改","删除"
			$coupon_action.delegate('a','click',function(e){
					var $this=$(this),
							type=$this.attr('data-action')||'',
							//获取已经选择的文章列表
							datas=CheckBox_UL.getCheckBox(),
							issucc=false;
							
							
							if(type=='update'){		
									e.preventDefault();
									
									//判断修改数据是否正确
									if(datas.length>1){
											dia.content('<span class="g-c-red2 g-btips-warn">修改不支持"批量操作"！</span>').show();
											setTimeout(function(){
												dia.close();
											},3000);
											return false;
									}else if(datas.length==0){
											dia.content('<span class="g-c-red2 g-btips-warn">请"选中"需要修改的数据！</span>').show();
											setTimeout(function(){
												dia.close();
											},3000);
											return false;
									}
									
									//绑定点击事件
									GridAction.gridHandler($this,function(objs){
										if(objs.dialog){
												objs.dialog.close().remove();
										}else{
											//设置内部id
											Common.setParams('coupon_active_id','id='+datas);
											//成功设置参数后然后页面跳转
											window.location.href='coupon_active.html';
										}
									});
									
									return false;
									
									
							}else if(type=='delete'){
								
									e.preventDefault();
									
									//绑定点击事件
									GridAction.gridAciton($this,datas,function(objs){
											//进入需要确认是否执行操作的流程
											if(objs.dialog){
													objs.dialog.close().remove();
													
													//to do 发送删除ajax
													$.ajax({
															url:'../../json/merchant/coupon_active.json',
															type:'post',
															dataType:"json",
															data:datas,
															async:false,
															success: function(res){
																	if(res.action){
																			issucc=true;
																	}else{
																			issucc=false;
																	}
															},
															error: function(){
																	issucc=false;
															}
													});
													
													if(issucc){
															dia.content('<span class="g-c-green1 g-btips-succ">删除成功</span>').show();
															//删除本地数据
															var items=CheckBox_UL.getCheckBoxItem(),
																	len=datas.length,
																	i=len-1;
															for(i;i>=0;i--){
																items[i].parent().remove();
															}
															//初始化选中数据
															CheckBox_UL.init($coupon_list);
													}else{
															dia.content('<span class="g-c-red2 g-btips-warn">删除失败！</span>').show();
													}
													
											}
											setTimeout(function(){
												dia.close();
											},3000);
									},true);
									
									
									return false;
							}
				
			});
			
			
			
		//多选框事件绑定
		//初始化
		CheckBox_UL.init($coupon_list);
		//绑定单个选中与取消
		$coupon_list.delegate('li>input:checkbox', 'click', function () {
				CheckBox_UL.inputCheck($(this));
    });
			
			
			

			
			
	});
});
