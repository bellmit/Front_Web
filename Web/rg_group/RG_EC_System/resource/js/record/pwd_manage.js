/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'rule':'js/widgets/rules',
		'validform':'js/plugins/validform',
		'commonfn':'js/widgets/commonfn'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'commonfn':{
				deps:['jquery','rule']
		}
	}
});



/*程序入口*/
require(['jquery','bootstrap','common','dialog','rule','validform','commonfn'], function($,$strap,undefined,undefined,Rule,undefined,CommonFn) {
	$(function() {
		/*页面元素引用*/
		var $pwd_tab=$('#pwd_tab'),
				$sysUserEditForm1=$('#sysUserEditForm1'),
				$sysUserEditForm2=$('#sysUserEditForm2'),
				$oldPassword=$('#oldPassword'),
				$newPassword=$('#newPassword'),
				$newPassword2=$('#newPassword2'),
				$oldPasswordTwo=$('#oldPasswordTwo'),
				$newPasswordTwo=$('#newPasswordTwo'),
				$newPassword2Two=$('#newPassword2Two'),
				$verifyCode1=$('#verifyCode1'),
				$verifyCode2=$('#verifyCode2'),
				$verifyCode_img1=$('#verifyCode_img1'),
				$verifyCode_img2=$('#verifyCode_img2'),
				$userpwd_wrap=$('#userpwd_wrap'),
				$paypwd_wrap=$('#paypwd_wrap');

			
		//表单校验
		var tipobj={
						oldPassword:'',
						newPassword:'',
						newPassword2:'',
						oldPasswordTwo:'',
						newPasswordTwo:'',
						newPassword2Two:'',
						verifyCode1:'',
						verifyCode2:''
				},
				ruleobj1=[{
					ele:$oldPassword,
					datatype:"*8-16",
					nullmsg: "用户旧密码不能为空",
					errormsg: "用户旧密码长度为8-16位",
					sucmsg: ""
				},{
						ele:$newPassword,
						datatype:"selfpwd",
						nullmsg: "用户新密码不能为空",
						errormsg: "用户新密码长度为8-16位",
						sucmsg: ""
				},{
						ele:$newPassword2,
						datatype:"selfrepwd",
						nullmsg: "用户重复新密码不能为空",
						errormsg: "用户重复新密码长度为8-16位",
						sucmsg: ""
				},{
						ele:$verifyCode1,
						datatype:"n4-4",
						nullmsg: "验证码不能为空",
						errormsg: "验证码长度为4位",
						sucmsg: ""
				}],
				ruleobj2=[{
					ele:$oldPasswordTwo,
					datatype:"*8-16",
					nullmsg: "支付旧密码不能为空",
					errormsg: "支付旧密码长度为8-16位",
					sucmsg: ""
				},{
						ele:$newPasswordTwo,
						datatype:"selfpwd",
						nullmsg: "支付新密码不能为空",
						errormsg: "支付新密码长度为8-16位",
						sucmsg: ""
				},{
						ele:$newPassword2Two,
						datatype:"selfrepwd",
						nullmsg: "支付重复新密码不能为空",
						errormsg: "支付重复新密码长度为8-16位",
						sucmsg: ""
				},{
						ele:$verifyCode2,
						datatype:"n4-4",
						nullmsg: "验证码不能为空",
						errormsg: "验证码长度为4位",
						sucmsg: ""
				}];
				
		var validfun={
				ajaxPost: true,
				datatype:{
					'selfpwd':function(gets,obj,curform,regxp){
							var txt=CommonFn.trims(gets),
									len=txt.length;
							if(len>16||len<8){
									return "新密码长度为8-16位";
							}else{
									var id=obj[0].id,
											pwd='';
									if(id=='newPassword'){
											pwd=$oldPassword.val();
									}else if(id=='newPasswordTwo'){
											pwd=$oldPasswordTwo.val();
									}
									return pwd==txt?'新密码与旧密码不能相同':true;
							}
					},
					'selfrepwd':function(gets,obj,curform,regxp){
							var txt=CommonFn.trims(gets),
									len=txt.length;
							if(len>16||len<8){
									return "重复新密码长度为8-16位";
							}else{
									var id=obj[0].id,
											pwd='';
									if(id=='newPassword2'){
											pwd=$newPassword.val();
									}else if(id=='newPassword2Two'){
											pwd=$newPasswordTwo.val();
									}
									return pwd!=txt?'重复新密码与新密码不一致':true;
							}
					}
				},
				beforeSubmit: function(curform) {
					/*to do*/
					//send ajax 填充具体业务逻辑
					//开发时开启下部代码
					var dia=null,
					issucces=false;
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:'相关请求参数',
							success: function(data){
									if(data){									
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-cyan1">保存成功</span>'
											}).show();
											issucces=true;
									}else{
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-red2">保存失败</span>'
											}).show();
									}
							},
							error: function(){
									dia=dialog({
										title:'温馨提示',
										width:200,
										content:'<span class="g-c-red2">保存失败</span>'
									}).show();
							}
					});
					setTimeout(function(){
						dia.close().remove();
						if(issucces){
							window.location.href='需要跳转的地址';
						}
					},3000);
					return false;
				},
				tiptype: function(msg,o) { 
					var id=o.obj[0].id,
					curtype=o.type;
					if(curtype==1||curtype==3){
							if(typeof tipobj[id]==='string'){
									tipobj[id]=dialog({
									content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
									align:'right',
									padding:8
								});
								tipobj[id].show(document.getElementById(id));
							}else if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
								tipobj[id].show();
							}
					}else if(curtype==2){
							if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
								setTimeout(function(){
										tipobj[id].close();
								},1000);
							}
					}
				}
			};
				
		$validobj1=$sysUserEditForm1.Validform(validfun);
		$validobj2=$sysUserEditForm2.Validform(validfun);
		//添加校验规则
		$validobj1.addRule(ruleobj1);
		$validobj2.addRule(ruleobj2);


		//绑定切换编辑状态ruleobj
		$pwd_tab.delegate('a','click',function(e){
				e.preventDefault();
				var $this=$(this),
						index=$this.parent().index();
				//tab 高亮
				$this.tab('show');
				//tab显示区域切换
				if(index==0){
						$userpwd_wrap.show();
						$paypwd_wrap.hide();
				}else if(index==1){
						$userpwd_wrap.hide();
						$paypwd_wrap.show();
				}
				//清除关闭提示信息
				for(var i in tipobj){
						if(typeof tipobj[i]!=='string'){
								tipobj[i].close();
						}
				}
				return false;
		});
		
		
		//绑定验证码上移除提示信息
		$.each([$verifyCode1,$verifyCode2],function(){
			var selector=this.selector.slice(1);
			this.on('mouseleave',function(){
				if(typeof tipobj[selector]!=='string'){
					tipobj[selector].close();
				}
			});
		});
		
		
		
		
	});
});
