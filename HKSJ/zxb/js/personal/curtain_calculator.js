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
		
			
			
			var $curtain_form=$('#curtain_form'),
					$window_width=$('#window_width'),
					$drapery=$('#drapery'),
					$window_height=$('#window_height'),
					$computing_result=$('#computing_result'),
					validobj=null,
					dia=dialog();

		

			
			
			
			//校验规则
			var ruleobj=[{
							ele:$window_width,
							datatype:"selffloat",
							nullmsg: "房间信息'宽'不能为空",
							errormsg: "房间信息'宽'只能为数字",
							sucmsg: ""
					},{
						ele:$window_height,
						datatype:"selffloat",
						nullmsg: "房间信息'高'不能为空",
						errormsg: "房间信息'高'只能为数字",
						sucmsg: ""
					},{
						ele:$drapery,
						datatype:"selfpercent",
						nullmsg: "房间信息'长'不能为空",
						errormsg: "房间信息'长'只能为非0数字",
						sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					drapery:'',
					window_width:'',
					window_height:''
			};
			

		
			//表单校验
		  validobj=$curtain_form.Validform({
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
						result['drapery']=$drapery.val();
						result['window_width']=$window_width.val();
						result['window_height']=$window_height.val();
						
						//窗帘计算
						$computing_result.html(Calculator.calCurtain(result));
					
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
