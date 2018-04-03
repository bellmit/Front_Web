<%@ Page Language="C#" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Admin_News_class_list" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>类别管理</title>
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
            <a href="add.aspx" style="color: Blue;">>>>文章类别添加</a></div>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="100%"
            DataKeyNames="ID" OnRowCreated="GridView1_RowCreated" OnRowDataBound="GridView1_RowDataBound"
            OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing">
            <Columns>
                <asp:BoundField HeaderText="序号" />
                <asp:BoundField DataField="ID" HeaderText="编号（可引用）" />
                <asp:BoundField DataField="TypeName" HeaderText="类别名称" />
                <asp:TemplateField HeaderText="父类别">
                    <ItemTemplate>
                        <%# Ctype(Eval("ParentID"))%>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:CommandField ShowEditButton="True" HeaderText="编辑" />
                <asp:CommandField ShowDeleteButton="True" HeaderText="删除" />
            </Columns>
        </asp:GridView>
    </form>
</body>
</html>
