<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="Admin_News_class_edit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>文章类别管理</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
     <table border="1" cellpadding="0" cellspacing="1" width="100%">
                <tr>
                    <td align="right" class="table_body" style="height: 24px">
                        类别名称:</td>
                    <td class="table_none" style="height: 24px">
                        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox><asp:RequiredFieldValidator
                            ID="RequiredFieldValidator1" runat="server" ControlToValidate="TextBox1" Display="Dynamic"
                            ErrorMessage="必填" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
                </tr>
                <tr>
                    <td align="right" colspan="2" style="height: 22px">
                        <asp:Button ID="Button1" runat="server" CssClass="button_bak" OnClick="Button1_Click"
                            Text="确定" />
                        <input id="Reset1" class="button_bak" type="reset" value="重填" /></td>
                </tr>
            </table>
    </div>
    </form>
</body>
</html>
