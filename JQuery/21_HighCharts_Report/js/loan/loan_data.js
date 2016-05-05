/*全局变量*/
var execmap={"card":0,"work":1,"income":2,"credit":3,"house":4,"driving":5,"marry":6,"education":7,"title":8,"video":9,"phone":10,"live":11,"world":12,"other":13};
var execres=[[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var tempflag=0,cur_delid=0;
var max_width=150,max_height=100,normal_width=150,normal_height=100,min_width=150,min_height=100;
/*jquery load*/
(function($){
	$(function(){
		/*获取页面元素*/
		var datawrap1=$("#datatable1"),datawrap2=$("#datatable2");
		var world_sjzh=$("#world_sjzh"),education_xlzm=$("#education_xlzm");
		/*图片操作初始化*/
		fbox_Init();
		/*表单初始化*/
		var formobj=formValidInit();
		world_sjzh.validate(formobj.worobj);
		education_xlzm.validate(formobj.eduobj);
		/*证件添加*/
		$("#cardadd,#workadd,#incomeadd,#creditadd,#houseadd,#drivingadd,#marryadd,#educationadd,#titleadd,#videoadd,#phoneadd,#liveadd,#worldadd,#otheradd").live("click",function(){
			var curobj=$(this),curid=curobj.attr("id").slice(0,-3);
			var tempa=execmap[curid];
			/*面板显示事件监听*/
			getLoanDataLayer(curid);
			/*面板隐藏事件监听*/
			$("#"+curid+"_close").click(function(){
				$.unblockUI();
				$("#"+curid+"_wrap").hide();
			});
			if(curid=="education"){
				formClear("education_xlzm");
			}else if(curid=="world"){
				formClear("world_sjzh");
				$.ajax({
					type:"post",
					async:false,
					url:"queryCertificateForSocialNoByloanIdAndType",
					data:{
						"certificateTypeId":parseInt(tempa+1,10),
						"loanId":$("#loanId").val()
					},
					dataType:"json",
					success: function(datas){
						if(datas.success&&datas.hasOwnProperty("SocialNo")){
							var tempsoc=datas.SocialNo;
							if(tempsoc.qqNumber!=""){
								document.getElementById("world_qq").value=tempsoc.qqNumber;
							}
							if(tempsoc.weiboNumber!=""){
								document.getElementById("world_wx").value=tempsoc.weixinNumber;
							}
							if(tempsoc.weixinNumber!=""){
								document.getElementById("world_wb").value=tempsoc.weiboNumber;
							}
						}
					}
				});
				return false;
			}
			$.ajax({
				async:false,
				url:"queryCertificateImages",
				data:{"certificateTypeId":parseInt(tempa+1,10),"loanId":$("#loanId").val()},
				dataType:"json",
				success: function(datas){
					if(datas["success"]||datas.success){
						var data=datas["filePath"]||datas.filePath;
						if(data==""||data.length==""||data=="null"){
							showSlider(curid,tempa,"def");
							return false;
						}
						execres[tempa]=[];
						var dataarr=data.split(","),datalen=dataarr.length;
						for(var i=0;i<datalen;i++){
							/*标记1*/
							execres[tempa].push("../../img/read/readImageStream?type=0&imgFile="+dataarr[i]);
						}
					}
				}
			});
			if(execres[tempa].length!=0||execres[tempa]!=""){
				showSlider(curid,tempa,"apply");
			}
		});
		/*证件删除*/
		$("#carddelete,#workdelete,#incomedelete,#creditdelete,#housedelete,#drivingdelete,#marrydelete,#educationdelete,#titledelete,#videodelete,#phonedelete,#livedelete,#worlddelete,#otherdelete").live("click",function(){
			var curobj=$(this),curid="",curtheme=curobj.parent().parent().find("td:first").text();
			var isdelete=window.confirm("确认全部删除已上传的"+curtheme+"吗？");
			if(!isdelete){
				return;
			}
			if(curobj.attr("id")===undefined||curobj.attr("id")==="undefined"){
				return;
			}else{
				curid=curobj.attr("id").slice(0,-6);
			}
			if(curid!="world"){
				var tempa=execmap[curid];
				if(execres[tempa].length==0||typeof tempa=="undefined"||tempa==""){
					$.ajax({
						async:false,
						url:"queryCertificateImages",
						data:{"certificateTypeId":parseInt(tempa+1,10),"loanId":$("#loanId").val()},
						dataType:"json",
						success: function(datas){
							if(datas["success"]||datas.success){
								var data=datas["filePath"]||datas.filePath;
								if(data==""||data.length==""||data=="null"){
									return false;
								}
								execres[tempa]=[];
								var dataarr=data.split(","),datalen=dataarr.length;
								for(var i=0;i<datalen;i++){
									/*标记2*/
									execres[tempa].push("../../img/read/readImageStream?type=0&imgFile="+dataarr[i]);
								}
							}
						}
					});
				}
			}
			var curindex=execmap[curid],tarwrap=1;
			if(typeof execres[tempa]!="undefined"||execres[tempa]!=""){
				if(curindex==0||curindex==1||curindex==2||curindex==3){
					tarwrap=1;
				}else{
					tarwrap=2;
				}
				if(curid!="world"){
					showSlider(curid,tempa,"def");
				}
			}
			var param={};
			param["loanId"]=$("#loanId").val();
			param["certificateTypeId"]=Number(execmap[curid])+1;
			$.post("deleteCertificate",param,function(data){
				if(data.success){
					if(curid=="world"){
						templateShow(curid,"form",2,"formdelete");
					}else{
						templateShow(curid,execres[tempa],tarwrap,"delete");
						execres[tempa]=[];
					}
					infoTipAlert("删除成功","succ");
				}else{
					infoTipAlert("删除失败","err");
				}
			});
		});
		/*执行上传*/
        $("#card_action,#work_action,#income_action,#credit_action,#house_action,#driving_action,#marry_action,#education_action,#title_action,#video_action,#phone_action,#live_action,#world_action,#other_action").click(function(){
              var curobj=$(this),curid=curobj.attr("id").slice(0,-7);
			  if(curid=="education"){
					var eduflag=false;
					if(education_xlzm.valid()){
						eduflag=handleForms(curid);
						if(eduflag){
							templateShow(curid,"form",2,"formadd");
						}
					}else{
						return false;	
					}
			  }else if(curid=="world"){
				    var worflag=false;
					if(world_sjzh.valid()){
						worflag=handleForms(curid);
						if(worflag){
							templateShow(curid,"form",2,"formadd");
						}
					}
					return false;
			  }
			  if(tempflag==0){
					removeLoanDataLayer(curid);
					return false;
			  };
              var tempa=execmap[curid],tarwrap=1;
              var param={};
              param["certificateTypeId"]=Number(tempa)+1;
              param["loanId"]=$("#loanId").val();
              param["borrowerType"]=$("#borrowerTypeId").val();
              param["fileType"]=1;
			  var templen=0;
			  templen=execres[tempa].length-tempflag;
			  var tempres=execres[tempa].slice(templen,execres[tempa].length);    
			  param["imgPaths"]=tempres.toString();
			  if(tempa==0||tempa==1||tempa==2||tempa==3){
				  tarwrap=1;
			  }else{
				  tarwrap=2;
			  }
              $.post("../addCertificateImage",param,function(data){           
                  if(data.success){
                     	templateShow(curid,execres[tempa],tarwrap,"add");
                  }
              });
			  tempres=[];
			  templen=0;
			  tempflag=0;
			  /*关闭当前窗口*/
			  removeLoanDataLayer(curid);
			  return false;
        });
		/*提交申请(校验)*/
		validApply(datawrap1);
	});
})(jQuery);

/*kindeditor load*/
KindEditor.ready(function(K){
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/imageUpload?thumbSizes=150x100',		
		imageSizeLimit : "8MB",
		allowFileManager : true
	});
	K("#card_up,#work_up,#income_up,#credit_up,#house_up,#driving_up,#marry_up,#education_up,#title_up,#phone_up,#live_up,#world_up,#other_up").click(function(){
		var curobj=K(this),curid=curobj.attr("id").slice(0,-3);
		/*执行文件上传*/
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				imageUrl:K("#"+curid+"_url").val(),
				clickFn : function(url, title, width, height, border, align) {
					var tempa=execmap[curid];	
					var lastSize=url.lastIndexOf("/");
					var imgFile=url.slice(lastSize+1);
					execres[tempa].push("../../img/read/readImageStream?type=0&imgFile="+imgFile);
					++tempflag;
					showSlider(curid,tempa,"upload");
					editor.hideDialog();
				}
			});
			
		});
	});
	
	
	
});

/*kindeditor load*/
KindEditor.ready(function(K){
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/multiimageUpload?thumbSizes=150x100&userId='+$("#userId").val(),		
		imageSizeLimit : "8MB",
		allowFileManager : true
	});
	
	
	/*批量上传*/
	K("#card_batchup,#work_batchup,#income_batchup,#credit_batchup,#house_batchup,#driving_batchup,#marry_batchup,#education_batchup,#title_batchup,#phone_batchup,#live_batchup,#world_batchup,#other_batchup").click(function(){
		var curobj=K(this),curid=curobj.attr("id").slice(0,-8);
		editor.loadPlugin('multiimage', function() {
			editor.plugin.multiImageDialog({
				clickFn : function(urlList) {//返回所有上传图片的路径
					var tempa=execmap[curid];	
					K.each(urlList, function(i, data) {
						var lastSize=data.url.lastIndexOf("/");
						var imgFile=data.url.slice(lastSize+1);						
						execres[tempa].push("../../img/read/readImageStream?type=0&imgFile="+imgFile);
						++tempflag;
					});
					showSlider(curid,tempa,"upload");
					editor.hideDialog();
				}
			});
		});
	});
	
});


/*kindeditor load*/
KindEditor.ready(function(K){
	var editor = K.editor({
		uploadJson : '../../upload/kindetor/videoUpload',		
		imageSizeLimit : "100MB",
		allowFileManager : true
	});
	K("#video_up").click(function(){
		var curobj=K(this),curid=curobj.attr("id").slice(0,-3);
		/*执行文件上传*/
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				imageUrl:K("#"+curid+"_url").val(),
				clickFn : function(url, title, width, height, border, align) {
					var tempa=execmap[curid];
					/*标记5*/				
					execres[tempa].push(url);
					++tempflag;
					showSlider(curid,tempa,"upload");
					editor.hideDialog();
				}
			});
		});
	});
	
	
	
});

/*删除slide预览*/
$("#card_slide,#work_slide,#income_slide,#credit_slide,#house_slide,#driving_slide,#marry_slide,#education_slide,#title_slide,#video_slide,#phone_slide,#live_slide,#world_slide,#other_slide").live("click",function(e){
	var tarname=e.target.nodeName;
	if(tarname=="UL"){
		return;
	}
	var curobj=$(e.target);
	if(tarname=="SPAN"&&(tarname!="IMG"||tarname!="DIV"||tarname!="LI")){
		viewDelete(curobj);
	}else if((tarname=="IMG"||tarname=="DIV"||tarname=="LI")&&tarname!="SPAN"){
		viewSee(curobj,tarname);
	}
});
