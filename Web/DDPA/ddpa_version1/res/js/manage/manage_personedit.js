(function($){
	$(function(){
		/*临时变量:认证或绑定操作项、验证码、邮箱填写是否正确*/
		var curvaliditem="",curvalidcode="",curemailvalid=false;
		/*页面文档节点引用*/
		var pe_imageup=$("#pe_imageup"),marriage=$("#marriage");
		var marrymap={"0":"未婚","1":"已婚","2":"离异","3":"丧偶","未婚":"0","已婚":"1","离异":"2","丧偶":"3"};
		var popup_validcode=$("#popup_validcode")
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=null;
		/*自定义校验方法*/
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var phonecode=/^0?(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(value));
		},"手机号码不正确");
		jQuery.validator.addMethod("isIDCard",function(value,element){
			  return getIDCard(value);
		},"身份证号码不正确");
		jQuery.validator.addMethod("isSex",function(value,element){
			  var templen=value.length,sexstr=0,tempsex=document.getElementById("sex").value;
			  if(tempsex==""){
				  return false;
			  }
			  if(templen==15){
				  sexstr=value.slice(14,15);
			  }
			  if(templen==18){
				  sexstr=value.slice(16,17);
			  }
			  return !!(tempsex%2==sexstr%2);
		},"身份证号码与性别信息不一致");
		jQuery.validator.addMethod("isBirthday",function(value,element){
			  var templen=value.length,birstr="",tempbir=document.getElementById("birthday").value;
			  if(tempbir!=""){
				  tempbir=tempbir.replace(/[\-\/\s]/g,"");
			  }
			  if(tempbir==""){
				  return false;
			  }
			  if(templen==15){
				  birstr=value.slice(6,12);
			  }
			  if(templen==18){
				  birstr=value.slice(6,14);
			  }
			  return !!(birstr==tempbir);
		},"身份证号码与出身年月信息不一致");
		/*单选按钮初始化*/
		var tartext1=marriage.val();
		$("#marriage_radio").find("li").each(function(){
            var curobj=$(this),curtext=curobj.text();
			if(marrymap[tartext1]==curtext&&tartext1!=""){
				curobj.addClass("radiosel");
				return false;
			}
        });
		/*单选按钮事件监听*/
		$("#marriage_radio").click(function(e){
			if(e.target.nodeName=="LI"){
				var curobj=$(e.target),curid=e.target.parentNode.id.slice(0,-6);
				curobj.addClass("radiosel").siblings().removeClass("radiosel");
				document.getElementById(curid).value=marrymap[curobj.text()];
			}
		});
		/*获取验证码*/
		popup_validcode.removeClass("popup_unvalidcode").removeAttr("disabled");
		popup_validcode.click(function(){
			var phonerule=/^0?(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/,phonevalue=document.getElementById("mobilephone").value;
			if(!phonerule.test(phonevalue)||phonevalue==""){
				document.getElementById("mobilephone_tips").innerHTML="手机号码不正确";
				return false;
			}
			clearInterval(ccount_id);
			ccount_id=null;
			var curobj=$(this),popup_validtime=document.getElementById("popup_validtime");
			var c_count=1;
			curobj.addClass("popup_unvalidcode").attr({"disabled":"disabled"});
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
				url:"请求地址",
				data :{
					UserName:function(){return document.getElementById("username").value;},
					MobilePhone:function(){return document.getElementById("mobilephone").value;}
				},
				dataType : 'json',
				success : function(data){
					if (object.success) {
						curvalidcode="获取到的验证码";
						document.getElementById("validcode_tips").innerHTML="动态验证码已发送至您手机，请注意查收";
					}else{
						curvalidcode="";
					}
				},
				error:function(){curvalidcode=""}
			});
		});
		/*发送验证邮件*/
		$("#popup_validsend").click(function(){
			if(curemailvalid){
				/*
				发送验证邮件
				to do
				*/
			}else{
				document.getElementById("email_tips").innerHTML="邮件填写不正确"
				return false;
			}
		});
		
		/*个人信息编辑页面验证表单*/
		$("#personedit").validate({
			rules : {
				'Marriage' : {
					required : true
				},
				'LiveAddress' : {
					required : true
				}
			},
			messages : {
				'Marriage' : {
					required :"未选择婚姻状况"
				},
				'LiveAddress' : {
					required :"居住地址不能为空"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success:function(p){
				p.addClass("tipssucc");
				setTimeout(function(){p.removeClass("tipssucc");},2000);
			}
		});
		/*认证或者绑定*/
		$("#realname_bind,#idcard_bind,#mobilephone_bind,#email_bind,#sex_bind,#birthday_bind").click(function(e){
			var curobj=e.target,curtext=curobj.innerHTML,curid=curobj.id;
			if(curtext!=""){
				if(curid=="realname_bind"||curid=="idcard_bind"||curid=="sex_bind"||curid=="birthday_bind"){
					$.blockUI({css:{"left":"28%"},message:$("#popup_validreal")});
					curvaliditem=curid;
				}else if(curid=="mobilephone_bind"){
					$.blockUI({css:{"left":"28%"},message:$("#popup_validphone")});
					curvaliditem=curid;
				}else if(curid=="email_bind"){
					$.blockUI({css:{"left":"28%"},message:$("#popup_validemail")});
					curvaliditem=curid;
				}
			}
		});
		/*弹出层关闭*/
		$("#popup_realclose,#popup_realcance,#popup_phoneclose,#popup_phonecance,#popup_emailclose,#popup_emailcance").click(function(){
			$.unblockUI();
			clearInterval(ccount_id);
			ccount_id=null;
		});
		/*弹出层实名认证表单校验*/
		$("#popup_realaction").validate({
				rules : {
					'RealName' : {
						required : true
					},
					'IDCard' : {
						required:true,
						isSex:true,
						isBirthday:true,
						isIDCard:true
					}
				},
				messages : {
					'RealName' : {
						required : "真实姓名不能为空"
					},
					'IDCard' : {
						required : "身份证不能为空"
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
					var url =$('form').attr('action');
					var params =$('form').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if (object.success) {
								$("#"+curvaliditem).parent().html("<div class=\"pe_validicon\"></div>已认证<span id=\""+curvaliditem+"\"></span>");
								$.unblockUI();		
							}else{
								$("#idcard_tips").html("认证失败,请检查姓名或身份证号码是否有误");
							}
						}
					});
					return false;
				}
		});
		/*弹出层手机绑定表单校验*/
		$("#popup_phoneaction").validate({
				rules : {
					'MobilePhone' : {
						required : true,
						ischi_phone:true,
						remote:{
							url:"提交访问地址",
							type: "post",
							data:{
								UserName:function(){return document.getElementById("username").value;}
							}
						}
					},
					'ValidCode' : {
						required:true
					}
				},
				messages : {
					'MobilePhone' : {
						required : "手机号码不能为空",
						remote:"此号码已绑定，请检查是否输入正确"
					},
					'ValidCode' : {
						required : "验证码不能为空"
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
					var url =$('form').attr('action');
					var params =$('form').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if (object.success&&curvalidcode!="") {
								$("#"+curvaliditem).parent().html("<div class=\"pe_validicon\"></div>已绑定<span id=\""+curvaliditem+"\"></span>");
								$.unblockUI();		
							}
						}
					});
					return false;
				}
		});
		/*弹出层邮箱绑定表单校验*/
		$("#popup_emailaction").validate({
				rules : {
					'Email' : {
						required : true,
						email:true,
						remote:{
							url:"提交访问地址",
							type: "post",
							data:{
								UserName:function(){return document.getElementById("username").value;},
								Email:function(){return document.getElementById("email").value;}
							}
						}
					}
				},
				messages : {
					'Email' : {
						required : "邮箱不能为空",
						email:"邮箱格式不正确",
						remote:"填写邮箱不存在"
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
					var url =$('form').attr('action');
					var params =$('form').serialize();
					$.ajax({
						type:'post',
						url:url,
						data : params,
						dataType : 'json',
						success : function(data){
							if (object.success&&curvalidcode!="") {
								$("#"+curvaliditem).parent().html("<div class=\"pe_validicon\"></div>已绑定<span id=\""+curvaliditem+"\"></span>");
								$.unblockUI();		
							}else{
								document.getElementById("email_tips").innerHTML="此邮箱已被认证，请重新输入邮箱地址";
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
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/imageUpload?userId=24&thumbSizes=150x150',		
		imageSizeLimit : "2MB",
		allowFileManager : true
	});
	K("#pe_imageup").click(function(e){
		var curobj=e.target,curid=curobj.id;
		/*执行文件上传*/
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				clickFn : function(url, title, width, height, border, align) {					
					editor.hideDialog();
				}
			});
		});
	});
});

/*身份证判断*/
function getIDCard(values){
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var cfarr=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],lastarr=[1,0,"x",9,8,7,6,5,4,3,2];
	var len=values.replace(/\s+/g,"").length;
	if(values==""){
		return false;
	}
	if(len<=2&&area[parseInt(values.substr(0,2))]==null){
		return false;
	}
	if(len==15||len==18){
		if(area[parseInt(values.substr(0,2))]==null){	
			return false;		
		}
		if(len==15){
			if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(values)){
				return true;
			}else{
				return false;
			}
		}
		if(len==18){
			var temparr=values.slice(0,17).split(""),templast=values.slice(17,18);
			var tempsum=0,tempresult=null;
			for(var i=0;i<17;i++){
				tempsum+=parseInt(temparr[i]*cfarr[i]);
			}
			tempresult=lastarr[tempsum%11];
			if(tempresult!=templast){
				return false;
			}else{
				return true;
			}
			if(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(values)){			
				return true;
			}else{
				return false;
			}
		}
	}else{
		return false;
	}
}

