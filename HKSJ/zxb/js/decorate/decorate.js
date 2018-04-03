/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
		'modal_dialog':'widgets/modal_dialog'
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
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','cookie','common'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common) {
	$(function() {
			//页面元素获取
			var $decorate_form1=$('#decorate_form1'),
			$customname1=$('#customname1'),
			$custommobile1=$('#custommobile1'),
			$customname2=$('#customname2'),
			$custommobile2=$('#custommobile2'),
			$decorate_form2=$('#decorate_form2'),
			$customprovince1=$('#customprovince1'),
			$customcity1=$('#customcity1'),
			$customprovince2=$('#customprovince2'),
			$customcity2=$('#customcity2'),
			$customprovince_text1=$('#customprovince_text2'),
			$customcity_text1=$('#customcity_text1'),
			$customprovince_text2=$('#customprovince_text2'),
			$customcity_text2=$('#customcity_text2'),
			$formtip1=$('#formtip1'),
			$formtip2=$('#formtip2'),
			validobj1=null,
			validobj2=null,
			dia=dialog({
					cancel:false
			});
			
			
			
			//校验规则
			var ruleobj1=[{
						ele:$customname1,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息不正确",
						sucmsg: ""
					},{
							ele:$custommobile1,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码不正确",
							sucmsg: ""
					},{
							ele:$customprovince_text1,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text1,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}],
					ruleobj2=[{
						ele:$customname2,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息不正确",
						sucmsg: ""
					},{
							ele:$custommobile2,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码不正确",
							sucmsg: ""
					},{
							ele:$customprovince_text2,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text2,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}];
			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince1,
					$city:$customcity1,
					$area:null
			});
			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince2,
					$city:$customcity2,
					$area:null
			});
			
			
			//表单验证1
			var issucces1=false;
		  validobj1=$decorate_form1.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
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
								$formtip1.text(msg);
						}else if(curtype==2){
								$formtip1.text('');
						}
					}
			});
			validobj1.addRule(ruleobj1);
			
			
			//表单验证2
			var issucces2=false;
		  validobj2=$decorate_form2.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
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
								$formtip2.text(msg);
						}else if(curtype==2){
								$formtip2.text('');
						}
					}
			});
			validobj2.addRule(ruleobj2);
			
			
			//服务滚动区
			(function(){
					var $roll_wrap=$('#roll_wrap'),
							$roll_item=$roll_wrap.children(),
							roll_size=$roll_item.size(),
							roll_height=roll_size>2?roll_size * 20:40,
							roll_index=0,
							roll_id=null,
							animate_id=null;
							//初始化
							$roll_wrap.height(roll_height);
							//滚动
							function roll_scroll(){
									roll_index++;
									if(roll_index==roll_size - 1){
										roll_index=0;
									}
									if(roll_index==0){
										$roll_wrap.css({
											 'top':-(roll_index * 20)
										});
									}else{
										animate_id=$roll_wrap.animate({
											 'top':-(roll_index * 20)
										},500);
									}	
							}
							if(roll_size>2){
								roll_id=setInterval(function(){
									roll_scroll();
								},5000);
							}
							//绑定事件
							$roll_wrap.hover(function(){
								clearInterval(roll_id);
								roll_id=null;
								$roll_wrap.stop(animate_id,true,false);
							},function(){
								roll_id=setInterval(function(){
									roll_scroll();
								},5000);
							});
			}());
			
			
	});
});
