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

/*转账内部模块服务类：Transfer*/


/*程序入口*/
require(['jquery','bootstrap','common','dialog','rule','validform','commonfn'], function($,$strap,undefined,undefined,Rule,undefined,CommonFn) {
	$(function() {
		/*页面元素引用*/
		var $miAgentApplyForm=$('#miAgentApplyForm'),
				$country=$('#country'),
				$province=$('#province'),
				$city=$('#city'),
				$district=$('#district'),
				$storeAddr=$('#storeAddr'),
				$mobile=$('#mobile'),
				$guide1=$('#guide1'),
				$guide2=$('#guide2');
				
		
		//手机号格式化
		$mobile.on('keyup',function(e){
				var val=this.value;
				val=val.replace(/\D*/g,'');
				val=CommonFn.phoneFormat(val);
				this.value=val;
		});			
				
		
			
		//表单校验
		var tipobj={
				country:'',
				province:'',
				city:'',
				district:'',
				storeAddr:'',
				guide1:'',
				guide2:''
		};
		$validobj=$miAgentApplyForm.Validform({
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
							//注：此处需添加添加成功后跳转的页面，同时加入hash值为：#apply_workroom
							window.location.href='shop_manage.html#apply_workroom';
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
			});
			//添加校验规则
			$validobj.addRule([{
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
				ele:$storeAddr,
				datatype: "*",
				nullmsg: "工作室地址不能为空",
				errormsg: "工作室地址不明确",
				sucmsg: ""
			},
			{
				ele:$guide1,
				datatype: "*",
				nullmsg: "开店指导1不能为空",
				errormsg: "开店指导1信息不详细",
				sucmsg: ""
			},
			{
				ele:$guide2,
				datatype: "*",
				nullmsg: "开店指导2不能为空",
				errormsg: "开店指导2信息不详细",
				sucmsg: ""
			}]);




		
	});
});
