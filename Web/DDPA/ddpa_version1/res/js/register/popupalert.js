/*
popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
*/
function popup_alert(infos,target_url,popup_type,popup_btn){
		var inf=arguments[0],turl=arguments[1],pt=arguments[2],pb=arguments[3],delay_id,temp_inf=[],temp_str="";
		if(inf.indexOf("异常信息:")!=-1){
			temp_str=inf;
			inf="";
			temp_inf=temp_str.split("异常信息:");
			for(var ti=0;ti<temp_inf.length;ti++){
				inf+=temp_inf[ti];
			}
		}
		if(pb=="none"){
			/*无按钮的成功框*/
			if(pt=="yes"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'306px','height':'156px'},message:"<div id=\"popup_wrapie\" class=\"popup_wrapie\"><p>"+inf+"</p></div>"});
					}else{
						$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap\" class=\"popup_wrap\"><p>"+inf+"</p></div>"});
					}
				}else{
					$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap\" class=\"popup_wrap\"><p>"+inf+"</p></div>"});
				}			
			/*无按钮的失败框*/
			}else if(pt=="no"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'406px','height':'106px'},message:"<div id=\"popup_wrap_errorie\" class=\"popup_wrap_errorie\"><p>"+inf+"</p></div>"});
					}else{
						$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap_error\" class=\"popup_wrap_error\"><p>"+inf+"</p></div>"});
					}
				}else{
					$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap_error\" class=\"popup_wrap_error\"><p>"+inf+"</p></div>"});
				}
			}
			/*确认事件*/
			if(turl!="undefined"){
				delay_id=setTimeout($.unblockUI,1000);
				var tourl_id=setTimeout(function(){
					window.location.href = turl;
				},1005);
			}else{
				delay_id=setTimeout($.unblockUI,1000);
				$("#popup_wrap_error,#popup_wrap_errorie,#popup_wrap,#popup_wrapie").hover(function(){
					clearTimeout(delay_id);
				},function(){
					delay_id=setTimeout($.unblockUI,500);
				});
			}
		}
		if(pb=="have"){
			/*有按钮的成功框*/
			if(pt=="yes"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'306px','height':'156px'},message:"<div class=\"popup_wrapie\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确 认</a></div>"});
					}else{
						$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确 认</a></div>"});
					}
				}else{
					$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确 认</a></div>"});
				}
			/*有按钮的失败框*/
			}else if(pt=="no"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'406px','height':'106px'},message:"<div class=\"popup_wrap_errorie\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确 认</a></div>"});
					}else{
						$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap_error\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确 认</a></div>"});
					}
				}else{
					$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap_error\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确 认</a></div>"});
				}
			}
			/*确认事件*/
			$("#popup_btn").click(function(e){
				e.preventDefault();
				setTimeout(function(){
					$.unblockUI();
					if(turl!="undefined")window.location.href = turl;
				},5);
			});
		}	
}