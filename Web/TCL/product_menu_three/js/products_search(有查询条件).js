$(function(){
	/*页面元素引用和相关变量定义*/
	var products_brand=$("#products_brand"),products_searchtitle=$("#products_searchtitle"),products_searchdetail=$("#products_searchdetail"),products_brandlist=$("#products_brandlist"),products_typelist=$("#products_typelist"),products_condition=$("#products_condition"),products_names=$("#products_names"),products_searchbtn=$("#products_searchbtn"),products_resultshow=$("#products_resultshow");
	/*数组存放查询条件(默认为0)：1-2:关键字,3-4:系列条件,5-6:车型条件*/
	var proconsel_list=[0,0,0,0,0,0];
	/*初始化品牌选项卡并绑定点击事件*/
	/*products_brand.find("li").click(function(){
		$(this).addClass("pros_brandsel").siblings().removeClass("pros_brandsel");
	});*/
	
	/*品牌车初始化并绑定点击事件*/
	products_brandlist.find("li").click(function(){
		var pblist_obj=$(this),pblist_text=pblist_obj.text(),pblist_attr=pblist_obj.attr("id").split("_")[1],pbsearch_text=products_names.val();
		var pblist_str="";
		pblist_obj.addClass("pro_brandlistsel").siblings().removeClass("pro_brandlistsel");
		if(pbsearch_text!="")proconsel_list.splice(0,2,pbsearch_text,"keyword");
		proconsel_list.splice(2,2,pblist_text,pblist_attr);
		$.ajax({
			type:"post",
			url:"请输入请求地址！",
			data:"product_type="+pblist_attr,
			dataType:"json",
			success:function(data){
				var pro_typestr="";
				var pro_typeobj= eval("(" + data.rs + ")");
				if (pro_typeobj.success){
					for(var ptj=0;ptj<pro_typeobj.length;ptj++){
						pro_typestr+="<li id=\"sqeid_"+pro_typeobj[ptj]+"\">"+pro_typeobj[ptj]+"</li>"
					}
					products_typelist.html(pro_typestr);
				}
			}
		});
		handle_Condition(products_condition,proconsel_list,pbsearch_text,products_resultshow);
	});
	
	/*车型初始化绑定点击事件*/
	products_typelist.find("li").live("click",function(){
		var ptlist_obj=$(this),ptlist_text=ptlist_obj.text(),ptlist_attr=ptlist_obj.attr("id").split("_")[1],ptsearch_text=products_names.val();
		$(this).addClass("pro_typelistsel").siblings().removeClass("pro_typelistsel");
		if(ptsearch_text!="")proconsel_list.splice(0,2,ptsearch_text,"keyword");
		proconsel_list.splice(4,2,ptlist_text,ptlist_attr);
		handle_Condition(products_condition,proconsel_list,ptsearch_text,products_resultshow);
	});
	/*绑定查询面板显示隐藏切换按钮事件*/
	var pros_titleflag=1;
	products_searchtitle.click(function(){
		var cur_titleobj=$(this);
		pros_titleflag=pros_titleflag==1?0:1;
		if(pros_titleflag==0){
			products_searchdetail.hide();
			cur_titleobj.addClass("pro_stitlesel");
		}else{
			products_searchdetail.show();
			cur_titleobj.removeClass("pro_stitlesel");
		}
	});
	/*绑定关键字查询事件*/
	products_searchbtn.click(function(){
		var pssearch_text=products_names.val();
		if(pssearch_text!="")proconsel_list.splice(0,2,pssearch_text,"keyword");
		handle_Condition(products_condition,proconsel_list,pssearch_text,products_resultshow);
	});
	
	/*绑定已选择条件取消事件*/
	products_condition.find("a").live("click",function(e){
		e.preventDefault();
		var pc_close=$(this),pc_type=pc_close.parent().find("strong").text();
		if(pc_type.indexOf("系列")!=-1){
			/*点击的对象是系列的情况*/
			proconsel_list.splice(2,2,0,0);
			var pllen=products_brandlist.find("li").size();
			for(var pl=0;pl<pllen;pl++){
				var cur_pblist=products_brandlist.find("li:eq("+pl+")");
				if(cur_pblist.hasClass("pro_brandlistsel")){
					cur_pblist.removeClass("pro_brandlistsel");
					break;
				}
			}
			handle_Condition(products_condition,proconsel_list,products_names.val(),products_resultshow);
		}else if(pc_type.indexOf("车型")!=-1){
			/*点击的对象是车型的情况*/
			proconsel_list.splice(4,2,0,0);
			var ptlen=products_typelist.find("li").size()
			for(var pt=0;pt<ptlen;pt++){
				var cur_ptlist=products_typelist.find("li:eq("+pt+")");
				if(cur_ptlist.hasClass("pro_typelistsel")){
					cur_ptlist.removeClass("pro_typelistsel");
					break;
				}
			}
			handle_Condition(products_condition,proconsel_list,products_names.val(),products_resultshow);
		}	
	});
	
	
	
	
	
	
})






/*
填充已选查询条件并作相关数据请求操作
参数说明：放置查询条件的容器,放置查询条件的数组,放置关键字查询的对象,放置结果集容器
*/
function handle_Condition(o_obj,o_arrs,o_search,o_result){
	var pro_hc_obj=o_obj,pro_hc_arr=o_arrs,pro_hc_search=o_search,pro_hc_result=o_result;
	if(pro_hc_search==""&&pro_hc_arr[2]==0&&pro_hc_arr[4]==0){
		/*查询所有*/
		pro_hc_obj.html("<p>查询所有产品</p>");
		handle_AjaxReq(0,0,0,pro_hc_result);
	}else if(pro_hc_search==""&&(pro_hc_arr[2]!=0||pro_hc_arr[4]!=0)){
		/*没有关键字的情况*/
		if(pro_hc_arr[2]!=0&&pro_hc_arr[4]==0){
			pro_hc_obj.html("<span><strong>系列：</strong>"+pro_hc_arr[2]+"<a title=\"\" href=\"\">x</a></span>");
			handle_AjaxReq(0,pro_hc_arr[3],0,pro_hc_result);
		}else if(pro_hc_arr[2]==0&&pro_hc_arr[4]!=0){
			pro_hc_obj.html("<span><strong>车型：</strong>"+pro_hc_arr[4]+"<a title=\"\" href=\"\">x</a></span>");
			handle_AjaxReq(0,0,pro_hc_arr[5],pro_hc_result);
		}else if(pro_hc_arr[2]!=0&&pro_hc_arr[4]!=0){
			pro_hc_obj.html("<span><strong>系列：</strong>"+pro_hc_arr[2]+"<a title=\"\" href=\"\">x</a></span><span><strong>车型：</strong>"+pro_hc_arr[4]+"<a title=\"\" href=\"\">x</a></span>");
			handle_AjaxReq(0,pro_hc_arr[3],pro_hc_arr[5],pro_hc_result);
		}else{
			pro_hc_obj.html("<p>请选择查询条件</p>");
		}
	}else if(pro_hc_search!=""){
		/*有关键字的情况*/
		if(pro_hc_arr[2]!=0&&pro_hc_arr[4]==0){
			pro_hc_obj.html("<span><strong>系列：</strong>"+pro_hc_arr[2]+"<a title=\"\" href=\"\">x</a></span>");
			handle_AjaxReq(pro_hc_search,pro_hc_arr[3],0,pro_hc_result);
		}else if(pro_hc_arr[2]==0&&pro_hc_arr[4]!=0){
			pro_hc_obj.html("<span><strong>车型：</strong>"+pro_hc_arr[4]+"<a title=\"\" href=\"\">x</a></span>");
			handle_AjaxReq(pro_hc_search,0,pro_hc_arr[5],pro_hc_result);
		}else if(pro_hc_arr[2]!=0&&pro_hc_arr[4]!=0){
			pro_hc_obj.html("<span><strong>系列：</strong>"+pro_hc_arr[2]+"<a title=\"\" href=\"\">x</a></span><span><strong>车型：</strong>"+pro_hc_arr[4]+"<a title=\"\" href=\"\">x</a></span>");
			handle_AjaxReq(pro_hc_search,pro_hc_arr[3],pro_hc_arr[5],pro_hc_result);
		}else{
			pro_hc_obj.html("<p>关键字："+pro_hc_search+"</p>");
			handle_AjaxReq(pro_hc_search,0,0,pro_hc_result);
		}
	}
}

/*
数据请求和数据处理展现
参数说明:参数是根据handle_Condition()方法传入参数情况决定
*/
function handle_AjaxReq(){
	var param_keyword=arguments[0],param_brand=arguments[1],param_type=arguments[2],param_result=arguments[3];
	var pro_url="请填入请求地址！";
	var pro_param="";
	if(param_keyword==0&&param_brand==0&&param_type==0){
		/*查询所有*/
		pro_param="keyword=0&product_type=0&sqeid=0";
	}else if(param_keyword==0&&(param_brand!=0||param_type!=0)){
		/*没有关键字的情况*/
		if(param_brand!=0&&param_type==0){
			pro_param="keyword=0&product_type="+param_brand+"&sqeid=0";
		}else if(param_brand==0&&param_type!=0){
			pro_param="keyword=0&product_type=0&sqeid="+param_type;
		}else if(param_brand!=0&&param_type!=0){
			pro_param="keyword=0&product_type="+param_brand+"&sqeid="+param_type;
		}
	}else if(param_keyword!=0){
		/*有关键字的情况*/
		if(param_brand!=0&&param_type==0){
			pro_param="keyword="+param_keyword+"&product_type="+param_brand+"&sqeid=0";
		}else if(param_brand==0&&param_type!=0){
			pro_param="keyword="+param_keyword+"&product_type=0&sqeid="+param_type;
		}else if(param_brand!=0&&param_type!=0){
			pro_param="keyword="+param_keyword+"&product_type="+param_brand+"&sqeid="+param_type;
		}else{
			pro_param="keyword="+param_keyword+"&product_type=0&sqeid=0";
		}
	}
	/*发送请求*/
	$.ajax({
		type:"post",
		url:pro_url,
		data:pro_param,
		dataType:"json",
		success:function(data){
			var pro_resultstr="";
			var pro_result = eval("(" + data.rs + ")");
			if (pro_result.success){
				for(var oi=0;oi<pro_result.length;oi++){
					pro_resultstr+="<li><a class=\"pro_resultimg\" href=\""+pro_result[oi]+"\"><img alt=\"\" src=\""+pro_result[oi]+"\"/></a><a class=\"pro_resulttips\" href=\""+pro_result[oi]+"\">"+pro_result[oi]+"</a></li>"
				}
				param_result.html("<ul>"+pro_resultstr+"</ul>");
			}else{
				param_result.html("<p>没有产品</p>");
			}	
		}
	});
}


















