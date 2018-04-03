/*!
*
*参数说明：msg：为提示信息,t:为弹窗口类型：分为："succ","err","explain"
*/
function infoTips(msg,t){
	var infos=msg,types=t;
	var timeid=null,timecount=5;
	var info_prefix="<div class='itips_box'><table class='itips_wrap'><tr>";
	var info_mainsucc="<td class='itips_iconsucc'><div></div></td><td class='itips_infoshow'><span class='itipok'>";
	var info_mainerr="<td class='itips_iconerr'><div></div></td><td class='itips_infoshow'><span class='itipno'>";
	var info_mainexplain="<td class='itips_iconexplain'><div></div></td><td class='itips_infoshow'><span class='itipno'>";
	var info_suffix="</span><span id='itiptime' class='itiptime'>5</span><span class='itipdef'>秒后自动关闭</span></td><td class='itips_close'><div id='itips_close'></div></td></tr></table></div>"
	var info_str="";
	$.unblockUI();
	if(types=="succ"){
		info_str=info_prefix+info_mainsucc+infos+info_suffix;
	}else if(types=="err"){
		info_str=info_prefix+info_mainerr+infos+info_suffix;
	}else if(types=="explain"){
		info_str=info_prefix+info_mainexplain+infos+info_suffix;
	}
	var infoobj={css:{'left':'30%','top':'30%'},message:info_str};
	$.blockUI(infoobj);
	clearInterval(timeid);
	timeid=null;
	timeid=setInterval(function(){
		if(timecount==1){
			clearInterval(timeid);
			timeid=null;
			timecount=5;
			$.unblockUI();
			return 	false;
		}
		--timecount;
		$("#itiptime").html(timecount);
	},1000);
	/*关闭按钮*/
	$("#itips_close").live("click",function(){
		clearInterval(timeid);
		timeid=null;
		timecount=5;
		$.unblockUI();
	});
}

/*!
*
*参数说明：msg：为提示信息,t:为弹窗口类型：分为："succ","err","explain",c:为样式对象,t:倒计时读秒
*/
function infoTipAuto(msg,ty,c,t){
	var infos=msg,types=ty,stys=c,timecount=t,inittime=t;
	if(typeof stys===undefined||stys=="undefined"||stys==null||stys=="null"||stys==""){
		stys={left:'30%',top:'30%',width:'554'};
	}
	if(!stys.hasOwnProperty("width")){
		stys.width='554';
	}
	if(typeof timecount===undefined||timecount=="undefined"||timecount==null||timecount=="null"||timecount==""){
		timecount=5;
		inittime=5;
	}
	var timeid=null;
	var info_prefix="<div class='itips_boxauto' style=\"width:"+parseInt(stys.width)+"px;\"><table class='itips_wrapauto'><tr>";
	var info_mainsucc="<td class='itips_iconsucc'><div></div></td><td class='itips_infoshowauto'><span class='itipok'>";
	var info_mainerr="<td class='itips_iconerr'><div></div></td><td class='itips_infoshowauto'><span class='itipno'>";
	var info_mainexplain="<td class='itips_iconexplain'><div></div></td><td class='itips_infoshowauto'><span class='itipno'>";
	var info_suffix="</span><span id='itiptime' class='itiptime'>"+timecount+"</span><span class='itipdef'>秒后自动关闭</span></td><td class='itips_close'><div id='itips_close'></div></td></tr></table></div>"
	var info_str="";
	$.unblockUI();
	if(types=="succ"){
		info_str=info_prefix+info_mainsucc+infos+info_suffix;
	}else if(types=="err"){
		info_str=info_prefix+info_mainerr+infos+info_suffix;
	}else if(types=="explain"){
		info_str=info_prefix+info_mainexplain+infos+info_suffix;
	}
	var infoobj={css:stys,message:info_str};
	$.blockUI(infoobj);
	clearInterval(timeid);
	timeid=null;
	timeid=setInterval(function(){
		if(timecount==1){
			clearInterval(timeid);
			timeid=null;
			timecount=inittime;
			$.unblockUI();
			return 	false;
		}
		--timecount;
		$("#itiptime").html(timecount);
	},1000);
	/*关闭按钮*/
	$("#itips_close").live("click",function(){
		clearInterval(timeid);
		timeid=null;
		timecount=inittime;
		$.unblockUI();
	});
}

/*!
*
*参数说明：msg：为提示信息,t:为弹窗口类型：分为："succ","err","explain",cfun:为回调函数
*/
function infoTipAlert(msg,t,cfun){
	var infos=msg,types=t,fun=cfun;
	var info_prefix="<div class='ialert_box'><div class='ialert_title' id='ialert_title'>温馨提示</div><table class='ialert_wrap'><tr>";
	var info_mainsucc="<td style='vertical-align:bottom' class='ialert_iconsucc'><div></div></td><td style='vertical-align:bottom' class='ialert_infoshow'><span class='itipok'>";
	var info_mainerr="<td style='vertical-align:bottom' class='ialert_iconerr'><div></div></td><td style='vertical-align:bottom' class='ialert_infoshow'><span class='itipno'>";
	var info_mainexplain="<td style='vertical-align:bottom' class='ialert_iconexplain'><div></div></td><td style='vertical-align:bottom' class='ialert_infoshow'><span class='itipno'>";
	var info_suffix="</span></td></tr><tr><td colspan='2'><div class='ialert_handle'><div class='ialert_sure' id='ialert_sure'>确认</div></div></td></tr></table></div>"
	var info_str="";
	$.unblockUI();
	if(types=="succ"){
		info_str=info_prefix+info_mainsucc+infos+info_suffix;
	}else if(types=="err"){
		info_str=info_prefix+info_mainerr+infos+info_suffix;
	}else if(types=="explain"){
		info_str=info_prefix+info_mainexplain+infos+info_suffix;
	}
	var infoobj={css:{'left':'30%','width':'554px','border':'0px','background':'none','top':'30%'},message:info_str};
	$.blockUI(infoobj);
	/*关闭按钮*/
	$("#ialert_sure").live("click",function(){
		if(typeof fun==="undefined"||fun=="undefined"||fun==undefined||fun==null||fun=="null"){
			$.unblockUI();
		}else{
			fun();
		}
	});
}
/*!
*
*参数说明：msg：为提示信息,cy:确认回调函数,cn:取消回调函数；
*/
function infoTipConfirm(msg,cy,cn){
	var infos=msg,types=t;
	var info_prefix="<div class='ialert_box'><div class='ialert_title' id='ialert_title'>温馨提示</div><table class='ialert_wrap'><tr><td style='vertical-align:bottom' class='ialert_iconsucc'></td><td style='vertical-align:bottom' class='ialert_infoshow'><span class='itipok'>";
	var info_suffix="</span></td></tr><tr><td colspan='2'><div class='ialert_handle'><div class='ialert_sure' id='ialert_sure'>确认</div><div class='ialert_cance' id='ialert_cance'>取消</div></div></td></tr></table></div>"
	var info_str="";
	$.unblockUI();
	info_str=info_prefix+infos+info_suffix;
	var infoobj={css:{'left':'30%','width':'554px','border':'0px','background':'none','top':'30%'},message:info_str};
	$.blockUI(infoobj);
	/*关闭按钮*/
	$("#ialert_sure").live("click",function(){
		$.unblockUI();
		cy();
	});
	$("#ialert_cance").live("click",function(){
		$.unblockUI();
		cn();
	});
}



