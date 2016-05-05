(function($){
	$(function(){
		/*临时变量:认证或绑定操作项、验证码、邮箱填写是否正确、是否是当前电话号码*/
		var curvaliditem="",curvalidcode="",curemailvalid=false,curtruephone=false;
		/*页面文档节点引用*/
		var pe_imageup=$("#pe_imageup"),marriage=$("#marriage");
		var marrymap={"0":"未婚","1":"已婚","2":"离异","3":"丧偶","未婚":"0","已婚":"1","离异":"2","丧偶":"3"};
		var popup_validcode=$("#popup_validcode")
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=null;
		/*自定义校验方法*/
		//校验是否为中文
		jQuery.validator.addMethod("isC_N",function(value,element){
			  var username=/^[\u4E00-\u9FA5]{0,20}$/;
			  return this.optional(element)||(username.test(value));
		},"只能输入汉字");
		/*检测是否为手机号*/
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var tno = value.replace(/(\s*)/g,"");
			  var phonecode=/^(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(tno));
		},"手机号码不正确");
		/*检测是否为身份证*/
		jQuery.validator.addMethod("isIDCard",function(value,element){
			  return getIDCard(value);
		},"身份证号码不正确");
		/*检测性别是否正确*/
		jQuery.validator.addMethod("isSex",function(value,element){
			  var value=value.replace(/(\s*)/g,"");
			  var templen=value.length,sexstr=0,tempsex=document.getElementById("sex").value;
			  if(templen==15){
				  sexstr=value.slice(14,15);
			  }
			  if(templen==18){
				  sexstr=value.slice(16,17);
			  }
			  return !!(tempsex%2==sexstr%2);
		},"身份证号码与性别信息不一致");
		/*检测生日是否正确*/
		jQuery.validator.addMethod("isBirthday",function(value,element){
			  var templen=value.length,birstr="",tempbir=document.getElementById("birthday").value;
			  if(tempbir!=""){
				  tempbir=tempbir.replace(/[\-\/\s*]/g,"");
			  }
			  
			  if(templen==15){
				  birstr=value.slice(6,12);
			  }
			  if(templen==18){
				  birstr=value.slice(6,14);
			  }
			  return !!(birstr==tempbir);
		},"身份证号码与出身年月信息不一致");
		/*检测是否为邮箱*/
		jQuery.validator.addMethod("ischi_Email",function(value,element){
			  var emailrule=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
			  return this.optional(element)||(emailrule.test(value));
		},"邮箱格式不正确");
		/*检测身份证是否已经被认证*/
		jQuery.validator.addMethod("isValidIDCard",function(value,element){
			var curtext=value.replace(/(\s*)/g,"");
			var idflag=false;
			$.ajax({
				url:"../../fund/security/examiIdNumber",
				data:{"idNumber":curtext},
				async:false,
				type:"post",
				dataType:"json",
				success:function(datas){
					if(datas.status=="n"){
						idflag=false;
					}else if(datas.status=="y"){
						idflag=true;
					}
				},
				error:function(){
					idflag=false;
				}
			});
			return idflag;
		},"此身份证已实名认证，无法重复认证");
		/*检测邮箱是否已经被认证*/
		jQuery.validator.addMethod("isValidEmail",function(value,element){
			var curtext=value.replace(/(\s*)/g,"")
			var emailflag=false;
			$.ajax({
				url:"../../fund/security/examiEmail",
				data:{"email":curtext},
				async:false,
				type:"post",
				dataType:"json",
				success:function(datas){
					if(datas.status=="n"){
						emailflag=false;
					}else if(datas.status=="y"){
						emailflag=true;
					}
				},
				error:function(){
					emailflag=false;
				}
			});
			return emailflag;
		},"此邮箱已被认证，请重新输入邮箱地址");
		/*检测手机号是否已经被认证*/
		jQuery.validator.addMethod("isValidPhone",function(value,element){
			var curtext=value.replace(/(\s*)/g,"")
			var phoneflag=false;
			$.ajax({
				url:"../../fund/security/examiMobilePhone",
				data:{"mobilePhone":curtext},
				async:false,
				type:"post",
				dataType:"json",
				success:function(datas){
					if(datas.status=="n"){
						phoneflag=false;
					}else if(datas.status=="y"){
						phoneflag=true;
					}
				},
				error:function(){
					phoneflag=false;
				}
			});
			return phoneflag;
		},"此手机号已被认证，请重新输入手机号");
		/*单选按钮初始化*/
		var tartext1=marriage.val();
		$("#marriage_radio,#marriage_shows").find("li").each(function(){
            var curobj=$(this),curtext=curobj.text();
			if(marrymap[tartext1]==curtext&&tartext1!=""){
				curobj.addClass("radiosel cur");
				return false;
			}
        });
		/*取消编辑行为*/
		$("#pe_cance").click(function(){
			var tempburl=window.location.href;
			window.location.href=tempburl.slice(0,tempburl.lastIndexOf("/")+1)+"manageInit";
		});
		/*单选按钮事件监听*/
		$("#marriage_radio").click(function(e){
			if(e.target.nodeName=="LI"){
				var curobj=$(e.target),curid=e.target.parentNode.id.slice(0,-6);
				curobj.addClass("radiosel").siblings().removeClass("radiosel");
				document.getElementById(curid).value=marrymap[curobj.text()];
			}
		});
		//clearTimer
		function clearTimer(){
			clearInterval(ccount_id);
			ccount_id=null;
			document.getElementById("popup_validtime").innerHTML="60秒后重新获取";
			$("#popup_validcode").removeClass("popup_unvalidcode").removeAttr("disabled");
			$("#popup_validtime").hide();
		}
		/*获取验证码*/
		popup_validcode.removeClass("popup_unvalidcode").removeAttr("disabled");
		popup_validcode.click(function(){
			var phonerule=/^(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/,phonevalue=document.getElementById("mobilephone").value;
			phonevalue = phonevalue.replace(/(\s*)/g,"");
			if(!phonerule.test(phonevalue)||phonevalue==""){
				document.getElementById("mobilephone_tips").innerHTML="手机号不正确";
				return false;
			}
			$.ajax({
				url:"doCheckPhone",
				type: "post",
				async:false,
				data:{validateType:"1",mobilePhone:$("#mobilephone").val()},
				dataType:"json",
				success: function(datas){
					if(datas){
						curtruephone=true;
					}else{
						curtruephone=false;
					}
				},
				error:function(){
					curtruephone=false;
				}
			});
			if(!curtruephone){
				document.getElementById("mobilephone_tips").innerHTML="此手机号已被认证，请重新输入手机号";
				return false;
			}
			clearInterval(ccount_id);
			ccount_id=null;
			var curobj=$(this),popup_validtime=document.getElementById("popup_validtime");
			var c_count=1;
			curobj.addClass("popup_unvalidcode").attr({"disabled":"disabled"});
			$(popup_validtime).show();
			/*计时*/
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				popup_validtime.innerHTML=parseInt(60-c_count)+"秒";
				if(c_count==60||c_count==0){
					clearInterval(ccount_id);
					ccount_id=null;
					popup_validtime.innerHTML="60秒后重新获取";
					curobj.removeClass("popup_unvalidcode").removeAttr("disabled");
				};
			},1000);
			/*获取验证码*/
			$.ajax({
				type:'post',
				url:"../../sys/sms/sendUserSms",
				data :{
					mobilePhone:function(){return document.getElementById("mobilephone").value;},
			        typeSms:3
				},
				dataType : 'json',
				success : function(data){
					if (data.success) {
						/*curvalidcode=data.content;
						alert(curvalidcode);*/
						document.getElementById("validcode_tips").innerHTML="动态验证码已发送至您手机，请注意查收";
					}else{
						/*alert(data.msg);*/
					}
				},
				error:function(){alert(data.msg);}
			});
		});
		/*个人信息编辑页面验证表单*/
		$("#personedit").validate({
			rules : {
				'marriaged' : {
					required : true,
					minlength:1
				},
				'homeAddress' : {
					required : true,
					minlength:1
				}
			},
			messages : {
				'marriaged' : {
					required :"未选择婚姻状况",
					minlength:"未选择婚姻状况"
				},
				'homeAddress' : {
					required :"居住地址不能为空",
					minlength:"居住地址不能为空"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success:function(p){
				p.addClass("tipssucc");
				setTimeout(function(){p.removeClass("tipssucc");},2000);
			},
			invalidHandler : function() {
				return false;
			},
			submitHandler:function(){
				var url =$('form[id="personedit"]').attr('action');				
				var params =$('form[id="personedit"]').serialize();		
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data){
						if(data.success){
							window.location.href="manageInit";
						}else{
							alert("更新失败");
						}
					}
				});
				return false;
			}
		});
		//格式化手机号码
		$("input[name='mobilePhone']").live("keypress",turnPhoneNo);
		//手机号码输入检测
		function turnPhoneNo(event){
			if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
				return;
			}
			
			var $this = $(event.target), no = $this.val();
			tno = no.replace(/(\s*)/g,"");
			var l = tno.length;
			if(l==3 || l==7){
				no = no+" ";
				$this.val(no);
			}
		}
		//格式化身份证号
		$("input[name='idNumber']").live("keypress",turnIDNo);
		//身份证号码输入检测
		function turnIDNo(event){
			if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
				return;
			}
			
			var $this = $(event.target), no = $this.val();
			tno = no.replace(/(\s*)/g,"");
			var l = tno.length;
			if(l==6 || l==10 || l==14){
				no = no + " ";
				$this.val(no);
			}
		}
		//reset 表单
		function resetForm(formName,tipholder){
			document.getElementById(formName).reset();
			$("#"+formName).find(tipholder).text("");
			clearTimer();
		}
		/*认证或者绑定*/
		$("#realname_bind,#idcard_bind,#mobilephone_bind,#email_bind,#sex_bind,#birthday_bind").click(function(e){
			var curobj=e.target,curtext=curobj.innerHTML,curid=curobj.id;
			if(curtext!=""){
				if(curid=="realname_bind"||curid=="idcard_bind"||curid=="sex_bind"||curid=="birthday_bind"){
					resetForm("popup_realaction",".popup_validtips");
					$.blockUI({css:{"left":"28%"},message:$("#popup_validreal")});
					curvaliditem=curid;
				}else if(curid=="mobilephone_bind"){
					resetForm("popup_phoneaction",".popup_validtips");
					$.blockUI({css:{"left":"28%"},message:$("#popup_validphone")});
					curvaliditem=curid;
				}else if(curid=="email_bind"){
					var email_have=$("#havepe_email").val();
					if(email_have.indexOf("@")==-1||email_have.indexOf(".")==-1){
						resetForm("popup_emailaction",".popup_validtips");
						$.blockUI({css:{"left":"28%"},message:$("#popup_validemail")});
						curvaliditem=curid;
					}else if(email_have.indexOf("@")!=-1||email_have.indexOf(".")!=-1){
						$.blockUI({css:{"left":"28%"},message:$("#popup_activeemail")});
						var active_obj=$("#active_emaillink");
						active_obj.html("正在发送邮件至此邮箱");
						$.ajax({
							url:"sendBindEmail",
							type:"post",
							data:{"email":email_have},
							dataType:"json",
							success: function(datas){
								if(datas.success){
									setTimeout(function(){
										active_obj.attr({"href":datas.emailUrl}).html("发送成功,立即登录").live("click",function(){
											$.unblockUI();
										});
									},1000);
								}
							}	
						});
					}
				}
			}
		});
		/*弹出层关闭*/
		$("#popup_realclose,#popup_realcance,#popup_phoneclose,#popup_phonecance,#popup_emailclose,#popup_emailcance,#popup_activeclose").click(function(){
			$.unblockUI();
			clearInterval(ccount_id);
			ccount_id=null;
		});
		
		/*弹出层实名认证表单校验*/
		
		$("#popup_realaction").validate({
				onkeyup:false,
				rules : {
					'realName' : {
						required : true,
						minlength:2,
						isC_N:true
					},
					'idNumber' : {
						required:true,
						minlength:1,
						isIDCard:true,
						isValidIDCard:true
					}
				},
				messages : {
					'realName' : {
						required : "真实姓名不能为空",
						minlength:"真实姓名不能少于2个文字"
					},
					'idNumber' : {
						required : "身份证不能为空",
						minlength:"身份证不能为空"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success:function(){},
				invalidHandler : function() {
					return false;
				},
				submitHandler:function(){
					var v = $("input[name='idNumber']").val();
					$("input[name='idNumber']").val(v.replace(/(\s*)/g,""),"");
					var url =$('form[id=popup_realaction]').attr('action');
					var params =$('form[id=popup_realaction]').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							$.unblockUI();
							if(data.success ==true){
								$.unblockUI();
								$.blockUI({css:{width:"34%"},message:"<div class='modaltip ok'><span class='ok'></span><span class='txt'>"+data.msg+"</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
							}else{
								$.unblockUI();
								$.blockUI({css:{width:"34%"},message:"<div class='modaltip error'><span class='error'></span><span class='txt'>"+data.msg+"</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
							}
							setTimeout(function(){ $.unblockUI(); window.location.reload();},4000);
						}
					});
					return false;
				}
		});

		/*弹出层手机绑定表单校验*/
		$("#popup_phoneaction").validate({
				onkeyup:false,
				rules : {
					'mobilePhone' : {
						required : true,
						minlength:1,
						ischi_phone:true,
						isValidPhone:true
					},
					'validcode' : {
						required:true,
						minlength:1
					}
				},
				messages : {
					'mobilePhone' : {
						required : "手机号码不能为空",
						minlength:"手机号码不能为空"
					},
					'validcode' : {
						required : "验证码不能为空",
						minlength:"验证码不能为空"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success:function(){},
				invalidHandler : function() {
					return false;
				},
				submitHandler:function(){
					var phone = $("input[name='mobilePhone']"), v = phone.val();
					phone.val(v.replace(/(\s*)/g,""))
					var url =$('form[id=popup_phoneaction]').attr('action');
					var params =$('form[id=popup_phoneaction]').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if (data.success) {
								$("#mobilePhone").html(data.mobilePhone);
								$("#"+curvaliditem).parent().html("<div class=\"pe_validicon\" style=\"color:#a0a0a0;\"></div>已绑定<span id=\""+curvaliditem+"\"></span>");
								$.unblockUI();
								clearInterval(ccount_id);
								ccount_id=null;
								infoTips("已绑定您的手机号码","succ");
								setTimeout(function(){
									window.location.reload();
								},5000);	
							}else if(data.success ==false){
								$("#popup_phoneaction #validcode_tips").text(data.msg);
							}
						}
					});
					return false;
				}
		});
		
		
		/*弹出层邮箱绑定表单校验*/
		$("#popup_emailaction").validate({
			    onkeyup:false,
				rules : {
					'email' : {
						required : true,
						minlength:1,
						ischi_Email:true,
						isValidEmail:true
					}
				},
				messages : {
					'email' : {
						required : "邮箱不能为空",
						minlength: "邮箱不能为空"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
					curemailvalid=false;
				},
				success:function(){curemailvalid=true;},
				invalidHandler : function(){
					curemailvalid=true;
					return false;
				},
				submitHandler:function(){
					var url =$('form[id=popup_emailaction]').attr('action');
					var params =$('form[id=popup_emailaction]').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if (data.success) {
								$("#email_tips").html("认证邮件已经发送到您的邮箱：<a target='_self' href='../../res/js/manage/"+data.emailUrl+"'>立即登录验证</a>");								
							}else{
								$("#email_tips").html("此邮箱已被认证，请重新输入邮箱地址");
							}
						}
					});
					return false;
				}
		});
	});
})(jQuery);

/*图片上传 kindeditor load*/
KindEditor.ready(function(K){
	var userId=$("#userId").val();	
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/imageUpload?userId='+userId+'&thumbSizes=150x150',		
		imageSizeLimit : "8MB",
		allowFileManager : true
	});
	K("#pe_imageup").click(function(e){
		var curobj=e.target,curid=curobj.id;
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				clickFn : function(url, title, width, height, border, align) {							
					var param={};
					param["hearImg"]=url;
					$.post("uploadHearImg",param,function(data){
						if(data.success){							
								//$("#hearImg").attr("src","readImageStream?userId"+$("#userId").val());
							//$("#hearImg").attr("src","../../img/read/readImageStream?type=0&imgFile="+data.hearImg);
							
							setTimeout(function(){
								window.location.reload();
							},1000);
						}else{
							alert("提交失败");
						}
					});
					editor.hideDialog();
				}
			});
		});
	});
	

});
/*检测图片载入*/
function errorImg(objs){
	$(objs).parent().addClass("pe_imageerror");
}
/*身份证判断*/
function getIDCard(values){
	var values = values.replace(/(\s*)/g,"");
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var cfarr=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],lastarr=[1,0,"x",9,8,7,6,5,4,3,2];
	var len=values.length;
	if(values==""){
		return false;
	}
	if(len<=2&&area[parseInt(values.substr(0,2),10)]==null){
		return false;
	}
	if(len==15||len==18){
		if(area[parseInt(values.substr(0,2),10)]==null){	
			return false;		
		}
		if(len==15){
			var tempsyear=parseInt(19+values.slice(6,8),10),tempsmonth=parseInt(values.slice(8,10),10),tempsdays=parseInt(values.slice(10,12),10);
			if(tempsmonth<1||tempsdays<1||tempsmonth>12){
				return false;
			}
			tempsmonth=tempsmonth>12?(tempsmonth%12)==0?12:tempsmonth%12:tempsmonth;
			if(is_LeapYear(tempsyear,tempsmonth)<tempsdays){
				return false;
			}
			if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(values)){
				return true;
			}else{
				return false;
			}
		}
		if(len==18){
			var templyear=parseInt(values.slice(6,10),10),templmonth=parseInt(values.slice(10,12),10),templdays=parseInt(values.slice(12,14),10);
			if(templmonth<1||templdays<1||templmonth>12){
				return false;
			}
			templmonth=templmonth>12?(templmonth%12)==0?12:templmonth%12:templmonth;
			if(is_LeapYear(templyear,templmonth)<templdays){
				return false;
			}
			if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(values)){
				return true;
			}else{
				return false;
			}
			/*var temparr=values.slice(0,17).split(""),templast=values.slice(17,18).toLowerCase();
			var tempsum=0,tempresult=null;
			for(var i=0;i<17;i++){
				tempsum+=parseInt(temparr[i])*parseInt(cfarr[i]);
			}
			tempresult=lastarr[tempsum%11];
			if(tempresult!=templast){
				return false;
			}else{
				return true;
			}*/
		}
	}else{
		return false;
	}
}
/*判断闰年并获取月份值*/
function is_LeapYear(ys,ms){
	var ms=parseInt(ms,10);
	var cmds=[31,28,31,30,31,30,31,31,30,31,30,31];
	var isly=ys%4==0&&ys%100!=0?true:ys%400==0?true:false;
	ms==2&&isly?cmds.splice(1,1,29):cmds.splice(1,1,28);
	return cmds[ms-1];
}
