/* 
 网站公共JS脚本
 */
$(document).ready(function() {
    //顶部用户下拉菜单
    var hs_loginwrap = $("#hs-loginwrap");
    $("#hs-login").hover(function() {
        hs_loginwrap.slideDown(200);
    }, function() {
        hs_loginwrap.slideUp(100);
    });

//底部悬浮工具条
    $(".backtotop").css("visibility", "hidden");
    $(window).scroll(function() {
        if ($(window).scrollTop() < 100) {
            $(".backtotop").css("visibility", "hidden");
        } else {
            $(".backtotop").css("visibility", "visible");
        }
    });
    $(".backtotop").click(function() {
        $('body,html').animate({scrollTop: 0}, 1000);
        return false;
    });
    //选项卡插件
    $(".tab-option").mouseenter(function() {
        $(this).addClass("mouseenter");
    });
    $(".tab-option").mouseleave(function() {
        $(this).removeClass("mouseenter");
    });
    $(".tab-option").click(function() {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).prevAll().removeClass("active");
            $(this).nextAll().removeClass("active");
            $(this).parent().parent().children(".tab-content").hide();
            $(this).parent().parent().children(".tab-content").eq($(this).prevAll().length).show(300);
        }
    });
    
    $("tr").mouseenter(function() {
        $(this).addClass("mouseenter");
    });
    $("tr").mouseleave(function() {
        $(this).removeClass("mouseenter");
    });
    //表单 下拉选项
    $(".select").each(function() {
        if ($(this).children("span").width() + 30 > $(".select>ul").width()) {
            $(this).children("ul").width($(this).children("span").width() + 30);
            $(this).children("span").width($(this).children("span").width());
        } else {
            $(this).children("span").width($(this).children("ul").width() - 30);
        }
        $(this).children("ul").css("top", $(this).height() - 4);
    });
    $(".select>span").click(function() {
        $(this).nextAll("ul").slideDown(200);
    });
    $(".select").mouseleave(function() {
        $(this).children("ul").slideUp(200);
    });
    $(".select>ul>li").hover(function() {
        $(this).css("background-color", "#fff7f1");
    },
            function() {
                $(this).css("background-color", "#fff");
            }
    );
    $(".select>ul>li").click(function() {
        $(this).parent().slideUp(200);
        $(this).parent().prevAll("span").text($(this).text());
        $(this).parent().prevAll("input").attr("value", $(this).attr("data-value"));
    });
});


//左边菜单初始化
(function($){
	$(function(){
		/*初始化数据：初始化当前主导航展开项*/
		var tempcur_menu=0;
		var mainbox=$("#mainbox").length!=0?$("#mainbox"):$(".mainbox"),sidebox=$("#sidebox").length!=0?$("#sidebox"):$(".sidebox");
		var menuurl_obj={
			000:{
				0:["fund/account/"],
				1:["fund/trade/","fund/trade/withdrawInit","fund/trade/rechargeInit"],
				2:["account/user/manageInit","account/user/managePersonedit"],
				3:["fund/bank/queryBankCardUserId"],
				4:["fund/authentication/authenticationCentor"],
				5:["fund/security/securityInit"],
				6:["fund/message/queryMessageList"],
				7:["fund/recommend"],
				8:["fund/remind/queryMessageRemindUserId"]
			},
			100:{
				0:["fund/invest/investStatementInit"],
				1:["fund/investRecord/investStatementInit"],
				2:["fund/returned/waitReturnedMoneyPageInit"]
			},
			200:{
				0:["fund/loan/report"],
				1:["fund/loan/sumInfo","fund/trade/repayInit"],
				2:["fund/repay/sumInfo"]
			}
		}
		/*当前高亮*/
		var urlstr=window.location.href,urlsearch=window.location.search;
		var urlarr=[0,0];
		loopout:for(var ii in menuurl_obj){
					var tempurlobj=menuurl_obj[ii];
					for(var jj in tempurlobj){
						var tempmsubarr=tempurlobj[jj],tmsa_len=tempurlobj[jj].length,kk=0;
						for(;kk<tmsa_len;kk++){
							if(urlstr.indexOf(tempmsubarr[kk])!=-1){
								if(urlsearch==""||(urlsearch!=""&&urlsearch.indexOf("productId")==-1)){
									var tempii=ii.toString();
									tempii=tempii.slice(0,1);
									urlarr.splice(0,2,tempii,jj);
									tempcur_menu=tempii;
									break loopout;
								}else if(urlsearch!=""&&urlsearch.indexOf("productId")!=-1&&tempmsubarr[kk]=="fund/trade/repayInit"){
									/*还款情况*/
									urlarr.splice(0,2,2,jj);
									tempcur_menu=2;
									break loopout;
								}
							}
						}
					}
		}
		/*一级导航展开，其他收缩(同时处理回款菜单的特殊路径错误)*/
		sidebox.find("p").each(function(index,element){
			var curobj=$(element),curid=element.id,curindex=curid.slice(-1);
			if(curindex==urlarr[0]){
				curobj.next("ul").show().find("li").eq(urlarr[1]).addClass("curmenu");
				curobj.parent().siblings().find("ul").hide();
				return false;
			}
		});
		/*菜单效果*/
		$("#menutheme0,#menutheme1,#menutheme2").click(function(){
			var curobj=$(this),parobj=curobj.parent(),curflag=curobj.attr("id").slice(-1);
			if(curflag==tempcur_menu){
				return false;	
			}
			curobj.next().slideToggle(300);
		});
	});
})(jQuery);

//第三方登录-qq登录
function toQQLogin(){
  //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
  //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
  var A=window.open("oauth/index.php","TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
} 
function toSug(){
	$.ajax({
		url:"/jiedai/checkedDetail",
		type:"post",
		data:{},
		success: function(data){
			if(data){
				if(data.login=="N"){
					var url = location.href;
					location.href = "/account/user/login?src="+location.pathname+"#tosug";
				}else if(data.login == "Y"){
					var left = getLeft("#sugform");
					$.blockUI({ 
						message:  $("#sugform"),
						css:{
							top:"20%",
							left:left,
							padding:"0px",
							width:'683px',
							border:'1px solid rgb(67, 67, 67)',
							borderRadius:'8px',
							boxShadow:"0px 0px 3px #434343",
							cursor:'auto'
							},
						overlayCSS: {
							cursor:'auto'
							} 
					});
				}				
			}else{
				var url = location.href;
				location.href = "/account/user/login?src="+location.href;
			}
		}
	})
}

function submitSug(e){
	var $target = $(e), f = $target.parents("form"), sug = f.find("textarea"), v = sug.val();
		
	if(sug.val()=="" || sug.val().length >300){
		sug.addClass("error");
		return false;
	}else{
		sug.removeClass("error");
		$target.attr("disabled",true);
		setTimeout(function(e){
			$target.removeAttr("disabled");
		},5000);
		v = stripscript(v);
		$.ajax({
			url:"../../fund/feedback/addFeedBack",
			type:"post",
			data:{content:v},
			success:function(data){
				f.siblings(".result").replaceWith("");
				if(data.success == true){
					sug.val("");
					f.find(".ftip").text("仅限300字，还可以输入300个字");
					f.after("<div class='result ok' style='margin-left:0px;margin-bottom:15px;'><p><span class='ok'></span><span class='txt'>" + data.info + "&nbsp;<span id='timer'>3</span>秒后自动刷新...</span></p>");
					var timer = setInterval(function(){ 
							var t = $("#timer");
							if((parseInt($("#timer").text())-1) < 0){
								clearInterval(timer);
								f.siblings(".result").replaceWith("");
								$.unblockUI();
							}
						t.text(parseInt($("#timer").text())-1);},1000);
				}else{
					f.find("button").removeAttr("disabled");
					f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "</p>");
				}
			}
		})
	}
}

$("textarea[name='sug']").keyup(function(e){
	var $target = $(e.target), ftip = $target.siblings(".ftip"),  v = $target.val(), l = v.length, n = 300-l;
	ftip.text("仅限300字，还可以输入"+n+"个字");
	if(n>0 && n<300){
		$target.removeClass("error");
		ftip.removeClass("error");
	}else{
		$target.addClass("error");
		ftip.addClass("error");
	}
})

//计算水平居中的左边距
function getLeft(id){
	var l = $(id).width();
	var total_l = $("body").width();
	
	l = (total_l - l)*0.5;
	left = Math.round((l/total_l)*100);
	left += "%";
	return left;
}

//防止xss和sql注入:JS特殊字符过滤正则
function stripscript(s) 
{ 
	var pattern = new RegExp("[%--`~#$^&*()=|{}\\[\\]<>/~@#&*——|{}【】‘']")        //格式 RegExp("[在中间定义特殊过滤字符]")
	var rs = ""; 
	for (var i = 0; i < s.length; i++) { 
	 rs = rs+s.substr(i, 1).replace(pattern, ''); 
	}
	return rs;
}