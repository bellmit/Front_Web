$(function(){
	/*页面元素定义*/
	var email_info=$("#email_info"),email_write=$("#email_write"),email_look=$("#email_look"),email_enter=$("#email_enter"),email_list=$("#email_list"),email_sidebox=$("#email_sidebox"),email_sidenav=$("#email_sidenav"),sidenav_control=$("#sidenav_control"),email_send=$("#email_send"),email_save=$("#email_save"),email_cance=$("#email_cance"),send_person=$("#send_person"),receive_person=$("#receive_person"),email_title=$("#email_title"),email_content=$("#email_content");
	/*初始化*/
	email_look.css({"color":"#f00","text-decoration":"underline"});
	/*导航布局面板显示隐藏切换*/
	sidenav_control.click(function(){
		email_sidebox.toggle(300);
		$(this).toggleClass("email_controlsel");
	});
	/*页面显示隐藏切换*/
	email_write.click(function(){
		email_enter.slideDown(200);
		email_list.slideUp(200);
		$(this).css({"color":"#f00","text-decoration":"underline"});
		email_look.css({"color":"#000","text-decoration":"none"});
	});
	email_look.click(function(){
		email_list.slideDown(200);
		email_enter.slideUp(200);
		$(this).css({"color":"#f00","text-decoration":"underline"});
		email_write.css({"color":"#000","text-decoration":"none"});
	});
	/*表格列表样式*/
	email_list.find("table tr:even").css({"background":"#eaf4f8"}).end().find("table tr").hover(function(){
		$(this).css({"background":"#f6f6f6"});
	},function(){
		var e_outobj=$(this),e_outindex=e_outobj.index();
		e_outindex%2==0?e_outobj.css({"background":"#eaf4f8"}):e_outobj.css({"background":"#fff"});
	});
	/*表单校验*/
	email_info.validate({
		rules:{
			"send_person":{
				required:true
			},
			"receive_person":{
				required:true
			},
			"email_title":{
				required:true
			},
			"email_content":{
				required:true
			}
		},
		messages:{
			"send_person":{
				required:"发件人不能为空"
			},
			"receive_person":{
				required:"收件人不能为空"
			},
			"email_title":{
				required:"主题不能为空"
			},
			"email_content":{
				required:"内容不能为空"
			}
		},
		errorPlacement:function(error,element) {
			$("#"+ element.attr("id")+"_tips").html(error.text());
		},
		success:function(){				
		},
		invalidHandler:function(){
			return false;
		},
		submitHandler : function(){
			return false;
		}
	});
	/*检测是否通过校验*/
	function errortips(){
		var v_spancount=0,v_spanabj=document.getElementById("email_info").getElementsByTagName("span"),v_spanlen=v_spanabj.length;
		for(var i=0;i<v_spanlen;i++){
			if(v_spanabj[i].innerHTML!=""){++v_spancount;break;}
		};
		return v_spancount!=0?true:false;
	}
	/*确定*/
	email_send.click(function(){
		setTimeout(function(){
				var iserror=errortips();
				if(!iserror){
					var params=$('form:first').serialize();
					$.ajax({
						type :'post',
						url :"请输入请求地址(发邮件)",
						data :params,
						dataType : 'json',
						success : function(data) {
							if (result.success) {
								/*
								to do
								*/
								popup_alert("邮件发送成功","undefined","yes","have");					
							}else{
								/*
								to do
								*/
								popup_alert("邮件发送失败","undefined","no","none");	
							}
						}
					});
				}
		},50);
	});
	/*保存*/
	email_save.click(function(){
		setTimeout(function(){
			var iserror=errortips();
			if(!iserror)
			{
				var params=$('form:first').serialize();
				$.ajax({
					type :'post',
					url :"请输入请求地址(保存邮件地址)",
					data :params,
					dataType : 'json',
					success : function(data) {
						if (result.success) {
							/*
							to do
							*/
							popup_alert("邮件保存成功","undefined","yes","have");		
						}else{
							/*
							to do
							*/
							popup_alert("邮件保存失败","undefined","no","none");		
						}
					}
				});
			}	
		},50);
	});
	/*取消*/
	email_cance.click(function(){
		email_list.slideDown(200);
		email_enter.slideUp(200);
		email_write.css({"color":"#000","text-decoration":"none"});
		email_look.css({"color":"#f00","text-decoration":"underline"});
	});
	/*详细查看邮件内容*/
	email_list.find("a").live("click",function(e){
		e.preventDefault();
		var detail_obj=$(this),detail_id=detail_obj.attr("id"),detail_line=detail_obj.parent().parent(),temp_detailarr=[];
		email_enter.slideDown(200);
		email_list.slideUp(200);
		email_write.css({"color":"#f00","text-decoration":"underline"});
		email_look.css({"color":"#000","text-decoration":"none"});
		detail_line.find("td").each(function(index,element){
			temp_detailarr.push($(this).find("a,p").text());
        });
		send_person.val(temp_detailarr[1]);
		receive_person.val(temp_detailarr[2]);
		email_title.val(temp_detailarr[0]);
		email_content.val(temp_detailarr[5]);
	});
});