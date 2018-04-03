<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="Admin_News_add" ValidateRequest="false" %>

<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>文章添加</title>
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
                    文章标题:</td>
                <td class="table_none table_none_NoWidth" colspan="3" style="height: 24px">
                    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox><asp:RequiredFieldValidator
                        ID="RequiredFieldValidator1" runat="server" ControlToValidate="TextBox1" Display="Dynamic"
                        ErrorMessage="必填" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    文章类别:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <asp:DropDownList ID="DropDownList1" runat="server" Width="156px">
                    </asp:DropDownList>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    首页显示:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <asp:RadioButtonList ID="rbtHome" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                        <asp:ListItem Selected="True" Value="1">是</asp:ListItem>
                        <asp:ListItem Value="0">否</asp:ListItem>
                    </asp:RadioButtonList></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    文章来源:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    链接路径:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    标题图片:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <aspx:UpFileImg ID="UpFileImg1" runat="server" />
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    文章内容:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <FCKeditorV2:FCKeditor ID="FCKeditor1" runat="server" BasePath="~/fckeditor/" Height="300px"
                        Width="100%" Value="">
                    </FCKeditorV2:FCKeditor>
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth" colspan="4" style="height: 22px">
                    <asp:Button ID="Button1" runat="server" Text="确定" CssClass="button_bak" OnClick="Button1_Click" />
                    <asp:Button ID="Button2" runat="server" Text="重置" CssClass="button_bak" OnClick="Button2_Click" /></td>
            </tr>
        </table>
    </form>
</body>
</html>
