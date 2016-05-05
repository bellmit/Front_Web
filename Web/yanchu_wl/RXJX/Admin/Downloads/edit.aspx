<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="Admin_Downloads_edit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>下载修改</title>
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
    <table border="0">
            <tr>
                <td>
                    名称：
                </td>
                <td>
                    <asp:TextBox runat="server" Text="" ID="txtT"></asp:TextBox><asp:RequiredFieldValidator
                        ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtT" Display="Dynamic"
                        ErrorMessage="必填" SetFocusOnError="True"></asp:RequiredFieldValidator>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    上传路径：
                </td>
                <td>
                    <asp:TextBox ID="txtPic" runat="server" Width="180px"></asp:TextBox></td>
                <td style="margin-left: 5px; margin-right: 5px; padding-left: 5px; padding-right: 5px;">
                    <asp:Label ID="message" Text="" runat="server" style="color:Red;"></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td>
                    <asp:FileUpload ID="FupdImg" runat="server" Width="180px" /></td>
                <td style="margin-left: 5px; margin-right: 5px; padding-left: 5px; padding-right: 5px;">
                    <asp:Button ID="btnUpFile" runat="server" Width="50px" OnClick="btnUpFile_Click"
                        Text="上传" CausesValidation="False" /></td>
            </tr>
            <tr>
                <td style="height: 26px">
                </td>
                <td style="height: 26px">
                    <asp:Button ID="btn" runat="server" Text="修改" OnClick="btn_Click" /></td>
                <td style="height: 26px">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
