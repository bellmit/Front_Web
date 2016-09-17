/*login*/
(function($){
	$(function(){

		if(public_tool.initMap.isrender){
			//dom节点引用或者其他变量定义
			var $loginform=$('#login'),
				$username=$('#username'),
				$pwd=$('#passwd'),
			$error_wrap=$('#error_wrap'),
				error_tpl='<div class="alert alert-danger">\
								<button type="button" class="close" data-dismiss="alert">\
									<span aria-hidden="true">&times;</span>\
									<span class="sr-only">Close</span>\
								</button>\$info\
							</div>';

			//初始化效果
			setTimeout(function(){
				$(".fade-in-effect").addClass('in');
			},1);


			//异步校验
			$loginform.validate({
				rules: {
					username: {
						required: true
					},
					passwd: {
						required: true,
						minlength:6
					}
				},

				messages: {
					username: {
						required: '请输入用户名'
					},
					passwd: {
						required: '请输入密码',
						minlength:'密码必须超过6位字符'
					}
				},

				//提交表单
				submitHandler: function(form){
					show_loading_bar(70);

					var opts = {
						"closeButton": true,
						"debug": false,
						"positionClass": "toast-top-full-width",
						"onclick": null,
						"showDuration": "300",
						"hideDuration": "1000",
						"timeOut": "5000",
						"extendedTimeOut": "1000",
						"showEasing": "swing",
						"hideEasing": "linear",
						"showMethod": "fadeIn",
						"hideMethod": "fadeOut"
					};


					var cacheLogin=public_tool.getParams('login_module');

					if(cacheLogin){
						/*如果存在缓存，则删除缓存*/
						public_tool.removeParams('login_module');
					}


					$.ajax({
						url: "http://120.24.226.70:8081/yttx-agentbms-api/sysuser/login",
						method: 'POST',
						dataType: 'json',
						async:false,
						data: {
							username:$username.val(),
							password:$pwd.val()
						}
					}).done(function(resp){
						var code=parseInt(resp.code,10),
							result=resp.result;


						//显示错误
						if(code!==0){
							$error_wrap.html(error_tpl.replace('$info',resp.message));
							$error_wrap.find('.alert').hide().slideDown();
							$pwd.select();
							return false;
						}


						$error_wrap.html(error_tpl.replace('$info',resp.message));
						$error_wrap.find('.alert').hide().slideDown();


						//移除提示的错误信息
						$error_wrap.find('.alert').slideUp('fast');


						//放入本地存储
						public_tool.setParams('login_module',{
							'isLogin':true,
							'datetime':moment().format('YYYY-MM-DD|HH:mm:ss'),
							'param':{
								'adminId':encodeURIComponent(result.adminId),
								'token':encodeURIComponent(result.token),
								'roleId':encodeURIComponent(result.roleId||4),
								'grade':encodeURIComponent(result.grade||-1)
							}
						});

						//调用进度条组件
						show_loading_bar({
							delay: .5,
							pct: 100,
							finish: function(){
								if(code===0){
									//成功后跳入主页面
									location.href = '../index.html';
								}
							}
						});


					}).fail(function(){
						//移除提示的错误信息
						$error_wrap.find('.alert').slideUp('fast');
						//显示错误信息
						$error_wrap.html(error_tpl.replace('$info','登陆失败请重新登陆'));
						$error_wrap.find('.alert').hide().slideDown();
						$pwd.select();
					});
					return false;

				}
			});



			//设置获取焦点
			$loginform.find(".form-group:has(.form-control):first .form-control").focus();



		}
	});
})(jQuery);