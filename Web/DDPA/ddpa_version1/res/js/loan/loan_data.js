/*全局变量*/
var execmap={"card":"0","work":"1","income":"2","credit":"3","house":"4","driving":"5","marry":"6","education":"7","title":"8","video":"9","phone":"10","live":"11","world":"12","other":"13"};
var execres=[[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
/*jquery load*/
(function($){
	$(function(){
		/*
		初始化数据
		to do
		*/
		/*证件添加*/
		$("#cardadd,#workadd,#incomeadd,#creditadd,#houseadd,#drivingadd,#marryadd,#educationadd,#titleadd,#videoadd,#phoneadd,#liveadd,#worldadd,#otheradd").click(function(){
			var curobj=$(this),curid=curobj.attr("id").slice(0,-3);
			/*面板显示事件监听*/
			getLoanDataLayer(curid);
			/*面板隐藏事件监听*/
			$("#"+curid+"_close").click(function(){
				$.unblockUI();
				playProgress(curid,"close");
				$("#"+curid+"_wrap").hide();
			});
		});
		/*证件删除*/
		$("#carddelete,#workdelete,#incomedelete,#creditdelete,#housedelete,#drivingdelete,#marrydelete,#educationdelete,#titledelete,#videodelete,#phonedelete,#livedelete,#worlddelete,#otherdelete").click(function(){
			var curobj=$(this),curid=curobj.attr("id").slice(0,-6);
			var curindex=execmap[curid],curdata=execres[curindex],tarwrap=1;			
			if(curindex==0||curindex==1||curindex==2||curindex==3){
			    tarwrap=1;
		    }else{
			    tarwrap=2;
		    }
			templateShow(curid,curdata,tarwrap,"delete");
		});
		
		
		/*执行上传*/
        $("#card_action,#work_action,#income_action,#credit_action,#house_action,#driving_action,#marry_action,#education_action,#title_action,#video_action,#phone_action,#live_action,#world_action,#other_action").click(function(){
              var curobj=$(this),curid=curobj.attr("id").slice(0,-7);
              var tempa=execmap[curid],tarwrap=1;
              param={};
              param["certificateTypeId"]=Number(tempa)+1;
              param["loanId"]=$("#loanId").val();
              param["borrowerId"]=$("#borrowerId").val();
              param["borrowerType"]=$("#borrowerTypeId").val();
              param["fileType"]=1;             
              param["imgPaths"]=execres[tempa].toString();
			  if(tempa==0||tempa==1||tempa==2||tempa==3){
				  tarwrap=1;
			  }else{
				  tarwrap=2;
			  }
              $.post("../addCertificateImage",param,function(data){           
                  if(data.success){
                     	templateShow(curid,execres[tempa],tarwrap,"add");
                  }else{
                     	templateShow(curid,0,tarwrap,"add");
                  };
              });
			  /*关闭当前窗口*/
			  removeLoanDataLayer(curid);
        });
		/*提交申请(校验)*/
		var datatip=$("#datatip"),tipinfo=["身份证资料","工作证明资料","收入证明资料","央行信用报告资料"];
		$("#loandata_apply").click(function(){
			var curobj,curlen=0,temptip=[];
			for(var i=0;i<4;i++){
				curobj=execres[i];
				curlen=curobj.length;
				if(curlen==0){
					temptip.push(tipinfo[i]);
				}
			}
			if(temptip.length!=0){
				datatip.html("温馨提示：您的"+temptip.join("&nbsp;,&nbsp;")+"没有上传");
				$("html,body").animate({scrollTop:400},200);
				return false;
			}else{
				/*
				提交操作
				to do
				*/
			}
		});
		
	});
})(jQuery);

/*kindeditor load*/
KindEditor.ready(function(K){
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/imageUpload?userId=24&thumbSizes=150x100',		
		imageSizeLimit : "2MB",
		allowFileManager : true
	});
	K("#card_up,#work_up,#income_up,#credit_up,#house_up,#driving_up,#marry_up,#education_up,#title_up,#phone_up,#live_up,#world_up,#other_up").click(function(){
		var curobj=K(this),curid=curobj.attr("id").slice(0,-3);
		/*播放进度条*/
		playProgress(curid,"upload");
		/*执行文件上传*/
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				imageUrl:K("#"+curid+"_url").val(),
				clickFn : function(url, title, width, height, border, align) {
					var tempa=execmap[curid];					
					execres[tempa].push(url);
					editor.hideDialog();
					playProgress(curid,"success");
					showSlider(curid,tempa);
				}
			});
		});
		
	});
});


/*kindeditor load*/
KindEditor.ready(function(K){
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/videoUpload?userId=24',		
		imageSizeLimit : "20MB",
		allowFileManager : true
	});
	K("#video_up").click(function(){
		var curobj=K(this),curid=curobj.attr("id").slice(0,-3);
		/*播放进度条*/
		playProgress(curid);
		/*执行文件上传*/
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				imageUrl:K("#"+curid+"_url").val(),
				clickFn : function(url, title, width, height, border, align) {
					var tempa=execmap[curid];						
					execres[tempa].push(url);					
					editor.hideDialog();
					playProgress(curid,"success");
				}
			});
		});
	});
});


/*遮罩层对象封装*/
function getLoanDataLayer(ids){
	$("#"+ids+"_wrap").show();
	$.blockUI();
}
function removeLoanDataLayer(ids){
	$("#"+ids+"_wrap").hide();
	playProgress(ids,"close");
	$.unblockUI();
}
/*播放上传进度条图片*/
function playProgress(pg,res){
	var imgobj=$("#"+pg+"img"),imgsure=$("#"+pg+"_sure"),imgcance=$("#"+pg+"_cance"),imgp=imgobj.prev();
	switch(res){
		case "upload":
			imgp.text("正在上传");
			imgobj.addClass("progressimgsel");
			imgsure.removeClass("datainfo_suresel");
			imgcance.removeClass("datainfo_cancesel");
			break;
		case "success":
			imgp.text("上传成功");
			imgobj.removeClass("progressimgsel");
			imgcance.removeClass("datainfo_cancesel");
			imgsure.addClass("datainfo_suresel");
			break;
		case "fail":
			imgp.text("上传失败");
			imgobj.removeClass("progressimgsel");
			imgcance.addClass("datainfo_cancesel");
			imgsure.removeClass("datainfo_suresel");
			break;
		case "close":
			imgp.text("");
			imgobj.removeClass("progressimgsel");
			imgcance.removeClass("datainfo_cancesel");
			imgsure.removeClass("datainfo_suresel");
			break;
	}
}
/*成功后更新显示模板数据*/
function templateShow(rid,rdata,rwrap,rway){
	var resdata=rdata,reslen=resdata.length;
	if(rway=="add"){
		var addline=document.getElementById(rid+"add").parentNode.parentNode.rowIndex;
		if(reslen>=1){	
			$("#datatable"+rwrap).find("tr:eq("+addline+") td").eq(1).html("<a title=\"\" target=\"_blank\" href=\"http//:www.baidu.com\" class=\"dataimg\">"+reslen+"张</a>");
		}else{
			$("#datatable"+rwrap).find("tr:eq("+addline+") td").eq(1).html("<a title=\"\" href=\"#\" class=\"dataimg\" style=\"color:#f00;\">"+0+"</a>");
		}
	}else if(rway=="delete"){
		var delline=document.getElementById(rid+"delete").parentNode.parentNode.rowIndex;
		if(reslen!=0){
			rdata.length=0	
			$("#datatable"+rwrap).find("tr:eq("+delline+") td").eq(1).html("<a title=\"\" target=\"_blank\" href=\"#\" class=\"dataimg\">"+0+"张</a>");
		}
	}
}

/*成功后更新slide预览*/
function showSlider(ids,aindex){
	var imgobj=execres[aindex],imglen=imgobj.length,imgstr="",wraps=$("#"+ids+"_slide");
	for(var i=0;i<imglen;i++){
		imgstr+="<li><div><img alt=\"\" src=\""+imgobj[i]+"_150x100.jpg\"/><span></span></div></li>";
	}
	showSlideBtn(ids,wraps,imglen,imgstr);
}
/*删除slide预览*/
$("#card_slide,#work_slide,#income_slide,#credit_slide,#house_slide,#driving_slide,#marry_slide,#education_slide,#title_slide,#video_slide,#phone_slide,#live_slide,#world_slide,#other_slide").live("click",function(e){
	var tarname=e.target.nodeName,tarname=tarname.toLowerCase();
	if(tarname=="span"){
		var curobj=$(this),subobj=curobj.find("span"),subindex=curobj.find("li").index(),curid=curobj.attr("id").slice(0,-6);
		var imgindex=execmap[curid],imgobj=execres[imgindex];
		imgobj.splice(subindex,1);
		var imglen=imgobj.length,imgstr="";
		for(var i=0;i<imglen;i++){
			imgstr+="<li><div><img alt=\"\" src=\""+imgobj[i]+"_150x100.jpg\"/><span></span></div></li>";
		}
		showSlideBtn(curid,curobj,imglen,imgstr);
	}
});

/*效果轮播按钮显示隐藏*/
function showSlideBtn(ids,wraps,alen,imgstr){
	var prebtn=$("#"+ids+"_pre"),nextbtn=$("#"+ids+"_next");
	if(alen>=5){
		wraps.html(imgstr).css({"width":alen*150,"left":0});
		prebtn.addClass("card_presel");
		nextbtn.addClass("card_nextsel");
	}else{
		wraps.html(imgstr).css({"width":600,"left":0});
		prebtn.removeClass("card_presel");
		nextbtn.removeClass("card_nextsel");
	}
}
/*slide按钮执行事件*/
$("#card_pre,#work_pre,#income_pre,#credit_pre,#house_pre,#driving_pre,#marry_pre,#education_pre,#title_pre,#video_pre,#phone_pre,#live_pre,#world_pre,#other_pre").live("click",function(e){
	var curid=$(this).attr("id").slice(0,-4);
	slide_play("pre",curid);
});
$("#card_next,#work_next,#income_next,#credit_next,#house_next,#driving_next,#marry_next,#education_next,#title_next,#video_next,#phone_next,#live_next,#world_next,#other_next").live("click",function(e){
	var curid=$(this).attr("id").slice(0,-5);
	slide_play("next",curid);
});
/*选项按钮播放*/
var tag_index=0;
function slide_play(names,curid){
	var curwrap=$("#"+curid+"_slide"),curwidth=curwrap.width();
	var slideimg_index=curwidth/150-4,n=tag_index;
	if(names=="next"){
		n--;
		if(n==-1){
			n=slideimg_index;
		}
	}else if(names=="pre"){
		n++;
		if(n==slideimg_index+1){
			n=0;
		}
	}
	tag_index=n;
	curwrap.animate({"left":-n*150},500);
}


function showSlideImage(dataimg){
	var imgobj=dataimg;
	var imglen=imgvalue=parseInt(dataimg.innerHTML);
	/*if(imglen==0){
		return false;
	}*/
	var pindex=imgobj.parentNode.parentNode,rowIndex;
	var prevalue=preobj.getElementByTagName("input")[0].value;
	var curobj=$(imgobj);
	
	
}




