<%@ Page Language="C#" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Admin_Product_List" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>图片管理</title>
            <style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	font-size: 12px;
}
a:hover{color:red;}
-->
</style>
</head>
<body style="text-align: center">
    <form id="form1" runat="server">
    <div style="width:100%; text-align:right;">
    <a style=" float:left; margin-top:10px; text-decoration:none; width:50px; margin-left:80px; font-size:16px;" href="sList.aspx">缩略图</a>
        类别：<asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True" OnSelectedIndexChanged="DropDownList1_SelectedIndexChanged1">
                 </asp:DropDownList>
        </div>
            <br />
            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="ID"
                OnRowCreated="GridView1_RowCreated" 
        OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing"
                Width="100%" BackColor="White" BorderColor="#CCCCCC" 
        BorderStyle="None" BorderWidth="1px" CellPadding="3" 
        onrowdatabound="GridView1_RowDataBound">
                <Columns>
                    <asp:TemplateField HeaderText="选择">
                    <ItemTemplate>
                    <asp:CheckBox runat="server" ID="CheckBox1" />
                    </ItemTemplate>
                        <HeaderStyle Width="50px" />
                    </asp:TemplateField>
                    <asp:BoundField HeaderText="编号" />
                    <asp:BoundField HeaderText="ID" DataField="ID" />
                    <asp:BoundField DataField="ProductName" HeaderText="名称" />
                    <asp:TemplateField HeaderText="类别">
                    <ItemTemplate><%#Ctype(Eval("TypeID")) %></ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="IsShow" HeaderText="首页显示" />
                    <asp:BoundField DataField="AddTime" HeaderText="添加时间" />
                    
                    <asp:CommandField ShowEditButton="True" HeaderText="编辑" />
                    <asp:CommandField ShowDeleteButton="True" HeaderText="删除" />
                    
                </Columns>
                <FooterStyle BackColor="White" ForeColor="#000066" />
                <RowStyle ForeColor="#000066" />
                <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
                <HeaderStyle BackColor="#006699" Font-Bold="True" ForeColor="White" />
            </asp:GridView>
            <div style="text-align: left">
            <asp:CheckBox ID="CheckBox2" runat="server" Text="全选" OnCheckedChanged="CheckBox1_CheckedChanged" AutoPostBack="True" />
            <asp:Button ID="Button2" runat="server" Text="取消" OnClick="Button2_Click" />
            <asp:Button ID="Button3" runat="server" Text="删除" OnClick="Button3_Click" />
             </div>
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
