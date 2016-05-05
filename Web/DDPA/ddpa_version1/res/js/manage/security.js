/**
* 安全中心
* author : liyuzhong
*/
$(document).ready(function(e) {
	
	//页面初始化
	init();
	
    $("body").click(function(e){
		var $target = $(e.target), $this = $(this), actiontype = $target.attr("actiontype");
		
		switch(actiontype){
			case "toggle_form":
				var ln_form = $target.data("lnform");
				toggle_form($target, ln_form);
				break;
			case "closetip":
				closetip();
				break;
			case "cancle":
				cancle($target);
				break;				
			}
		});
	
	//页面初始化处理
	function init(){
		$("#userpaw").AuthPasswd({look:"#upawlook"});
		$("#tradepaw").AuthPasswd({look:"#tpawlook"});
		$("#newtradepaw").AuthPasswd({look:"#etpawlook"});
		}
	
	//是否是原密码/原交易密码
	function isOldPaw(paw, type){
		
		}
	
	//验证手机或邮箱等是否已经验证过
	function hasAuth(v, field){
		
		}
	
	/*toggle form关闭或打开表单*/
	function toggle_form(t,lnform){
		var p = t.parents(".sec_item");
		if(lnform){
			$("form[name='" + lnform + "']").show().siblings("form").hide();
			if(p.find(".authform").css("display")=="block") return;
			}
		console.log(p.find(".authform").css("display"))
		p.find(".authform").toggle()
		}
	
	//关闭头部提示信息
	function closetip(){
		$(".mainbox .tip").fadeOut();
		}
	
	//关闭表单
	function cancle(t){
		$(t).parents(".authform").hide();
		}
	
	//绑定表单验证
	$(".form").Validform({
		tiptype:3, 
		postonce:true,
		ajaxPost:true,
		callback:function(data){
			//data是json格式数据{"info":"demo info","status":"y"}
			 if(data.status=="y"){
				setTimeout(function(){
						$.Hidemsg(); //公用方法关闭信息提示框;显示方法是$.Showmsg("message goes here.");
					},2000);
				}
			}
		});
});