// JavaScript Document
$(document).ready(function(e) {
    
	init();
	var h = $(window).height();
	var top = h-40;
	top = top /2;
		
	//初始化
	function init(){
		
		getIsLogin();
		//绑定拦截器
		$("body").click(router);
		
		//关闭消息编写窗口
		$(".closebtn").click(closeMsgform);
		//设置筹标进度
		setSlide($(".slide"));
		//绑定利息计算器
		$("input[name='money']").keyup(calInvest);
		$("#login.modalbox .closebtn").click(closeLogin);
		if($("#clock").size() != 0){setClock("#clock", "#clockholder");}
		$(".bidform .finSubmit").click(submitBid);
		setBidStatus($("#status").val());
	}
	
	//拦截器
	function router(e){
		var $target = $(e.target), actiontype = $target.attr("actiontype");	
		
		switch(actiontype){
			case "report":
				showReport();
				break;
			case "doReport":
				doReport($target);
				break;
			case "showReply":
				showReply($target);
				break;
			case "hiddeReply":
				hiddeReply($target);
				break;
			case "doReply":
				doReply($target);
				break;
			case "towrite":
				toWrite($target);
				break;
			case "doQues":
				doQues($target);
				break;
		}	
	}
	
	//setClock
	function setClock(id, holder){
		var availBid = $("#availBid").val();
		
		if(availBid <= 1){
			$(".finSubmit").addClass("disabled").attr("disabled","disabled");
			$(".bidform").find(".money").attr("readonly","readonly");
			$("#clockholder").text("已满标");
			return false;
		}
		var countdown = $(id), holder = $(holder);
		var day = parseInt(countdown.attr("data-d"));
		var hour = parseInt(countdown.attr("data-h"));
		var m = parseInt(countdown.attr("data-m"));
		var s = parseInt(countdown.attr("data-s"));
		
		var ts = (new Date()).getTime() + day*24*60*60*1000 + hour*60*60*1000 + m*60*1000 + s*1000;
			
		countdown.countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){
				
				var message = "";
				
				message += days + "天";
				message += hours + "小时";
				message += minutes + "分钟";
				message += seconds + "秒";
							
				holder.html(message);
			}
		});
	}
	
	function setBidStatus(status){
		
		var f = $("form[name='fin']"), clock = $("#clockholder"), statustxt = $("#statustxt");
		
		if(status == "0"){
			//可投标
			setForm();
			f.find("button").removeClass("disabled").removeAttr("disabled");
			f.find("input[name='money']").removeAttr("readonly");
			
		}else if(status == "1"){
			//满标
			statustxt.text("已满标");
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
			
		}else if(status == "2"){
			//流标
			statustxt.text("已流标");
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
		}else if(status == "3"){
			//还款中
			statustxt.text("还款中");
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
		}else if(status == "4"){
			//已还完
			statustxt.text("已还完");
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
		}else if(status == "8"){
			//已冻结
			statustxt.text("冻结中");
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
		}else if(status >= 5){
			statustxt.text("等待放标...");
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
		}else{
			f.find("button").addClass("disabled").attr("disabled","true");
			f.find("input[name='money']").attr("readonly","readonly");
			clock.hide();
		}
	}
	
	//回复
	function doReply($target){
		var isLogin = $("#isLogin").val();
		if(isLogin==0){
			showLogin();
			return false;
		}
		
		var q = $target.parents(".a").siblings(".q"), f = $target.parents("form"), id = $("#proId").val();
		var replyC = f.find("textarea").val();
		
		if(replyC == ""){
			showTip("提示","答复内容不能为空！","warn");
			return false;
		}else{
			replyC = stripscript(replyC);
			var qid = f.parents(".answer").find("input[name='questionId']").val(), url = f.attr("action");
			
			$.ajax({
				url:url,
				data:{subjectId:id, content:replyC, parentQuestionId:qid},
				type:"post",
				success:function(data){
					if(data){
						if(data=="noLogin"){
							showTip("登录提示","您还未登录，请先登录后重试。","warn");
						}else if(data.success==true){
							showTip("答复成功","您的答复已经提交！","ok");
							f.get(0).reset();
							setTimeout(function(){location.reload();},3000);
						}else if(data=="noLogin"){
							showTip("登录提示","您还未登录，请先登录后重试。","warn");
						}else{
							showTip("答复失败","您的答复提交失败，请重新提交！","warn");
						}
					}else{
						showTip("提问失败","您的答复提交失败，请重新提交！","warn");
					}
				}
			})
		}
	}
	
	//提问
	function doQues(obj){
		var isLogin = $("#isLogin").val();
		if(isLogin==0){
			showLogin();
			return false;
		}
		
		var quesdes = $("#quesdes").val();
		quesdes = quesdes.replace(/(\s*)/g,"");
		if(quesdes==""){
			showTip("提示","问题描述不能为空！","warn");
			return false;
		}else{
			quesdes = stripscript(quesdes);
			var f = obj.parents("form"), id = $("#proId").val(), url = f.attr("action");
			$.ajax({
				url:url,
				data:{subjectId:id, content:quesdes, parentQuestionId:0},
				type:"post",
				success:function(data){
					if(data){
						if(data=="noLogin"){
							showTip("登录提示","您还未登录，请先登录后重试。","warn");
						}else if(data.success==true){
							showTip("提问成功","您的疑问已经提交，敬请关注借款人的回复！","ok");
							f.get(0).reset();
							setTimeout(function(){location.reload();},3000);
						}else if(data=="noLogin"){
							showTip("登录提示","您还未登录，请先登录后重试。","warn");
						}else{
							showTip("提问失败","您的疑问提交失败，请重新提交！","warn");
						}
					}else{
						showTip("提问失败","您的疑问提交失败，请重新提交！","warn");
					}
				}
			})
		}
	}
	
	//计算利息123456 
	function calInvest(e){
		var $target = $(e.target), v = $target.val(), proId = $("#proId").val();
		v = parseFloat(v);
		// rate = parseFloat(rate)/1200;
		
		if(/^[1-9]\d*\.?\d{0,2}$/.test(v)){
			//v = parseFloat(estateBorrow(totalloan, rate, months)[3])*parseFloat(v)/parseFloat(totalloan);
			// v = v * rate * months;
			$.ajax({
				url:"/licai/calInvestIncome",
				type:"get",
				data:{productId:proId, investAmount:v,rnd:Math.random()},
				success:function(data){
					if(data){
					if(data.success == true){
						$("#invest").text("￥ "+data.incomeAmount);
					}else{
						$("#invest").text("");
					}
					}
				}
			});
			
		}else{
			$("#invest").text("");
		}
	}
	
	//投标
	function submitBid(e){
		var isLogin = $("#isLogin").val();
		if(isLogin==0){
			showLogin();
		}else{
			var isAuthed = checkeAuth();
			if(!isAuthed){return false;}
			var f = $(e.target).parents("form");
			var money = f.find(".money"), v = money.val();
			checkMoney(f,v);
		}
	}
	
	//投标
	function checkMoney(f,gets){
		var reg = /^[1-9]\d*\.?\d{0,2}$/, b_than1 = (parseFloat(gets)>=1), validBid = f.find("input[name='validBid']").val();
		var usable = $("#usable").attr("data-v");
		usable = parseFloat(usable);
		
		if(!b_than1 || gets == ""){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>投标金额需大于等于1</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(!reg.test(gets)){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>投标金额最多保留两位小数</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else if(gets>usable){
			
			//if(gets>usable){
				$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>账户余额不足，立即去<a href="../../fund/trade/rechargeInit" target="_blank">充值</a></p><a href="javascript:;" onclick="$.unblockUI();" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
			//}else{
				//f.addClass("curBid");
				//doSubmit(f,gets)
			//}
		}else if(parseFloat(gets) > parseFloat(validBid)){
			$.blockUI({  
				title:'提示', 
				message:'<div class="warn"><p>本标最多可投入￥'+validBid+'&nbsp;&nbsp;<a href="javascript:;" onclick="$.unblockUI();setValue(\'.money\');">点击投此金额</a></p><a href="javascript:;" onclick="$.unblockUI();" class="closeWarn">关闭</a></div>',
				css:{
					width:'30%',
					cursor:'auto',
					top:top
					},
				overlayCSS: {
					cursor:'auto'
					}
				});
		}else{
			f.addClass("curBid");
			doSubmit(f,gets)
		}
		
	}
	
	function doSubmit(f,v){
		var data = {};
		data.productId = f.attr("data-pid");
		var url = f.attr("action");
		data.tradeAmount = v;
		$.ajax({
			url:url,
			type:"post",
			data:data,
			success:function(data){
				if(data){
					if(data.success==true){
						getIsLogin();
						
						//showTip("投标成功","恭喜您，投标成功！投标金额："+data.investAmount+";投标收益："+data.incomeAmount,"ok");
						
						var total_l = $("body").width() ,l = (total_l - 502)*0.5;
						var left = Math.round((l/total_l)*100);
						left += "%";
						
						$.blockUI({
							title:"",
							message:"<div class='modaltip ok'><div><div class='smile'><p class='txt' style='font-weight:bold;margin-bottom: 10px;'>恭喜您，投标成功！</p><p class='txt'>投标金额：￥"+formatCurrency(data.investAmount)+"</p><p class='txt'>投标收益：￥"+formatCurrency(data.incomeAmount)+"</p><br/></div><p class='btn_p tl_center'><button class='okBtn' onclick='$.unblockUI();location.reload();'>知道了</button></p></div><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>",
							css:{
								width:'502px',
								left:left,
								cursor:'auto',
								top:"200px"
								},
							overlayCSS: {
								cursor:'auto'
								}
						});
						
						f.get(0).reset();
						f.find("#invest").text("");
						//setCountDown($(".modaltip .txt"));
					}else if(data=="noLogin"){
						showTip("登录提示","您还未登录，请先登录后重试。","warn");
					}else if(data.success==false){
						showTip("投标失败",data.errorMessage,"warn");
					}else{
						showTip("投标失败","投标失败！","error");
					}
				}else{
					showTip("投标失败","投标失败！","error");
				}
			}
			
		});
	}
	
	function setForm(){
		//投标表单检测
		$(".bidform").Validform({
			ajaxPost:true,
			dragonfly:true,
			datatype:{
				"money":function(gets,obj,curform,regxp){
					var b_than1 = (parseFloat(gets)>=1);;
					if(!b_than1 || gets == ""){return false;}
					var usable = $("#usable").attr("data-v");
					usable = parseFloat(usable);
					if(gets>usable){
						$.blockUI({  
						title:'提示', 
						message:'<div class="warn"><p>账户余额不足，立即去<a href="../../fund/trade/rechargeInit">充值</a></p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
						css:{
							width:'30%',
							cursor:'auto',
							top:top
							},
						overlayCSS: {
							cursor:'auto'
							}
						});
					}
				}
			},
			beforeCheck:function(f){
				return false;
			},
			beforeSubmit:function(curform){
				var isLogin = $("#isLogin").val();
				if(isLogin==0){
					showLogin();
				}else{
				}
				return false;
			},
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form") && o.type!=2){
					$.blockUI({  
					title:'提示', 
					message:'<div class="warn"><p>'+msg+'</p><a href="javascript:;" onclick="$.unblockUI()" class="closeWarn">关闭</a></div>',
					css:{
						width:'30%',
						cursor:'auto',
						top:top
						},
					overlayCSS: {
						cursor:'auto'
						}
					});
				}
			}
		})
	}
	
	//切换答复表单
	function showReply($target){
		$target.toggleClass("active");
		if($target.hasClass("active")){
			var a = $target.parents(".q").siblings(".a");
			a.find("form").replaceWith(replay);
		}else{
			var a = $target.parents(".answer");
			a.find("form").replaceWith(noreply);
		}
		
	}
	
	function hiddeReply(obj){
		var answer = obj.parents(".answer"), reply = answer.find(".toanswer");
		reply.click();
	}
	
	//登录状态监测
	function getIsLogin(){
		var rnd = Math.random();
		$.ajax({
			url:"../../licai/loginChecked/",
			type:"post",
			data:{rnd:rnd},
			success:function(data){
				if(data){
					if(data.login=="Y"){
						$("#isLogin").val("1");
						var availableAmount = parseFloat(data.availableAmount).toFixed(2);
						$("#usable").attr("data-v",availableAmount);
						$("#usable .int").text(availableAmount);
					}else{
						$("#isLogin").val("0");
					}
				}else{
					$("#isLogin").val("0");
				}
				setLogin();
			}
		})
	}
	
	function setLogin(){
		var isLogin = $("#isLogin").val();
		if(isLogin==1){
			//已经登录
		}else{
			$("#usable").replaceWith("<span id='usable'>您还未</span>");
			var next = location.pathname.substring(1);
			var url = "/account/user/login?src=" + next;
			$("#usable").siblings("a").text("登录").attr("href",url);
		}
	}
	
	//设置筹标进度
	function setSlide(obj){
		var rel = obj.attr("data-rel"),v = $(rel).attr("data-v");
		obj.attr("data-v",v);
		if(v>100){
			v=100;
			$(rel).attr("data-v","100");
			$(rel).text(v+"%");
		}
		v = v + "%";
		obj.find(".inner").css("width",v);
	}
	
	function getInt(a){
		return a.toFixed(0);
	}
	
	function getSub(a){
		a = a*100;
		a = parseFloat(a).toFixed(0);
		var sub = a % 100;
		if(sub==0){
			return "00";
		}else{
			return sub;
		}
	}
	
	//计算水平居中的左边距
	function getLeft(id){
		var l = $(id).width();
		var total_l = $("body").width();
		
		l = (total_l - l)*0.5;
		left = Math.round((l/total_l)*100);
		left += "%";
		return left;
	}
	
	var noreply = '<form name="answer" class="answerform">'
                + '<label>答复：</label>'
                + '<span class="notanswer">暂时未有答复</span>'
                + '</form>';
	var replay = '<form name="answer" action="../../licai/question/add" class="answerform">'
               + '<div><label>答复：</label>'
               + '<textarea name="replyC"></textarea></div>'
               + '<div class="btns">'
               + '<button type="button" actiontype="doReply">确认答复</button>'
               + '<a href="javascript:;" class="cancle" actiontype="hiddeReply">取消</a>'
               + '</div>'
               + '</form>';
			  
	
		//to write打开编写信息窗口
		function toWrite(obj){
			var isLogin = $("#isLogin").val();
			if(isLogin==0){
				showLogin();
				return false;
			}
			resetForm($("form[name='msgform']"));
			var $writeMsg = $("#writeMsg");
			var left = getLeft("#writeMsg");
			document.msgform.reset();
			//如果是回复
			if (obj.hasClass("return")){
				var detail = obj.parents(".msgdetail");
				$writeMsg.find("form").attr("action","replyMessage").append("<input type='hidden' name='id' value='" + obj.attr("data-id")+ "'>");
				$writeMsg.find("input[name='accepter']").val(detail.find("#d_sender span").text());
				$writeMsg.find("input[name='accepter']").attr("data-sid",detail.find("#d_sender span").attr("data-sid"))
				$writeMsg.find("input[name='title']").val("回复："+detail.find("#title").text());
			}
			$.blockUI({ 
				message:  $("#writeMsg"),
				css:{
					top:"20%",
					left:left,
					padding:"0px",
					width:'553px',
					border:'1px solid rgb(67, 67, 67)',
					borderRadius:'8px',
					boxShadow:"0px 0px 3px #434343",
					cursor:'auto'
					},
				overlayCSS: {
					cursor:'auto'
					} 
			});
			window.msgeditor=null;
	           /** window.msgeditor = KindEditor.create('textarea[name="content"]',{
					resizeType:0,
					items : [
							'source', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
							'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 
							'insertunorderedlist', '|','media', 'image', 'emoticons']});
			  }*/
				 var editor_content;
				 
				 window.msgeditor =  KindEditor.create('textarea[name="content"]', {
					        resizeType:0,
							cssPath : '../../res/plugins/common/kindeditor/plugins/code/prettify.css',
							uploadJson : '../../upload/kindetor/imageUpload?thumbSizes=150x100',
							allowFileManager : true,
							items : [
										'source', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
										'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 
										'insertunorderedlist', '|','media', 'image', 'emoticons']
						});
					
				
				 
		}
		
		//发送消息
		function sendMsg(f){
			//var f = obj.parents("form");
			f.find(".sendmsg").attr("disabled","true");
			f.find("textarea[name='content']").val(msgeditor.html());;
			
			var data = {}, url = f.attr("action");
			data.recipients = f.find("input[name='accepter']").val();
			data.title = f.find("input[name='title']").val();
			data.accepter = f.find("input[name='accepter']").val();
			data.content = f.find("textarea[name='content']").val();
			
			data.content = stripscript(data.content);
			data.recipients = stripscript(data.recipients);
			data.title = stripscript(data.title);
			data.accepter = stripscript(data.accepter);			
			
			if(url == "replyMessage"){
				data.recipientId = f.find("input[name='accepter']").attr("data-sid")
			}
			
			$.ajax({
				url:url,
				type:"POST",
				data:data,
				success: function(data){
					f.siblings(".result").replaceWith("");
					if(data.status == "y" || data.success=="true"){
						f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "&nbsp;<span id='timer'>3</span>秒后自动刷新...</span></p>");
						var timer = setInterval(function(){ var t = $("#timer");
						if(parseInt($("#timer").text()) <= 1){
							clearInterval(timer);
							var id = $(".tabc.cur").attr("id");
							if(id=="sysNotice"){
								location.hash = "sys";
							}else if(id=="get"){
								location.hash = "getBox";
							}else if(id=="send"){
								location.hash = "sendBox";
							}
							location.reload();
						}
						t.text(parseInt($("#timer").text())-1);},1000);
					}else{
						f.find(".sendmsg").removeAttr("disabled");
						f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "</p>");
					}
				},
				error:function(){
					alert("请求失败！");	
				}
			});
			
		}
		
		//关闭消息编写窗口
		function closeMsgform(){
			$.unblockUI();
			KindEditor.remove('textarea[name="content"]')
		}
		

		//检测收件人是否合法
		function checkAcc(){
			var $target = $("input[name='accepter']"), name = $target.val();

			if(name==""){
				$target.siblings(".Validform_checktip").addClass("Validform_wrong").text("收件人必填")
				$target.addClass("Validform_error")
				return false;
			}
			var dname = getLastName(name);
			$.ajax({
				url:"examineUserNameIsExist",
				type:"get",
				data:{"userName":name},
				success:function(data){
					var checktip = $target.siblings(".Validform_checktip");
					checktip.text(data.msg);
					if(data.status == true){
						$target.removeClass("Validform_error")
						checktip.removeClass("Validform_wrong");
						checktip.addClass("Validform_right");
					}else{
						$target.addClass("Validform_error")
						checktip.removeClass("Validform_right");
						checktip.addClass("Validform_wrong");
					}
				}
			})
		}
		
		function getLastName(name){
			var dname;
			if(name.match(/[；;]$/)){
				var l = name.length, i;
				var subl = l-1; 
				var n = name.substring(0,subl);
				if(n.match(/;|；/)){
					i = n.lastIndexOf(";") ? n.lastIndexOf(";") : n.lastIndexOf("；");
					if(i>0){
						i += 1;
						dname = n.substring(i);
					}else{
						dname = n;
					}
				}else{
					dname = n;
				}
			}else{
				if(name.match(/;|；/)){
					var i = name.lastIndexOf(";");
					i += 1;
					dname = name.substring(i);
				}else{
					dname = name;
				}	
			}
			return dname;
		}
		
		//表单验证
		var msgform = $("form[name='msgform']").Validform({
			ajaxPost:true,
			btnSubmit:"#submsg",
			beforeCheck:function(f){
				msgeditor.sync();
				if(checkAcc()==false){
					return false;
				};
			},
			beforeSubmit:function(f){
				var inputErrors = f.find("input.Validform_error");
				if(inputErrors.size()!=0){
					f.find("input.Validform_error").siblings(".Validform_right").show();
					f.find("input.Validform_error").get(0).focus();
					return false;
				}
				sendMsg(f);
				return false;},
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.obj.siblings(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
					
					if(o.obj.attr("name")=="accepter" && o.type==3){
						var si = msg.indexOf("\""), ei = msg.lastIndexOf("\"");
						si += 1;
						var str = msg.slice(si,ei), v = o.obj.val();
						si = v.indexOf(str);
						ei = str.length;
						selectText(document.getElementById("accepter"),si,ei)
						//sel(document.getElementById("accepter"),str)
					}
				}else{
					cssctl(objtip,o.type);
				}
			}
		})
		
		//重置表单
		function resetForm(f){
			f.find(".Validform_checktip").text("").removeClass("Validform_right Validform_wrong");
			f.find("input").removeClass("Validform_error");
		}

});
//设置投标金额
function setValue(input){
	$(input).val($("input[name='validBid']").val());
}