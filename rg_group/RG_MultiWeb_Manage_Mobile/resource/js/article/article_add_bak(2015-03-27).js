(function($,w){
	$(function() {
			//自定义插件
			var $radio_state=$('#radio_state'),
					$file_upload=$('#file_upload');
					
			//文本编辑器
			var $editor_container=$('#editor_container'),
					$editor_upload=$('#editor_upload'),
					$editor_facebtn=$('#editor_facebtn'),
					$editor_facewrap=$('#editor_facewrap'),
					$editor_edit=$('#editor_edit'),
					$editor_sure=$('#editor_sure'),
					$editor_state=$('#editor_state');
			
			//表单元素
			var $articleaction=$('#articleaction'),
					$articlesubmit=$('#articlesubmit'),
					$title=$('#title'),
					$category=$('#category'),
					$state=$('#state'),
					$thumb=$('#thumb'),
					$brief=$('#brief');
			
			//设置校验配置对象
			var rules=[
			[
				{selector:$title},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'文章不能为空',
					yes:''
				}
			],
			[
				{selector:$state},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'文章状态没有选择',
					yes:''
				}
			],
			[
				{selector:$category},
				{
					require:'',
					selfrule:function($selector){
						return $selector.html()=='所属栏目'?false:true;
					},
					no:'所属栏目没有选择',
					yes:''
				}
			],
			[
				{selector:$thumb},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'缩略图没有上传',
					yes:''
				}
			],
			[
				{selector:$brief},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'详细内容不能为空',
					yes:''
				}
			]
			];
			
			
			
			//设置校验全局对象           
			$.setValidtorSet({
				isajax:true
			});
			
			
			
			//单选框选择事件加载（栏目状态）
			$radio_state.radio($state);
			
			//图像上传事件绑定(相关限制配置对象,回调函数(处理上传成功的情况))
			$file_upload.fileupload({
					type:'png,jpg,jpeg',
					size:50
			},function(objs,reader){
					//回调函数两个参数分别为图片对象，数据流对象
					$thumb.val(objs.name);
					$.modal({
						content:'上传成功',
						okfn:function(){}
					},1);
			});

		//编辑器初始化
		$.EditorInit({
				textarea:$brief,//textarea文本域
				container:$editor_container,//文本排序操作区
				edit:$editor_edit,//切换至文本域或排序操作区按钮
				sure:$editor_sure,//保存按钮
				state:$editor_state//当前操作状态
		});
		
		
		//编辑器--图像上传事件绑定(需要显示图片的input,相关限制配置对象,回调函数(处理上传成功的情况))
			$editor_upload.fileupload({
					type:'png,jpg,jpeg',
					size:150
			},function(objs,reader){
							$('<div><span></span><span></span></div>').append($('<img>').attr('src',reader.result)).appendTo($editor_container);
							$brief.val($brief.val()+'#图片#\n');
							$.modal({
								content:'添加成功',
								okfn:function(){}
							},1);
			});
			
			
			//编辑器--表情调用
			$editor_facebtn.editorFace($editor_facewrap,function(objs){
					$('<div><span></span><span></span></div>').append(objs).appendTo($editor_container);
					$brief.val($brief.val()+'#图片#\n');
			});
			
			//编辑器最终获取内容(返回字符串)接口,如果后台需要数据就调此方法
			$.GetTemplate($editor_container);
			
			
			//表单校验
			$articlesubmit.on($.EventName.click,function(e){
				e.preventDefault();
				$.Validator($articleaction,rules);
				return false;
			});
			
			//定义表单提交时的回调函数
			$.ValidCallBack=function(flag){
					if(flag){
						//ajax 提交
						$.modal({
							content:'添加成功',
							okfn:function(){
								window.location.href="article_manage.html";
							}
						},1);
					}else{
						//表单提交
						$articleaction.submit();
					}
			}



		});
})(Zepto,window);

