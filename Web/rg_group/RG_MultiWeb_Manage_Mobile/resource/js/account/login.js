/*程序入口*/
(function($,w){
	$(function() {
			/*页面元素引用*/
			var $loginaction=$('#loginaction'),
				$loginsubmit=$('#loginsubmit'),
				$captcha_wrap1=$('#captcha_wrap1'),
				$captcha_wrap2=$('#captcha_wrap2'),
				$user_name=$('#user_name'),
				$password=$('#password'),
				$captcha=$('#captcha');
				
				
			//设置校验对象
			var rules=[
			[
				{selector:$user_name},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'用户名不能为空',
					yes:''
				},
				{
					rule:function(str){return ValidFn.isEMP(str)},
					no:'用户名必须为邮箱或者手机',
					yes:''
				}
			],
			[
				{selector:$password},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'密码不能为空',
					yes:''
				},
				{
					rule:function(str){return ValidFn.isMinMax(str,[6,12])},
					no:'密码必须大于6位小于12位',
					yes:''
				}
			]
			],tempr=[
				{selector:$captcha},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'验证码不能为空',
					yes:''
				},
				{
					rule:function(str){return ValidFn.isMinMax(str,[4,4])},
					no:'验证码位4位字符',
					yes:''
				}
			];
			
			//设置校验全局对象           
			$.setValidtorSet({
				isajax:false//如果是ajax提交息
			});
			
			//表单校验
			$loginsubmit.on($.EventName.click,function(e){
				e.preventDefault();
				$.Validator($loginaction,rules);
				return false;
			});
			
			/*验证码显示情况（如果超过三次则执行定时函数里面的代码）*/
			setTimeout(function(){
				$captcha_wrap1.show();
				$captcha_wrap2.show();
				rules.push(tempr);
			},5000);
		
			
			//定义回调函数
			$.ValidCallBack=function(flag){
				if(flag){
					//ajax 提交
				}else{
					//表单提交
					$loginaction.submit();
				}
			}
			
			
		});
})(Zepto,window);















