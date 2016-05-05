/*程序入口*/
(function($,w){
		$(function() {
				/*页面元素引用*/
				var $applyaction=$('#applyaction'),
						$introducerno=$('#introducerno'),
						$introducername=$('#introducername'),
						$memberno=$('#memberno'),
						$membername=$('#membername'),
						$idcard=$('#idcard'),
						$applysubmit=$('#applysubmit');
			
			
			
				//设置校验对象
				function selfTips(obj){
						obj.flag?obj.$current.removeClass('Validform_error'):obj.$current.addClass('Validform_error');
						obj.$current.parent().parent().next().html(obj.tip);
				}
				var rules=[
						[
							{selector:$introducerno},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'介绍人卡号不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						],
						[
							{selector:$introducername},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'介绍人姓名不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						],
						[
							{selector:$memberno},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'会员卡号不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						],
						[
							{selector:$membername},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'会员姓名不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							}
						],
						[
							{selector:$idcard},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'身份证号码不能为空',
								yes:'',
								selfTip:function(obj){	
									selfTips(obj);
								}
							},
							{
								rule:function(str){return ValidFn.isIDCard(str)},
								no:'身份证号码不正确',
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
										window.location.href='member_applycard.html';
									},2000);
							},200);
							
						}else{
							//表单提交
							$applyaction.submit();
						}
				}
				
				
				
				
		});
})(Zepto,window);