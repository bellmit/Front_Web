<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="Admin_Link_add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>添加友情链接</title>
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
</head>
<body>
    <form id="form1" runat="server">
    <div style="text-align:right;"><a href="List.aspx" style=" color:Blue;">>>>友情链接管理</a></div>
    <div>
    友情链接名字：<asp:TextBox ID="txtName" runat="server" Text=""></asp:TextBox><br />
    友情链接路径：<asp:TextBox ID="txtUrl" runat ="server" Width="500px" Text=""></asp:TextBox><br />
    <asp:Button ID="btnTJ" runat ="server" Text="提交" OnClick="btnTJ_Click" />
    <asp:Button ID="btnCZ" runat ="server" Text="重置" OnClick="btnCZ_Click" />
    </div>
    </form>
</body>
</html>
