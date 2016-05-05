/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'dialog':'lib/artDialog/dialog',
		'topic_editorserve':'widgets/topic_editorserve_android'
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
require(['jquery','jquery_mobile','dialog','topic_editorserve'],function($,$jm,undefined,EditorServe) {
	$(function() {

			//页面元素获取
			var $article_close=$('#article_close'),
				$article_publish=$('#article_publish'),
				$editor_tool=$('#editor_tool'),
				$article_content=$('#article_content');


			//编辑器对象调用初始化
			EditorServe.init({
				/*工具操作按钮*/
				$editor_tool:$editor_tool,
				/*编辑内容容器*/
				$article_content:$article_content
			});



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
			 *
			 * to do
			 * 此处为测试，开发阶段请删除
			 *
			 * */
			window['MyJsBridge']={};
			window['MyJsBridge']['UploadImage']=function(){
				var urllist=['../../images/1.jpg','../../images/2.jpg','../../images/3.jpg','../../images/4.jpg','../../images/5.jpg'],
					len=urllist.length - 1,
					r=Math.ceil(Math.random() * len);
				EditorServe.imgUpload(urllist[r]);
			};


	});
});

