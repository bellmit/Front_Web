/*主页使用的js*/

/*退出系统*/
/*重置密码*/
function toResetPassword() //重置密码
{
	document.getElementById("windowIf").style.display="";
	$("#windowIf").attr("src","resetPassword.html");
	$("#windowDiv").window({title : '重置密码',width:400,height:260}).window('open');
}

//调整iframe高度
function iFrameHeight(id) {

	var ifm = document.getElementById("_main" + id);
	var ffm=window.parent.document.getElementById("dcmain").scrollHeight-25; //iframe外层div的高度，因为有额外的间距
	var subWeb = document.frames ? document.frames["_main" + id].document : ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		// 页面表格有间距时 高度计算错误 高度额外增加10
		ifm.height = subWeb.body.scrollHeight;
		//如果高度小于900，默认给900
		//ifm.height = ffm <= 750 ? 750 : ffm;
		ifm.height=780;
		
	}
//	ifm.height = 1000;
}
//保存当前所有的标签id
var currentpage = "";
//欢迎页id加入array
currentpage += ",0,";
//页面切换函数
function to_tg(v, name, id) {
	
	
	var div = document.getElementById("ul");
	var nodes = div.getElementsByTagName("span");
	var status = false;
	if (currentpage.indexOf(","+id+",") > -1) {
		status = true;
	}
	//判断窗口是否存在
	if (status) {
		setTab(id,v);
	} else {
		//判断窗口是否过多
		if (nodes.length > 8) {
			alert("打开窗口过多，请关闭一些窗口", 8);
		} else {

			var str = "menuTab" + id;
			var strdiv = "div" + id;
			var str1 = "'" + "chooseTab(" + id + ")" + "'";
			var str2 = "x" + id;
			$(".x_sel").attr("class", "x");
			$("#ul div").attr("class", "l window_tab");
			//增加标签
			var temp = "<div class='l window_tab active' id=" + strdiv
					+ "><span class='liselect' id=" + str + " onClick=" + str1
					+ ">" + name + "</span><b  class='x_sel' id=" + str2
					+ "><Strong>X</Strong></b></div>";
			//加入tab标签
			$("#ul").append(temp);
			var framediv = "frame" + id;
			var frame = "<div id="                                                                                        
					+ framediv
					+ " class='frameshow'><iframe id="
					+ "_main"
					+ id
					+ " src='' marginheight='0' marginwidth='0' frameborder='0' onLoad='iFrameHeight("+id+")' scrolling='auto' width='100%' height=100%  ></iframe></div>";
			$(".frameshow").attr("class", "framehide");
			$("#Tab1").append(frame);

			//将标签id加入array
			//currentpage.push(id);
			currentpage += "," + id +",";
			//跳转页面
			var url =  v;
			$("#_main" + id).attr("src", url);
			//关闭按钮点击事件监听
			$(".x_sel").click(
					function() {
						var id = this.id.replace("x", "");
						if ($(this).attr("class") == "x_sel") {
							for (var i = nodes.length - 1; i >= 0; i--) {
								var temp = nodes[i].id.replace("menuTab", "");
								if (temp == id) {
									var prepage = nodes[i - 1].id.replace(
											"menuTab", "");
									chooseTab(prepage);
									$("#menuTab" + id).remove();
									$("#x" + id).remove();
									$("#_main" + id).remove();
									$("#frame" + id).remove();
									$("#div" + id).remove();
									//alert("要删除的编号："+id+"当前的队列:"+currentpage);
									currentpage = currentpage.replace("," + id + ",",
											"");
									//alert("当前的队列:"+currentpage);
									//break;
								}
							}
						} else {
							$("#menuTab" + id).remove();
							$("#x" + id).remove();
							$("#_main" + id).remove();
							$("#frame" + id).remove();
							$("#div" + id).remove();
							currentpage = currentpage.replace("," + id + ",", "");
						}

					});
		}
	}

}
//切换页面
function setTab(str,uri) {
	var url = "";
	if (str == 0) {
		url = "main.jsp";
	} else if(str == 999){
		url =  uri;
	}else {
		url =  $("#menuId"+str).val();
	}
	$(".x_sel").attr("class", "x");
	$("#x" + str).attr("class", "x_sel");
	$("#ul div").attr("class", "l window_tab");
	$("#div" + str).attr("class", "l window_tab active");
	//var id = "menuTab" + str;
	//alert($("#menuId"+str).val());
	$(".frameshow").attr("class", "framehide");
	$("#frame" + str).attr("class", "frameshow");
	//不需要刷新  $("#_main" + str).attr("src", url);
	//$(".frameshow").attr("class", "framehide");
	//$("#frame"+str).attr("class","frameshow");
}

function chooseTab(str) {
	var url = "";
	if (str == 0) {
		url = "main.do";
	} else {
		url =  $("#menuId" + str).val();
	}
	$(".x_sel").attr("class", "x");
	$("#x" + str).attr("class", "x_sel");
	$("#ul div").attr("class", "l window_tab");
	$("#div" + str).attr("class", "l window_tab active");
	//var id = "menuTab" + str;
	//alert($("#menuId"+str).val());
	//$("#_main"+id).attr("src", url);
	$(".frameshow").attr("class", "framehide");
	$("#frame" + str).attr("class", "frameshow");
}

function randomInt(x1, x2) {
	var min_int = parseInt(x1);
	var max_int = parseInt(x2);
	if (isNaN(min_int) || isNaN(max_int)) {
		alert('parameter error');
		return false;
	}

	x1 = Math.min(min_int, max_int);
	x2 = Math.max(min_int, max_int);

	return x1 + Math.floor(Math.random() * (x2 - x1 + 1));
}

function getId(){
	
	console.log(document.getElementsByTagName("frameshow"));
}
		