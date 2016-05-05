<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Main.aspx.cs" Inherits="Admin_Main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	font-size: 12px;
}
-->
</style>

    <script type="text/javascript">
function showsubmenu(sid)
{
whichEl = eval("submenu" + sid);
imgmenu = eval("imgmenu" + sid);
if (whichEl.style.display == "none")
{
eval("submenu" + sid + ".style.display=\"\";");
imgmenu.background="images/main_47.gif";
}
else
{
eval("submenu" + sid + ".style.display=\"none\";");
imgmenu.background="images/main_48.gif";
}
}
<!--时间显示代码开始-->
	function Time(){ 
	var enabled = 0; today = new Date();
	var day; 
	var date;
	if(today.getDay()==0) day = "星期日"
	if(today.getDay()==1) day = "星期一"
	if(today.getDay()==2) day = "星期二"
	if(today.getDay()==3) day = "星期三"
	if(today.getDay()==4) day = "星期四"
	if(today.getDay()==5) day = "星期五"
	if(today.getDay()==6) day = "星期六"
	date = "" + (today.getYear()) + "年" + (today.getMonth() + 1 ) + "月" + today.getDate() + "日" + day;
	var Timer=new Date() 
	var hours=Timer.getHours() 
	var minutes=Timer.getMinutes() 
	var seconds=Timer.getSeconds() 
	myclock="当前时间："+date+" "+hours+":"+minutes+":" +seconds;
	 
	document.getElementById("position").innerHTML=myclock 
	setTimeout("Time()",1000) 
	} 
	Time();
	<!-- 时间显示代码结束-->
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <!--top begin-->
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td height="70" background="images/main_05.gif">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="height: 24px">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="270" height="24" background="images/main_03.gif">
                                            &nbsp;
                                        </td>
                                        <td width="505" background="images/main_04.gif">
                                            &nbsp;
                                        </td>
                                        <td>
                                            &nbsp;
                                        </td>
                                        <td width="21">
                                            <img src="images/main_07.gif" width="21" height="24">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="38">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="270" height="38" background="images/main_09.gif">
                                            &nbsp;
                                        </td>
                                        <td>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td width="690" height="25" valign="bottom">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td width="50" style="height: 20px">
                                                                </td>
                                                                <td width="50" style="height: 20px">
                                                                </td>
                                                                <td width="50" style="height: 20px">
                                                                </td>
                                                                <td width="50" style="height: 20px">
                                                                </td>
                                                                <td width="50" style="height: 20px">
                                                                </td>
                                                                <td width="26" style="height: 20px">
                                                                </td>
                                                                <td style="height: 20px">
                                                                    &nbsp;
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td width="270" valign="bottom" nowrap="nowrap">
                                                        <div align="right" class="STYLE1">
                                                            <span style="color: Red">■&nbsp;</span><span id="position" style="color: White">

                                                                <script type="text/javascript">                                                                Time();</script>

                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td width="21">
                                            <img src="images/main_11.gif" width="21" height="38">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="8" style="line-height: 8px;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="270" background="images/main_29.gif" style="line-height: 8px;">
                                            &nbsp;
                                        </td>
                                        <td width="505" background="images/main_30.gif" style="line-height: 8px;">
                                            &nbsp;
                                        </td>
                                        <td style="line-height: 8px;">
                                            &nbsp;
                                        </td>
                                        <td width="21" style="line-height: 8px;">
                                            <img src="images/main_31.gif" width="21" height="8">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td height="28" background="images/main_36.gif">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="177" height="28" background="images/main_32.gif">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="20%" height="22">
                                            &nbsp;
                                        </td>
                                        <td valign="bottom" style="width: 59%">
                                            <div align="center" class="STYLE1">
                                                当前用户：<p style="color: Red; display: inline;">
                                                    <%=name %>
                                                </p>
                                            </div>
                                        </td>
                                        <td width="21%">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td width="21">
                                <img src="images/main_37.gif" width="21" height="28">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--top end-->
        <table id="tab_t" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"
            style="table-layout: fixed;">
            <tr>
                <td width="171" id="frmTitle" nowrap name="fmTitle" align="center" valign="top">
                    <table width="171" height="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                        <tr>
                            <td bgcolor="#1873aa" style="width: 6px;">
                                &nbsp;
                            </td>
                            <td width="165">
                                <!--left begin-->
                                <table width="165" height="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td height="28" background="images/main_40.gif">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td height="20">
                                                        <span class="STYLE1">管理菜单</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="tab1" align="center" valign="top">
                                            <table width="151" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td height="23" background="images/main_47.gif" id="imgmenu1" class="menu_title"
                                                                    onmouseover="this.className='menu_title2';" onclick="showsubmenu(1)" onmouseout="this.className='menu_title';"
                                                                    style="cursor: hand">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td style="height: 15px">
                                                                                &nbsp;
                                                                            </td>
                                                                            <td class="STYLE1" style="height: 15px">
                                                                                网站配置
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td background="images/main_51.gif" id="submenu1">
                                                                    <div class="sec_menu">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td>
                                                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0">
                                                                                       <%--<tr>
                                                                                            <td height="25">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td style="cursor: hand; text-align: left; height: 20px;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="../shengc.aspx" target="Main"><font class="STYLE3">生成html</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>--%>
                                                                                        <tr>
                                                                                            <td height="25">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td style="cursor: hand; text-align: left; height: 20px;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="sys_User/List.aspx" target="Main"><font class="STYLE3">管理员管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                    <%--                                    <tr>
                                                                                            <td style="height: 23px">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td style="height: 23px">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td height="20" style="cursor: hand; text-align: left;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="top/List.aspx" target="Main"><font class="STYLE3">首页导航图片管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td style="height: 23px">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td style="height: 23px">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td height="20" style="cursor: hand; text-align: left;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="Link/List.aspx" target="Main"><font class="STYLE3">友情链接管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>--%>
                                                                                        <tr>
                                                                                            <td style="height: 23px">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td style="height: 23px">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td height="20" style="cursor: hand; text-align: left;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="foot/List.aspx" target="Main"><font class="STYLE3">SEO优化</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td height="5">
                                                                                    <img src="images/main_52.gif" width="151" height="5" />
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td height="23" background="images/main_47.gif" id="imgmenu2" class="menu_title"
                                                                    onmouseover="this.className='menu_title2';" onclick="showsubmenu(2)" onmouseout="this.className='menu_title';"
                                                                    style="cursor: hand">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td>
                                                                                &nbsp;
                                                                            </td>
                                                                            <td class="STYLE1">
                                                                                文章管理
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td background="images/main_51.gif" id="submenu2">
                                                                    <div class="sec_menu">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td>
                                                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0">
                                                                                        <tr>
                                                                                            <td height="25">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td style="cursor: hand; text-align: left; height: 20px;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="News/add.aspx" target="Main"><font class="STYLE3">文章添加</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height="23">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td height="20" style="cursor: hand; text-align: left;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="News/List.aspx" target="Main"><font class="STYLE3">文章管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td height="5">
                                                                                    <img src="images/main_52.gif" width="151" height="5" />
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td height="23" background="images/main_47.gif" id="imgmenu3" class="menu_title"
                                                                    onmouseover="this.className='menu_title2';" onclick="showsubmenu(3)" onmouseout="this.className='menu_title';"
                                                                    style="cursor: hand">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td>
                                                                                &nbsp;
                                                                            </td>
                                                                            <td class="STYLE1">
                                                                                图片管理
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td background="images/main_51.gif" id="submenu3" style="display: block">
                                                                    <div class="sec_menu">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td>
                                                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0">
                                                                                        <tr>
                                                                                            <td height="25">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td style="cursor: hand; text-align: left; height: 1px;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="Product/add.aspx" target="Main"><font class="STYLE3">图片添加</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height="23">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td height="20" style="cursor: hand; text-align: left;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="Product/List.aspx" target="Main"><font class="STYLE3">图片管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <%--<tr>
                                                                                <td height="5">
                                                                                    <img src="images/main_52.gif" width="151" height="5" />
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td height="23" background="images/main_47.gif" id="imgmenu4" class="menu_title"
                                                                    onmouseover="this.className='menu_title2';" onclick="showsubmenu(4)" onmouseout="this.className='menu_title';"
                                                                    style="cursor: hand">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td>
                                                                                &nbsp;
                                                                            </td>
                                                                            <td class="STYLE1">
                                                                                留言管理
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td background="images/main_51.gif" id="Td3" style="display: block">
                                                                    <div class="sec_menu">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td>
                                                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0">
                                                                                        <tr>
                                                                                            <td height="25">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td style="cursor: hand; text-align: left; height: 1px;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="Message/List.aspx" target="Main"><font class="STYLE3">留言管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height="23">
                                                                                                <div align="center">
                                                                                                    <img src="images/left.gif" width="10" height="10" /></div>
                                                                                            </td>
                                                                                            <td height="23">
                                                                                                <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td height="20" style="cursor: hand; text-align: left;" onmouseover="this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#7bc4d3'; "
                                                                                                            onmouseout="this.style.borderStyle='none'">
                                                                                                            <a href="Product/List.aspx" target="Main"><font class="STYLE3">图片管理</font></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>--%>
                                                                            <tr>
                                                                                <td height="5">
                                                                                    <img src="images/main_52.gif" width="151" height="5" />
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="18" background="images/main_58.gif">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td height="18" valign="bottom">
                                                        <div align="center" class="STYLE3">
                                                            版本：2010V2.0</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!--left end-->
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="6" style="width: 6px;" valign="middle" bgcolor="1873aa" onclick="switchSysBar()">
                    <span class="navPoint" id="switchPoint" title="关闭/打开左栏">
                        <img src="images/main_55.gif" name="img1" width="6" height="40" id="img1"></span>
                </td>
                <td width="100%" align="center" valign="top">
                    <iframe id="Main" name="Main" width="100%" border="0" frameborder="0" src="Default.aspx"
                        style="height: 818px">浏览器不支持嵌入式框架，或被配置为不显示嵌入式框架。</iframe>
                </td>
                <td width="6" bgcolor="#1873aa" style="width: 6px;">
                    &nbsp;
                </td>
            </tr>
        </table>
        <!--bottom begin-->
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td width="6" background="images/main_59.gif" style="line-height: 6px;">
                    <img src="images/main_59.gif" width="6" height="6">
                </td>
                <td background="images/main_61.gif" style="line-height: 6px;">
                    &nbsp;
                </td>
                <td width="6" background="images/main_61.gif" style="line-height: 6px;">
                    <img src="images/main_62.gif" width="6" height="6">
                </td>
            </tr>
        </table>
        <!--bottom end-->
    </form>
</body>
</html>
