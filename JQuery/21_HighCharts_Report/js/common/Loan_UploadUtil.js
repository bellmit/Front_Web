/*上传时间格式化*/
function uptimeFormat(){
	var uptobj=new Date(),upty=uptobj.getFullYear(),uptm=uptobj.getMonth()+1,uptd=uptobj.getDate(),upthh=uptobj.getHours(),uptmm=uptobj.getMinutes(),uptss=uptobj.getSeconds();
	uptm=uptm<10?"0"+uptm:uptm;
	uptd=uptd<10?"0"+uptd:uptd;
	upthh=upthh<10?"0"+upthh:upthh;
	uptmm=uptmm<10?"0"+uptmm:uptmm;
	uptss=uptss<10?"0"+uptss:uptss;
	return upty+"-"+uptm+"-"+uptd+" "+upthh+":"+uptmm+":"+uptss;
}
/*效果轮播按钮显示隐藏*/
function showSlideBtn(ids,wraps,alen,imgstr){
	if(ids=="world"||ids=="video"){
		return false;
	}
	var prebtn=$("#"+ids+"_pre"),nextbtn=$("#"+ids+"_next");
	if(alen>=5){
		wraps.html(imgstr).css({"width":alen*150,"left":0,"background":"#fafafa"});
		prebtn.addClass("card_presel");
		nextbtn.addClass("card_nextsel");
	}else if(alen==0){
		wraps.html(imgstr).css({"width":600,"left":0,"background":"#transparent"});
		prebtn.removeClass("card_presel");
		nextbtn.removeClass("card_nextsel");	
	}else{
		wraps.html(imgstr).css({"width":600,"left":0,"background":"#fafafa"});
		prebtn.removeClass("card_presel");
		nextbtn.removeClass("card_nextsel");
	}
}
/*成功后更新显示模板数据*/
function templateShow(rid,rdata,rwrap,rway){
	var tempid=rid.toString();
	if(rdata==-1||typeof rdata===undefined){
		return false;
	}
	var resdata=rdata,curtr="",reslen="";
	if(rdata==0){
		reslen=0;
	}else if(rdata=="form"){
		reslen="form";
	}else{
		reslen=resdata.length;
	}
	var upttext=uptimeFormat();
	if(rway=="add"||rway=="formadd"){
		var addline=document.getElementById(rid+"add").parentNode.parentNode.rowIndex;
		curtr=$("#datatable"+rwrap).find("tr:eq("+addline+") td");
		if(reslen>=1||reslen=="form"){
			if(tempid!="world"){
				if(reslen=="form"){
					curtr.eq(1).html("<span class=\"dataimgnone\">0张</span>");
				}else{
					curtr.eq(1).html("<span onclick=\"showSlideImage(this);\" class=\"dataimg\">"+reslen+"张</span>");
				}
			}
			if(rway=="add"){
				curtr.eq(2).find("p").html("待提交");
			}else if(rway=="formadd"){
				curtr.eq(2).find("p").html("待审核");
			}
			curtr.eq(4).html(upttext);
			curtr.last().find("input.delete").attr({"id":rid+"delete"}).removeClass("deletenone");
		}else if(reslen==0){
			if(tempid!="world"){
				curtr.eq(1).html("<span class=\"dataimgnone\">0张</span>");
			}
			curtr.eq(2).find("p").html("等待上传");
			curtr.eq(4).html("");
			curtr.last().find("input.delete").removeAttr("id").addClass("deletenone");
		}
	}else if(rway=="delete"||rway=="formdelete"){
		var delline=document.getElementById(rid+"delete").parentNode.parentNode.rowIndex;
		curtr=$("#datatable"+rwrap).find("tr:eq("+delline+") td");
		if(reslen!=0){
			rdata.length=0;
			$("#"+rid+"_slide").html("");
			if(rwrap==1){
				curtr.eq(2).find("p").html("等待上传");
			}else if(rwrap==2){
				curtr.eq(2).find("p").html("");
			}
			if(tempid!="world"){
				curtr.eq(1).html("<span class=\"dataimgnone\">0张</span>");
			}
			curtr.eq(4).html("");
			curtr.last().find("input.delete").removeAttr("id").addClass("deletenone");
		}else if(reslen=="form"){
			if(rwrap==1){
				curtr.eq(2).find("p").html("等待上传");
			}else if(rwrap==2){
				curtr.eq(2).find("p").html("");
			}
			if(tempid!="world"){
				curtr.eq(1).html("<span class=\"dataimgnone\">0张</span>");
			}
			curtr.eq(4).html("");
			curtr.last().find("input.delete").removeAttr("id").addClass("deletenone");
		}
	}
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
/*弹出遮罩层对象封装*/
function getLoanDataLayer(ids){
	$.blockUI({message:$("#"+ids+"_wrap")});
}
/*关闭遮罩层对象封装*/
function removeLoanDataLayer(ids){
	$("#"+ids+"_wrap").hide();
	$.unblockUI();
}
/*适配不同类型和不同路径图片*/
function imageTypeAdapt(str){
	var imgstr=str,img_suffix="";
	if(imgstr.indexOf(".jpg")!=-1){
		img_suffix="_150x100.jpg";
	}else if(imgstr.indexOf(".png")!=-1){
		img_suffix="_150x100.png";
	}else if(imgstr.indexOf(".gif")!=-1){
		img_suffix="_150x100.gif";
	}else if(imgstr.indexOf(".bmp")!=-1){
		img_suffix="_150x100.bmp";
	}else if(imgstr.indexOf(".jpeg")!=-1){
		img_suffix="_150x100.jpeg";
	}
	/*if(imgstr.indexOf("userfile")==-1){
		img_suffix="";
		img_flag=false;
	}else{
		img_flag=true;
	}
	return [img_flag,imgstr,img_suffix];*/
	return [imgstr,img_suffix];
}
/*成功后更新slide预览*/
function showSlider(ids,aindex,vstate){
	if(ids=="world"||ids=="video"){
		if(ids=="video"){
			if(vstate=="def"){
				$("#video_slide").addClass("videoslide_def").removeClass("videoslide_upload videoslide_apply");
			}else if(vstate=="upload"){
				$("#video_slide").addClass("videoslide_upload").removeClass("videoslide_def videoslide_apply");
			}else if(vstate=="apply"){
				$("#video_slide").addClass("videoslide_apply").removeClass("videoslide_def videoslide_upload");
			}
			return;
		}else{
			return;	
		}
	}else{
		var imgobj=execres[aindex],imglen=imgobj.length,imgstr="",wraps=$("#"+ids+"_slide");
		for(var i=0;i<imglen;i++){
			var timgurl=imageTypeAdapt(imgobj[i]);
			imgstr+="<li><div><img style=\"width:150px;height:100px;overflow:hidden;display:block;\" alt=\"\" src=../../res/js/common//""+timgurl[0]+timgurl[1]+"/"/><span></span></div></li>";
		}
		showSlideBtn(ids,wraps,imglen,imgstr);
	}
}
/*slide按钮执行事件*/
$("#card_pre,#work_pre,#income_pre,#credit_pre,#organization_pre,#tax_pre,#house_pre,#driving_pre,#marry_pre,#education_pre,#title_pre,#video_pre,#phone_pre,#live_pre,#world_pre,#other_pre").live("click",function(e){
	var curid=$(this).attr("id").slice(0,-4);
	slide_play("pre",curid);
});
$("#card_next,#work_next,#income_next,#credit_next,#organization_next,#tax_next,#house_next,#driving_next,#marry_next,#education_next,#title_next,#video_next,#phone_next,#live_next,#world_next,#other_next").live("click",function(e){
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
/*图片预览(封装fancybox初始化方法)*/
function ImageView(closelist,closebg){
	var fbox_obj={
		'title': this.title,
		'titlePosition':'over',
		onComplete:function(){
			normal_width=this.width;
			normal_height=this.height;
			if(normal_width=="null"||normal_height=="null"||normal_width<150||normal_height<100||typeof normal_width=="undefined"||typeof normal_height=="undefined"){
				max_width=150;
				max_height=100;
				normal_width=150;
				normal_height=100;
				min_width=150;
				min_height=100;
			}else{
				if((1440>=normal_width&&normal_width>=1024)||(normal_height>=768&&900>=normal_height)){
					max_width=parseInt(normal_width*0.8,10);
					max_height=parseInt(normal_height*0.8,10);
					min_width=parseInt(normal_width*0.4,10);
					min_height=parseInt(normal_height*0.4,10);
					normal_width=parseInt(normal_width*0.6,10);
					normal_height=parseInt(normal_height*0.6,10);
				}else if(normal_width>1440||normal_height>900){
					max_width=parseInt(normal_width*0.5,10);
					max_height=parseInt(normal_height*0.5,10);
					min_width=parseInt(normal_width*0.3,10);
					min_height=parseInt(normal_height*0.3,10);
					normal_width=parseInt(normal_width*0.4,10);
					normal_height=parseInt(max_height*0.4,10);
				}else{
					max_width=parseInt(normal_width*1.2,10);
					max_height=parseInt(normal_height*1.2,10);
					min_width=parseInt(normal_width*0.8,10);
					min_height=parseInt(normal_height*0.8,10);
				}
			}
		}
	}
	$("a.grouped_elements").fancybox(fbox_obj).live("click",function(e){
		setTimeout(function(){
			if(closelist){
				$.unblockUI();
			}
			$("#imgdetail").css({"display":"none"});
		},500);
	});
	/*关闭预览背景*/
	$("#fancybox-overlay,#fancybox-close,#imgdetail").live("click",function(e){
		e.stopPropagation();
		var curid=e.target.id;
		if(closebg){
			$.unblockUI();
		}
		$("#imgdetail").css({"display":"none"});
		return false;
	});
}
/*图片操作初始化*/
function fbox_Init(){
		var tempangle=0;
		$("<div class=\"imgoperate_wrap\" id=\"imgoperate_wrap\"><div class=\"imgoperate_item\" id=\"imgoperate_item\"><div class=\"oimgtomin\" id=\"oimgtomin\"></div><div class=\"oimgnormal\" id=\"oimgnormal\"></div><div class=\"oimgtomax\" id=\"oimgtomax\"></div><div class=\"oimgdelete\" id=\"oimgdelete\"></div><div class=\"oimgrotate\" id=\"oimgrotate\"></div></div></div>").insertAfter($("#fancybox-title"));
		var fancybox_content=$("#fancybox-content"),fancybox_wrap=$("#fancybox-wrap"),fancybox_title=$("#fancybox-title");
		/*还原图片预览角度值*/
		$("#fancybox-right,#fancybox-left").live("click",function(){
			tempangle=0;
		});
		/*选择按钮*/
		$("#imgoperate_wrap").live("mouseover mouseout",function(e){
			var hovertype=e.type;
			if(hovertype=="mouseover"){
				$("#imgoperate_item").show();
			}else if(hovertype=="mouseout"){
				$("#imgoperate_item").hide();
			}
		});
		/*图片操作*/
		$("#oimgtomin,#oimgtomax,#oimgnormal,#oimgrotate,#oimgdelete").live("click",function(e){
				var curid=e.target.id;
				var tempw=150,temph=100;
				if(curid=="oimgtomin"){
					/*图片缩小*/
					tempw=min_width;
					temph=min_height;
				}else if(curid=="oimgtomax"){
					/*图片放大*/
					tempw=max_width;
					temph=max_height;
				}else if(curid=="oimgnormal"){
					/*图片复原*/
					tempw=normal_width;
					temph=normal_height;
				}
				if(curid=="oimgtomin"||curid=="oimgtomax"||curid=="oimgnormal"){
					setTimeout(function(){
						fancybox_title.css({"width":tempw});
						fancybox_wrap.css({"width":parseInt(tempw+20,10),"height":parseInt(temph+30,10)})
						fancybox_content.css({"width":tempw,"height":temph});
						/*$.fancybox.resize();*/
						$.fancybox.center(true);
						$.fancybox.pos();
					},200);
				}else if(curid=="oimgrotate"){
					/*图片旋转*/
					$("#fancybox-img").rotate({angle:tempangle+=90});
				}else if(curid=="oimgdelete"){
					if(!execmap.hasOwnProperty(cur_delid)){
						return false;
					}
					var isdelete=window.confirm("是否删除该图片");
					if(!isdelete){
						return false;
					}
					/*图片删除*/
					var curnum=$("#fancybox-title-over").text().replace(/(\s)*/g,"");
					curnum=curnum.split("/")[0];
					curnum=curnum.match(/(\d)*/g).join("");
					if(curnum==""||curnum==0||typeof curnum=="undefined"||curnum==null||!/\d/.test(curnum)){
						return false;
					}
					var curobj=$("#"+cur_delid+"_slide");
					var imgindex=execmap[cur_delid],imgobj=execres[imgindex];
					imgobj.splice(parseInt(curnum-1,10),1);
					var imglen=imgobj.length,imgstr="";
					for(var i=0;i<imglen;i++){
						var timgurl=imageTypeAdapt(imgobj[i]);
						imgstr+="<li><div><img alt=\"\" style=\"width:150px;height:100px;overflow:hidden;display:block;\" src=../../res/js/common//""+timgurl[0]+timgurl[1]+"/"/><span></span></div></li>";
					}
					var param={},tarwrap=1;
					if(execres.length==14){
						param["certificateTypeId"]=Number(imgindex)+1;
					}else if(execres.length==16){
						param["certificateTypeId"]=Number(imgindex)+15;
					}
					param["loanId"]=$("#loanId").val();
					param["borrowerId"]=$("#borrowerId").val();
					param["borrowerType"]=$("#borrowerTypeId").val();
					param["fileType"]=1;   
					param["imgPaths"]=imgobj.toString();
					$.ajax({
						async:false,
						url:"deleteCertificate",
						data:{"loanId":param.loanId,"certificateTypeId":param.certificateTypeId}
					});
					if(imgindex==0||imgindex==1||imgindex==2||imgindex==3){
						tarwrap=1;
					}else{
						tarwrap=2;
					}
					if(imgobj.length!=0){
						$.ajax({
							async:false,
							url:"../addCertificateImage",
							data:param,
							success: function(data){
								if(data.success){
									templateShow(cur_delid,imgobj,tarwrap,"add");
								}else{
									templateShow(cur_delid,-1,tarwrap,"add");
								};
							}
						});
					}else if(imgobj.length==0){
						templateShow(cur_delid,0,tarwrap,"add");
					}
					showSlideBtn(cur_delid,curobj,imglen,imgstr);
					//infoTips("删除成功","succ");
					$.fancybox.close();
					$.fancybox.init();
				}
		});
}

/*表单校验*/
function formValidInit(){
	var wqq=document.getElementById("world_qq");
	var wwx=document.getElementById("world_wx");
	var wwb=document.getElementById("world_wb");
	/*自定义验证规则*/
	jQuery.validator.addMethod("requiredWorld",function(value,element){
		  if(wqq.value==""&&wwx.value==""&&wwb.value==""){
			  return false;
	      }else{
			  formReset("world_sjzh");
			  return true;
		  } 
	},"");
	/*清除验证信息*/
	function formReset(fobj){
		$("#"+fobj).find("label[class='error']").each(function(index, element) {
			$(element).val("").remove();
        }).end().find("input[class='error']").each(function(index, element){
			$(element).removeClass("error");
		});
	}
	/*学历认证*/
	var eduobj={
		onkeyup:false,
		rules : {
			'EducationNo' : {
				required : true,
				minlength:1,
				rangelength: [12,12]
			}
		},
		messages : {
			'EducationNo' : {
				required : "在线验证码不能为空",
				minlength:"在线验证码不能为空",
				rangelength:"在线验证码必须是12位"
			}
		},
		invalidHandler : function() {
			return false;
		}
	}
	/*社交账号表单*/
	var worobj={
		onkeyup:false,
		rules : {
			'WorldQQ' : {
				requiredWorld :true
			},
			'WorldWX' : {
				requiredWorld :true
			},
			'WorldWB' : {
				requiredWorld :true
			}
		},
		messages : {
			'WorldQQ' : {
				requiredWorld : "QQ账号不能为空"
			},
			'WorldWX' : {
				requiredWorld : "微信账号不能为空"
			},
			'WorldWB' : {
				requiredWorld : "微博账号不能为空"
			}
		},
		invalidHandler : function() {
			return false;
		}
	}
	return {"eduobj":eduobj,"worobj":worobj};
}
/*清除表单数据*/
function formClear(fid){
	document.getElementById(fid).reset();
	$("#"+fid).find("label[class='error']").each(function(index, element) {
		$(element).val("").remove();
	}).end().find("input[class='error']").each(function(index, element){
		$(element).removeClass("error");
	});
}
/*执行学历证操作,执行社交账号操作*/
function handleForms(cid){
	var curid=cid,edures=false,worres=false;
	if(curid=="education"){
		function aa(){
			if(edures){
				removeLoanDataLayer(curid);
			}else{
				getLoanDataLayer(curid);
			}
		}
		var url =$('form[id="education_xlzm"]').attr('action');
		var params={
			"EducationNo":document.getElementById("education_online").value
		};
		$.ajax({
			type:'post',
			url:url,
			async:false,
			data : params,
			dataType : 'json',
			success : function(data){
				if (data.success) {
					edures=true;
					infoTipAlert(data.msg,"succ",aa);
				}else{
					edures=false;
					infoTipAlert(data.msg,"explain",aa);
				}
			},
			error:function(){
				edures=false;
				infoTipAlert("添加失败,请重新填写相关信息","err",aa);
			}
		});
		return edures;
	}else if(curid=="world"){
		function bb(){
			if(worres){
				removeLoanDataLayer(curid);
			}else{
				getLoanDataLayer(curid);
			}
		}
		var url =$('form[id="world_sjzh"]').attr('action');
		var tempa=execmap[curid];
		if(execres.length==14){
			var tempb=parseInt(tempa+1,10);
		}else if(execres.length==16){
			var tempb=parseInt(tempa+15,10);
		}
		var params={
			"qqNumber":document.getElementById("world_qq").value,
			"weixinNumber":document.getElementById("world_wx").value,
			"weiboNumber":document.getElementById("world_wb").value,
			"loanId":$("#loanId").val(),
			"borrowerId":$("#borrowerId").val(),
			"borrowerType":$("#borrowerTypeId").val(),
			"certificateTypeId":tempb
		};
		$.ajax({
			type:'post',
			url:url,
			async:false,
			data : params,
			dataType : 'json',
			success : function(data){
				if (data.success) {
					worres=true;
					infoTipAlert(data.msg,"succ",bb);
					
				}else{
					worres=false;
					infoTipAlert(data.msg,"explain",bb);
				}
			},
			error:function(){
				worres=false;
				infoTipAlert("添加失败,请重新填写相关信息","err",bb);
			}
		});
		return worres;
	}
}
/*查看图片链接的预览效果*/
function showSlideImage(imgdata){
	var imgobj=imgdata,imgquery=$(imgobj);
	var imgstr=parseInt(imgobj.innerHTML.slice(0,-1),10),imgapply=imgquery.parent().next().find("p").text();
	if(imgstr==0||imgstr==""||imgstr=="undefined"){
		return false;
	}
	if(imgapply=="审核未通过"){
		infoTipAlert("审核未通过不能预览","explain");
		return false;
	}else if(imgapply=="待审核"){
		infoTipAlert("待审核状态不能预览","explain");
		return false;
	}
	var pid=imgquery.parent().parent().find("td:last").find("input:first").attr("id").slice(0,-3);
	if(pid=="world"){
		infoTipAlert("社交账号不能预览","explain");
		return false;
	}else if(pid=="video"){
		infoTipAlert("视频认证不能预览","explain");
		return false;
	}
	var tempa=execmap[pid];
	if(execres.length==14){
		var tempb=parseInt(tempa+1,10);
	}else if(execres.length==16){
		var tempb=parseInt(tempa+15,10);
	}
	cur_delid=pid;
	$.ajax({
		async:false,
		url:"queryCertificateImages",
		data:{"certificateTypeId":tempb,"loanId":$("#loanId").val()},
		dataType:"json",
		success: function(datas){
			if(datas["success"]||datas.success){
				var data=datas["filePath"]||datas.filePath;
				if(data==""||data.length==""||data=="null"){
					return false;
				}
				execres[tempa]=[];
				var datasarr=data.split(","),dataslen=datasarr.length;
				for(var i=0;i<dataslen;i++){
					var lastSize=datasarr[i].lastIndexOf("/");
					var imgFile=datasarr[i].substring(lastSize+1);	
					execres[tempa].push("../../img/read/readImageStream?type=0&imgFile="+imgFile);
				}
			}
		}
	});
	if(typeof execres[tempa]=="undefined"||execres[tempa]==""){
		return false;
	}
	var tagstr="",imgcur=0,datalen=execres[tempa].length;
	for(var m=0;m<datalen;m++){
		imgcur=parseInt(m+1,10);
		var timgurl=imageTypeAdapt(execres[tempa][m]);
		tagstr+="<a class=\"grouped_elements\" target=\"_blank\" title=\"图片预览："+imgcur+"/"+datalen+"\" rel=\"group\" href=../../res/js/common//""+timgurl[0]+"/"><img style=\"width:130px;height:80px;overflow:hidden;display:block;\" src=../../res/js/common//""+timgurl[0]+timgurl[1]+"/" alt=\"\"/></a>";
	}
	$.blockUI({css:{"left":"15%"},message:$("#imgdetail").html("").html(tagstr)});
	/*图片预览*/
	ImageView(true,true);
}
/*上传图片预览查看*/
function viewSee(iobj,inode){
	var curobj=iobj,tarname=inode;
	var viewindex="",viewpar="";
	if(tarname=="IMG"){
		viewpar=curobj.parent().parent();
	}
	if(tarname=="DIV"){
		viewpar=curobj.parent();
	}
	if(tarname=="LI"){
		viewpar=curobj;
	}
	viewindex=viewpar.index();
	var curid=viewpar.parent().attr("id").slice(0,-6);
	if(curid=="world"){
		infoTipAlert("社交账号不能预览","explain");
		return false;
	}else if(curid=="video"){
		infoTipAlert("视频认证不能预览","explain");
		return false;
	}
	var tempa=execmap[curid];
	cur_delid=curid;
	if(typeof execres[tempa]=="undefined"||execres[tempa]==""){
		infoTipAlert("您还未上传图片，不能预览","explain");
		return false;
	}
	var tagstr="",imgcur=0,datalen=execres[tempa].length;
	for(var m=0;m<datalen;m++){
		imgcur=parseInt(m+1,10);
		var timgurl=imageTypeAdapt(execres[tempa][m]);
		tagstr+="<a class=\"grouped_elements\" target=\"_blank\" title=\"图片预览："+imgcur+"/"+datalen+"\" rel=\"group\" href=../../res/js/common//""+timgurl[0]+"/"><img style=\"width:130px;height:80px;overflow:hidden;display:block;\" src=../../res/js/common//""+timgurl[0]+timgurl[1]+"/" alt=\"\"/></a>";
	}
	$("#imgdetail").html("").html(tagstr);
	/*图片预览*/
	ImageView(false,false);
	$("#imgdetail").find("a").eq(viewindex).click();
}
/*上传图片预览删除*/
function viewDelete(iobj){
	var curobj=iobj;
	var parobj=curobj.parent().parent();
	var subindex=parobj.index(),curid=parobj.parent().attr("id").slice(0,-6);
	if(!execmap.hasOwnProperty(curid)){
		return false;
	}
	var isdelete=window.confirm("是否删除该图片");
	if(!isdelete){
		return false;
	}
	var imgindex=execmap[curid],imgobj=execres[imgindex];
	imgobj.splice(subindex,1);
	var imglen=imgobj.length,imgstr="";
	for(var i=0;i<imglen;i++){
		var timgurl=imageTypeAdapt(imgobj[i]);
		imgstr+="<li><div><img style=\"width:150px;height:100px;overflow:hidden;display:block;\" alt=\"\" src=../../res/js/common//""+timgurl[0]+timgurl[1]+"/"/><span></span></div></li>";
	}
	var param={},tarwrap=1;
	if(execres.length==14){
		param["certificateTypeId"]=Number(imgindex)+1;
	}else if(execres.length==16){
		param["certificateTypeId"]=Number(imgindex)+15;
	}
	param["loanId"]=$("#loanId").val();
	param["borrowerId"]=$("#borrowerId").val();
	param["borrowerType"]=$("#borrowerTypeId").val();
	param["fileType"]=1;   
	param["imgPaths"]=imgobj.toString();
	$.ajax({
		async:false,
		url:"deleteCertificate",
		data:{"loanId":$("#loanId").val(),"certificateTypeId":param.certificateTypeId}
	});
	if(imgindex==0||imgindex==1||imgindex==2||imgindex==3){
		tarwrap=1;
	}else{
		tarwrap=2;
	}
	if(imgobj.length!=0){
		$.ajax({
			async:false,
			url:"../addCertificateImage",
			data:param,
			success: function(data){
				if(data.success){
					templateShow(curid,imgobj,tarwrap,"add");
				}else{
					templateShow(curid,0,tarwrap,"add");
				};
			}
		});
	}else if(imgobj.length==0){
		templateShow(curid,0,tarwrap,"add");
	}
	showSlideBtn(curid,$("#"+curid+"_slide"),imglen,imgstr);
}

/*提交申请校验必须上传部分*/
function validApply(dw){
	var tipinfo=[];
	if(execres.length==14){
		tipinfo=["身份证资料","工作证明资料","收入证明资料","央行信用报告资料"];
	}else if(execres.length==16){
		tipinfo=["身份证资料","公司证明资料","收入证明资料","央行信用报告资料"];
	}
	var tipwidth=["30%","26%","22%","20%"];
	$("#loandata_apply").click(function(){
		var curobj,curlen=0,temptip=[],temptr=dw.find("tr");
		for(var i=0;i<4;i++){
			curobj=execres[i];
			curlen=curobj.length;
			if(curlen==0){
				var tempspan=temptr.eq(parseInt(i+1,10)).find("td:eq(1)").find("span").text();
				var temptext=parseInt(tempspan,10);
				if(temptext==0){
					temptip.push(tipinfo[i]);
				}
			}
		}
		if(temptip.length!=0){
			var tempinfos="<span style=\"color:#a0a0a0\">必须验证资料</span> "+temptip.join(" , ")+" <span style=\"color:#a0a0a0\">未上传，需先上传完后方可申请</span>";
			infoTipAuto(tempinfos,"explain",{left:tipwidth[temptip.length-1],top:'30%',width:parseInt((temptip.length*80)+554)},3);
			setTimeout(function(){
				$("html,body").animate({scrollTop:400},200);
			},3000);
			return false;
		}else{
			var param={};
			param["loanId"]=$("#loanId").val();
			$.post("sumbitCertificate",param,function(data){
				if(data.success){
					infoTipAuto("提交成功","succ","",3);
					setTimeout(function(){
						window.location.href="../../borrow/info/index";
					},3000);
				}else{
					infoTipAlert("提交失败","err");
				}
			});
		}
	});
}







