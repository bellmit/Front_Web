<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="showProduct.aspx.cs" Inherits="showProduct" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<img src="img/top.png"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
<div class="cpzsz">
    	<div class="cpzszt"><img src="img/bjt.jpg">产品展示</div>
      <div class="showp">
        <div style="width:655px; text-align:center"><img id="img" runat="server" /></div>
      	<div class="showt" id="txtName" runat="server"></div>
        <div class="shownr" id="txtNr" runat="server"></div>
      </div>
    </div>
</asp:Content>

