/*全局变量*/
/*保存当前选择项相关信息(参数说明：)["前一次操作","当前操作","当前操作索引","数据操作成功数据集","当前操作数据区(必填区，选填区)"]*/
var execarr=["","","","","1"];
/*jquery load*/
(function($){
	$(function(){
		$("#cardadd,#companyadd,#incomeadd,#creditadd,#organizationadd,#taxadd,#houseadd,#drivingadd,#marryadd,#educationadd,#titleadd,#videoadd,#phoneadd,#liveadd,#worldadd,#otheradd").click(function(){
			var curobj=$(this),curid=curobj.attr("id").slice(0,-3);
			var curindex=curobj.parent().parent().index();
			if(curid=="card"||curid=="work"||curid=="income"||curid=="credit"){
				execarr.splice(4,1,"1");
			}else{
				execarr.splice(4,1,"2");
			}
			console.log(execarr);
			/*面板显示事件监听*/
			execarr.splice(1,2,curid,curindex);
			getLoanDataLayer(execarr);
			execarr.splice(0,1,curid);
			/*面板隐藏事件监听*/
			$("#"+curid+"_close").click(function(){
				/*成功后插入slide图像地址*/
				switch(curid){
					case "card","company","income","credit","organization","tax","house","driving","marry","title","video","phone","live","other","card","work","card","work","card","work":
					/*to do*/
					break;
					case "education":
					break;
					/*to do*/
					case "world":
					/*to do*/
					break;
					
				}
				$.unblockUI();
				$("#"+curid+"_wrap").hide();
			});
			/*成功后更新页面数据*/
			templateShow(execarr);
		});
		
		
		
		
		
		
		
	});
})(jQuery);

/*kindeditor load*/
KindEditor.ready(function(K){
	var editor = K.editor({
		uploadJson : 'myFileUpload.do?p=<%=des.encrypt("0,2,8,1,"+((User)session.getAttribute(IConstants.SESSION_USER)).getId()) %>',
		fileManagerJson : 'myKindEditorManager.do?p=<%=des.encrypt("0,2,8,1,"+((User)session.getAttribute(IConstants.SESSION_USER)).getId()) %>',
		imageSizeLimit : "2MB",
		allowFileManager : true
	});
	K("#card_up,#company_up,#income_up,#credit_up,#organization_up,#tax_up,#house_up,#driving_up,#marry_up,#education_up,#title_up,#video_up,#phone_up,#live_up,#world_up,#other_up").click(function(){
		var curobj=K(this),curid=curobj.attr("id").split("_")[0];
		/*播放进度条*/
		playProgress(curid);
		/*执行文件上传*/
		/*
		to do
		*/
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				imageUrl:K("#"+curid+"_url").val(),
				clickFn : function(url, title, width, height, border, align) {
					K("#"+curid+"_url").val(),
					editor.hideDialog();
				}
			});
		});
		/*成功方法
			to do
		*/
		execarr.splice(3,1,"成功结果集");
		/*失败方法
			to do
		*/
		execarr.splice(3,1,"");
	});
	
	/**/
	
	
});


/*遮罩层对象封装*/
function getLoanDataLayer(execobj){
	var pre=execobj[0],cur=execobj[1];
	if(pre!=""&&pre!=cur){
		$("#"+pre+"_wrap").hide();
	}
	$("#"+cur+"_wrap").show();
	$.blockUI();
}
/*播放上传进度条图片*/
function playProgress(pg){
	var imgobj=$("#"+pg+"img"),imgsure=$("#"+pg+"_sure"),imgcance=$("#"+pg+"_cance");
	imgobj.prev().text("正在上传");
	imgobj.addClass("progressimgsel");
	imgcance.addClass("datainfo_cancesel");
	imgcance.click(function(){
		imgobj.prev().text("");
		imgobj.removeClass("progressimgsel");
		imgcance.removeClass("datainfo_cancesel");
	});
}
/*成功后更新显示模板数据*/
function templateShow(rs){
	var succstr=rs[3],succindex=rs[2],succarea=rs[4];
	if(succstr!=""){
		$("#datatable"+succarea).find("tr:eq("+succindex+")").find("td:eq(1)").html("<a title=\"\" target=\"_blank\" href=\"随机地址\" class=\"dataimg\">"+Math.ceil(Math.random()*10+1)+"张</a>");
	}
}



/*成功后更新slide预览*/










