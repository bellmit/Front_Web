<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="Admin_top_edit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>头部图片修改</title>
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
            <table>
                <tr>
                    <td style="width: 100px">
                        头部图片名字：</td>
                    <td style="width: 100px">
                        <asp:TextBox ID="txtName" runat="server" Text=""></asp:TextBox></td>
                </tr>
                <tr>
                    <td style="width: 100px">
                        头部图片：</td>
                    <td style="width: 100px">
                        <aspx:UpFileImg ID="UpFileImg1" runat="server" ></aspx:UpFileImg></td>
                </tr>
                <tr>
                    <td style="width: 100px">
                    </td>
                    <td style="width: 100px">
                        <asp:Button ID="btnTJ" runat="server" Text="提交" OnClick="btnTJ_Click" />
                        <asp:Button ID="btnCZ" runat="server" Text="重置" OnClick="btnCZ_Click" /></td>
                </tr>
            </table>
            &nbsp;&nbsp;
        </div>
    </form>
</body>
</html>
