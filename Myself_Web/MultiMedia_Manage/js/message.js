$(function(){
	var message_info=$("#message_info"),message_write=$("#message_write"),message_look=$("#message_look"),message_enter=$("#message_enter"),message_list=$("#message_list");
	/*初始化*/
	message_look.css({"color":"#f00","text-decoration":"underline"});
	/*页面显示隐藏切换*/
	message_write.click(function(){
		message_enter.slideDown(200);
		message_list.slideUp(200);
		$(this).css({"color":"#f00","text-decoration":"underline"});
		message_look.css({"color":"#000","text-decoration":"none"});
	});
	message_look.click(function(){
		message_list.slideDown(200);
		message_enter.slideUp(200);
		$(this).css({"color":"#f00","text-decoration":"underline"});
		message_write.css({"color":"#000","text-decoration":"none"});
	});
	/*表格列表样式*/
	message_list.find("table tr:even").css({"background":"#eaf4f8"}).end().find("table tr").hover(function(){
		$(this).css({"background":"#f6f6f6"});
	},function(){
		var m_outobj=$(this),m_outindex=m_outobj.index();
		m_outindex%2==0?m_outobj.css({"background":"#eaf4f8"}):m_outobj.css({"background":"#fff"});
	});
	/*表单校验*/
	$("#message_info").validate({
		rules:{
			"message_title":{
				required:true
			},
			"message_content":{
				required:true
			}
		},
		messages:{
			"message_title":{
				required:"主题不能为空"
			},
			"message_content":{
				required:"内容不能为空"
			}
		},
		errorPlacement:function(error,element) {
			$("#"+ element.attr("id")+"_tips").html(error.text());
		},
		success:function(){				
		},
		invalidHandler:function() {
			return false;
		},
		submitHandler : function() {
			popup_alert("留言成功","undefined","yes","have");	
		}	
	});	
});