/*times*/
/*window.requestAnimFrame=function(){
		return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(func){window.setTimeout(func,1000/60)}}();*/
/*
fail_tips(右下角弹出错误信息面板公用方法),需搭配css、html和blockui.js
argument:提示信息面板对象,错误信息,效果渲染时间,面板显示时间
*/
function fail_tips(objs,errorinfos,effect_time,delay_time){
	var error_infos=errorinfos,mask_id,delay_id;
	objs.find("p").text(error_infos);
	objs.animate({"bottom":"5"},effect_time);
	mask_id=setTimeout(function(){objs.animate({"bottom":"-110"},effect_time)},delay_time);
	delay_id=setTimeout($.unblockUI,delay_time+effect_time*2+300);
	objs.hover(function(){
		clearTimeout(mask_id);
		clearTimeout(delay_id);
	},function(){
		mask_id=setTimeout(function(){objs.animate({"bottom":"-110"},effect_time)},delay_time);
		delay_id=setTimeout($.unblockUI,delay_time+effect_time*2+300);
	});
}
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
						$.blockUI({css:{'width':'306px','height':'156px'},message:"<div class=\"popup_wrapie\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/"/">确 认</a></div>"});
					}else{
						$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/"/">确 认</a></div>"});
					}
				}else{
					$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/"/">确 认</a></div>"});
				}
			/*有按钮的失败框*/
			}else if(pt=="no"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'406px','height':'106px'},message:"<div class=\"popup_wrap_errorie\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/"/">确 认</a></div>"});
					}else{
						$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap_error\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/"/">确 认</a></div>"});
					}
				}else{
					$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap_error\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/"/">确 认</a></div>"});
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
/*
context_size:(处理文本框内容数量公用方法)
argument:需要处理字符串,容器宽度,行高,字体大小,
*/
function context_size(obj_str,obj_wrap,obj_lheight,obj_fsize){
	var test_str=obj_str,line_size=Math.floor(obj_wrap/obj_fsize);
	var eng_count=0,break_count=0,other_count=0,all_count="",test_height=0,eng_len=0,chi_len=0,break_len=0,other_len=0;
	for(var e=0;e<test_str.length;e++){
		var curchar=test_str.charAt(e);
		if(/[a-z\s]/.test(curchar))++eng_len;
		if(/^[\u2E80-\u9FFFA-Z]+$/.test(curchar))++chi_len;
		if(/[\r\n]/.test(curchar))++break_len;
		if(/./.test(curchar))++other_len;
	}
	other_count=(other_len-eng_len-chi_len)/2;
	eng_count=Math.ceil(eng_len/2);
	break_count=line_size*break_len;
	all_count=eng_count+chi_len+break_count+other_count;
	if($.browser.msie){
		test_height=Math.ceil(all_count/line_size)*(obj_lheight+4);
	}else{
		test_height=Math.ceil(all_count/line_size)*(obj_lheight+2);
	}
	return test_height;	
}