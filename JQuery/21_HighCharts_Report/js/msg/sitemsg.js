/**
* 站内消息
* author : liyuzhong
***/
(function($){
	
	$(document).ready(function(e) {
    	
		//初始化页面
		init();   
		
		//绑定页面点击拦截器
		$("body").click(docClick);
		
		//页面拦截器
		function docClick(e){
			var $target = $(e.target), actiontype = $target.attr("actiontype");
			if($target.hasClass("noclick")){
				return false;
			}
			switch(actiontype){
				case "towrite":
					toWrite($target);
					break;
				case "delone":
					del($target,"one");
					break;
				case "delmult":
					del($target,"mult");
					break;
				case "dodel_one":
					doDel($target);
					break;
				case "dodel_mult":
					doDel($target);
					break;
				case "turnread":
					turnRead($target);
					break;
				case "getDetail":
					getDetail($target);
					break;
				case "backtotable":
					backtable($target);
					$(".tools li").removeClass("noclick");
					break;
				case "sendbox":
					$("#toturnread").hide();
					break;
				case "toturnread":
					toturnread($target);
					break;
				default:
					
			}
		} 
		
		//初始化处理
		function init(){
						
			$("#ddpatab").DDPATab({},function(e){
				var $target = $(e.target);
				var ac = $target.attr("actiontype");
				if(ac!="sendbox"){
					$("#toturnread").show();
				}
				if($(".tabc.cur").find(".msgdetail").css("display")=="block"){
					$(".tools li").addClass("noclick");
				}else{
					$(".tools li").removeClass("noclick");
				}
				
			});
			
			if(location.hash=="#sys"){
				$("#tabs .sys").click();
			}else if(location.hash=="#getBox"){
				$("#tabs .get").click();
			}else if(location.hash=="#sendBox"){
				$("#toturnread").hide();
				$("#tabs .send").click();
			}else if(location.hash=="#getLoanBox"){
				$("#tabs .get").click();
				setTimeout(function(){
					$("li.sendbtn").find("button").click();
				},200);
			}
			
			$(".thead .checkbox").checkbox({handler:checkall});
			$(".closebtn").click(closeMsgform);
			$(".hastip").mouseenter(showtip);
			//$("input[name='accepter']").blur(checkAcc);
			$(".sysmsgPage").Pager(handlerSysData);
			$(".sendPage").Pager(handlerSendData);
			$(".getPage").Pager(handlerGetData);
			initData();
		}
		
		//初始化站内消息
		function initData(){
			$.ajax({
				url:"queryMessageListByRecipe",
				type:"get",
				data:{messageType:0,rnd:Math.random()},
				success:function(data){
					var $pager = $(".sysmsgPage"), $ftlbox = $("#sysFtlBox");
					if(data.totalCount==0){
						$pager.hide();
						$pager.siblings(".table").addClass("withoutData")
					}else{
						$pager.show();
						$pager.siblings(".table").removeClass("withoutData")
					}
					initPageUL(data,$pager);
					var ftl = handlerSysData(data);
					if(ftl!= false){
						$ftlbox.html(ftl);
						$ftlbox.find(".checkbox").checkbox({});
					}
				}
			})
			$.ajax({
				url:"queryMessageListByRecipe",
				type:"get",
				data:{messageType:1,rnd:Math.random()},
				success:function(data){
					var $pager = $(".getPage"), $ftlbox = $("#getFtlBox");
					if(data.totalCount==0){
						$pager.hide();
						$pager.siblings(".table").addClass("withoutData")
					}else{
						$pager.show();
						$pager.siblings(".table").removeClass("withoutData")
					}
					initPageUL(data,$pager);
					var ftl = handlerGetData(data);
					if(ftl!= false){
						$ftlbox.html(ftl);
						$ftlbox.find(".checkbox").checkbox({});
					}
				}
			})
			$.ajax({
				url:"queryMessageListBySend",
				type:"get",
				data:{messageType:1,rnd:Math.random()},
				success:function(data){
					var $pager = $(".sendPage"), $ftlbox = $("#sendFtlBox");
					if(data.totalCount==0){
						$pager.hide();
						$pager.siblings(".table").addClass("withoutData")
					}else{
						$pager.show();
						$pager.siblings(".table").removeClass("withoutData")
					}
					initPageUL(data,$pager);
					var ftl = handlerSendData(data);
					if(ftl!= false){
						$ftlbox.html(ftl);
						$ftlbox.find(".checkbox").checkbox({});
					}
				}
			})
		}
		
		//处理数据
		function initPageUL(data,$pager){
			//判断是否为第一页或者最后一页
			if(data){
				var pre = parseInt(data.currentPage)-1, next = parseInt(data.currentPage)+1;
				pre = pre == 0? 1 : pre;
				next = next > data.totalPage?  data.totalPage : next;
				$pager.find("#firstpage").removeClass("disable").attr("data-index","1");
				$pager.find("#lastpage").removeClass("disable").attr("data-index",data.totalPage);
				$pager.find("#totalrows").text(data.totalCount)
				$pager.find("#totalpages").text(data.totalPage)
				$pager.find("#curpage").text(data.currentPage);
				$pager.find("#prepage").removeClass("disable").attr("data-index",pre)
				$pager.find("#nextpage").removeClass("disable").attr("data-index",next)
												
				if(data.currentPage==1 && data.totalPage!= 1){
					$pager.find("#nextpage").removeClass("disable")
					$pager.find("#lastpage").removeClass("disable")
					$pager.find("#prepage").addClass("disable")
					$pager.find("#firstpage").addClass("disable")
				}
				if(data.currentPage == data.totalPage && data.totalPage!= 1){
					$pager.find("#prepage").removeClass("disable")
					$pager.find("#firstpage").removeClass("disable")
					$pager.find("#nextpage").addClass("disable")
					$pager.find("#lastpage").addClass("disable")
				}
				if(data.totalPage == 1){
					$pager.find("#prepage").addClass("disable")
					$pager.find("#firstpage").addClass("disable")
					$pager.find("#nextpage").addClass("disable")
					$pager.find("#lastpage").addClass("disable")
				}
			}
		}
		
		//处理系统通知分页
		function handlerSysData(data){
			if(!data){return false;}
			
			var rows = data.modelList, l = rows.length ? rows.length : 0, i, trs="";
			
			//遍历数据
			for(i=0; i<l; i++){
				var r = rows[i]["isReader"] == 1? "":" read";
				var createTime = new Date(rows[i]["createTime"]);
				rows[i]["createTime"] = turanDate(createTime);
				
				trs += '<div class="tr'+ r +'">'
                    + '<div class="th th1"><span class="checkbox"><input type="checkbox" name="checkbox" data-id="' + rows[i]["messageId"] +'"></span></div>'
                    + '<div class="td td2 sender" actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">系统管理员</div>'
                    + '<div class="td td3 title"><p actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["title"] +'</p></div>'
                    + '<div class="td td4 date" actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["createTime"] +'</div>'
                    + '<div class="td td5 del"><a href="#" data-id="' + rows[i]["messageId"] +'" actiontype="delone">删除</a></div>'
                    + '</div>';
			}
			return trs;
		}
		
		//处理发件分页
		function handlerSendData(data){
			if(!data){return false;}
			var rows = data.modelList, l = rows.length ? rows.length : 0, i, trs="";
			//遍历数据
			for(i=0; i<l; i++){
				var createTime = new Date(rows[i]["createTime"]);
				rows[i]["createTime"] = turanDate(createTime);
				
				trs += '<div class="tr">'
                    + '<div class="th th1"><span class="checkbox"><input type="checkbox" name="checkbox" data-id="' + rows[i]["messageId"] +'"></span></div>'
                    + '<div class="td td2 sender" actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["recipients"] +'</div>'
                    + '<div class="td td3 title"><p actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["title"] +'</p></div>'
                    + '<div class="td td4 date" actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["createTime"] +'</div>'
                    + '<div class="td td5 del"><a href="#" data-id="' + rows[i]["messageId"] +'" actiontype="delone">删除</a></div>'
                    + '</div>';
			}
			return trs;
		}
		
		//处理收件分页
		function handlerGetData(data){
			if(!data){return false;}
			var rows = data.modelList, l = rows.length ? rows.length : 0, i, trs="";
			//遍历数据
			for(i=0; i<l; i++){
				var r = rows[i]["isReader"] == 1? "":" read";
				
				var createTime = new Date(rows[i]["createTime"]);
				rows[i]["createTime"] = turanDate(createTime);
				
				trs += '<div class="tr' + r + '">'
                    + '<div class="th th1"><span class="checkbox"><input type="checkbox" name="checkbox" data-id="' + rows[i]["messageId"] +'"></span></div>'
                    + '<div class="td td2 sender" actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["consignee"] +'</div>'
                    + '<div class="td td3 title"><p actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["title"] +'</p></div>'
                    + '<div class="td td4 date" actiontype="getDetail" data-id="' + rows[i]["messageId"] +'">' + rows[i]["createTime"] +'</div>'
                    + '<div class="td td5 del"><a href="#" data-id="' + rows[i]["messageId"] +'" actiontype="delone">删除</a></div>'
                    + '</div>';
			}
			return trs;
		}
		
		function turanDate(d){
			var str = "", y = d.getFullYear(), m = d.getMonth(), date = d.getDate();
			m += 1;
			str += y ;
			str += "-";
			str += m >9? m: "0"+m;
			str += "-";
			str += date>9? date: "0"+date;
			str += " ";
			str += d.getHours()>9? d.getHours() : "0"+d.getHours();
			str += ":";
			str += d.getMinutes()>9? d.getMinutes(): "0"+d.getMinutes();
			str += ":";
			str += d.getSeconds()>9? d.getSeconds():"0"+d.getSeconds();
			return str;
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
		
		//浮动提示信息
		function showtip(e){
			$(".ftip").hide();
			var $target = $(e.target);
			if($target.hasClass("disable")){
				return false;
			}
			$target.find(".ftip").fadeIn();
			setTimeout(function(){$target.find(".ftip").fadeOut();},3000);
		}
		
		function checkall(e){
			
			var $target = $(e.target);
			var $thead = $target.parents(".thead"), $tbody = $thead.siblings(".tbody");
			var isChecked = $target.find("input[type='checkbox']").attr("checked");
			var cbs = $tbody.find(".checkbox"), l = cbs.length, i;
			if(isChecked=="checked" || isChecked == true){
				for(i=0; i<l;i++){
					var cb = $(cbs.get(i));
					if(cb.attr("status")!="checked"){
						cb.click();
					}
				}
				
			}else{
				for(i=0; i<l;i++){
					var cb = $(cbs.get(i));
					if(cb.attr("status")!="unchecked"){
						cb.click();
					}
				}
			}
		}
		
		//to write打开编写信息窗口
		function toWrite(obj){
			resetForm($("form[name='msgform']"));
			var $writeMsg = $("#writeMsg");
			var left = getLeft("#writeMsg");
			document.msgform.reset();
			//$writeMsg.find("input[name='title']").removeClass("reptit_input")
			//如果是回复
			if (obj.hasClass("return")){
				var detail = obj.parents(".msgdetail");
				$writeMsg.find("form").attr("action","replyMessage").append("<input type='hidden' name='id' value='" + obj.attr("data-id")+ "'>");
				$writeMsg.find("input[name='accepter']").val(detail.find("#d_sender span").text());
				$writeMsg.find("input[name='accepter']").attr("data-sid",detail.find("#d_sender span").attr("data-sid"))
				//$writeMsg.find("input[name='title']").addClass("reptit_input").val(detail.find("#title").text());
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
				 var editor_content;
				 
				 window.msgeditor=  KindEditor.create('textarea[name="content"]', {
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
			f.find("textarea[name='content']").val(msgeditor.html());;
			
			var data = {}, url = f.attr("action");
			data.recipients = f.find("input[name='accepter']").val();
			data.title = f.find("input[name='title']").val();
			data.accepter = f.find("input[name='accepter']").val();
			data.content = f.find("textarea[name='content']").val();
			
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
						f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + " <span id='timer'>3</span>秒后自动刷新...</span></p>");
						var timer = setInterval(function(){ 
							var t = $("#timer");
							if((parseInt($("#timer").text())-1) < 0){
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
						f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "</p>");
					}
				},
				error:function(){
				}
			});
			
		}
		
		//获取某一页的数据
		function getPage(obj){
			var index = obj.attr("data-index"), pagetype = obj.attr("pagetype"), url = obj.attr("data-url");
			
			$.ajax({
				url:url,
				type:"POST",
				data:{currentPage:index,messageType:0},
				success: function(data){
					if(data.success=="true"){
						//处理数据
						fixdata(data.rows,pagetype);
						if(pagetype=="sysnotice"){
							$("#sysNotice .tbody .checkbox").checkbox({});
						}else if(pagetype=="get"){
							$("#get .tbody .checkbox").checkbox({});
						}else if(pagetype=="send"){
							$("#send .tbody .checkbox").checkbox({});
						}
					}else{
						alert("没有数据");
					}
				},
				error:function(){
					alert("请求失败！")
				}
			});
		}
		
		//将数据放进表格中
		function fixdata(data,pagetype){
			
			var size = data.lenght, i, tbody;
			
			for(i=0; i< size; i++){
				
				tbody += '<div class="read tr">'+
					+ '<div class="th th1"><span class="checkbox"><input type="checkbox" name="checkbox" data-id="' + data[i].id + '"></span></div>'
            		+ '<div class="td td2 sender" actiontype="getDetail" data-id="' + data[i].id + '">' + data[i].sender + '</div>'
            		+ '<div class="td td3 title"><p actiontype="getDetail" data-id="' + data[i].id + '">' + data[i].title + '</p></div>'
            		+ '<div class="td td4 date" actiontype="getDetail" data-id="' + data[i].id + '">' + data[i].date + '</div>'
            		+ '<div class="td td5 del"><a href="#" data-id="' + data[i].id + '" actiontype="delone">删除</a></div>'
            		+ '</div>';
			}
			
			if(pagetype=="sysnotice"){
				$("#sysNotice .tbody").html(tbody)
			}else if(pagetype=="get"){
				$("#get .tbody").html(tbody);
			}else if(pagetype=="send"){
				$("#send .tbody").html(tbody);
			}
		}
		
		//关闭消息编写窗口
		function closeMsgform(){
			$.unblockUI();
			KindEditor.remove('textarea[name="content"]')
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
		
		//删除单挑记录
		function del(obj,type){
			obj.addClass("deling");
			var left = getLeft("#confirmDel");
			var data;
			$("#confirmDel h3").text("确认删除");
			$("#confirmDel a.confirmdel").text("确认删除")
			if(type=="one"){
				//如果是删除一条
				$("#confirmDel p").text("是否确认删除本消息？");
				$("#confirmDel a.confirmdel").attr("data-id",obj.attr("data-id")).attr("actiontype","dodel_one");
			}else if(type=="mult"){
				//如果是删除多条
				var data = hasChecked("del");
				if(!data){
					shouWarn("选择提示","请先勾选要删除的消息！");
					return false;
				}
				var size = data.split(",").length;
				$("#confirmDel a.confirmdel").attr("actiontype","dodel_mult").attr("data-id",data);
				$("#confirmDel p").text("是否确认删除已勾选的"+size+"份消息？");
			}
			
			$.blockUI({
				message:$("#confirmDel"),
					css:{
					top:"20%",
					left:"35%",
					padding:'0px',
					border:'1px solid rgb(67, 67, 67)',
					boxShadow:"0px 0px 3px #434343",
					borderRadius:'8px',
					cursor:'auto'
					},
				overlayCSS: {
				cursor:'auto'
				}
			});
		}
		
		//标记已读
		function turnRead(obj){
			var data = hasChecked("read");
			if(!data){
				shouWarn("选择提示","请先选择需要标记的信息记录！");
				return false;
			}else if(data == "noread"){
				shouWarn("选择提示","所选消息中已没有未读消息！");
				return false;
			}
			
			//确认标记已读
			$("#confirmDel h3").text("确认标记");
			$("#confirmDel a.confirmdel").text("确认标记")
			$("#confirmDel p").text("是否确认标记已读？");
			$("#confirmDel a.confirmdel").attr("data-id",data).attr("actiontype","toturnread");
			
			$.blockUI({
				message:$("#confirmDel"),
					css:{
					top:"20%",
					left:"35%",
					padding:'0px',
					border:'1px solid rgb(67, 67, 67)',
					boxShadow:"0px 0px 3px #434343",
					borderRadius:'8px',
					cursor:'auto'
					},
				overlayCSS: {
				cursor:'auto'
				}
			});
		}
		
		//确认标记已读
		function toturnread(obj){
			var data = obj.attr("data-id");
			
			$.ajax({
				url:"updateMessagesByIsReader",
				type:"post",
				data:{messageIds:data},
				success: function(data){
					if(data.success=="true"){
						$.unblockUI();
						$.blockUI({message:"<div class='modaltip ok'><span class='ok'></span><span class='txt'>标记已读成功！</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
						var id = $(".tabc.cur").attr("id");
						if(id=="sysNotice"){
							location.hash = "sys";
						}else if(id=="get"){
							location.hash = "getBox";
						}else if(id=="send"){
							location.hash = "sendBox";
						}
						location.reload();
					}else{
						$.unblockUI();
						$.blockUI({message:"<div class='modaltip error'><span class='error'></span><span class='txt'>标记已读失败！</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
					}
					setTimeout(function(){ $.unblockUI(); },4000);
				},
				error:function(){
					alert("请求失败！")
				}
			})
			
		}
		
		//确认删除
		function doDel(obj){
			
			var data = {}, type = $(".tabc.cur").attr("id");
			data.messageIds = obj.attr("data-id");
			if(type=="sysNotice"){
				data.messageType = 0;
			}else if(type=="get"){
				data.messageType = 1;
			}else if(type=="send"){
				data.messageType = 2;
			}
			
			$.ajax({
				url:"deleteMessage",
				type:"post",
				data:data,
				success: function(data){
					if(data.status =="y"){
						$.unblockUI();
						$.blockUI({message:"<div class='modaltip ok'><span class='ok'></span><span class='txt'>删除成功！</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
						
						var id = $(".tabc.cur").attr("id");
						if(id=="sysNotice"){
							location.hash = "sys";
						}else if(id=="get"){
							location.hash = "getBox";
						}else if(id=="send"){
							location.hash = "sendBox";
						}
						location.reload();
					}else{
						$(".deling").removeClass("deling");
						$.unblockUI();
						$.blockUI({message:"<div class='modaltip error'><span class='error'></span><span class='txt'>删除失败！</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
					}
					$(".deling").removeClass("deling");
					setTimeout(function(){ $.unblockUI();},4000);
				},
				error:function(){
					alert("请求失败！");
				}
			})
		}
		
		//判断是否已经选择有记录
		function hasChecked(type){
			var checkeds = $(".tabc.cur .tbody").find(":checkbox[checked='checked']"), size = checkeds.size();
			var data=[];
			if(size == 0){
				//如果没有选择数据则直接返false
				return false;
			}else{
				//已经选择数据则返回数据id拼成的字符串
				var i;
				for(i=0 ; i<size; i++){
					var c = $(checkeds[i]);
					var isRead = c.parents(".tr").hasClass("read");
					if(type=="read" && isRead){
						data[i] = c.attr("data-id");
					}else if(type!="read"){
						data[i] = c.attr("data-id");
					}
				}
				data = data.join(",");
				if(data.length==0 && type == "read"){
					return "noread";
				}else{
					return data;
				}
			}
		}
		
		//查看消息详情
		function getDetail(obj){
			obj.parents(".tr").removeClass("read");
			var id = obj.attr("data-id");
			var ftl = $(".msgdetail"), $curtab = $(".tabc.cur"), msgtype = $curtab.attr("msgtype");
			
			$.ajax({
				url:"queryMessageByMessageId",
				type:"POST",
				data:{"messageId":id,"messageType":msgtype},
				success:function(data){
					
					if(data.status =="y"){
						var email = data.info;
						ftl.find(".del").attr("actiontype","delone").attr("data-id",id);
						if($curtab.attr("id")=="get"){
							ftl.find(".return").show();
							ftl.find(".return").attr("actiontype","towrite").attr("data-id",id);
						}else{
							ftl.find(".return").hide();
						}
						
						ftl.find(".back").attr("actiontype","backtotable");
						ftl.find("#title").text(email.title);
						
						ftl.find("#content .msgc").html(email.content);
						ftl.find("#d_sender span").text(email.sender).attr("data-sid",email.recipientId);
						ftl.find("#d_time span").text(email.createTimes);
						
						if(data.lastMessage && data.lastMessage.messageId != 0){
							var $pre = ftl.find("#pre"), ftip="";
							$pre.removeClass("disable").attr("actiontype","getDetail").attr("data-id",data.lastMessage.messageId);	
							
							if(data.lastMessage.isReader==0){
								ftip += "（未读）："+data.lastMessage.title
							}else{
								ftip += "（已读）："+data.lastMessage.title
							}
							$pre.find(".ftip span").text(ftip);
						}else{
							ftl.find("#pre").addClass("disable")
						}
						if(data.nextMessage && data.nextMessage.messageId != 0){
							var $next = ftl.find("#next"), ftip="";
							$next.removeClass("disable").attr("actiontype","getDetail").attr("data-id",data.nextMessage.messageId);	
							if(data.nextMessage.isReader==0){
								ftip += "（未读）："+data.nextMessage.title
							}else{
								ftip += "（已读）："+data.nextMessage.title
							}
							$next.find(".ftip span").text(ftip);
						}else{
							ftl.find("#next").addClass("disable")
						}
						
						if($curtab.find(".msgdetail").size()!=0){
							$curtab.find(".msgdetail").replaceWith("");
						}
						$curtab.append(ftl)
						$curtab.find(".tablebox").hide();
						$curtab.find(".msgdetail").show();
						$(".tools li").addClass("noclick");
						$(".hastip").mouseenter(showtip);
					}
				}
			})
		}
		
		//获取消息详情并渲染模板
		function render(ftl,id){
			var msgs = [{id:"1",title:"邮件1：测试邮件",content:"测试邮件内容sssdsfsdfgsdfg",time:"2010-02-03 12:09",sender:"hola",pre:"",next:"2"},
						{id:"2",title:"邮件2：测试邮件",content:"测试邮件内容地方的故事的故事分公司",time:"2014-02-03 12:09",sender:"mark",pre:"1",next:"3"},
						{id:"3",title:"邮件3：测试邮件",content:"测试邮sdsds件内容地方的故事的故事分公司",time:"2014-02-03 12:09",sender:"mark",pre:"2",next:""}];
						
			var index = parseInt(id) -1;
			
			return ftl;
		}
		
		//backtable返回表格
		function backtable(obj){
			//console.log("backtotable");
			var msgdetail = obj.parents(".msgdetail");
			msgdetail.hide().siblings(".tablebox").show();
		}
		
		//异步请求封装
		function doAjax(opt){
			var type = opt.type? opt.type : 'POST';
			$.ajax({
				url:opt.url,
				type:type,
				data:opt.data,
				success: opt.successs
				})
		}
		
		//表单验证
		var msgform = $("form[name='msgform']").Validform({
			ajaxPost:true,
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
						ei = str.length+si;
						selectText(document.getElementById("accepter"),si,ei)
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
		
		//弹出框信息提醒
		function shouWarn(tit, msg){
			
			$("#warn h3").text(tit);
			$("#warn p").text(msg);
			
			var left = getLeft("#warn");
			$.blockUI({
				message:$("#warn"),
					css:{
					top:"20%",
					left:"35%",
					padding:'0px',
					border:'1px solid rgb(67, 67, 67)',
					boxShadow:"0px 0px 3px #434343",
					borderRadius:'8px',
					cursor:'auto'
					},
				overlayCSS: {
				cursor:'auto'
				}
			});
		}
		
    });	
})(jQuery)