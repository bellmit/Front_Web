/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/manage_cityselect',
		'cookie':'plugins/cookie'
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
require(['jquery','dialog','rule','commonfn','validform','city_select','cookie','common'],
function($,undefined,Rule,CommonFn,undefined,City_Select,undefined,Common) {
	$(function() {
			//页面元素获取
			var $merchant_form=$('#merchant_form'),
					$companyname=$('#companyname'),
					$address=$('#address'),
					$mobile=$('#mobile'),
					$province_name=$('#province_name'),
					$city_name=$('#city_name'),
					$area_name=$('#area_name'),
					validobj=null,
					dia=dialog();
			
		
			
			
			//省份和城市选择
			City_Select.areaSelect({
					$province:$province_name,
					$city:$city_name,
					$area:$area_name
			});
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$companyname,
						datatype:"*",
						nullmsg: "公司名称不能为空",
						errormsg: "公司名称信息不正确",
						sucmsg: ""
					},{
							ele:$mobile,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码格式不正确",
							sucmsg: ""
					},{
							ele:$address,
							datatype:"*",
							nullmsg: "公司地址不能为空",
							errormsg: "公司地址信息不正确",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					companyname:'',
					mobile:'',
					address:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$merchant_form.Validform({
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
												//to do 
												
																		
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red2">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red2">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
								
								
							}
						},3000);
						return false;
					},
					tiptype:function(msg,o) { 
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
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			
		
			
			
			
			

			
			
			
	});
});
