/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'validform':'js/plugins/validform'
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
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','dialog','validform'], function($,$strap,undefined,undefined,undefined) {
	$(function() {
		/*页面元素引用*/
		var $icInformationForm=$('#icInformationForm'),
				$inforType=$('#inforType'),
				$title=$('#title'),
				$content=$('#content');
				
		//表单校验
		var tipobj={
			title:'',
			content:''
		};
		$validobj=$icInformationForm.Validform({
				ajaxPost: true,
				beforeSubmit: function(curform) {
					/*to do*/
					//send ajax 填充具体业务逻辑
					//开发时开启下部代码
					var dia=null;
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
				ele:$title,
				datatype: "*1-40",
				nullmsg: "消息标题不能为空",
				errormsg: "消息标题长度不能超过40个字符",
				sucmsg: ""
			}, {
				ele:$content,
				datatype: "*",
				nullmsg: "消息内容不能为空",
				errormsg: "",
				sucmsg: ""
			}]);




		
	});
});
