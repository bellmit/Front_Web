/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select'],function($,undefined,Rule,CommonFn,undefined,City_Select) {
	$(function() {
			//页面元素获取
			var $register_tab=$('#register_tab'),
			$form1=$('#register_form1'),
			$form2=$('#register_form2'),
			$customprovince=$('#customprovince'),
			$customcity=$('#customcity'),
			$person_mobile=$('#person_mobile'),
			$person_username=$('#person_username'),
			$person_pwd=$('#person_pwd'),
			$person_validcode=$('#person_validcode'),
			$person_validcodebtn=$('#person_validcodebtn'),
			$register_agree1=$('#register_agree1'),
			$register_btn1=$('#register_btn1'),
			$register_agree2=$('#register_agree2'),
			$register_btn2=$('#register_btn2'),
			$register_isagree1=$('#register_isagree1'),
			$register_isagree2=$('#register_isagree2'),
			$company_name=$('#company_name'),
			$company_contact=$('#company_contact'),
			$company_mobile=$('#company_mobile'),
			$company_email=$('#company_email'),
			validobj1=null,
			validobj2=null,
			//表单校验结果弹出框
			dia=dialog({
					cancel:false
			});
			var validcodeid=null,
			metip=$person_mobile.parents('tr').next().find('td');
			

			//校验规则
			var ruleobj1=[{
						ele:$person_mobile,
						datatype:"selfmobile",
						nullmsg: "个人手机不能为空",
						errormsg: "个人手机信息不正确",
						sucmsg: ""
					},{
							ele:$person_pwd,
							datatype:"*6-18",
							nullmsg: "个人密码不能为空",
							errormsg: "个人密码长度为6-18位",
							sucmsg: ""
					},{
							ele:$person_validcode,
							datatype:"*4-4",
							nullmsg: "个人验证码不能为空",
							errormsg: "个人验证码信息不正确",
							sucmsg: ""
					}],
					ruleobj2=[{
						ele:$company_name,
						datatype:"*",
						nullmsg: "企业用户公司名称不能为空",
						errormsg: "企业用户公司名称信息不正确",
						sucmsg: ""
					},{
							ele:$company_contact,
							datatype:"*",
							nullmsg: "企业用户联系人不能为空",
							errormsg: "企业用户联系人信息不正确",
							sucmsg: ""
					},{
							ele:$company_mobile,
							datatype:"selfmobile",
							nullmsg: "企业用户手机号码不能为空",
							errormsg: "企业用户手机号码不正确",
							sucmsg: ""
					},{
							ele:$company_email,
							datatype:"selfemail",
							nullmsg: "企业用户邮箱不能为空",
							errormsg: "企业用户邮箱不正确",
							sucmsg: ""
					}];

			
			//初始化操作
			(function(){
				
					//开启按钮是否可用状态
					var check=[$register_agree1,$register_agree2],
							btn=[$register_btn1,$register_btn2],
							sessioncheck=[$register_isagree1,$register_isagree2];
					for(var i=0;i<2;i++){
						
							//初始化状态
							var val=sessioncheck[i].val(),
									ischeck=true;
							if(val==''){
									check[i].prop('checked',true);
							}else if(val=='1'){
									check[i].prop('checked',true);
									ischeck=true;
							}else if(val=='0'){
								check[i].prop('checked',false);
								ischeck=false;
							}
							
							//监听状态
							ischeck?btn[i].prop('disabled',false).removeClass('disabled-btn'):btn[i].prop('disabled',true).addClass('disabled-btn');
							
							//绑定事件
							(function(index){
									check[index].on('click',function(){
											var $this=$(this),
													checked=$this.prop('checked');
											
											if(checked){
												btn[index].prop('disabled',false).removeClass('disabled-btn');
												sessioncheck[index].val('1');
											}else{
												btn[index].prop('disabled',true).addClass('disabled-btn');
												sessioncheck[index].val('0');
											}
									});
							})(i);
							
							
					}
					
					
					//开启验证码按钮是否可用状态
					if($person_validcodebtn.prop('disabled')){
							$person_validcodebtn.prop('disabled',false);
					}
					
			}());
			
			
			//绑定手机格式化
			var mobile_list=[$person_mobile,$company_mobile];
			for(j=0;j<2;j++){
					mobile_list[j].on('keyup',function(){
							this.value=CommonFn.phoneFormat(this.value);
					});
			}
			
			


			//绑定发送验证码到手机
			$person_validcodebtn.on('click',function(){
						var text=$person_mobile.val();
						if(text==''){
								metip.text('手机不能为空');
								return false;
						}
						var ismobile=testMobile(text);
						if(typeof ismobile=='string'){
								metip.text(ismobile);
								return false;
						}else if(!ismobile){
							metip.text('手机格式不正确');
							return false;
						}else{
							metip.text('');
						}
						//发送验证码
						CommonFn.getCount(validcodeid,3,$person_validcodebtn,'发送验证码到手机','send-verifydisabled');
						//to do
						//send ajax 这里只是测试，开发时填充具体业务逻辑  发送验证码到手机或邮箱
						//开发时开启下部代码 
						$.ajax({
								url:'../../json/validcode.json',
								type:'post',
								dataType:"json",
								data:'mobile+'+text,
								success: function(data){
									var code=parseInt(Math.random()*10,10);
											if(code%2==0){									
													dia.content('<span class="g-c-green1">发送验证码成功，请看手机查收</span>').show();
											}else{
													dia.content('<span class="g-c-red4">发送验证码失败</span>').show();
											}
								},
								error: function(){
										dia.content('<span class="g-c-red4">发送验证码失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close('');
						},3000);
						
			});
			

			//tab切换
			$register_tab.delegate('li','click',function(){
				var $this=$(this),
				index=$this.index();
				$this.addClass('register-tabactive').siblings().removeClass('register-tabactive');
				if(index===0){
						$form1.removeClass('g-d-hide');
						$form2.addClass('g-d-hide');
				}else{
						$form1.addClass('g-d-hide');
						$form2.removeClass('g-d-hide');
				}
			});
			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince,
					$city:$customcity,
					$area:null
			});
			
			
			
			
			//表单验证1
			var issucces1=false;
		  validobj1=$form1.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return testMobile(gets);
						}
					},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												issucces1=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces1=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces1=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces1){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								curitem.parents('tr').next().find('td').text(msg);
						}else if(curtype==2){
								curitem.parents('tr').next().find('td').text('');
						}
					}
			});
			validobj1.addRule(ruleobj1);
			
			//表单验证2
			var issucces2=false;
		  validobj2=$form2.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return testMobile(gets);
						},
						'selfemail':function(gets,obj,curform,regxp){
								return testEmail(gets);
						}
					},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												issucces2=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces2=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces2=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces2){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								curitem.parents('tr').next().find('td').text(msg);
						}else if(curtype==2){
								curitem.parents('tr').next().find('td').text('');
						}
					}
			});
			validobj2.addRule(ruleobj2);
			
			
	//私有函数
	//判断手机是否已经注册
	function testMobile(str){
		var result=true,
		text=CommonFn.trims(str);
		if(CommonFn.isMobilePhone(text)){
				//判断是否已经存在手机
				$.ajax({
						url:'../../json/validmobile.json',
						type:'post',
						dataType:"json",
						async:false,
						data:'mobile='+text,
						success: function(data){
								//to do
								//这里是测试代码
								//开发阶段请填充具体业务
								var list=data.mobile.splice(0),
								len=list.length,
								i=0;
								if(len!=0){									
										for(i;i<len;i++){
												//如果已经存在手机
												if(list[i]==text){
														result='手机号码已经被注册';
												}
										}
								}else{
										result=true;
								}
						},
						error: function(){
								result=false;
						}
				});
		}else{
				result=false;
		}
		return result;
	}
	//判断邮箱是否已经注册
	function testEmail(str){
		var result=true,
		text=CommonFn.trims(str);
		if(CommonFn.isEmail(text)){
				//判断是否已经存在手机
				$.ajax({
						url:'../../json/validemail.json',
						type:'post',
						dataType:"json",
						async:false,
						data:'email='+text,
						success: function(data){
								//to do
								//这里是测试代码
								//开发阶段请填充具体业务
								var list=data.email.splice(0),
								len=list.length,
								i=0;
								if(len!=0){									
										for(i;i<len;i++){
												//如果已经存在手机
												if(list[i]==text){
														result='手机号码已经被注册';
												}
										}
								}else{
										result=true;
								}
						},
						error: function(){
								result=false;
						}
				});
		}else{
				result=false;
		}
		return result;
	}
			
			
			
			
			
			
			
			
			
			
			
	});
});
