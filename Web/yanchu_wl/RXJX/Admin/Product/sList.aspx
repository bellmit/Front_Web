<%@ Page Language="C#" AutoEventWireup="true" CodeFile="sList.aspx.cs" Inherits="Admin_Product_sList" %>

<%@ Register Assembly="AspNetPager" Namespace="Wuqi.Webdiyer" TagPrefix="webdiyer" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>缩略图</title>
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
<body>
    <form id="form1" runat="server">
        <div style="width: 100%;">
        <div style="width:100%; text-align:right;">
        
        类别：<asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True" OnSelectedIndexChanged="DropDownList1_SelectedIndexChanged1">
                 </asp:DropDownList>
        </div>
            <asp:Repeater runat="server" ID="R1">
                <ItemTemplate>
                    <div style="width: 460px; height: 150px; margin: 8px;">
                        <!--图片层 -->
                        <div style="float: left; border: 1px solid #9caece;">
                            <img style="margin: 5px; padding: 2px; display: block; width: 180px; height: 140px"
                                src="<%# GetImg(Eval("PicUrl").ToString()) %>" />
                        </div>
                        <!--右侧信息层 -->
                        <div style="float: left; margin-left: 10px; font-size: 14px; text-align: left; line-height: 22px;">
                            图片ID：<%#Eval("ID") %><br />
                            图片名称：<%#Eval("ProductName") %><br />
                            图片类型：<%#Ctype(Eval("TypeID"))%><br />
                            <a style="margin-right: 10px" href="edit.aspx?id=<%#Eval("ID") %>">编辑</a><a href="delete.aspx?id=<%#Eval("ID") %>">删除</a>
                        </div>
                    </div>
                </ItemTemplate>
            </asp:Repeater>
            <br />
            <webdiyer:AspNetPager ID="AspNetPager1" runat="server" PageSize="4" NextPageText="下一页"
                LastPageText="尾页" FirstPageText="首页" PrevPageText="上一页" ShowInputBox="Always"
                OnPageChanged="AspNetPager1_PageChanged1">
            </webdiyer:AspNetPager>
            共<asp:Label ID="lbltotal" runat="server" Text="Label" ForeColor="Red"></asp:Label>页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            当前第<asp:Label ID="lblcurrent" runat="server" Text="" ForeColor="Red"></asp:Label>页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            共<asp:Label ID="lblall" runat="server" Text="Label" ForeColor="Red"></asp:Label>条数据
        </div>
    </form>
</body>
</html>
