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
				deps:['jquery','common']
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
					$miMemberForm=$('#miMemberForm'),
					$cardNo=$('#cardNo'),
					$theme_title=$('#theme_title');
					
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);		
			
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
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
													content:'<span class="g-c-red4">绑定失败</span>'
												}).show();
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">绑定失败</span>'
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
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
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
