/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog',
		'validform':'plugins/validform',
		'common':'common/common'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		}
	}
});

	

/*程序入口*/
require(['jquery','dialog','validform','common'], function($,undefined,undefined,undefined) {
	$(function() {
			/*页面元素引用*/
			var $article_form=$('#article_form'),
					$validobj,
					tipobj={
						ArticleName:'',
						ArticleID:'',
						Author:'',
						ArticleContent:''
					};
					
			/*表单校验*/	
			$validobj=$article_form.Validform({
				beforeSubmit: function(curform) {
					/*数据保存*/
					var d=null;
					d=dialog({
						title:'温馨提示',
						content:'<span class="g-c-blue2">保存成功</span>'
					}).showModal();
					return false;
				},
				tiptype: function(msg,o) { 
					var name=o.obj[0].name,curtype=o.type;
					if(curtype==1||curtype==3){
							if(typeof tipobj[name]==='string'){
									tipobj[name]=dialog({
									content:'<span class="g-c-red2">'+msg+'</span>',
									align:'right'
								});
								tipobj[name].show(o.obj[0]);
							}else if(typeof tipobj[name]!=='string'){
								tipobj[name].content('<span class="g-c-red2">'+msg+'</span>');
								tipobj[name].show();
							}
					}else if(curtype==2){
							if(typeof tipobj[name]!=='string'){
								tipobj[name].content('<span class="g-c-blue2">校验成功</span>');
								setTimeout(function(){
										tipobj[name].close();
								},1000);
							}
					}
				}
			});
			
			
			/*添加验证规则*/
			$validobj.addRule([{
				ele:'input[name="ArticleName"]',
				datatype: "*",
				nullmsg: "请输入文章标题",
				errormsg: "",
				sucmsg: ""
			}, {
				ele:'input[name="ArticleID"]',
				datatype: "n",
				nullmsg: "请输入排序号",
				errormsg: "排序号应为数字",
				sucmsg: ""
			}, {
				ele:'input[name="Author"]',
				datatype: "*",
				nullmsg: "请输入作者",
				errormsg: "",
				sucmsg: ""
			}, {
				ele:'textarea[name="ArticleContent"]',
				datatype: "*",
				nullmsg: "请输入文章内容",
				errormsg: "",
				sucmsg: ""
			}]);	
			
			
			

			
			
			
			
			
			
			
			
			

	});
});












