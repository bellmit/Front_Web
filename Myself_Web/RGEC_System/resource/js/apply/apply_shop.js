/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery']
		},
		'themetitle':{
				deps:['jquery','common']
		},
		'commonfn':{
				deps:['jquery','rule']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','rule','commonfn'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,Rule,CommonFn) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$register_wrap=$('#register_wrap');
					
			
					//表单base
			var	$register_base=$('#register_base'),
					$applyno=$('#applyno'),
					$applyname=$('#applyname'),
					$applytype=$('#applytype'),
					$usercode=$('#usercode'),
					$idcard=$('#idcard'),
					basetip={
							applyno:'',
							applyname:'',
							usercode:'',
							idcard:''
					},
					$basevalid=null;
					
					
					//表单receive
			var $register_receive=$('#register_receive'),
					$country=$('#country')
					$province=$('#province'),
					$city=$('#city'),
					$district=$('#district'),
					$address=$('#address'),
					$postno=$('#postno'),
					$telephone=$('#telephone'),
					$mobile=$('#mobile'),
					receivetip={
							country:'',
							province:'',
							city:'',
							district:'',
							address:'',
							mobile:''
					},
					$receivevalid=null;
					
					
					//表单bank
			var $register_bank=$('#register_bank'),
					$bank=$('#bank'),
					$accountname=$('#accountname'),
					$accountno=$('#accountno'),
					banktip={
							accountname:'',
							accountno:''
					},
					$bankvalid=null;
					
					
					//表单login
			var	$register_login=$('#register_login'),
					$loginpassword=$('#loginpassword'),
					$reloginpassword=$('#reloginpassword'),
					logintip={
							loginpassword:'',
							reloginpassword:''
					},
					$loginvalid=null;
			
			var tiplist=[basetip,receivetip,banktip,logintip],
					nodelist=[[$applyno,$applyname,$usercode,$idcard],
					[$country,$province,$city,$district,$address,$mobile],
					[$accountname,$accountno],
					[$loginpassword,$reloginpassword]];
			
			
					//添加校验规则
			var baserule=[{
							ele:$applyno,
							datatype: "n7-7",
							nullmsg: "申请人卡号不能为空",
							errormsg: "申请人卡号必须是7位数字",
							sucmsg: ""
						},{
							ele:$applyname,
							datatype: "*",
							nullmsg: "申请人姓名不能为空",
							errormsg: "申请人姓名不存在",
							sucmsg: ""
						},{
							ele:$usercode,
							datatype: "*",
							nullmsg: "用户编码不能为空",
							errormsg: "用户编码不存在",
							sucmsg: ""
						},{
							ele:$idcard,
							datatype: "selfIdCard",
							nullmsg: "身份证不能为空",
							errormsg: "身份证格式不合法",
							sucmsg: ""
						}];
			
				
			var receiverule=[{
							ele:$country,
							datatype: "*",
							nullmsg: "所在国家不能为空",
							errormsg: "所在国家信息不正确",
							sucmsg: ""
						},
						{
							ele:$province,
							datatype: "*",
							nullmsg: "所在省份不能为空",
							errormsg: "所在身份信息不正确",
							sucmsg: ""
						},
						{
							ele:$city,
							datatype: "*",
							nullmsg: "所在城市不能为空",
							errormsg: "所在城市信息不正确",
							sucmsg: ""
						},
						{
							ele:$district,
							datatype: "*",
							nullmsg: "所在县市不能为空",
							errormsg: "所在县市信息不正确",
							sucmsg: ""
						},
						{
							ele:$address,
							datatype: "*",
							nullmsg: "详细地址不能为空",
							errormsg: "详细地址信息不正确",
							sucmsg: ""
						},
						{
							ele:$mobile,
							datatype: "selfMobile",
							nullmsg: "手机号码不能为空",
							errormsg: "手机号码格式不合法",
							sucmsg: ""
						}];
			
			
				var bankrule=[{
							ele:$accountname,
							datatype: "*",
							nullmsg: "开户名不能为空",
							errormsg: "开户名信息不正确",
							sucmsg: ""
						},
						{
							ele:$accountno,
							datatype: "selfBankNo",
							nullmsg: "开户账号不能为空",
							errormsg: "开户账号一般为19位数字",
							sucmsg: ""
						}];
						
						
				var loginrule=[{
							ele:$loginpassword,
							datatype: "*8-16",
							nullmsg: "登录密码不能为空",
							errormsg: "登录密码需8-16字符",
							sucmsg: ""
						},
						{
							ele:$reloginpassword,
							datatype: "*",
							recheck:"loginPassword",
							nullmsg: "重复登录密码不能为空",
							errormsg: "重复登录密码与登录密码不一致",
							sucmsg: ""
						}];
			
			
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);	
			
			//子导航点击事件
			$submenu.subMenuItem(function(){
					var $this=this,
					$li=$register_wrap.children();
					type=$this.find('a').attr('data-type');
					$li.each(function(index, element) {
							var $cur=$(this);
            	if($cur.attr('data-type')==type){
								$cur.removeClass('g-d-hide').siblings().addClass('g-d-hide');
								return false;
							}
          });
					//清除表单提示，重置表单校验
					$.each(tiplist,function(index,value){
							var curitem=this,
							nodeitem=nodelist[index],
							nodelen=nodeitem.length;
							for(var j=0;j<nodelen;j++){
								nodeitem[j].removeClass('Validform_error');
								nodeitem[j].removeAttr('datatype');
								nodeitem[j].removeAttr('nullmsg');
								nodeitem[j].removeAttr('errormsg');
								nodeitem[j].removeAttr('sucmsg');
								nodeitem[j].removeAttr('recheck');
							}
							for(var i in curitem){
									if(typeof curitem[i]==='object'){
											curitem[i].close();
									}
							}
					});
					//重新添加规则
					$basevalid.addRule(baserule);
					$receivevalid.addRule(receiverule);
					$bankvalid.addRule(bankrule);
					$loginvalid.addRule(loginrule);
					
			},false);
			
			
			
			//表单base交互
			$basevalid=$register_base.Validform({
					ajaxPost: true,
					datatype:{
						//自定义校验方式
						'selfIdCard':function(gets,obj,curform,regxp){
								return CommonFn.isIDCard(gets);
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
													content:'<span class="g-c-red4">保存失败</span>'
												}).show();
												issucces=false;
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">保存失败</span>'
										}).show();
										issucces=false;
								}
						});
						setTimeout(function(){
							dia.close().remove();
							if(issucces){
								//开发阶段请填充跳转地址或者其他业务逻辑
								
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof basetip[id]==='string'){
										basetip[id]=dialog({
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									basetip[id].show(document.getElementById(id));
								}else if(typeof basetip[id]!=='string'){
									basetip[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
									basetip[id].show();
								}
						}else if(curtype==2){
								if(typeof basetip[id]!=='string'){
									basetip[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
									setTimeout(function(){
											basetip[id].close();
									},1000);
								}
						}
					}
				});
				$basevalid.addRule(baserule);
			
			
			
			//表单receive交互
			//会员联系电话格式化
			$mobile.on('keyup',function(e){
					var val=this.value;
					val=val.replace(/\D*/g,'');
					val=CommonFn.phoneFormat(val);
					this.value=val;
			});
			
			
			//receive表单校验
			$receivevalid=$register_receive.Validform({
					ajaxPost: true,
					datatype:{
						//自定义校验方式
						'selfMobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
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
													content:'<span class="g-c-red4">保存失败</span>'
												}).show();
												issucces=false;
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">保存失败</span>'
										}).show();
										issucces=false;
								}
						});
						setTimeout(function(){
							dia.close().remove();
							if(issucces){
								//开发阶段请填充跳转地址或者其他业务逻辑
								
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof receivetip[id]==='string'){
										receivetip[id]=dialog({
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									receivetip[id].show(document.getElementById(id));
								}else if(typeof receivetip[id]!=='string'){
									receivetip[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
									receivetip[id].show();
								}
						}else if(curtype==2){
								if(typeof receivetip[id]!=='string'){
									receivetip[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
									setTimeout(function(){
											receivetip[id].close();
									},1000);
								}
						}
					}
				});
				$receivevalid.addRule(receiverule);
			
			
			
			
			//表单bank交互
			//银行账户格式化
			$accountno.on('keyup',function(e){
				var val=this.value;
				val=val.replace(/\D*/g,'');
				val=CommonFn.cardFormat(val);
				this.value=val;
			});
			
			
			//表单bank校验
			$bankvalid=$register_bank.Validform({
					ajaxPost: true,
					datatype:{
						//自定义校验方式
						'selfBankNo':function(gets,obj,curform,regxp){
								var reg=/^[0-9]{19}$/g;
								return reg.test(CommonFn.trims(gets));
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
													content:'<span class="g-c-red4">保存失败</span>'
												}).show();
												issucces=false;
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">保存失败</span>'
										}).show();
										issucces=false;
								}
						});
						setTimeout(function(){
							dia.close().remove();
							if(issucces){
								//开发阶段请填充跳转地址或者其他业务逻辑
								
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof banktip[id]==='string'){
										banktip[id]=dialog({
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									banktip[id].show(document.getElementById(id));
								}else if(typeof banktip[id]!=='string'){
									banktip[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
									banktip[id].show();
								}
						}else if(curtype==2){
								if(typeof banktip[id]!=='string'){
									banktip[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
									setTimeout(function(){
											banktip[id].close();
									},1000);
								}
						}
					}
				});
				$bankvalid.addRule(bankrule);
			

			
			//表单login交互
			$loginvalid=$register_login.Validform({
					ajaxPost: true,
					datatype:{
						//自定义校验方式
						
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
													content:'<span class="g-c-red4">保存失败</span>'
												}).show();
												issucces=false;
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">保存失败</span>'
										}).show();
										issucces=false;
								}
						});
						setTimeout(function(){
							dia.close().remove();
							if(issucces){
								//开发阶段请填充跳转地址或者其他业务逻辑
								
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof logintip[id]==='string'){
										logintip[id]=dialog({
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									logintip[id].show(document.getElementById(id));
								}else if(typeof logintip[id]!=='string'){
									logintip[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
									logintip[id].show();
								}
						}else if(curtype==2){
								if(typeof logintip[id]!=='string'){
									logintip[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
									setTimeout(function(){
											logintip[id].close();
									},1000);
								}
						}
					}
				});
				$loginvalid.addRule(loginrule);
			
			
			
			
			
			
	});
});
