<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="showNews.aspx.cs" Inherits="showNews" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<img src="img/top.png"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
<div class="new">
    	<div class="newt"><img src="img/bjt.jpg">文章展示</div>
      <div class="shown">
        <div class="showt" id="txtTitle" runat="server"></div>
        <div class="shownr" id="txtNr" runat="server"></div>
      </div>
    </div>
</asp:Content>

