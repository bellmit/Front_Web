/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/manage_cityselect',
		'cookie':'plugins/cookie',
		'date97':'plugins/My97DatePicker/WdatePicker',
		'datepick':'widgets/datepick'
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
require(['jquery','dialog','rule','commonfn','validform','city_select','cookie','date97','datepick','common'],
function($,undefined,Rule,CommonFn,undefined,City_Select,undefined,undefined,undefined,Common) {
	$(function() {
			//页面元素获取
			var $newrenovation_form=$('#newrenovation_form'),
					$name=$('#name'),
					$telphone_num=$('#telphone_num'),
					$residential_name=$('#residential_name'),
					$renovation_type=$('#renovation_type'),
					$room_square_meter=$('#room_square_meter'),
					$renovation_method=$('#renovation_method'),
					$renovation_money=$('#renovation_money'),
					$recive_time=$('#recive_time'),
					$renovation_time=$('#renovation_time'),
					$requirement=$('#requirement'),
					$province_name=$('#province_name'),
					$city_name=$('#city_name'),
					$area_name=$('#area_name'),
					validobj=null,
					dia=dialog();
			
			
			
			//时间日历对象调用
			$.datePick([$recive_time]);
			$.datePick([$renovation_time]);	
			
			
			
			//省份和城市选择
			City_Select.areaSelect({
					$province:$province_name,
					$city:$city_name,
					$area:$area_name
			});
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$name,
						datatype:"*",
						nullmsg: "称呼不能为空",
						errormsg: "称呼信息不正确",
						sucmsg: ""
					},{
							ele:$telphone_num,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码格式不正确",
							sucmsg: ""
					},{
							ele:$residential_name,
							datatype:"*",
							nullmsg: "小区名称不能为空",
							errormsg: "小区名称信息不正确",
							sucmsg: ""
					},{
							ele:$room_square_meter,
							datatype:"n1-5",
							nullmsg: "面积不能为空",
							errormsg: "面积不能过大",
							sucmsg: ""
					},{
							ele:$recive_time,
							datatype:"*",
							nullmsg: "交房时间不能为空",
							errormsg: "交房时间信息错误",
							sucmsg: ""
					},{
							ele:$renovation_time,
							datatype:"*",
							nullmsg: "装修时间不能为空",
							errormsg: "装修时间信息错误",
							sucmsg: ""
					},{
							ele:$requirement,
							datatype:"*",
							nullmsg: "装修要求不能为空",
							errormsg: "装修要求信息错误",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					name:'',
					telphone_num:'',
					residential_name:'',
					room_square_meter:'',
					recive_time:'',
					renovation_time:'',
					requirement:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$newrenovation_form.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
						}
					},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['name']=$name.val();
						result['telphone_num']=$telphone_num.val();
						result['province']=$province_name.val();
						result['city']=$city_name.val();
						result['town']=$area_name.val();
						result['residential_name']=$residential_name.val();
						result['renovation_type']=$renovation_type.val();
						result['area']=$room_square_meter.val();
						result['renovation_method']=$renovation_method.val();
						result['renovation_money']=$renovation_money.val();
						result['recive_time']=$recive_time.val();
						result['renovation_time']=$renovation_time.val();
						result['requirement']=$requirement.val();
						result['recive_time']=$recive_time.val();
						
						
						
						
						
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/newrenovation.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
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
