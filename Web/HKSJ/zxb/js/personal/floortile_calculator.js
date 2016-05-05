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
		'cookie':'plugins/cookie',
		'calculator':'personal/calculator'
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
require(['jquery','dialog','rule','commonfn','validform','cookie','common','calculator'],
function($,undefined,Rule,CommonFn,undefined,undefined,Common,Calculator) {
	$(function() {
			//页面元素获取
		
			
			
			var $floortile_form=$('#floortile_form'),
					$room_width=$('#room_width'),
					$room_long=$('#room_long'),
					$floorbrick_spec=$('#floorbrick_spec'),
					$floorbrick_long=$('#floorbrick_long'),
					$floorbrick_width=$('#floorbrick_width'),
					$computing_result=$('#computing_result'),
					validobj=null,
					dia=dialog();

		

			
			
			
			//校验规则
			var ruleobj=[{
							ele:$room_width,
							datatype:"selffloat",
							nullmsg: "房间信息'宽'不能为空",
							errormsg: "房间信息'宽'只能为数字",
							sucmsg: ""
					},{
						ele:$room_long,
						datatype:"selffloat",
						nullmsg: "房间信息'长'不能为空",
						errormsg: "房间信息'长'只能为数字",
						sucmsg: ""
					},{
						ele:$floorbrick_long,
						datatype:"selffloat",
						nullmsg: "地板规格'长'不能为空",
						errormsg: "地板规格'长'只能为数字",
						sucmsg: ""
					},{
							ele:$floorbrick_width,
							datatype:"selffloat",
							nullmsg: "地板规格'宽'不能为空",
							errormsg: "地板规格'宽'只能为数字",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					room_long:'',
					room_width:'',
					floorbrick_long:'',
					floorbrick_width:''
			};
			
			//绑定地板初始化选中
			(function(){
					var sel_spec=$floorbrick_spec.children(),
					spec_item=sel_spec.eq(0).val().split('*');
					$floorbrick_long.val(spec_item[0]);
					$floorbrick_width.val(spec_item[1]);
			}());
			//绑定切换地板规格
			$floorbrick_spec.on('change',function(){
					var text=this.value.split('*');
					$floorbrick_long.val(text[0]);
					$floorbrick_width.val(text[1]);
			});
			
			
			
					
			//表单校验
		  validobj=$floortile_form.Validform({
					ajaxPost: true,
					datatype:{
						'selffloat':function(gets,obj,curform,regxp){
								return Rule.pointnum.test(gets);
						},
						'selfpercent':function(gets,obj,curform,regxp){
								return Rule.pointnum.test(gets)&&gets!='0';
						}
					},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['room_long']=$room_long.val();
						result['room_width']=$room_width.val();
						result['floorbrick_long']=$floorbrick_long.val();
						result['floorbrick_width']=$floorbrick_width.val();
						
						//地砖计算
						$computing_result.html(Calculator.calFloorBrick(result));
					
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
