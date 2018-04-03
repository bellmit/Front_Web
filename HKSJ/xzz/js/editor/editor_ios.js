/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'dialog':'lib/artDialog/dialog',
		'editorserve_ios':'widgets/editorserve_ios'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'jquery_mobile':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile','dialog','editorserve_ios'],function($,$jm,undefined,EditorServe) {
	$(function() {

			//页面元素获取
			var $article_close=$('#article_close'),
				$article_publish=$('#article_publish'),
				$editor_tool=$('#editor_tool'),
				$editor_format=$('#editor_format'),
				$article_title=$('#article_title'),
				$article_content=$('#article_content'),
				$editor_label=$('#editor_label'),
				$editor_visible=$('#editor_visible');


			//编辑器对象调用初始化
			EditorServe.init({
				/*工具操作按钮*/
				$editor_tool:$editor_tool,
				/*格式化操作按钮*/
				$editor_format:$editor_format,
				/*编辑器标题容器*/
				$article_title:$article_title,
				/*编辑内容容器*/
				$article_content:$article_content,
				/*标签容器*/
				$editor_label:$editor_label,
				/*控制可见权限*/
				$editor_visible:$editor_visible
			});


			//查询标签
			EditorServe.loadTag({
				/*
				*
				* to do
				* 正式环境请修改URL地址*/
				url:'../../json/tag.json',
				/*url:'http://192.168.1.12:8080/xzzApp/getInterestQuery.do',*/
				parentId:'1',
				currentPage:'1'
			});


			//获取数据草稿箱数据或者编辑数据
			EditorServe.getFromDraft();


			//获取发布数据
			$article_publish.on($.EventName.click,function(){
				var result=EditorServe.publish();

				console.log(result);
			});


			//取消编辑或者取消发布
		   	$article_close.on($.EventName.click,function(){
			   //返回空字符串串或者一个对象
			   EditorServe.cancelPublish(function(result){
				   console.log(result);
				   if(result==''){
					   //执行跳转操作
					   window.location.href='../article/article.html';
				   }else{
					   //执行保存到草稿箱
					   //to do
				   }
			   });
		  	});


		/*
		 * to do
		 * 此处为测试，开发阶段请删除
		 * */
		window.getImage=function(){
			var urllist=['../../images/1.jpg','../../images/2.jpg','../../images/3.jpg','../../images/4.jpg','../../images/5.jpg'],
				len=urllist.length - 1,
				r=Math.ceil(Math.random() * len);
			EditorServe.imgUpload(urllist[r]);
		};
		window.OnCancel=function(){};

	});
});




