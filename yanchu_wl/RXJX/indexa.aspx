<%@ Page Language="C#" AutoEventWireup="true" CodeFile="indexa.aspx.cs" Inherits="index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <%=top %></title>
    <link href="css/css.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery-1.6.js"></script>
    <script type="text/javascript" src="js/show.js"></script>
    <link rel="shortcut icon" href="img/icon.ico" />
    <meta http-equiv="description" content="荣欣粮油|荣欣机械|湖南荣欣|湖南农业机械|农业机械|农业机械购买|湖南农机"/>
    <meta http-equiv="keywords" content="荣欣粮油,荣欣机械,湖南荣欣,湖南农业机械,农业机械,农业机械购买,湖南农机" />
    <script src="js/AC_RunActiveContent.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
        <div class="top1">
            <div class="top1l">
            </div>
            <div class="top1r">
              <script type="text/javascript">
AC_FL_RunContent( 'codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0','width','640','height','38','src','flash/menu','quality','high','pluginspage','http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash','movie','flash/menu' ); //end AC code
</script><noscript><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="640" height="38">
                <param name="movie" value="flash/menu.swf" />
                <param name="quality" value="high" />
                <embed src="flash/menu.swf" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="640" height="38"></embed>
              </object></noscript>
              <!--<ul>
                    <asp:Repeater ID="rptNa" runat="server">
                        <ItemTemplate>
                            <li><a href="<%# Eval("Nurl") %>">
                                <%# Eval("Nname") %></a></li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>-->
          </div>
      </div>
        <div class="top2">
            <img src="img/top.png" />
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
                                    <img src="img/cpjyjt.png"><a href="showNews.aspx?ID=<%# Eval("ID") %>"><%# Eval("Title") %></a></li>
                            </ItemTemplate>
                        </asp:Repeater>
                    </ul>
                </div>
                <div class="more">
                    <a href="cpjy.aspx">
                        <img src="img/cpjymore.png" /></a>
                </div>
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
            <div class="gcal">
                <div class="t">
                </div>
                <div class="n">
                    <ul>
                        <asp:Repeater ID="rptProd" runat="server">
                            <ItemTemplate>
                                <li>
                                    <img src="img/cpjyjt.png"><a href="showProduct.aspx?ID=<%# Eval("ID") %>"><%# Eval("ProductName") %></a></li>
                            </ItemTemplate>
                        </asp:Repeater>
                    </ul>
                </div>
                <div class="more">
                    <a href="gcal.aspx">
                        <img src="img/cpjymore.png" /></a>
                </div>
            </div>
        </div>
        <div class="nrr">
            <div class="xwdt">
                <div class="t">
                    <img src="img/jt.png" />新闻动态</div>
                <div class="n">
                    <ul>
                        <asp:Repeater ID="rptNew1" runat="server">
                            <ItemTemplate>
                                <li>
                                    <img src="img/xwjt.png" /><a href="showNews.aspx?ID=<%# Eval("ID") %>"><%# Eval("Title") %></a><%# Convert.ToDateTime(Eval("CreateTime")).ToString("yyyy-MM-dd")%></li>
                            </ItemTemplate>
                        </asp:Repeater>
                    </ul>
                </div>
                <div class="more1">
                    <a href="xwdt.aspx">
                        <img src="img/xwmore.png" /></a>
                </div>
            </div>
            <div class="cpzs">
                <div class="t">
                    <img src="img/jt.png" />代理产品展示</div>
                <div class="cpzsl">
                    <div class="cpzsl1">
                        <asp:Repeater ID="rptProd1" runat="server">
                            <ItemTemplate>
                                <div class="t">
                                    <a href="showProduct.aspx?ID=<%# Eval("ID") %>">
                                        <%# Eval("ProductName") %></a></div>
                                <%# Eval("Details") %>
                            </ItemTemplate>
                        </asp:Repeater>
                    </div>
                </div>
                <div class="cpzslr">
                    <img src="img/111.png">
                    <div class="more2">
                        <a href="dlcp.aspx">
                            <img src="img/xwmore.png" /></a>
                    </div>
                </div>
            </div>
            <div class="gczs">
                <div class="t">
                    <img src="img/jt.png" />工程展示</div>
                <div class="n">
                    <div id="demc">
                        <div id="indemc">
                            <ul class="zpzslb" id="demc1">
                                <table>
                                    <tr>
                                        <asp:Repeater ID="rptProd2" runat="server">
                                            <ItemTemplate>
                                                <td>
                                                    <a href="showProduct.aspx?ID=<%# Eval("ID") %>">
                                                        <img src="<%# Eval("PicUrl") %>"></a><div>
                                                            <%# Eval("ProductName") %></div>
                                                </td>
                                            </ItemTemplate>
                                        </asp:Repeater>
                                    </tr>
                                </table>
                            </ul>
                            <ul class="zpzslb" id="demc2">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <%=foot %>
        </div>
    </div>

    <script>
        <!--
        var speed=20; //数字越大速度越慢
        var tab=document.getElementById("demc");
        var tab1=document.getElementById("demc1");
        var tab2=document.getElementById("demc2");

        tab2.innerHTML=tab1.innerHTML;
        function Marquee(){
        if(tab2.offsetWidth-tab.scrollLeft<=0)
        tab.scrollLeft-=tab1.offsetWidth
        else{
        tab.scrollLeft++;
        }
        }
        var MyMar=setInterval(Marquee,speed);
        tab.onmouseover=function() {clearInterval(MyMar)};
        tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
        //-->
    </script>

    </form>
</body>
</html>
