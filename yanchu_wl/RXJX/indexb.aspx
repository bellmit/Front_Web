<%@ Page Language="C#" AutoEventWireup="true" CodeFile="indexb.aspx.cs" Inherits="indexb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <%=top %></title>
    <link href="css/b_css.css" rel="stylesheet" type="text/css">
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
        <div class="top">
        </div>
        <div class="dh">
            <ul>
                <li><a href="indexb.aspx">首页</a></li>
                <li><a href="b_wmsb.aspx">我们的设备</a></li>
                <li><a href="b_sbyy.aspx">设备的应用</a></li>
                <li><a href="b_wmdkh.aspx">我们的客户</a></li>
                <li><a href="b_cxfwwl.aspx">促销服务网络</a></li>
                <li><a href="b_pqjy.aspx">聘请精英</a></li>
                <li><a href="b_lxwm.aspx">联系我们</a></li>
            </ul>
        </div>
        <div class="nrl">
            <div class="cpjy">
                <div class="t">
                </div>
                <div class="n">
                    <ul>
                        <asp:Repeater ID="rptNew" runat="server">
                            <ItemTemplate>
                                <li>
                                    <img src="img/b_cpjyjt.png"><a href="#"><%# Eval("Title") %></a></li>
                            </ItemTemplate>
                        </asp:Repeater>
                    </ul>
                </div>
                <div class="more">
                    <a href="b_pqjy.aspx">
                        <img src="img/b_hmore.png"></a></div>
            </div>
            <div class="lxwm">
                <div class="t">
                </div>
                <div class="n">
                    <ul>
                        <li>地址：长沙市河西麓谷工业园麓枫路湘麓国际9栋101室</li>
                        <li>电话：0731-88113523 13975854606（朱先生）</li>
                        <li>传真：0731-88113523</li>
                        <li>邮箱：RXLYJX.2004@163.com</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="nrr">
            <div class="nrrl">
                <div class="wmdsb">
                    <div class="t">
                    </div>
                    <div class="n">
                        <ul>
                            <asp:Repeater ID="rptProd" runat="server">
                                <ItemTemplate>
                                    <li>
                                        <img src="img/b_cpjyjt.png"><a href="#"><%# Eval("ProductName") %></a></li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
                    </div>
                </div>
                <div class="sbdyy">
                    <div class="t">
                    </div>
                    <div class="n">
                        <ul>
                            <asp:Repeater ID="rptNew1" runat="server">
                                <ItemTemplate>
                                    <li>
                                        <img src="img/b_cpjyjt.png"><a href="#"><%# Eval("Title") %></a></li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
                    </div>
                </div>
                <div class="more1">
                    <a href="b_sbyy.aspx">
                        <img src="img/xwmore.png" /></a>
                </div>
            </div>
            <div class="nrrr">
                <ul class="tulis">
                    <asp:Repeater ID="rptProd1" runat="server">
                        <ItemTemplate>
                            <li><a href="#">
                                <img src="<%# Eval("PicUrl") %>" /></a><%# Eval("ProductName") %></li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
            </div>
            <div class="tut">
                <img src="img/b_222.png"></div>
        </div>
        <div class="foot1">
            <%=foot %>
        </div>
    </div>
    </form>
</body>
</html>
