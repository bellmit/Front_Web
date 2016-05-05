<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="Admin_Navigation_edit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>导航修改</title>
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
    <div>
    导航名字：<asp:TextBox ID="txtName" runat="server" Text=""></asp:TextBox><br />
    导航链接：<asp:TextBox ID="txtUrl" runat ="server" Width="500px" Text=""></asp:TextBox><br />
    <asp:Button ID="btnTJ" runat ="server" Text="提交" OnClick="btnTJ_Click" />
    <asp:Button ID="btnCZ" runat ="server" Text="重置" OnClick="btnCZ_Click" />
    </div>
    </form>
</body>
</html>
