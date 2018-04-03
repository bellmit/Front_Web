<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="Admin_Product_add" ValidateRequest="false" %>

<%@ Register Assembly="FredCK.FCKeditorV2" Namespace="FredCK.FCKeditorV2" TagPrefix="FCKeditorV2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>图片添加</title>
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
        <table border="0" cellpadding="0" cellspacing="1" width="100%">
            <tr>
                <td align="right" class="table_body" style="height: 22px">
                    类别:</td>
                <td class="table_none" style="height: 22px">
                    <asp:DropDownList ID="DropDownList1" runat="server" Width="154px">
                    </asp:DropDownList></td>
            </tr>
            <tr>
                <td align="right" class="table_body">
                    <%=ProductName %>
                    :</td>
                <td class="table_none">
                    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox><asp:RequiredFieldValidator
                        ID="RequiredFieldValidator1" runat="server" ControlToValidate="TextBox1" Display="Dynamic"
                        ErrorMessage="必填" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
            </tr>
            <tr>
                <td align="right" class="table_body">
                    首页显示:</td>
                <td class="table_none">
                    <asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal"
                        RepeatLayout="Flow">
                        <asp:ListItem  Value="1">是</asp:ListItem>
                        <asp:ListItem Selected="True" Value="0">否</asp:ListItem>
                        
                    </asp:RadioButtonList></td>
            </tr>
            <tr>
                <td align="right" class="table_body">
                    <%=PicUrl %>
                    :</td>
                <td class="table_none">
                    <aspx:UpFileImg ID="UpFileImg1" runat="server" ></aspx:UpFileImg>
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body">
                    <%=Details %>
                    :</td>
                <td class="table_none">
                    <FCKeditorV2:FCKeditor ID="FCKeditor1" runat="server" BasePath="~/fckeditor/" Height="300px"
                        Width="100%" Value="">
                    </FCKeditorV2:FCKeditor>
                </td>
            </tr>
            <tr>
                <td align="right" class="table_body" colspan="2" style="height: 22px">
                    <asp:Button ID="Button1" runat="server" CssClass="button_bak" OnClick="Button1_Click"
                        Text="确定" />
                    <asp:Button ID="Button2" runat="server" CssClass="button_bak" OnClick="Button2_Click"
                        Text="重置" /></td>
            </tr>
        </table>
    </form>
</body>
</html>
