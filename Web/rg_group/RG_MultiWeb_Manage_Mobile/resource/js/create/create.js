/*程序入口*/
(function($,w){
	$(function() {
		/*页面元素引用*/
		var $createaction=$('#createaction'),
				$createsubmit=$('#createsubmit'),
				$site_name=$('#site_name'),
				$site_mobile=$('#site_mobile'),
				$site_email=$('#site_email'),
				$site_addr=$('#site_addr');
			
			
		//设置校验对象
		var rules=[
		[
			{selector:$site_name},
			{
				require:function(str){return ValidFn.isRequire(str)},
				no:'微网站名称不能为空',
				yes:''
			}
		],
		[
			{selector:$site_mobile},
			{
				require:function(str){return ValidFn.isRequire(str)},
				no:'手机号码不能为空',
				yes:''
			},
			{
				rule:function(str){return ValidFn.isMobilePhone(str)},
				no:'手机号码不符合法',
				yes:''
			}
		],
		[
			{selector:$site_email},
			{
				require:function(str){return ValidFn.isRequire(str)},
				no:'邮箱地址不能为空',
				yes:''
			},
			{
				rule:function(str){return ValidFn.isEmail(str)},
				no:'邮箱地址不合法',
				yes:''
			}
		],
		[
			{selector:$site_addr},
			{
				require:function(str){return ValidFn.isRequire(str)},
				no:'联系地址不能为空',
				yes:''
			}
		]
		];
		
		//设置校验全局对象           
		$.setValidtorSet({
			isajax:false//如果是ajax提交
		});
		
		//表单校验
		$createsubmit.on($.EventName.click,function(e){
			e.preventDefault();
			$.Validator($createaction,rules);
			return false;
		});
		
		//定义回调函数
			$.ValidCallBack=function(flag){
				if(flag){
					//ajax 提交
					alert('ajax');
				}else{
					//表单提交
					$createaction.submit();
				}
			}

		});
})(Zepto,window);















