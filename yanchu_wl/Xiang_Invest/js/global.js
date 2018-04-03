// JavaScript Document
/*$(document).ready(
				  function(){
					$("#changemailmenu").click(
						function(){
							var sonNode=$(this).next("ul");
							sonNode.slideToggle(500);
							});	
					$(".invs").hover(
						function(){
							$(this).children("ul").slideDown(500);
					  },function(){
						  $(this).children("ul").slideUp(500);
										 });
})*/
/*function walkTheDOM(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
   walkTheDOM(node, func);
   node = node.nextSibling;
  }
 }

 function purgeEventHandlers(node) {
  walkTheDOM(node, function(e) {

   for (var n in e) {

    if (typeof e[n] == 'function') {
     //alert(e[n]);
     e[n] = null;
    }
   }
   delete node;
   node=null;
  });
 }*/

function ShowEmailMenu(){
	var  micon=document.getElementById("changeimg");
	var  showmenu=document.getElementById("showemailmenu");
	alert(micon.src);
	if(micon.src=="images/close.png"){
		micon.img.src="images/open.png";
		}
	if(micon.src=="images/open.png"){
		micon.img.src="images/close.png";
		}	
	}





function validssearchs(vals){//默认值时清空内容
	if(vals.defaultValue==vals.value){
		vals.value="";
		}
	}
function Searchs(){//搜索功能
	var vals=document.getElementById("search").value;
	if(vals==""||vals=="请输入搜索内容"){
		alert("请输入搜索内容");
		}
	else{
			return true;
			}
	}
/*fucntion sendSearch(vals){//发送搜索请求
		var ser=createxmlHttpRequest();
	}
function createxmlHttpRequest(){
			var request;
			if(window.xmlHttpRequest){
				request=new XMLHttpRequest();
				}else if(window.ActiveXObject){
					try{
						request=new ActiveXObject("MSxml2.XMLHTTP");
					}catch(e1){
							try{
								request=new ActiveXObject("MSxml2.XMLHTTP");
							}catch(e2){
								alert("浏览器低版本处理块");
							}
					}
				}
			return request;	
			}*/
		
	
function GetLinks(id){
	
	
	
	
	}



