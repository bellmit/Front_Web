<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="Admin_sys_User_add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>添加管理员</title>
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
    <table border="0" width="98%" cellpadding="0" cellspacing="0">
        <tr>
            <td width="45%" heigth="40" align="right">
                管理员号：
            </td>
            <td>
                <asp:TextBox ID="txtName" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td heigth="40" align="right">
                管理员密码：
            </td>
            <td>
                <asp:TextBox ID="txtPws" runat="server" TextMode="Password"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td heigth="40" align="right">
                确认密码：
            </td>
            <td>
                <asp:TextBox ID="txtPws1" runat="server" TextMode="Password"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td height="40" align="right">
                <asp:Label ID="labMessage" runat="server" ForeColor="red" Font-Size="14"></asp:Label>
            </td>
            <td>
                <asp:Button ID="btnAdd" runat="server" Text="添加" OnClick="btnAdd_Click" />
            </td>
        </tr>
    </table>
    </div>
    </form>
</body>
</html>
