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
		
			
			
			var $paint_form=$('#paint_form'),
					$room_long=$('#room_long'),
					$room_width=$('#room_width'),
					$room_height=$('#room_height'),
					$door_height=$('#door_height'),
					$door_width=$('#door_width'),
					$door_num=$('#door_num'),
					$window_height=$('#window_height'),
					$window_width=$('#window_width'),
					$window_num=$('#window_num'),
					$cover_wrap=$('#cover_wrap'),
					$computing_result=$('#computing_result'),
					validobj=null,
					dia=dialog();

		

			
			
			
			//校验规则
			var ruleobj=[{
						ele:$room_long,
						datatype:"selffloat",
						nullmsg: "房间信息'长'不能为空",
						errormsg: "房间信息'长'只能为数字",
						sucmsg: ""
					},{
							ele:$room_width,
							datatype:"selffloat",
							nullmsg: "房间信息'宽'不能为空",
							errormsg: "房间信息'宽'只能为数字",
							sucmsg: ""
					},{
						ele:$room_height,
						datatype:"selffloat",
						nullmsg: "房间信息'高'不能为空",
						errormsg: "房间信息'高'只能为数字",
						sucmsg: ""
					},{
							ele:$door_height,
							datatype:"selffloat",
							nullmsg: "房门信息'长'不能为空",
							errormsg: "房门信息'长'只能为数字",
							sucmsg: ""
					},{
						ele:$door_width,
						datatype:"selffloat",
						nullmsg: "房门信息'宽'不能为空",
						errormsg: "房门信息'宽'只能为数字",
						sucmsg: ""
					},{
							ele:$door_num,
							datatype:"selffloat",
							nullmsg: "房门信息'扇数'不能为空",
							errormsg: "房门信息'扇数'只能为数字",
							sucmsg: ""
					},{
							ele:$window_height,
							datatype:"selffloat",
							nullmsg: "窗户信息'长'不能为空",
							errormsg: "窗户信息'长'只能为数字",
							sucmsg: ""
					},{
							ele:$window_width,
							datatype:"selffloat",
							nullmsg: "窗户信息'宽'不能为空",
							errormsg: "窗户信息'宽'只能为数字",
							sucmsg: ""
					},{
							ele:$window_num,
							datatype:"selffloat",
							nullmsg: "窗户信息'扇数'不能为空",
							errormsg: "窗户信息'扇数'只能为数字",
							sucmsg: ""
					},{
							ele:$cover_wrap,
							datatype:"selfpercent",
							nullmsg: "涂料覆盖率不能为空",
							errormsg: "涂料覆盖率只能为非0数字",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					room_long:'',
					room_width:'',
					room_height:'',
					door_height:'',
					door_width:'',
					door_num:'',
					window_height:'',
					window_width:'',
					window_num:'',
					cover_wrap:''
			};
			
					
			//表单校验
		  validobj=$paint_form.Validform({
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
						result['room_height']=$room_height.val();
						result['door_height']=$door_height.val();
						result['door_width']=$door_width.val();
						result['door_num']=$door_num.val();
						result['window_height']=$window_height.val();
						result['window_width']=$window_width.val();
						result['window_num']=$window_num.val();
						result['paintrate']=$cover_wrap.val();
						
						//涂料计算
						$computing_result.html(Calculator.calPaint(result));
					
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
