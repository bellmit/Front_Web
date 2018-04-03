// JScript 文件
function fenye(typeid,tcount)
{
            $(document).ready(function() {
                var current = 0;
                var TypeID = parseInt(typeid);
                var ys = parseInt(tcount);
                var absolute = 13;
                var absolute = (absolute <= 0) || (absolute > ys) ? ys : absolute;
                var gy = parseInt(ys % absolute == 0 ? ys / absolute : ys / absolute + 1);
                
                $.ajax({
                    type: "post",
                    url: "../ashx/getlistp.ashx?current=" + current + "&&TypeID=" + TypeID,
                    befordsend:function(){
                        $("#div1").html("正在加载,请等候...")},
                    success: function(message) {
                        var tab;
                        var mesg1 = message.split("|");
                        tab = "<div>";
                        for (var i = 0; i < mesg1.length - 1; i++) {
                            var mesg2 = mesg1[i].split(",");
                            tab += "<table><tr><td style='background:url(../img/zyt.jpg) no-repeat; width:243px; height:142px;'><a href='Product" + mesg2[0] + ".htm'><img src='../" + mesg2[2] + "' style='width:231px; height:129px;'></a></td></tr><tr><td style=' height: 40px;'>" + mesg2[1].substring(0,12) + "</td></tr></table>";
                        }
                        tab += "</div>"
                        $("#div1").html(tab);
                        $("#dy").html(current + 1);
                        $("#gy").html(gy);
                    }
                });
                $("#sy").click(function() {
                        current = 0;
                        $.ajax({
                            type: "post",
                            url: "../ashx/getlistp.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<div>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<table><tr><td style='background:url(../img/zyt.jpg) no-repeat; width:243px; height:142px;'><a href='Product" + mesg2[0] + ".htm'><img src='../" + mesg2[2] + "' style='width:231px; height:129px;'></a></td></tr><tr><td style=' height: 40px;'>" + mesg2[1].substring(0,12) + "</td></tr></table>";
                                }
                                tab += "</div>";
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
                            url: "../ashx/getlistp.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<div>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<table><tr><td style='background:url(../img/zyt.jpg) no-repeat; width:243px; height:142px;'><a href='Product" + mesg2[0] + ".htm'><img src='../" + mesg2[2] + "' style='width:231px; height:129px;'></a></td></tr><tr><td style=' height: 40px;'>" + mesg2[1].substring(0,12) + "</td></tr></table>";
                                }
                                tab += "</div>";
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
                            url: "../ashx/getlistp.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {

                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<div>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<table><tr><td style='background:url(../img/zyt.jpg) no-repeat; width:243px; height:142px;'><a href='Product" + mesg2[0] + ".htm'><img src='../" + mesg2[2] + "' style='width:231px; height:129px'></a></td></tr><tr><td style=' height: 40px;'>" + mesg2[1].substring(0,12) + "</td></tr></table>";
                                }
                                tab += "</div>";
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
                            url: "../ashx/getlistp.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<div>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<table><tr><td style='background:url(../img/zyt.jpg) no-repeat; width:243px; height:142px;'><a href='Product" + mesg2[0] + ".htm'><img src='../" + mesg2[2] + "' style='width:231px; height:129px'></a></td></tr><tr><td style=' height: 40px;'>" + mesg2[1].substring(0,12) + "</td></tr></table>";
                                }
                                tab += "</div>";
                                var diva = document.getElementById("div1");
                                diva.innerHTML = "";
                                $("#div1").html(tab);
                                $("#dy").html(current + 1);
                            }
                        });
                
                });

            });

}

function fenyen(typeid,tcount)
{
            $(document).ready(function() {
                var current = 0;
                var TypeID = parseInt(typeid);
                var ys = parseInt(tcount);
                var absolute = 20;
                var absolute = (absolute <= 0) || (absolute > ys) ? ys : absolute;
                var gy = parseInt(ys % absolute == 0 ? ys / absolute : ys / absolute + 1);
                
                $.ajax({
                    type: "post",
                    url: "../ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                    befordsend:function(){
                        $("#div1").html("正在加载,请等候...")},
                    success: function(message) {
                        var tab;
                        var mesg1 = message.split("|");
                        tab = "<table>";
                        for (var i = 0; i < mesg1.length - 1; i++) {
                            var mesg2 = mesg1[i].split(",");
                            tab += "<tr><td><img src='img/xwjt.png'/></td><td><a href='#'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";
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
                            url: "../ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/></td><td><a href='#'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

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
                            url: "../ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/></td><td><a href='#'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

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
                            url: "../ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {

                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/></td><td><a href='#'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

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
                            url: "../ashx/getlistn.ashx?current=" + current + "&&TypeID=" + TypeID,
                            befordsend:function(){
                                $("#div1").html("正在加载,请等候...")},
                            success: function(message) {
                                var tab;
                                var mesg1 = message.split("|");
                                tab = "<table>";
                                for (var i = 0; i < mesg1.length - 1; i++) {
                                    var mesg2 = mesg1[i].split(",");
                                    tab += "<tr><td><img src='img/xwjt.png'/></td><td><a href='#'>" + mesg2[1].substring(0,30) + "</a></td><td style='text-align:right;'>" + mesg2[2] + "</td></tr>";

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

}
