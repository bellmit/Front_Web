(function($){
	$(function(){
		var marrymap={"0":"未婚","1":"已婚","2":"离异","3":"丧偶","未婚":"0","已婚":"1","离异":"2","丧偶":"3"},childmap={"0":"无","1":"有","无":"0","有":"1"};
		/*获取页面元素*/
		var loan_infoaction=$("#loan_infoaction"),homepro=$("#homepro"),homecity=$("#homecity"),livepro=$("#livepro"),livecity=$("#livecity"),marriage=$("#marriage"),children=$("#children");
		var homepro_val=homepro.val(),homecity_val=homecity.val(),livepro_val=livepro.val(),livecity_val=livecity.val();
		var homepro_wrap=$("#homepro_wrap"),homecity_wrap=$("#homecity_wrap"),livepro_wrap=$("#livepro_wrap"),livecity_wrap=$("#livecity_wrap");
		
		/*下拉框初始化*/
		var citystr_init=cityinit(homepro_val,homecity_val,livepro_val,livecity_val);
		homepro_wrap.html(citystr_init[0]);
		homecity_wrap.html(citystr_init[1]);
		livepro_wrap.html(citystr_init[2]);
		livecity_wrap.html(citystr_init[3]);
		/*单选按钮初始化*/
		$("#marriage_radio").find("li").each(function() {
            var curobj=$(this),curtext=curobj.text(),tartext=marriage.val();
			if(marrymap[tartext]==curtext&&tartext!=""){
				curobj.addClass("radiosel");
				return false;
			}
        });

		//城市选择器
		$(".place_pro").chooseCity();
		$(".place_pro1").chooseCity();
		$(".place_pro2").chooseCity();
		
		$(".selectBox").SelectBox();
		$("#children_radio").find("li").each(function() {
            var curobj=$(this),curtext=curobj.text(),tartext=children.val();
			if(childmap[tartext]==curtext&&tartext!=""){
				curobj.addClass("radiosel");
				return false;
			}
        });
		//固话号码处理
		$(".phonearea, .phone").blur(function(e){
			$(".phone").siblings("p").replaceWith("");
			var reg1 = /^0\d{2,3}$/, reg2 = /^\d{6,8}$/, v1 = $(".phonearea").val(), v2 = $(".phone").val(); 
			
			//console.log(v1.match(reg1)+";"+v2.match(reg2));
			if(v1==""&&v2==""){
				return;
			}
			if(v1.match(reg1) && v2.match(reg2)){
				$(".phone").siblings("p").replaceWith("")
				$(".phone").siblings("span.aftermsg").show()
			}else if(!v1.match(reg1)){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>区号不正确</p>");
			}else if(v1!="" && v2==""){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>电话号码不能为空</p>");
			}else if(!v2.match(reg2)){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>电话号码不正确</p>");
			}
		});
		
		//判断是否为自有房屋
		if($("input[name='residenceType']").val() == 0){
			$(".liveAdd").addClass("hide").hide();
		}
		$("input[name='residenceTypebox']").siblings(".values").click(function(e){
			//console.log("here")
			var $target = $(e.target);
			var v = $target.attr("rel");
			if(v == 0){
				$(".liveAdd").addClass("hide").hide();
			}else{
				$(".liveAdd").removeClass("hide").show();
			}
		});
		/*城市下拉事件监听*/
		$("#homepro,#homecity,#livepro,#livecity").focusin(function(){
			var curobj=$(this),curid=curobj.attr("id");
			$("#"+curid+"_wrap").show();
		});
		homepro_wrap.find("li").live("click",function(){
			var curobj=$(this);
			homepro.val(curobj.text());
			var tempstr=cityselect(curobj);
			homecity_wrap.show().html(tempstr);
		})
		livepro_wrap.find("li").live("click",function(){
			var curobj=$(this);
			livepro.val(curobj.text());
			var tempstr=cityselect(curobj);
			livecity_wrap.show().html(tempstr);
		})
		homecity_wrap.find("li").live("click",function(){
			var curobj=$(this);
			homecity.val(curobj.text());
			curobj.addClass("addresssel").siblings().removeClass("addresssel");
		});
		livecity_wrap.find("li").live("click",function(){
			var curobj=$(this);
			livecity.val(curobj.text());
			curobj.addClass("addresssel").siblings().removeClass("addresssel");
		});
		$("#homepro_wrap,#homecity_wrap,#livepro_wrap,#livecity_wrap").hover(function(){},function(){$(this).slideUp(100);
		});
		/*单选按钮事件监听*/
		$("#marriage_radio,#children_radio").find("li").click(function(){
			var curobj=$(this),parid=curobj.parent().attr("id").split("_")[0],curtext=curobj.text();
			curobj.addClass("radiosel").siblings().removeClass("radiosel");
			if(parid=="marriage"){
				$("#"+parid).val(marrymap[curobj.text()]);
			}else if(parid=="children"){
				$("#"+parid).val(childmap[curobj.text()]);
			}
		});
		
		$(".residence input[type='text']").blur(checkLive);
		$(".family input[type='text']").blur(checkFamily);
		$("#place_pro,#place_city").blur(checkhousehold);
		$(".required3_1 input[type='text']").blur(checkPhone2);
		$(".required3_2 input[type='text']").blur(checkPhone1);
		$("input[name='graduateYearbox']").blur(checkYear);
		$("input[name='familyRalationName'],input[name='familyRelationship'],input[name='contactPersonRalationName'],input[name='contactPersonRelationship']").keyup(function(event){
			if(event.keyCode==32){
				$(this).val($(this).val().replace(/(\s*)/g,""));
				return false;
			}
		})
		
		/*提交表单前验证表单*/
		$("#loan_infoaction").submit(function(e){
			var f1 = checkYear();
			var f2 = checkFamily();
			var f3 = checkLive();
			var f4 = checkPhone();
			var f5 = checkPhone2();
			var f6 = checkPhone1();
			var f7 = checkhousehold();
			var f8 = checkChRadio();
			var f9 = checkMRadio();
			var f10 = checkLiveType();
			if(!f1 || !f2 || !f3 || !f4 || !f5 || !f6 || !f7 || !f8 || !f9 || !f10){
				//console.log("false");
				return false;
			}
		});

		//手机号码格式化
		$(".familylong").live("keyup",turnPhoneNo);
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
		
		//检测子女婚姻
		function checkChRadio(){
			var ul = $("#children_radio"); ch = ul.find(".radiosel").size();
			ul.siblings("p").replaceWith("");
			if(ch <= 0){
				ul.after("<p style='color:#f00; margin:2px 0px 0px 6px;float: left;'>请选择有无子女</p>");
				return false;
			}else{
				ul.siblings("p").replaceWith("");
			}
			return true;
		}
		
		function checkMRadio(){
			var ul = $("#marriage_radio"); ch = ul.find(".radiosel").size();
			ul.siblings("p").replaceWith("");
			if(ch <= 0){
				ul.after("<p style='color:#f00; margin:2px 0px 0px 6px;float: left;'>请选择婚姻状况</p>");
				return false;
			}else{
				ul.siblings("p").replaceWith("");
			}
			return true;
		}
		
		//检测固话
		function checkPhone(){
			var flag = true;
			$(".phone").siblings("p").replaceWith("");
			var reg1 = /^0\d{2,3}$/, reg2 = /^\d{6,8}$/, v1 = $(".phonearea").val(), v2 = $(".phone").val(); 
			
			//console.log(v1.match(reg1)+";"+v2.match(reg2));
			if(v1==""&&v2==""){
				return flag;
			}
			if(v1.match(reg1) && v2.match(reg2)){
				$(".phone").siblings("p").replaceWith("")
				$(".phone").siblings("span.aftermsg").show()
			}else if(v1=="" && v2!=""){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>区号不能为空</p>");
			}else if(!v1.match(reg1)){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>区号不正确</p>");
				flag = false;
			}else if(v1!="" && v2==""){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>电话号码不能为空</p>");
			}else if(!v2.match(reg2)){
				$(".phone").siblings("span.aftermsg").hide()
				$(".phone").after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>电话号码不正确</p>");
				flag = false;
			}
			
			return flag;
		};
		
		function checkLiveType(){
			$("input[name='residenceTypebox']").siblings("p").replaceWith("");
			var flag = true, t = $("input[name='residenceType']").val();
			if(t==""){
				$("input[name='residenceTypebox']").after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择居住类型</p>");
				flag=false;
			}
			return flag;
		}
		
		//检测居住地址
		function checkLive(){
			var flag = true;
			var residence = $(".residence");
			var residenceInputs = residence.find("input[type='text']");
			
			if(!$(".liveAdd").hasClass("hide")){
				if($(residenceInputs[0]).val() == ""){
					//居住地址为空
					$(residenceInputs[2]).siblings("p").replaceWith("");
					$(residenceInputs[2]).siblings(".tipserror").replaceWith("");
					$(residenceInputs[2]).after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择居住地址省份</p>") 
					flag=false;
				}else if($(residenceInputs[1]).val() == ""){
					//居住地址为空
					$(residenceInputs[2]).siblings("p").replaceWith("");
					$(residenceInputs[2]).siblings(".tipserror").replaceWith("");
					$(residenceInputs[2]).after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择居住地址城市</p>") 
					flag=false;
				}else if($(residenceInputs[2]).val() == ""){
					$(residenceInputs[2]).siblings("p").replaceWith("");
					$(residenceInputs[2]).siblings(".tipserror").replaceWith("");
					$(residenceInputs[2]).after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写居住地址的详细信息</p>") 
					flag=false;
				}else{
					$(residenceInputs[2]).siblings("p").replaceWith("");
				}
			}
			
			return flag;
		}
		
		
		//检测家庭住址
		function checkFamily(){
			var family = $(".family");
			var familyInputs = family.find("input[type='text']");
			var flag = true;
			
			if($(familyInputs[0]).val() == ""){
				//家庭住址为空
				$(familyInputs[2]).siblings("p").replaceWith("");
				$(familyInputs[2]).siblings(".tipserror").replaceWith("");
				$(familyInputs[2]).after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择家庭住址省份</p>")
				flag=false;
			}else if($(familyInputs[1]).val() == ""){
				//家庭住址为空
				$(familyInputs[2]).siblings("p").replaceWith("");
				$(familyInputs[2]).siblings(".tipserror").replaceWith("");
				$(familyInputs[2]).after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择家庭住址城市</p>")
				flag=false;
			}else if($(familyInputs[2]).val() == ""){
				$(familyInputs[2]).siblings("p").replaceWith("");
				$(familyInputs[2]).siblings(".tipserror").replaceWith("");
				$(familyInputs[2]).after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写家庭住址详细地址</p>")
				flag=false;
			}else{
				$(familyInputs[2]).siblings("p").replaceWith("");
			}
			
			return flag;
		}
		
		//检测毕业年份
		function checkYear(){
			var flag = true;
			var year = $("input[name='graduateYearbox']"), span = year.parent(".selectBox").siblings("span");
			span.next("p").replaceWith("");
			if(year.val()==""){
				flag =false;
				span.after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择毕业年份</p>")
			}
			return flag;
		}
		
		//检测户籍
		function checkhousehold(){
			var flag =true;
			if($("#place_pro").val() == ""){
				//户籍为空
				$("#place_city").siblings("p").replaceWith("");
				$("#place_city").siblings(".tipserror").replaceWith("");
				$("#place_city").after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择户籍省份</p>")
				flag=false;
			}else if($("#place_city").val()==""){
				//户籍为空
				$("#place_city").siblings("p").replaceWith("");
				$("#place_city").siblings(".tipserror").replaceWith("");
				$("#place_city").after("<p class='terror' style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请选择户籍城市</p>")
				flag=false;
			}else{
				$("#place_city").siblings("p").replaceWith("");
			}
			return flag;
		}
		
		//检测联系人和家属信息
		function checkPhone1(){
			var flag=true;
			var required3_1 = $(".required3_1"), required3_2 = $(".required3_2");
			var r3_1input = required3_1.find("input[type='text']"), r3_2input = required3_2.find("input[type='text']");
			var r3_1_0 = $(r3_2input[0]).val().replace(/(\s*)/g,""), r3_1_1 = $(r3_2input[1]).val().replace(/(\s*)/g,""), r3_1_2 = $(r3_2input[2]).val().replace(/(\s*)/g,"");
			$(r3_2input[0]).val(r3_1_0);
			$(r3_2input[1]).val(r3_1_1);
			
			if(r3_1_0==""){
				$(r3_2input[2]).siblings("p").replaceWith("");
				$(r3_2input[2]).siblings(".tipserror").replaceWith("");
				$(r3_2input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写联系人姓名</p>") 
				flag=false;
			}else if(/(\s+)/.test(r3_1_0)){
				$(r3_2input[2]).siblings("p").replaceWith("");
				$(r3_2input[2]).siblings(".tipserror").replaceWith("");
				$(r3_2input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>联系人姓名不能包含空格符</p>") 
				flag=false;
			}else if(r3_1_1==""){
				$(r3_2input[2]).siblings("p").replaceWith("");
				$(r3_2input[2]).siblings(".tipserror").replaceWith("");
				$(r3_2input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写联系人关系</p>") 
				flag=false;
			}else if(/(\s+)/.test(r3_1_1)){
				$(r3_2input[2]).siblings("p").replaceWith("");
				$(r3_2input[2]).siblings(".tipserror").replaceWith("");
				$(r3_2input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>联系人关系不能包含空格符</p>") 
				flag=false;
			}else if(r3_1_2 ==""){
				$(r3_2input[2]).siblings("p").replaceWith("");
				$(r3_2input[2]).siblings(".tipserror").replaceWith("");
				$(r3_2input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写联系人手机号码</p>") 
				flag=false;
			}else if(!(/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/.test(r3_1_2.replace(/(\s*)/g,"")))){
				//console.log("here")
				$(r3_2input[2]).siblings("p").replaceWith("");
				$(r3_2input[2]).siblings(".tipserror").replaceWith("");
				$(r3_2input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写正确的联系人手机号码</p>") 
				flag=false;
			}else{
				$(r3_2input[2]).siblings("p").replaceWith("");
			}
			return flag;
		}
		
		function checkPhone2(){
			var flag=true;
			var required3_1 = $(".required3_1"), required3_2 = $(".required3_2");
			var r3_1input = required3_1.find("input[type='text']"), r3_2input = required3_2.find("input[type='text']");
			var r3_1_0 = $(r3_1input[0]).val().replace(/(\s*)/g,""), r3_1_1 =$(r3_1input[1]).val().replace(/(\s*)/g,""),r3_1_2 = $(r3_1input[2]).val().replace(/(\s*)/g,"");
			$(r3_1input[0]).val(r3_1_0);
			$(r3_1input[1]).val(r3_1_1);
	
			if(r3_1_0==""){
				$(r3_1input[2]).siblings("p").replaceWith("");
				$(r3_1input[2]).siblings(".tipserror").replaceWith("");
				$(r3_1input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写直属家属姓名</p>") 
				flag=false;
			}else if(/(\s+)/.test(r3_1_0)){
				$(r3_1input[2]).siblings("p").replaceWith("");
				$(r3_1input[2]).siblings(".tipserror").replaceWith("");
				$(r3_1input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>直属家属姓名不能包含空格符</p>") 
				flag=false;
			}else if(r3_1_1==""){
				$(r3_1input[2]).siblings("p").replaceWith("");
				$(r3_1input[2]).siblings(".tipserror").replaceWith("");
				$(r3_1input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写直属家属关系</p>") 
				flag=false;
			}else if(/(\s+)/.test(r3_1_1)){
				$(r3_1input[2]).siblings("p").replaceWith("");
				$(r3_1input[2]).siblings(".tipserror").replaceWith("");
				$(r3_1input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>直属家属关系不能包含空格符</p>") 
				flag=false;
			}else if(r3_1_2==""){
				$(r3_1input[2]).siblings("p").replaceWith("");
				$(r3_1input[2]).siblings(".tipserror").replaceWith("");
				$(r3_1input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写直属家属手机号码</p>") 
				flag=false;
			}else if(!(/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/.test(r3_1_2.replace(/(\s*)/g,"")))){
				//console.log("here")
				$(r3_1input[2]).siblings("p").replaceWith("");
				$(r3_1input[2]).siblings(".tipserror").replaceWith("");
				$(r3_1input[2]).after("<p style='color:#f00; margin:6px 0px 0px 6px;float: left;'>请填写正确的家属手机号码</p>") 
				flag=false;
			}else{
				$(r3_1input[2]).siblings("p").replaceWith("");
			}
			
			return flag;
		}
		
		
		/*验证表单*/
		setValidate();
		function setValidate(){
		loan_infoaction.validate({
			focusCleanup:true,
			rules : {
				'education' : {
					required : true,
					minlength : 1
				},
				'educationbox' : {
					required : true,
					minlength : 1
				},
				'graduateSchool' : {
					required : true,
					minlength : 1,
					maxlength:200
				},
				'graduateYear' : {
					required : true,
					minlength : 1,
					range:[1960,2020]
				},
				'residenceType' : {
					required : true,
					minlength : 1
				},
				'residenceTypebox' : {
					required : true,
					minlength : 1
				},
				'marriaged' : {
					required : true,
					minlength : 1
				},
				'hasChildren' : {
					required : true,
					minlength : 1
				}
			},
			messages : {
				'education' : {
					required : "最高学历不能为空",
					minlength : "最高学历不能为空"
				},
				'educationbox' : {
					required : "请选择最高学历",
					minlength : "请选择最高学历"
				},
				'graduateSchool' : {
					required : "毕业院校不能为空",
					minlength : "毕业院校不能为空",
					maxlength: "毕业院校的长度不能超过{0}个字符或汉字"
				},
				'graduateYear' : {
					required : "毕业年份不能为空",
					minlength :"毕业年份不能为空",
					range: "毕业年份信息不合法"
				},
				'residenceType' : {
					required : "居住类型不能为空",
					minlength : "居住类型不能为空"
				},
				'residenceTypebox' : {
					required : "请选择居住类型",
					minlength : "请选择居住类型"
				},
				'marriaged' : {
					required : "婚姻状态不能为空",
					minlength : "婚姻状态不能为空"
				},
				'hasChildren' : {
					required : "有无子女不能为空",
					minlength : "有无子女不能为空"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success : function(p){
				p.addClass("tipssucc").text("success");
				setTimeout(function(){p.removeClass("tipssucc").text("");},2000);
			}
		}); ///
		}
	});
})(jQuery);

/*两级select联动*/
function cityselect(obj){
	var curobj=obj,curindex=curobj.index(),tempstr="";
	var temp_citylen=city[curindex].length;
	curobj.addClass("addresssel").siblings().removeClass("addresssel");
	for(var i=0;i<temp_citylen;i++){
		if(i==0){
			tempstr+="<li class=\"addresssel\">"+city[curindex][i]+"</li>";
		}else{
			tempstr+="<li value=\"\">"+city[curindex][i]+"</li>"
		}
	}
	return 	tempstr;
}

/*初始化两级select*/
function cityinit(homepro_val,homecity_val,livepro_val,livecity_val){
		var pro_len=province.length;optionstr1="",optionstr2="",optionstr3="",optionstr4="";
		for(var i=0;i<pro_len;i++){
			/*city1*/
			if(homepro_val==""||homepro_val==null){
				//为空或为null或undefined情况
				if(i==0){
					optionstr1+="<li class=\"addresssel\">"+province[i]+"</li>";
					var homecity3_len=city[0].length;
					for(var j=0;j<homecity3_len;j++){
						if(j==0){
							optionstr2+="<li class=\"addresssel\">"+city[0][j]+"</li>";
						}else{
							optionstr2+="<li class=\"\">"+city[i][j]+"</li>";
						}
					}
				}else{
					optionstr1+="<li>"+province[i]+"</li>";
				}
			}else{
				if(homepro_val!=""||homepro_val!==null){
					if(homecity_val!=""||homepro_val!==null){
						//全都不为空
						if(homepro_val==province[i]){
							optionstr1+="<li class=\"addresssel\">"+province[i]+"</li>";
							var homecity1_len=city[i].length;
							for(var j=0;j<homecity1_len;j++){
								if(homecity_val==city[i][j]){
									optionstr2+="<li class=\"addresssel\">"+city[i][j]+"</li>";
								}else{
									optionstr2+="<li class=\"\">"+city[i][j]+"</li>";
								}
							}
						}else{
							optionstr1+="<li class=\"\">"+province[i]+"</li>";
						}
					}else{
						var homecity2_len=city[0].length;
						for(var j=0;j<homecity2_len;j++){
							if(j==0){
								optionstr2+="<li class=\"addresssel\">"+city[0][j]+"</li>";
							}else{
								optionstr2+="<li class=\"\">"+city[i][j]+"</li>";
							}
						}
					}
				}
			}
			/*city2*/
			if(livepro_val==""||livepro_val==null){
				//为空或为null或undefined情况
				if(i==0){
					optionstr3+="<li class=\"addresssel\">"+province[i]+"</li>";
					var livecity3_len=city[0].length;
					for(var j=0;j<livecity3_len;j++){
						if(j==0){
							optionstr4+="<li class=\"addresssel\">"+city[0][j]+"</li>";
						}else{
							optionstr4+="<li class=\"\">"+city[i][j]+"</li>";
						}
					}
				}else{
					optionstr3+="<li>"+province[i]+"</li>";
				}
			}else{
				if(livepro_val!=""||livepro_val!==null){
					if(livecity_val!=""||livepro_val!==null){
						//全都不为空
						if(livepro_val==province[i]){
							optionstr3+="<li class=\"addresssel\">"+province[i]+"</li>";
							var livecity1_len=city[i].length;
							for(var j=0;j<livecity1_len;j++){
								if(livecity_val==city[i][j]){
									optionstr4+="<li class=\"addresssel\">"+city[i][j]+"</li>";
								}else{
									optionstr4+="<li class=\"\">"+city[i][j]+"</li>";
								}
							}
						}else{
							optionstr3+="<li>"+province[i]+"</li>";
						}
					}else{
						var livecity2_len=city[0].length;
						for(var j=0;j<livecity2_len;j++){
							if(j==0){
								optionstr4+="<li class=\"addresssel\">"+city[0][j]+"</li>";
							}else{
								optionstr4+="<li class=\"\">"+city[i][j]+"</li>";
							}
						}
					}
				}
			}
		}
		return [optionstr1,optionstr2,optionstr3,optionstr4];
}

