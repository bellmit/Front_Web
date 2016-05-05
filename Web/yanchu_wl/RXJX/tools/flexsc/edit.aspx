<%@ Page Language="C#" AutoEventWireup="true" CodeFile="edit.aspx.cs" Inherits="tools_flexsc_edit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>无标题页</title>
</head>
<body>
    <form id="form1" runat="server">
        <div class="list">
            <table width="67%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td colspan="2" class="hei">
                        &nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2" class="pad">
                        <span>显示：<asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True"
                            OnSelectedIndexChanged="DropDownList1_SelectedIndexChanged" Width="48px">
                            <asp:ListItem>10</asp:ListItem>
                            <asp:ListItem>20</asp:ListItem>
                            <asp:ListItem>30</asp:ListItem>
                            <asp:ListItem Value="0">全部</asp:ListItem>
                        </asp:DropDownList>
                            条&nbsp; &nbsp;&nbsp;<asp:Button ID="Button2" runat="server" OnClick="Button2_Click"
                                Text="保存" /></span><b>统一添加照片信息</b></td>
                </tr>
                <tr>
                    <td colspan="2" class="pad">
                        为所有图片统一添加相同的名称和描述</td>
                </tr>
                <tr>
                    <td width="40">
                        名称：</td>
                    <td>
                        <asp:TextBox ID="TextBox1" runat="server" Width="520">在此添加统一图片名称</asp:TextBox></td>
                </tr>
                <tr>
                    <td>
                        描述：</td>
                    <td>
                        <asp:TextBox ID="TextBox2" runat="server" TextMode="MultiLine" Width="520"></asp:TextBox></td>
                </tr>
            </table>
            <hr color="#cebead" width="580" align="left" noshade="noshade" size="1" style="margin: 20px 0px;" />
            <asp:Repeater runat="server" ID="Repeater1">
                <ItemTemplate>
                    <table width="76%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td colspan="2" rowspan="3" class="img">
                                <a href="<%#GetImg(Eval("PicUrl").ToString()) %>" class="MagicThumb">
                                    <img alt="点击放大查看" src="<%#GetImg(Eval("PicUrl")) %>" width="140" height="100" /></a></td>
                            <td width="65" class="rig">
                                名称：</td>
                            <td width="627" colspan="2">
                                <asp:TextBox runat="server" ID="Name" Width="370" CssClass="inp" Text='<%#Eval("ProductName") %>'></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td class="rig">
                                描述：</td>
                            <td colspan="2">
                                <asp:TextBox runat="server" ID="Description" Width="370" Height="60" TextMode="MultiLine"
                                    Text='<%#Eval("Details") %>'></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td colspan="3" class="rig" style="color: #fff; height: 1px; font-size: 1px;">
                                <span style="float: left">ID：</span><asp:Label runat="server" ID="ID" Text='<%#Eval("ID") %>'></asp:Label></td>
                        </tr>
                        <tr>
                            <td colspan="5" class="hei">
                                &nbsp;</td>
                        </tr>
                    </table>
                </ItemTemplate>
            </asp:Repeater>
            <table width="50%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td colspan="3">
                        <span>
                            <asp:Button runat="server" ID="button1" Text="保存" OnClick="button1_Click" /></span></td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
