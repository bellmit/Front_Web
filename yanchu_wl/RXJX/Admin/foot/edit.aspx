<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="Admin_foot_edit" %>

<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>修改网站底部</title>
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
        <table border="0" cellpadding="0" cellspacing="1" style="width: 100%">
            <tr>
                <td align="right" class="table_body table_body_NoWidth" style="height: 24px">
                    公司名称:</td>
                <td class="table_none table_none_NoWidth" colspan="3" style="height: 24px">
                    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox><asp:RequiredFieldValidator
                        ID="RequiredFieldValidator1" runat="server" ControlToValidate="TextBox1" Display="Dynamic"
                        ErrorMessage="必填" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    网站底部:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <FCKeditorV2:FCKeditor ID="FCKeditor1" runat="server" BasePath="~/fckeditor/" Height="300px"
                        Width="100%" Value="">
                    </FCKeditorV2:FCKeditor>
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth" colspan="4" style="height: 22px">
                    <asp:Button ID="Button1" runat="server" Text="确定" CssClass="button_bak" OnClick="Button1_Click" /><asp:Button
                        ID="Button2" runat="server" Text="重置" CssClass="button_bak" OnClick="Button2_Click" /></td>
            </tr>
        </table>
    </form>
</body>
</html>
