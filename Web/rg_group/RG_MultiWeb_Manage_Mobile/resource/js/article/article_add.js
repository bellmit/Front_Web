(function($,w){
	$(function() {
			//自定义插件
			var $radio_state=$('#radio_state'),
					$file_upload=$('#file_upload');
					
			//文本编辑器
			var $editor_imgbtn=$('#editor_imgbtn'),
					$editor_imgwrap=$('#editor_imgwrap'),
					$editor_upload=$('#editor_upload'),
					$editor_facebtn=$('#editor_facebtn'),
					$editor_facewrap=$('#editor_facewrap');
			
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

		//图片上传初始化
		$.EditorInit({
				textarea:$brief,
				imgbtn:$editor_imgbtn,
				imgwrap:$editor_imgwrap
		});
		
		
		//图像上传事件绑定(相关限制配置对象,回调函数(处理上传成功的情况))
		$editor_upload.fileupload({
				type:'png,jpg,jpeg',
				size:150,
				count:function(){
						if($editor_imgbtn.find('img').length>=5){
							$.modal({
								content:'最多只能上传5个图片',
								okfn:function(){}
							},1);
							return true;
						}
						return false;
				}
		},function(objs,reader){
						var $img=$('<img>').attr('src',reader.result),
								$imgclone=$img.clone(),
								tips='';
						//send ajax
						//图片上传ajax,动态开发开启下面注释部分
						
						/*$.ajax({
								url:'请求地址',
								type: 'post',
								dataType: "json",
								success: function (res) {
										if (res) {
												tips='上传成功';
												$img.appendTo($editor_imgbtn);
												$imgclone.appendTo($editor_imgwrap);
										} else {
												tips='上传失败';
										}
								},
								error: function () {
										tips='上传出错';
								}
						});*/
						
						$img.appendTo($editor_imgbtn);
						$imgclone.appendTo($editor_imgwrap);
						
						
						$.modal({
							content:tips,
							okfn:function(){}
						},1);
		});
			
			
		//表情调用
		$editor_facebtn.editorFace($editor_facewrap,function(str){
				selectFace.push(str);
				$brief.val($brief.val()+'<face>'+str+'</face>\n');
		});
		
		//最终获取内容图片和表情地址分别为
		//selectImage;
		//selectFace;
		
		
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

