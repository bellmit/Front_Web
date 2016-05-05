/*程序入口*/
(function($,w){
		$(function() {
				/*页面元素引用*/
				var $applyaction=$('#applyaction'),
						$address=$('#address'),
						$cardno=$('#cardno'),
						$accountname=$('#accountname'),
						$remark=$('#remark'),
						$idcard=$('#idcard'),
						$applysubmit=$('#applysubmit');
			
			
			
			
				//银行账户格式化
				$cardno.on('keyup',function(e){
					var val=this.value;
					val=val.replace(/\D*/g,'');
					val=ValidFn.cardFormat(val);
					this.value=val;
				});	
			
			
			
				//设置校验对象
				function selfTips(obj){
						obj.flag?obj.$current.removeClass('Validform_error'):obj.$current.addClass('Validform_error');
						obj.$current.parent().parent().next().html(obj.tip);
				}
				var rules=[
						[
							{selector:$address},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'开户银行地址不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						],
						[
							{selector:$cardno},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'银行账户卡号不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							},
							{
								rule:function(str){
									return ValidFn.trims(str).length==19?true:false;
								},
								no:'银行账户卡号应为19位数字',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						],
						[
							{selector:$accountname},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'开户人姓名不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							},
							{
								rule:function(str,$selector,selector){
									//to do
									//填充查询会员名ajax
									
									
									//下面代码为测试，开发阶段请删除
									var r=parseInt(Math.random()*10)%2;
									if(r==0){
										return true;
									}else{
										return false;
									}
								},
								no:'开户人姓必须与会员名一致',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						]
						];
						
				
				
				//表单校验
				$applysubmit.on($.EventName.click,function(e){
						e.preventDefault();
						$.Validator($applyaction,rules);
						return false;
				});
				
				
				//定义回调函数
				$.ValidCallBack=function(flag){
						if(flag){
							//ajax 提交
							//to do 开发阶段请填充业绩审核业务逻辑
							
							
							//此处为测试，开发阶段可删除
							setTimeout(function(){
								var wraps=$.modal({
										content:'<span class="g-c-green5">会员申请第一步成功......</span>'
										
									},0,true);
									setTimeout(function(){
										wraps.remove();
										window.location.href='member_manage.html';
									},2000);
							},200);
							
						}else{
							//表单提交
							$applyaction.submit();
						}
				}
				
				
				
				
		});
})(Zepto,window);