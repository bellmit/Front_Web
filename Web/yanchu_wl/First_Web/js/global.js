// JavaScript Document
function changbanner(){//显示控制面板
	var fatherwin=document.getElementById("changes");
	fatherwin.style.display="block";
	}
function changefont(){//改变内容
	var owntitle=document.getElementById("myselfbanner");
	var newbanner=window.prompt("请输入您的宣言：","");
	if(newbanner==""||newbanner==null){
		owntitle.innerHTML="励志照亮人生，编程改变命运";
		}else{
			owntitle.innerHTML=newbanner;
			}
			changecolse();
	}
function changecolor(){//改变颜色
	var owntitle=document.getElementById("myselfbanner");
	var newbanner=window.prompt("请输入您的颜色值：","");
	owntitle.style.color=newbanner;
	changecolse();
}
function changexy(){//改变位置
	var owntitle=document.getElementById("myselfbanner");
	var newx=window.prompt("请输入您的x坐标(x小于1003或者x大于0)：","");
	var newy=window.prompt("请输入您y的标坐(x小于103或者x大于0)：","");
	if(!isNaN(newx)&&!isNaN(newy)){
		if((newx<=0||1003<=newx)&&(newy<=0||100<=newy)){
		owntitle.style.top=80+"px";
		owntitle.style.left=80+"px";
		}else{
		owntitle.style.top=Number(newx)+"px";
	    owntitle.style.left=Number(newy)+"px";
		}
	}else{
		owntitle.style.top=80+"px";
		owntitle.style.left=80+"px";
	}
	changecolse();
}
function changecolse(){//关闭控制面板
	var fatherwin=document.getElementById("changes");
	fatherwin.style.display="none";
	}
	
function validssearchs(vals){//默认值时清空内容
	if(vals.defaultValue==vals.value){
		vals.value="";
		}
	}

function Searchs(){//搜索功能
	var vals=document.getElementById("search").value;
	if(vals==""){
		alert("请输入搜索内容");
		}
		else{
			//sendSearch(vals);
			//alert("ok");
			}
	}
/*fucntion sendSearch(vals){//发送搜索请求
	var Ajax.Request("abc.action",
					 {medthod:"post",parameters:{searchs:vals}},
					onSuccess:function(req){$("newpage").innerHTML=req.resposeText;});	
	}*/