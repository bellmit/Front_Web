$(function(){
	/*变量定义(注释按变量定义顺序说明)*/
	/*存放已选群组信息(默认为空)：参数为:群组名称,已选择群组,备注信息*/
	var user_addarr=["","",""];
	/*窗口关闭按钮,群组选择选中项,群组显示控制按钮,群组显示下拉框,显示群组成员控制按钮,群组成员列表,添加群组成员,删除群组成员,已选择的群组成员,备注说明,确认按钮,取消按钮,消息提示位置*/
	var popupadd_close=$("#popupadd_close"),popupadd_groupshow=$("#popupadd_groupshow"),popupadd_groupicon=$("#popupadd_groupicon"),popupadd_group=$("#popupadd_group"),popupadd_alreadybtn=$("#popupadd_alreadybtn"),popupadd_already=$("#popupadd_already"),popupadd_add=$("#popupadd_add"),popupadd_remove=$("#popupadd_remove"),popupadd_select=$("#popupadd_select"),popupadd_remark=$("#popupadd_remark"),popupadd_sure=$("#popupadd_sure"),popupadd_cance=$("#popupadd_cance"),popupadd_tips=$("#popupadd_tips");	
	/*绑定关闭窗口事件*/
	popupadd_close.click(function(){
		var pa_close=window.confirm("是否关闭窗口!");
		if(pa_close)window.close();
	});
	/*绑定群组显示隐藏切换事件*/
	popupadd_groupicon.click(function(){
		$(this).toggleClass("popupadd_groupiconsel");
		popupadd_group.slideToggle(200);
	})
	/*绑定群组选择事件*/
	popupadd_group.find("li").click(function(e){
		e.preventDefault();
		var pa_groupobj=$(this),pa_gkey=pa_groupobj.attr("id").split("_")[1],pa_gtext=pa_groupobj.find("a").text();
		user_addarr.splice(0,1,pa_gkey);
		popupadd_groupshow.html(pa_gtext);
		popupadd_groupicon.removeClass("popupadd_groupiconsel");
		popupadd_group.slideUp(200);
		/*发送请求*/
		$.ajax({
			type:"post",
			url:"请输入请求获取群组成员地址",
			data:"user_group="+pa_gkey,
			dataType:"json",
			success:function(data){
				var pa_gselstr="";
				if(data.length>0){
					$.each(data.listGroup,function(index,item){
						pa_gselstr+="<li id=\"pa_"+item.groupid+"\"><a href=\"#\" title=\"\">"+item.groupvalue+"</a></li>"
					});
					popupadd_already.html(pa_gselstr);
				}else{
					popupadd_already.html("<li id=\"pa_-1\"><a href=\"#\" title=\"\">还没有成员</a></li>");
				}
			}
		});
	});
	/*绑定群组成员显示隐藏切换事件*/
	popupadd_alreadybtn.click(function(){
		$(this).find("span").toggleClass("paasel");
		popupadd_already.slideToggle(200);
	});
	/*绑定群组成员选中事件(单击)*/
	popupadd_already.find("li").live("click",function(e){
		e.preventDefault();
		var pa_alreadyobj=$(this),pa_aclass=pa_alreadyobj.attr("class"),pa_aid=pa_alreadyobj.attr("id").split("_")[1];
		if(typeof pa_aclass!="undefined"&&pa_aclass!=""){
			if(pa_aid!=-1)
			pa_alreadyobj.removeClass("popupadd_alreadysel");
		}else{
			if(pa_aid!=-1)
			pa_alreadyobj.addClass("popupadd_alreadysel");
		}
	});
	/*绑定群组成员添加事件*/
	popupadd_add.live("click",function(){
		var pa_aselarr=[],pa_aselstr="",pa_atararr=[],pa_atarstr=popupadd_select.html();
		popupadd_select.find("li").each(function(){
            var pa_atarkey=$(this).attr("id").split("_")[1];
			pa_atararr.push(pa_atarkey);
        });
		var pa_atarlen=pa_atararr.length;
		popupadd_already.find("li").each(function(){
            var pa_aselobj=$(this),pa_aselclass=pa_aselobj.attr("class");
			if(typeof pa_aselclass!="undefined"&&pa_aselclass!=""){
				var pa_atemparr=pa_aselobj.attr("id").split("_");
				var pa_atempvalue=pa_aselobj.find("a").text();
				if(pa_atarlen>0){
					for(var i=0,j=0;i<pa_atarlen;i++,j++){
						if(pa_atararr[i]==pa_atemparr[1]){
							break;
						}else{
							if(j==pa_atarlen-1){
								pa_aselarr.push(pa_atemparr[1]);
								pa_aselstr+="<li id=\"ps_"+pa_atemparr[1]+"\"><a href=\"#\" title=\"\">"+pa_atempvalue+"</a></li>";
							}
						}
					}
				}else{
					pa_aselarr.push(pa_atemparr[1]);
					pa_aselstr+="<li id=\"ps_"+pa_atemparr[1]+"\"><a href=\"#\" title=\"\">"+pa_atempvalue+"</a></li>";
				}
			}
        });
		if(pa_aselarr.length>=1){
			user_addarr.splice(1,1,pa_aselarr+","+pa_atararr);
			popupadd_select.html(pa_aselstr+pa_atarstr);
		}
	});
	/*绑定群组已选中成员选中事件*/
	popupadd_select.find("li").live("click",function(e){
		e.preventDefault();
		var pa_selectobj=$(this),pa_sclass=pa_selectobj.attr("class");
		if(typeof pa_sclass!="undefined"&&pa_sclass!=""){
			pa_selectobj.removeClass("popupadd_selectsel");
		}else{
			pa_selectobj.addClass("popupadd_selectsel");
		}
	});
	/*绑定群组已选中成员删除事件*/
	popupadd_remove.live("click",function(){
		var pa_sselarr=[],pa_sselstr="";
		popupadd_select.find("li").each(function(){
            var pa_sselobj=$(this),pa_sselclass=pa_sselobj.attr("class");
			if(typeof pa_sselclass=="undefined"||pa_sselclass==""){
				var pa_stemparr=pa_sselobj.attr("id").split("_");
				var pa_stempvalue=pa_sselobj.find("a").text();
				pa_sselarr.push(pa_stemparr[1]);
				pa_sselstr+="<li id=\"ps_"+pa_stemparr[1]+"\"><a href=\"#\" title=\"\">"+pa_stempvalue+"</a></li>";
			}
        });
		if(pa_sselarr.length>=1){
			user_addarr.splice(1,1,pa_sselarr);
			popupadd_select.html(pa_sselstr);
		}else{
			user_addarr.splice(1,1,"");
			popupadd_select.html("");
		}
	});
	/*绑定群组确定事件*/
	popupadd_sure.click(function(){
		user_addarr.splice(2,1,popupadd_remark.val());
		var user_group=user_addarr[0],user_select=user_addarr[1],user_remark=user_addarr[2];
		/*发送请求*/
		$.ajax({
			type:"post",
			url:"请输入提交请求地址",
			data:"user_group="+user_group+"&user_select="+user_select+"&user_remark="+user_remark,
			dataType:"json",
			success:function(data){
				if(data.length>0){
					popupadd_tips.html("修改成功");
					setTimeout(function(){popupadd_tips.html("")},3000);
					/*
					 to do
					*/
				}else{
					popupadd_tips.html("修改失败");
					setTimeout(function(){popupadd_tips.html("")},3000);
					/*
					 to do
					*/
				}
			}
		});
	});
	
	
});