/*程序入口*/
(function($,w){
	$(function() {
			/*页面元素引用*/
			var $loginaction=$('#loginaction'),
				$loginsubmit=$('#loginsubmit'),
				$storeno=$('#storeno'),
				$password=$('#password');
				
				
			//设置校验对象
			function selfTips(obj){
						obj.flag?obj.$current.removeClass('Validform_error'):obj.$current.addClass('Validform_error');
						obj.$current.parent().parent().next().html(obj.tip);
			}
			var rules=[
			[
				{selector:$storeno},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'专卖店号不能为空',
					yes:'',
					selfTip:function(obj){	
						selfTips(obj);
					}
				}
			],
			[
				{selector:$password},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'密码不能为空',
					yes:'',
					selfTip:function(obj){	
						selfTips(obj);
					}
				},
				{
					rule:function(str){return ValidFn.isMinMax(str,[6,12])},
					no:'密码必须大于6位小于12位',
					yes:'',
					selfTip:function(obj){	
						selfTips(obj);
					}
				}
			]
			];
			
			
			//表单校验
			$loginsubmit.on($.EventName.click,function(e){
				e.preventDefault();
				$.Validator($loginaction,rules);
				return false;
			});
			
			
			//定义回调函数
			$.ValidCallBack=function(flag){
				if(flag){
					//ajax 提交
					//to do 开发阶段请填充登录业务逻辑
					
					
					//此处为测试，开发阶段可删除
					setTimeout(function(){
						var wraps=$.modal({
								content:'<span class="g-c-green5">登录成功...</span>'
								
							},0,true);
							setTimeout(function(){
								wraps.remove();
								window.location.href='../index.html';
							},2000);
					},200);
					
				}else{
					//表单提交
					$loginaction.submit();
				}
			}
			
			
		});
})(Zepto,window);















