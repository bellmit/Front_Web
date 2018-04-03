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
		$("#children_radio").find("li").each(function() {
            var curobj=$(this),curtext=curobj.text(),tartext=children.val();
			if(childmap[tartext]==curtext&&tartext!=""){
				curobj.addClass("radiosel");
				return false;
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
			var curobj=$(this),parid=curobj.parent().attr("id").split("_")[0];
			curobj.addClass("radiosel").siblings().removeClass("radiosel");
			if(parid=="marriage"){
				$("#"+parid).val(marrymap[curobj.text()]);
			}else if(parid=="children"){
				$("#"+parid).val(childmap[curobj.text()]);
			}
			
		});
		
		/*验证表单*/
		loan_infoaction.validate({
			rules : {
				/*
				to do
				*/
			},
			messages : {
				/*
				to do
				*/
			},
			errorElement:"p",
			errorClass:"tipserror",
			success : function(p){
				p.addClass("tipssucc").text("success");
				setTimeout(function(){p.removeClass("tipssucc").text("");},2000);
			}
		});
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

