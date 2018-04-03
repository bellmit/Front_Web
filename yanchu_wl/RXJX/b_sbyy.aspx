<%@ Page Language="C#" MasterPageFile="~/MasterPage2.master" AutoEventWireup="true" CodeFile="b_sbyy.aspx.cs" Inherits="b_wmsb" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<img src="img/b_top.png" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
<div class="new">
    	<div class="newt"><img src="img/huisjt.jpg">设备的应用</div>
      <div class="newn">
      <div id="div1"></div>
        <div style="width: 100%; text-align:center; height:20px; margin-top:20px;">
        共<span id="y" style="color: Red"><%=count %></span>条&nbsp;&nbsp;<span id="dy" style="color: Red"></span>/<span
            id="gy" style="color: Red"></span>页&nbsp;&nbsp;<span id="sy"><a href="#">首页</a></span>&nbsp;&nbsp;&nbsp;<span
                id="splast"><a href="#">上一页</a></span>&nbsp;&nbsp;&nbsp;<span id="spnext"><a href="#">下一页</a></span>&nbsp;&nbsp;&nbsp;<span
                    id="wy"><a href="#">尾页</a></span></div>
        </div>
    </div>
     <script language="javascript" type="text/javascript">
     $(document).ready(function() {
                var current = 0;
                var TypeID = 57;
                var ys = "<%=count %>";
                var absolute = 13;
                var absolute = (absolute <= 0) || (absolute > ys) ? ys : absolute;
                var gy = parseInt(ys % absolute == 0 ? ys / absolute : ys / absolute + 1);
                
                $.ajax({
                    type: "post",
                    url: "ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                    befordsend:function(){
                        $("#div1").html("正在加载,请等候...")},
                    success: function(message) {
                        var tab;
                        var mesg1 = message.split("|");
                        tab = "<table>";
                        for (var i = 0; i < mesg1.length - 1; i++) {
                            var mesg2 = mesg1[i].split(",");
                            tab += "<tr><td><img src='img/xwjt.png'/><a href='showNews.aspx?ID=" + mesg2[0] + "'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";
                        }
                        tab += "</table>"
                        $("#div1").html(tab);
                        $("#dy").html(current + 1);
                        $("#gy").html(gy);
                    }
                });
                $("#sy").click(function() {
                        current = 0;
                        $.ajax({
                            type: "post",
                            url: "ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/><a href='showNews.aspx?ID=" + mesg2[0] + "'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

                                }
                                tab += "</table>"
                                var diva = document.getElementById("div1");
                                diva.innerHTML = "";
                                $("#div1").html(tab);
                                $("#dy").html(current + 1);
                            }
                        });
                
                });
                $("#splast").click(function() {
                    if (current <= 0) {
                        alert("已到第一页");
                    }
                    else {
                        current -= 1;
                        $.ajax({
                            type: "post",
                            url: "ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/><a href='showNews.aspx?ID=" + mesg2[0] + "'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

                                }
                                tab += "</table>"
                                var diva = document.getElementById("div1");
                                diva.innerHTML = "";
                                $("#div1").html(tab);
                                $("#dy").html(current + 1);
                            }
                        });
                    }
                });
                $("#spnext").click(function() {
                    if (current >= (gy - 1)) {
                        alert("已到最末页");
                    }
                    else {
                        current += 1;
                        $.ajax({
                            type: "post",
                            url: "ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {

                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/><a href='showNews.aspx?ID=" + mesg2[0] + "'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

                                }
                                tab += "</table>"
                                var diva = document.getElementById("div1");
                                diva.innerHTML = "";
                                $("#div1").html(tab);
                                $("#dy").html(current + 1);
                            }
                        });
                    }
                });
              $("#wy").click(function() {
                        current = gy - 1;
                        $.ajax({
                            type: "post",
                            url: "ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/><a href='showNews.aspx?ID=" + mesg2[0] + "'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

                                }
                                tab += "</table>"
                                var diva = document.getElementById("div1");
                                diva.innerHTML = "";
                                $("#div1").html(tab);
                                $("#dy").html(current + 1);
                            }
                        });
                
                });

            });
    </script>
</asp:Content>

