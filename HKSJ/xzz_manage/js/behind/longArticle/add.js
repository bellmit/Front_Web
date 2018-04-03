 //返回列表页
function go_back() { 
	//history.back();
	 window.location.href="/xzzBehind/user/toSockpuppetUser.do"; 
}

//获取标签
function getTag(te){
	 $("#tag").empty();
	 var value = $(te).val();
	 if(value != ""){
		 $.post("/xzzBehind/longArticle/getTag.do",{parentId:value},function(data){
			 console.log(data);
			 $.each(data,function(key,tag){ 
				 var te=" <label class=\"checktag-item\"> "+tag.name+"：<input type='checkbox' name='tag'  value='"+tag.id+"'/></label>";
				 $("#tag").append(te);
			 });
			
		 });
	 }  
}
  
//保存 
function add(){
	
		if($("#title").val().replace(/(^\s*)|(\s*$)/g,"")=="")
		{
			$.messager.alert("提示","标题不能为空","info",function(){document.getElementById("title").focus();});
			return;
		}
		
		if($("#type").val().replace(/(^\s*)|(\s*$)/g,"")=="")
		{
			$.messager.alert("提示","分类不能为空","info",function(){document.getElementById("title").focus();});
			return;
		}
		 
		var picone = $("#fil").val(); 
		if(picone != ""){
			var fileext1 = getFiletype(picone);   
			var allowtype =  ["JPG","PNG"];
			if ($.inArray(fileext1,allowtype) == -1)
			{
				layer.msg('只能上传JPG\PNG');  
				$("#fil").val("");
			    return false;
			}  
		} 
		 
		
		if($("#editor_id").val().replace(/(^\s*)|(\s*$)/g,"")=="")
		{
			$.messager.alert("提示","内容不能为空","info",function(){document.getElementById("editor_id").focus();});
			return;
		}
		
		//验证标签
		var vegetable = ""; 
		$("input:checkbox[name='tag']:checked").each(function() {
			vegetable += $(this).val() + " ";
		});

		if(vegetable.replace(/(^\s*)|(\s*$)/g,"")=="")
		{
			$.messager.alert("提示","标签不能为空","info",function(){document.getElementById("title").focus();});
			return;
		}
		  
		$.ajaxSetup({ 
		    async : false 
		}); 
		
		$.post('advertLong/imgUpload.do',{content:$("#editor_id").val()},function(result){
			$("#editor_id").val(result);
		})
		$("#addLongArticleFrom").ajaxSubmit(function(msg) { 
			if (msg == "true") {
				$.messager.alert("提示","发表成功!","info",function(){
					location.reload();
				}); 
				/*window.location.href="/xzzBehind/longArticle/toList.do"; */ 
			}else {
				$.messager.alert("提示","发表失败，请稍后重试!","info",function(){
					location.reload();
				});  
			} 
		});	 
}  

function getFiletype(filename)
{
    var extStart  = filename.lastIndexOf(".")+1;
     return filename.substring(extStart,filename.length).toUpperCase();
}