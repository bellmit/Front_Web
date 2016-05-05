$(function(){
	/*定义查询条件数组,分别对应查询条件为:"文件名","文件名称包含信息","查询范围","搜索选项--类型","搜索选项--大小","搜索选项--日期","搜索选项--子文件",查询条件默认为空*/
	var search_reqarr=["","","","","","",""];
	/*页面元素定义*/
	var search_sidebox=$("#search_sidebox"),search_sidenav=$("#search_sidenav"),sidenav_control=$("#sidenav_control"),search_filename=$("#search_filename"),search_fileinfo=$("#search_fileinfo"),search_area=$("#search_area"),sa_switch=$("#sa_switch"),search_select=$("#search_select"),search_action=$("#search_action"),search_condition=$("#search_condition"),search_option=$("#search_option"),search_type=$("#search_type"),search_size=$("#search_size"),search_date=$("#search_date"),search_subfile=$("#search_subfile"),search_operate=$("#search_operate"),search_result=$("#search_result");
	/*常量*/
	var condition_str="&gt;&gt;";
	var result_layout="<colgroup><col class=\"sr_cg1\"/><col class=\"sr_cg2\"/><col class=\"sr_cg3\"/><col class=\"sr_cg4\"/><col class=\"sr_cg5\"/><col class=\"sr_cg6\"/></colgroup>";
	var result_header="<tr><th>名称</th><th>大小</th><th>类型</th><th>时间</th><th>创建者</th><th>有无子文件</th></tr>";
	
	/*---初始化---*/
	/*初始化检索范围为第一个*/
	var def_areastr=search_select.find("li:first").text();
	search_area.val(def_areastr);
	search_reqarr.splice(2,1,def_areastr);
	
	/*导航布局面板显示隐藏切换*/
	sidenav_control.click(function(){
		search_sidebox.toggle(300);
		$(this).toggleClass("search_controlsel");
	});
	
	/*搜索范围面板显示隐藏切换*/
	sa_switch.click(function(){
		$(this).toggleClass("sa_switchsel");
		search_select.slideToggle(100);
	});
	
	/*搜索范围列表绑定点击事件*/
	search_select.find("li").click(function(){
		var sselect_obj=$(this);
		search_area.val(sselect_obj.text());
		sselect_obj.parent().slideUp(100);
	});
	
	/*搜索条件面板显示隐藏切换*/
	search_condition.click(function(){
		condition_str=condition_str=="&gt;&gt;"?"&lt;&lt;":"&gt;&gt;";
		$(this).find("p").html(condition_str);
		search_option.toggle(200);
	});
	
	/*表格列表样式*/
	search_result.find("tr:even").css({"background":"#eaf4f8"}).end().find("tr").hover(function(){
		$(this).css({"background":"#f6f6f6"});
	},function(){
		var m_outobj=$(this),m_outindex=m_outobj.index();
		m_outindex%2==0?m_outobj.css({"background":"#eaf4f8"}):m_outobj.css({"background":"#fff"});
	});
	
	/*禁用右键菜单*/
	document.oncontextmenu=function(){return false;}
	/*模拟右键菜单*/
	/*绑定点击事件*/
	search_result.find("a").live("mousedown",function(e){
		e.preventDefault();
		if(e.button!=2)return false;
		var menuobj=$(this),download_role=$(this).attr("id");
		var tempx=e.pageX-$(document).scrollLeft(),tempy=e.pageY-$(document).scrollTop();
		searchMenuShow([tempx,tempy],download_role);
	});
	/*绑定菜单点击隐藏事件,同时绑定功能面板*/
	$("#files_open,#files_cut,#files_paste,#files_remove,#files_rename,#files_info").live("click",function(e){
		e.preventDefault();
		var submenuobj=$(this),submenuid=submenuobj.attr("id"),user_role=submenuobj.parent().eq(0).attr("id");
		switch(submenuid){
			case "files_open":
				break;
			case "files_cut":
				break;
			case "files_paste":
				break;
			case "files_remove":
				break;
			case "files_rename":
				break;
			case "files_info":
				break;
		}
		$.unblockUI();
	});
	
	/*执行搜索查询事件*/
	search_action.click(function(){
		/*获取参数*/
		var sfn_value=search_filename.val(),sfi_value=search_fileinfo.val(),sa_value=search_area.val();
		var stype=search_type.attr("checked"),ssize=search_size.attr("checked"),sdate=search_date.attr("checked"),ssubfile=search_subfile.attr("checked");
		sfn_value!=""?search_reqarr.splice(0,1,sfn_value):search_reqarr.splice(0,1,"");
		sfi_value!=""?search_reqarr.splice(1,1,sfi_value):search_reqarr.splice(1,1,"");
		sa_value!=""?search_reqarr.splice(2,1,sa_value):search_reqarr.splice(2,1,"");
		stype=="checked"?search_reqarr.splice(3,1,"类型"):search_reqarr.splice(3,1,"");
		ssize=="checked"?search_reqarr.splice(4,1,"大小"):search_reqarr.splice(4,1,"");
		sdate=="checked"?search_reqarr.splice(5,1,"日期"):search_reqarr.splice(5,1,"");
		ssubfile=="checked"?search_reqarr.splice(6,1,"子文件夹"):search_reqarr.splice(6,1,"");
		/*拼接参数,获取数据集*/
		var isparams=handleParms(search_reqarr);
		if(isparams[0]==-1){
			/*无查询条件*/
			popup_alert("请输入搜索条件","undefined","no","have");
			return;
		}else if(isparams[0]==1){
			/*全查询*/
			handleReq(1,isparams[1],[search_result,result_layout,result_header]);
		}else if(isparams[0]==0){
			/*模糊查询*/
			handleReq(0,isparams[1],[search_result,result_layout,result_header]);
		}
	});
});



/*拼接参数:参数说明--传入查询条件数组*/
function handleParms(arrs1){
	var condition_obj={0:"filename",1:"fileinfo",2:"sarea",3:"stype",4:"ssize",5:"sdate",6:"ssubfile"}
	var reqarr=arrs1,reqarr_len=reqarr.length;
	var tempi=0,tempj=0,temparr=[];
	for(var i=0;i<reqarr_len;i++){
		if(reqarr[i]==""){++tempi;}
		if(reqarr[i]!=""){
			temparr.push([condition_obj[i],reqarr[i]]);
			++tempj;
		}
	}
	if(tempi==reqarr_len){
		/*无查询条件*/
		return [-1];
	}else if(tempj==reqarr_len){
		/*全查询*/
		return [1,reqarr];
	}else{
		/*模糊查询*/
		return [0,temparr];
	}
}


/*获取数据并展现数据:参数说明--查询类型,处理后的查询条件数组,数据展现容器(容器,布局常量,头部常量)*/
function handleReq(arrs1,arrs2,arrs3){
	var req_type=arrs1,req_params="",req_condition=arrs2,req_dates=arrs3;
	var req_wrap=req_dates[0],req_layout=req_dates[1],req_header=req_dates[2],wrap_str="";
	if(req_type==1){
		/*全查询*/
		req_params="filename="+req_condition[0]+"&fileinfo="+req_condition[1]+"&sarea="+req_condition[2]+"&stype="+req_condition[3]+"&ssize="+req_condition[4]+"&sdate="+req_condition[5]+"&ssubfile="+req_condition[6];	
	}else if(req_type==0){
		/*模糊查询*/
		var temp_paramlen=req_condition.length;
		if(temp_paramlen==1){
			req_params=req_condition[0][0]+"="+req_condition[0][1];
		}else if(temp_paramlen!=1){
			for(var j=0;j<temp_paramlen;j++){
				j==0?req_params=req_condition[0][0]+"="+req_condition[0][1]:req_params+="&"+req_condition[j][0]+"="+req_condition[j][1];
			}
		}
	}
	/*
	具体业务处理
	$.ajax({
		url:"请输入请求地址",
		data:req_params,
		dataType:"json",
		type:post,
		success:function(messages){
			if(messages.msg){
				$.each(messages,function(index,objs){
					
					 //to do
					 //(请填充具体业务逻辑数据)
					
					wrap_str+="<tr><td><a href=\""+objs.搜索结果地址+"\" title=\"\">"+objs.搜索结果名称+"</a></td><td><p"+objs.搜索结果大小+"</p></td><td><p>"+objs.搜索结果类型+"</p></td><td><p>"+objs.搜索结果时间+"</p></td><td><p>"+objs.搜索结果创建者+"</p></td><td><p>"+objs.搜索结果有无子文件夹+"</p></td></tr>"
				});
				req_wrap.html(req_layout+req_header+wrap_str);
			}else{
				req_wrap.html("<tr><td><p>没有相关资源</p></td></tr>");
			}
		}
	});
	
	*/
}