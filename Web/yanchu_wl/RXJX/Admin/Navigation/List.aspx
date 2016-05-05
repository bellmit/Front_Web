<%@ Page Language="C#" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Admin_Navigation_Listt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>导航管理</title>
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
        <div style="text-align: right; margin-top:10px;">
            <a href="../class.aspx" style="color: Blue;">>>>自己首页</a></div>
        <div style="text-align: right; margin-top:10px;">
            <a href="add.aspx" style="color: Blue;">>>>导航添加</a></div>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="100%"
            DataKeyNames="ID" OnRowCreated="GridView1_RowCreated" OnRowDataBound="GridView1_RowDataBound"
            OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing">
            <Columns>
                <asp:BoundField HeaderText="序号" />
                <asp:BoundField HeaderText="" />
                <asp:BoundField DataField="ID" HeaderText="编号（可引用）" />
                <asp:BoundField DataField="Nname" HeaderText="首页导航" />
                <asp:BoundField DataField="Nurl" HeaderText="导航链接" />
                <asp:TemplateField HeaderText="父类别">
                    <ItemTemplate>
                        <%# Ctype(Eval("Pid"))%>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:CommandField ShowEditButton="True" HeaderText="编辑" />
                <asp:CommandField ShowDeleteButton="True" HeaderText="删除" />
            </Columns>
        </asp:GridView>
    </form>
</body>
</html>
