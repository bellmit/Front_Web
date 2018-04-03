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
		var $miMemberForm=$('#miMemberForm'),
				$cardNo=$('#cardNo');
		
			
		//表单校验
		var tipobj={
				cardNo:''
		};
		$validobj=$miMemberForm.Validform({
				ajaxPost: true,
				datatype:{},
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
												content:'<span class="g-c-cyan1">绑定成功</span>'
											}).show();
											issucces=true;
									}else{
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-red2">绑定失败</span>'
											}).show();
									}
							},
							error: function(){
									dia=dialog({
										title:'温馨提示',
										width:200,
										content:'<span class="g-c-red2">绑定失败</span>'
									}).show();
							}
					});
					setTimeout(function(){
						dia.close().remove();
						if(issucces){
							window.location.href='跳转到下一步地址';
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
				ele:$cardNo,
				datatype: "n7-7",
				nullmsg: "经销商卡号不能为空",
				errormsg: "经销商卡号位7位数字",
				sucmsg: ""
			}]);



		



		
	});
});
