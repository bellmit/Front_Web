﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="Admin_Product_class_add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>图片类添加</title>
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
        <div style="text-align: right; margin-top: 10px;">
            <a href="../../class.aspx" style="color: Blue;">>>>自己首页</a></div>
        <div style="text-align: right; margin-top: 10px;">
            <a href="List.aspx" style="color: Blue;">>>>图片类别管理</a></div>
        <table border="0" cellpadding="0" cellspacing="1" width="100%">
            <tr>
                <td align="right" class="table_body" style="height: 24px">
                    类别名称:</td>
                <td class="table_none" style="height: 24px">
                    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox><asp:RequiredFieldValidator
                        ID="RequiredFieldValidator1" runat="server" ControlToValidate="TextBox1" Display="Dynamic"
                        ErrorMessage="必填" SetFocusOnError="True"></asp:RequiredFieldValidator></td>
            </tr>
            <tr>
                <td align="right" class="table_body">
                    父类别:</td>
                <td class="table_none">
                    <asp:DropDownList ID="DropDownList1" runat="server" Width="156px">
                    </asp:DropDownList></td>
            </tr>
            <tr>
                <td align="right" colspan="2" style="height: 20px">
                    <asp:Button ID="Button1" runat="server" CssClass="button_bak" OnClick="Button1_Click"
                        Text="确定" />
                    <input id="Reset1" class="button_bak" type="reset" value="重填" /></td>
            </tr>
        </table>
    </form>
</body>
</html>
