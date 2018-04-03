<%@ Page Language="C#" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Admin_Product_class_List" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>图片类别管理</title>
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
            <a href="add.aspx" style="color: Blue;">>>>图片类别添加</a></div>
        <div>
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="ID"
                OnRowCreated="GridView1_RowCreated" OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing"
                Width="100%">
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="编号" />
                    <asp:BoundField DataField="TypeName" HeaderText="类别名称" />
                    <asp:TemplateField HeaderText="父类别">
                        <ItemTemplate>
                            <%# Ctype(Eval("ParentID"))%>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:CommandField ShowEditButton="True" />
                    <asp:CommandField ShowDeleteButton="True" />
                </Columns>
            </asp:GridView>
        </div>
    </form>
</body>
</html>
