//选择的行数据
var r = window.opener.select;
window.onload=function(){
		$("#ID").val(r.ID); //视频子表主键ID
		$("#VIDEO_SON_ID").val(r.VIDEO_SON_ID); //视频子表业务ID
		$("#UNIQUE_ID").val(r.UNIQUE_ID); //视频主表业务ID
		$("#CREATE_USER").val(r.CREATE_USER);
		$("#ADMIN_OR_USER").val(r.ADMIN_OR_USER);
		$("#IS_EPISODE").val(r.IS_EPISODE);
		$("#VIDEO_BB").val(r.VIDEO_BB);
		$("#CREATE_TIME").val(r.CREATE_TIME1); //该视频创建时间
		$("#CELLPHONE").val(r.CELLPHONE);
		$("#VERSION").val(r.VERSION);
		$("#bbjx").html("("+ opener.$("#CHECK_VIDEO_MIN").val()+"~"+ opener.$("#CHECK_VIDEO_MAX").val()+",审核不通过或多次通过可不填)");
		if(r.ADMIN_OR_USER=="1") //后台上传，不需要给积分
		{
			document.getElementById("bbtr").style.display="none";
			if(r.APPROVE_STATUS==3) //通过
			{
				$("#PASSID").hide();
			}
			else if(r.APPROVE_STATUS==4 || r.APPROVE_STATUS==6) //不通过
			{
				$("#UNPASSID").hide();
			}
		}
		else  //前台上传需要给积分
		{
			if(r.APPROVE_STATUS==1 || r.APPROVE_STATUS==4 || r.APPROVE_STATUS==6)
			{
				$.post('checkUserVip.do',{CELLPHONE:r.CELLPHONE},function(ishf){
					$("#HFTYPE").val(ishf);
					$("#hfbz").html(ishf=="1"?"惠粉":"非惠粉");
					if(ishf=="1" && (r.VIDEO_BB==undefined || r.VIDEO_BB==null || r.VIDEO_BB=="") )
						document.getElementById("bbtr").style.display="";
				});
			}
			if(r.APPROVE_STATUS==3) //通过
			{
				$("#PASSID").hide();
			}
			else if(r.APPROVE_STATUS==4 || r.APPROVE_STATUS==6) //不通过
			{
				$("#UNPASSID").hide();
			}
		}
		setInterval("KeepSessionAlive()", 1000*60*30); //保持session不断
};

//审核 type 3-通过 4-不通过
function pass(type)
{
	$("#APPROVE_STATUS").val(type);
	if(type==3) //通过
	{
		if(r.ADMIN_OR_USER==2 && (r.VIDEO_BB==null || r.VIDEO_BB=='') && $("#HFTYPE").val()=="1" ) //首次上传,或多次通过，后台上传,不是惠粉 没有播币	
		{
			var bb=$("#BOBI").val().replace(/[ ]/g,"");
			if(bb=="")
			{
				$.messager.alert("提示","播币不能为空","info",function(){document.getElementById("BOBI").focus();});
				return;
			}
			if(parseInt(bb)>parseInt(opener.$("#CHECK_VIDEO_MAX").val()) || parseInt(bb)<parseInt(opener.$("#CHECK_VIDEO_MIN").val()))
			{
				$.messager.alert("提示","播币超出界限","info",function(){document.getElementById("BOBI").focus();});
				return;
			}
		}
	}
	else //不通过
	{
		if($("#APPROVE_CONTENT").val()=="")
		{
			$.messager.alert("提示","审核内容不能为空","info",function(){document.getElementById("APPROVE_CONTENT").focus();});
			return;
		}
	}
	document.getElementById("PASSID").disabled="disabled";
	document.getElementById("UNPASSID").disabled="disabled";
	$.post('changeApproveStatus.do',$("#insertorupdateForm").serialize(),function(result){
		if(result==0) //冲突
		{
			$.messager.alert("提示","先审核为强，后审核报错","info",function(){
				window.opener.tb.load();
				CloseWebPage();
			});
		}
		else if(result==1) //修改成功
		{
			window.opener.tb.load();
			CloseWebPage();
		}
		else if(result==-2) ////惠粉时差，审核前不是惠粉，审核后是惠粉
		{
			$.messager.alert("提示","世事就是如此巧合,它成为惠粉了","info");
			$("#HFTYPE").val("1");
			$("#hfbz").html("惠粉");
			document.getElementById("bbtr").style.display="";
			document.getElementById("PASSID").disabled="";
			document.getElementById("UNPASSID").disabled="";
		}
		else
		{
			$.messager.alert("提示","操作失败","info");
			document.getElementById("PASSID").disabled="";
			document.getElementById("UNPASSID").disabled="";
		}
	})
}

//关闭浏览器
function CloseWebPage(){
	 if (navigator.userAgent.indexOf("MSIE") > 0) {
	  if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
	   window.opener = null;
	   window.close();
	  } else {
	   window.open('', '_top');
	   window.top.close();
	  }
	 }
	 else if (navigator.userAgent.indexOf("Firefox") > 0) {
	  window.location.href = 'about:blank ';
	 } else {
	  window.opener = null;
	  window.open('', '_self', '');
	  window.close();
	 }
	}

//保持session不断
function KeepSessionAlive()
{
	 $.get("keepSessionAlive.do");
}