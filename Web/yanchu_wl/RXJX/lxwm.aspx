<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="lxwm.aspx.cs" Inherits="lxwm" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<img src="img/top.png"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
<div class="new">
    	<div class="newt"><img src="img/bjt.jpg">联系我们</div>
      <div class="shown">
        <div class="shownr"><%=txtNr %></div>
        <iframe width="630" height="621" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://map.sogou.com/card/index+s=630,400&p=1111&m=go2map&d=1323497535415279.html#"></iframe>
      </div>
    </div>
</asp:Content>

