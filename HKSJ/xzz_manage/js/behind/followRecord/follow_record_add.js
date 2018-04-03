$(function(){
	//一级目录
	$.post('queryOneMenu.do',function(data){
		var parHtml="<option value=\"\">请选择</option>"
		for (var i = 0; i < data.length; i++) {
			parHtml+="<option value=\""+data[i].MENU_ID+"\">"+data[i].MENU_NAME+"</option>";
		}
		$("#PARENT_MENU").html(parHtml);
	});
});

//选择一级菜单，清空父菜单并禁用
function selectMenu(req)
{
	if(req.value=="1")
	{
		$("#PARENT_MENU").val("");
		$("#PARENT_MENU").attr("disabled","disabled");
	}
	else if(req.value=="0")
	{
		$("#PARENT_MENU").removeAttr("disabled");
	}
}


//图片上传
$(function(){
	var $thumbnail_wrap=$('#thumbnail_wrap'),
			$thumbnail_btn=$('#thumbnail_btn');
			
			
			
			//上传图片
			$thumbnail_btn.on('click',function(){
					var $this=$(this),
							num=$this.attr('data-number'),
							$imglist=$thumbnail_wrap.children();
							
							
							if($imglist.length>=num){
									//判断图片张数
									$.messager.alert("提示",'只能上传 <span class="g-c-red2">'+num+'</span> 张图片',"info");
									return false;
							}else{
								//执行图片上传操作:开发阶段上传
								//to do
								
								
								//下面是测试阶段
								var url='images/wecome_index_img.png';
								$('<li><img src="'+url+'" alt=""></li>').appendTo($thumbnail_wrap);
								
							}
							
							
				
			});
	
});



function add()
{
	if($("#content").val().replace(/(^\s*)|(\s*$)/g,"")=="")
	{
		$.messager.alert("提示","随记内容不能为空","info",function(){document.getElementById("content").focus();});
		return;
	}
	var imgUrl = $("#urlF1").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF1").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF2").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF2").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF3").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF3").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF4").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF4").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF5").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF5").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF6").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF6").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF7").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF7").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF8").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF8").focus();});
	      return;
	    }
	}
	var imgUrl = $("#urlF9").val();
	if(imgUrl.length>0){
	    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
	    {
	      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF9").focus();});
	      return;
	    }
	}
	document.getElementById("baocunid").disabled="disabled";

	$("#followRecordForm").ajaxSubmit({
        type:'post',
        url:'followRecord/followRecordSave.do',
        success:function(result){
        	if(result==true) //修改成功
    		{
    			$.messager.alert("提示","保存成功","info");
    			window.parent.tb.load();
    			parent.$('#windowDiv').window('close');
    		}
    		else
    		{
    			$.messager.alert("提示","保存失败","info");
    			document.getElementById("baocunid").disabled="";
    		}
        }
    });
}