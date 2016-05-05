<%@ Page Language="C#" AutoEventWireup="true" CodeFile="class.aspx.cs" Inherits="Admin_class" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>类管理</title>
    <style type="text/css">
<!--
body {
	font-size: 12px;
}
-->
</style>
</head>
<body>
    <form id="form1" runat="server">
        <div style=" width:150px; margin:0 auto; margin-top: 30px; text-align:center;">
        <div style=" width:135px; font-size:20px; font-weight:bold;">技术人员管理</div>
            <div style="width: 120px; float:left; margin-top: 10px; border:2px solid; color:Red; padding:5px;">
                <a href="News/class/List.aspx">文章类别管理</a><br />
                <br />
                <a href="News/class/add.aspx">文章类别添加</a>
            </div>

            <div style="width: 120px; float:left; margin-top: 20px; border:2px solid; color:Red; padding:5px;">
                <a href="Product/class/List.aspx">图片类别管理</a><br />
                <br />
                <a href="Product/class/add.aspx">图片类别添加</a>
            </div>
            <div style="width: 120px; float:left; margin-top: 20px; border:2px solid; color:Red; padding:5px;">
                <a href="Navigation/List.aspx">首页导航</a><br />
                <br />
                <a href="Navigation/add.aspx">导航添加</a>
            </div>
            <div style="width: 120px; float:left; margin-top: 20px; border:2px solid; color:Red; padding:5px;">
                <a href="Navigation/List.aspx">子页导航管理</a><br />
                <br />
                <a href="Navigation/add.aspx">子页导航添加</a>
            </div>
        </div>
    </form>
</body>
</html>
