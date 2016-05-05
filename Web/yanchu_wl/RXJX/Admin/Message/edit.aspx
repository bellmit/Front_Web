<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="Admin_Message_edit" %>

<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>留言板回复</title>
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
        <table width="100%" border="0" cellpadding="0" cellspacing="1">
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    留言者：</td>
                <td class="table_none table_none_NoWidth">
                    <asp:Label ID="lbName" runat="server" Width="224px"></asp:Label></td>
                <td align="right" class="table_body table_body_NoWidth">
                    联系电话：</td>
                <td class="table_none table_none_NoWidth">
                    <asp:Label ID="lbTel" runat="server" Width="210px"></asp:Label></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    电子邮箱：</td>
                <td class="table_none table_none_NoWidth">
                    <asp:Label ID="lbEmail" runat="server" Width="224px"></asp:Label></td>
                <td align="right" class="table_body table_body_NoWidth">
                    公司名称：</td>
                <td class="table_none table_none_NoWidth">
                    <asp:Label ID="lbCname" runat="server" Width="276px"></asp:Label></td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    是否审核：</td>
                <td class="table_none table_none_NoWidth">
                    <asp:RadioButtonList ID="rbtIsCheck" runat="server" RepeatDirection="Horizontal"
                        RepeatLayout="Flow">
                        <asp:ListItem Value="1">是</asp:ListItem>
                        <asp:ListItem Value="0">否</asp:ListItem>
                    </asp:RadioButtonList></td>
                <td align="right" class="table_body table_body_NoWidth">
                </td>
                <td class="table_none table_none_NoWidth">
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    留言内容：</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <FCKeditorV2:FCKeditor ID="FCKeditor1" runat="server" BasePath="~/fckeditor/" Height="300px"
                        Width="100%" Value="">
                    </FCKeditorV2:FCKeditor>
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth">
                    回复内容:</td>
                <td class="table_none table_none_NoWidth" colspan="3">
                    <FCKeditorV2:FCKeditor ID="FCKeditor2" runat="server" BasePath="~/fckeditor/" Height="300px"
                        Width="100%" Value="">
                    </FCKeditorV2:FCKeditor>
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body table_body_NoWidth" colspan="4">
                    <asp:Button ID="Button1" runat="server" CssClass="button_bak" OnClick="Button1_Click"
                        Text="确定" /></td>
            </tr>
        </table>
    </form>
</body>
</html>
