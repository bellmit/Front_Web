<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Admin_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title></title>
    <style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #016aa9;
	overflow:hidden;
}
.STYLE1 {
	color: #000000;
	font-size: 12px;
}`
.btn
{
width:49px;
height:18px;
border:0px;
cursor:pointer;
background:url(images/dl.gif);
}
-->
</style>
</head>
<body>
    <form id="form1" runat="server">
        <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <table width="962" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td height="235" background="images/login_03.gif">
                            </td>
                        </tr>
                        <tr>
                            <td height="53">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="394" height="53" background="images/login_05.gif">
                                        </td>
                                        <td width="206" background="images/login_06.gif">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td width="16%" style="height: 25px">
                                                        <span class="STYLE1">用户</span>
                                                    </td>
                                                    <td width="57%" style="height: 25px">
                                                        <asp:TextBox ID="txtName" runat="server" Style="width: 105px; height: 17px; background-color: #292929;
                                                            border: solid 1px #7dbad7; font-size: 12px; color: #6cd0ff"></asp:TextBox>
                                                    </td>
                                                    <td width="27%" style="height: 25px">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td height="25">
                                                        <span class="STYLE1">密码</span>
                                                    </td>
                                                    <td height="25">
                                                        <asp:TextBox ID="txtPass" runat="server" Style="width: 105px; height: 17px; background-color: #292929;
                                                            border: solid 1px #7dbad7; font-size: 12px; color: #6cd0ff" TextMode="Password"></asp:TextBox>
                                                    </td>
                                                    <td height="25">
                                                        <asp:ImageButton ID="btnLogin" ImageUrl="~/Admin/images/dl.gif" runat="server" class="btn" Text="" OnClick="btnLogin_Click" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td width="362" background="images/login_07.gif">
                                        </td>
                                    </tr>
                                </table>
                                <tr>
                                    <td background="images/login_08.gif" style="height: 213px">
                                    </td>
                                </tr>
                    </table>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
