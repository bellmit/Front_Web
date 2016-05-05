<%@ Page Language="C#" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Admin_message_add" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>留言管理</title>
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
<body style="text-align: center">
    <form id="form1" runat="server">
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" OnRowCreated="GridView1_RowCreated"
            OnRowDeleting="GridView1_RowDeleting" Width="100%" DataKeyNames="ID" OnRowEditing="GridView1_RowEditing"
            BackColor="White" BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px"
            CellPadding="3">
            <Columns>
                <asp:BoundField DataField="ID" HeaderText="编号" />
                <asp:TemplateField HeaderText="联系人">
                    <ItemTemplate>
                        <%#Eval("UserName")%>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="AddTime" HeaderText="留言时间" />
                <asp:TemplateField HeaderText="留言内容">
                    <ItemTemplate>
                        <a title="<%#Eval("Contents") %>">
                            <%# SubString(25,Eval("Contents").ToString()) %>
                        </a>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="是否审核">
                    <ItemTemplate>
                        <%# Ccheck(Eval("IsCheck"))%>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:CommandField ShowDeleteButton="True" />
                <asp:CommandField EditText="查看" ShowEditButton="True" />
            </Columns>
            <FooterStyle BackColor="White" ForeColor="#000066" />
            <RowStyle ForeColor="#000066" />
            <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
            <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
            <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" />
        </asp:GridView>
        <webdiyer:AspNetPager ID="AspNetPager1" runat="server" PageSize="20" NextPageText="下一页"
            LastPageText="尾页" FirstPageText="首页" PrevPageText="上一页" ShowInputBox="Always"
            OnPageChanged="AspNetPager1_PageChanged1">
        </webdiyer:AspNetPager>
        共<asp:Label ID="lbltotal" runat="server" Text="Label" ForeColor="Red"></asp:Label>页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前第<asp:Label ID="lblcurrent" runat="server" Text="" ForeColor="Red"></asp:Label>页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        共<asp:Label ID="lblall" runat="server" Text="Label" ForeColor="Red"></asp:Label>条数据
    </form>
</body>
</html>
