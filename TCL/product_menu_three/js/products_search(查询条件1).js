/*数组存放查询条件(默认为0)：0:品牌,1:关键字,2:系列条件,3:车型条件*/
var proconsel_list=[0,0,0,0];
$(function(){
	var currentPage = $("#currentPage").val();
	var contextpath = $("#contextPath").val();
	/*页面元素引用和相关变量定义*/
	var products_brand=$("#products_brand"),products_searchtitle=$("#products_searchtitle"),products_searchdetail=$("#products_searchdetail"),products_brandlist=$("#products_brandlist"),products_typelist=$("#products_typelist"),products_names=$("#products_names"),products_searchbtn=$("#products_searchbtn"),products_resultshow=$("#products_resultshow"),products_brandinfo=$("#products_brandinfo"),product_clears=$("#product_clears");
	/*初始化*/
	var init_index = $('#init_index').val();//判断是否通过头部点击
	if(init_index==''){
		init_index=0;
	}
	var  init_brand_index = $("#init_brand_index").val();//品牌
	if(init_brand_index==''){
		init_brand_index=-999;
	}
	var init_brandlist=products_brandlist.find("li:eq("+init_index+")").addClass("pro_brandlistsel").attr("id");
	handle_GetDevType(contextpath,init_brandlist,products_typelist);
	if(init_index!=''){
		proconsel_list.splice(2,1,init_brandlist);
	}
	handle_AjaxReq(proconsel_list,products_resultshow,contextpath,currentPage);
	//proconsel_list.splice(2,1,init_brandlist[1]);
	/*初始化品牌选项卡并绑定点击事件*/
	products_brand.find("li").click(function(){
		var cur_brandobj=$(this),cur_brandattr=cur_brandobj.attr("id");
		cur_brandobj.addClass("pros_brandsel").siblings().removeClass("pros_brandsel");
		products_brandinfo.css({"display":"block"});
		proconsel_list.splice(0,1,cur_brandattr);
		if(products_names.val()!=""){
			proconsel_list.splice(1,1,products_names.val());
		}else{
			proconsel_list.splice(1,1,"");
		}
		$.ajax({
			type:"post",
			url:contextpath+"/product/brand",
			data:"brandid="+cur_brandattr,
			dataType:"json",
			success:function(data){
				var intro="暂无",idea="暂无";
				if(data.webCarBrand.brandintro!=null){
					intro = data.webCarBrand.brandintro;
				}
				if(data.webCarBrand.brandidea!=null){
					idea =data.webCarBrand.brandidea; 
				}
				var brand_typestr="<table><tr><td width='35%'><img class='products_brandimg' alt='' src='"+data.imgpath+""+data.webCarBrand.brandimg+"'/></td>" +
						"<td width='65%'><h3>品牌介绍：</h3><p>"+intro+"</p><h3>品牌理念：</h3><p>"+idea+"</p></td></tr></table>";
				products_brandinfo.html(brand_typestr);
			}
		});
		handle_AjaxReq(proconsel_list,products_resultshow,contextpath,currentPage);
	});
	products_brand.find("li:eq("+init_brand_index+")").click();//主要用于头部点击品牌

	/*品牌车初始化并绑定点击事件*/
	products_brandlist.find("li").click(function(){
		var pblist_obj=$(this),pblist_attr=pblist_obj.attr("id");
		var pblist_str="";
		pblist_obj.addClass("pro_brandlistsel").siblings().removeClass("pro_brandlistsel");
		if(products_names.val()!=""){
			proconsel_list.splice(1,1,products_names.val());
		}else{
			proconsel_list.splice(1,1,"");
		}
		proconsel_list.splice(2,2,pblist_attr,"");
		handle_GetDevType(contextpath,pblist_attr,products_typelist);
		handle_AjaxReq(proconsel_list,products_resultshow,contextpath,currentPage);
	});
	
	/*车型初始化绑定点击事件*/
	products_typelist.find("li").live("click",function(){
		var ptlist_obj=$(this),ptlist_attr=ptlist_obj.attr("id");
		$(this).addClass("pro_typelistsel").siblings().removeClass("pro_typelistsel");
		if(products_names.val()!=""){
			proconsel_list.splice(1,1,products_names.val());
		}else{
			proconsel_list.splice(1,1,"");
		};
		proconsel_list.splice(3,1,ptlist_attr);
		handle_AjaxReq(proconsel_list,products_resultshow,contextpath,currentPage);
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
		if(pssearch_text!=""){
			proconsel_list.splice(1,1,pssearch_text);
		}else{
			proconsel_list.splice(1,1,"");
		};
		handle_AjaxReq(proconsel_list,products_resultshow,contextpath,currentPage);
	});

	/*清空查询条件(查询所有条件)*/
	product_clears.click(function(){
		var pblen=products_brand.find("li").size(),pbllen=products_brandlist.find("li").size(),ptllen=products_typelist.find("li").size();
		products_names.val("");
		products_brandinfo.css({"display":"none"});
		proconsel_list=[0,0,0,0];
		for(var bi=0;bi<pblen;bi++){
			var temp_pbobj=products_brand.find("li:eq("+bi+")");
			if(temp_pbobj.hasClass("pros_brandsel")){
				temp_pbobj.removeClass("pros_brandsel");
				break;
			}
		}
		for(var bj=0;bj<pbllen;bj++){
			var temp_pblobj=products_brandlist.find("li:eq("+bj+")");
			if(temp_pblobj.hasClass("pro_brandlistsel")){
				temp_pblobj.removeClass("pro_brandlistsel");
				break;
			}
		}
		for(var bk=0;bk<ptllen;bk++){
			var temp_pklobj=products_typelist.find("li:eq("+bk+")");
			if(temp_pklobj.hasClass("pro_typelistsel")){
				temp_pklobj.removeClass("pro_typelistsel");
				break;
			}
		}
		handle_GetDevType(contextpath,init_brandlist[1],products_typelist);
		handle_AjaxReq(proconsel_list,products_resultshow,contextpath);
	});

})


/*
车型数据请求和数据处理展现
参数说明:请求地址,请求数据,数据展现容器
*/
function handle_GetDevType(o_url,o_data,o_typelistwrap){
	$.ajax({
		type:"post",
		url:o_url+"/product/search",
		data:"devtype="+o_data+"&flag=1",
		dataType:"json",
		success:function(data){
			var pro_typestr="";
			if(data.listProduct.length>0){
				$.each(data.listProduct,function(index,item){
					pro_typestr+="<li id=\""+item.seqid+"\">"+item.devname+"</li>"
				});
				o_typelistwrap.html(pro_typestr);
			}else{
				o_typelistwrap.html("<li>暂无相应车型</li>");
			}
		}
	});
}


/*
数据请求和数据处理展现
参数说明:放置查询条件的数组,放置结果集容器,请求地址
*/
function handle_AjaxReq(){
	var o_arrs=arguments[0],o_result=arguments[1],o_datas=arguments[2],o_currentpage=arguments[3];
	var pro_halen=o_arrs.length;
	var pro_zero=0,pro_all=0;
	var pro_param="";
	for(var i=0;i<pro_halen;i++){
		if(o_arrs[i]==0)++pro_zero;
		if(o_arrs[i]!=0)++pro_all;
	}
	if(pro_zero==pro_halen){
		/*查询全部*/
		pro_param="";
	}else if(pro_all==pro_halen){
		/*全部条件*/
		pro_param="&series="+o_arrs[0]+"&devname="+o_arrs[1]+"&devtype="+o_arrs[2]+"&seqid="+o_arrs[3];
	}else{
		/*模糊查询*/
		var pro_temparr=[];
		for(var pha=0;pha<pro_halen;pha++){
			if(o_arrs[pha]!=0&&o_arrs[pha]!="")
			pro_temparr.push(pha+"&_"+o_arrs[pha]);
		}
		var pro_sclen=pro_temparr.length,pro_scmap={0:"series",1:"devname",2:"devtype",3:"seqid"};
		if(pro_sclen==1){
			var pro_scarr=pro_temparr[0].split("&_");
			if(typeof pro_scmap[pro_scarr[0]]!="undefined")
			pro_param=pro_scmap[pro_scarr[0]]+"="+pro_scarr[1];
		}else{
			for(var ii=0;ii<pro_sclen;ii++){
				var pro_scarrs=pro_temparr[ii].split("&_");
				if(ii==0){
					if(typeof pro_scmap[pro_scarrs[0]]!="undefined")
					pro_param=pro_scmap[pro_scarrs[0]]+"="+pro_scarrs[1];
				}else{
					if(typeof pro_scmap[pro_scarrs[0]]!="undefined")
					pro_param+="&"+pro_scmap[pro_scarrs[0]]+"="+pro_scarrs[1];
				}
			}
		}
	}
	if(pro_param==''){
		pro_param +="currentPage="+o_currentpage+"&pk="+new Date().getTime();
	}else{
		pro_param +="&currentPage="+o_currentpage+"&pk="+new Date().getTime();
	}
	/*发送请求*/
	$.ajax({
		type:"post",
		url:o_datas+"/product/search",
		data:pro_param,
		dataType:"json",
		success:function(data){
			$("#totalResults").val(data.pageBean.totalResults);
			$('#currentPage').val(data.pageBean.currentPage)
			$('#pageSize').val(data.pageBean.pageSize);
			var pro_resultstr="";
			if(data.listProduct.length>0){
				$.each(data.listProduct,function(index,item){
						pro_resultstr+="<li><a class=\"pro_resultimg\" href=\""+data.url+""+item.seqid+".html\"><img alt=\"\" src=\""+data.imgpath+""+item.devname+"\"/></a><a class=\"pro_resulttips\" href=\""+data.url+""+item.seqid+".html\">"+item.devname+"</a></li>"
					});
				o_result.html("<ul>"+pro_resultstr+"</ul>");
			}else{
				o_result.html("<p style=\"text-align:center\">没有产品</p>");
			}
			
			initPagination($('#totalResults').val(),($('#currentPage').val()-1));
		}
	});
}

function pageselectCallback(page_index,jq){
	alert(proconsel_list);
	$('#currentPage').val(page_index+1);
    var currentPage = page_index+1;
    handle_AjaxReq(proconsel_list,$('#products_resultshow'),$("#contextPath").val(),currentPage);
    return false;
}
/** 
 * Initialisation function for pagination
 */
function initPagination(num_entries,current_page) {
    $("#pagination").pagination(num_entries, {
        callback: pageselectCallback,
        items_per_page:$('#pageSize').val(),
        current_page:current_page
    });
 }
