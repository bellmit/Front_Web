<%@ Page Language="C#" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Admin_top_List" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>头部图片管理</title>
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
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="100%"
            DataKeyNames="ID" OnRowCreated="GridView1_RowCreated" OnRowDataBound="GridView1_RowDataBound"
            OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing" BackColor="White"
            BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px" CellPadding="3">
            <Columns>
                <asp:TemplateField HeaderText="选择">
                    <ItemTemplate>
                        <asp:CheckBox runat="server" ID="CheckBox1" />
                    </ItemTemplate>
                    <HeaderStyle Width="50px" />
                </asp:TemplateField>
                <asp:BoundField HeaderText="序号" />
                <asp:BoundField HeaderText="ID" DataField="ID" />
                <asp:BoundField DataField="Topname" HeaderText="头部图片名" />
                <asp:BoundField DataField="Addtime" HeaderText="添加时间" />
                <asp:CommandField ShowEditButton="True" />
                <asp:CommandField ShowDeleteButton="True" />
            </Columns>
            <FooterStyle BackColor="White" ForeColor="#000066" />
            <RowStyle ForeColor="#000066" />
            <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
            <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
            <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" />
        </asp:GridView>
        <div style="text-align: left">
            <asp:CheckBox ID="CheckBox2" runat="server" Text="全选" OnCheckedChanged="CheckBox1_CheckedChanged"
                AutoPostBack="True" />
            <asp:Button ID="Button2" runat="server" Text="取消" OnClick="Button2_Click" />
            <asp:Button ID="Button3" runat="server" Text="删除" OnClick="Button3_Click" />
        </div>
        <webdiyer:aspnetpager id="AspNetPager1" runat="server" pagesize="20" nextpagetext="下一页"
            lastpagetext="尾页" firstpagetext="首页" prevpagetext="上一页" showinputbox="Always"
            onpagechanged="AspNetPager1_PageChanged1">
        </webdiyer:aspnetpager>
        共<asp:Label ID="lbltotal" runat="server" Text="Label" ForeColor="Red"></asp:Label>页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前第<asp:Label ID="lblcurrent" runat="server" Text="" ForeColor="Red"></asp:Label>页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        共<asp:Label ID="lblall" runat="server" Text="Label" ForeColor="Red"></asp:Label>条数据
    </form>
</body>
</html>
