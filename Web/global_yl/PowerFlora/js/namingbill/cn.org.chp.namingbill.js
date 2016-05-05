// JavaScript Document
$(function(){
	//第一步文本域默认值清空
	$("#subcause").focusin(function(){
		if($(this).val()=="请输入文字..."){
			this.value="";			
			}
		});
	//第二步,第四步上传扫描件
	$("#scanup").val("");
	$("#scanbtn").click(function(){//按钮事件激活
		$("#scanup").click();
	});
	$("#scanup").change(function(){//添加
		if($(this).val()!=""){
			var scanstr='<li><p class="scancontent">'+$(this).val()+'</p><button class="scandelete" type="button">删&nbsp;除</button></li>';
			$("#scanshow").append(scanstr);
		}
	});
	var scantemp=[];
	var scanindex=0;
	var scansize=0;
	var scandelstr="";
	$("#scanshow li button").live("click",function(){
		scantemp=[];//清空临时数组
		scandelstr="";//清空临时字符串
		scansize=$("#scanshow li").size();
		scanindex=$(this).parent().index();
		if(scansize<1||!$("#scanshow").children().is("li")){
			return false;	
		}
		if(scansize==1){
			$(this).parent().parent().empty();
		}
		if(scansize>=2){
			$("#scanshow li").each(function(){
				if($(this).index()==scanindex)
				{
					$(this).empty();//清除删除项
				}else{
					if(!$(this).html()==""){
						scantemp.push($(this).html());//存入未被删除项
					}
				}
			});
			$("#scanshow").empty();//清空页面所有选
			for(var i=0;i<scantemp.length;i++){//将临时数组数据插入页面
				scandelstr+="<li>"+scantemp[i]+"</li>"
			}
			$("#scanshow").append(scandelstr);
		}
	});
	//第三步上传化学结构图
	$("#chemimgup").val("");
	$("#chemimgbtn").click(function(){//按钮事件激活
		$("#chemimgup").click();
	});
	$("#chemimgup").change(function(){//添加
		if($(this).val()!=""){
			$("#chemimgshow").empty();//清空以前的数据
			var chemimgstr='<li><p class="chemimgcontent">'+$(this).val()+'</p><a class="chemimgdetail" href="'+$(this).val()+'" target="_blank">查&nbsp;看</a></li>';
			$("#chemimgshow").append(chemimgstr);
		}
	});
	//第四步输入框默认值隐藏
	$("#regaddr,#mfraddr,#companycode").focusin(function(){
		var regdefval=$(this).val();
		if(regdefval=="企业注册详细地址"||regdefval=="企业生产详细地址"||regdefval=="国内组织"){
			this.value="";
		}
	});
	//第五步复制表格
	var idcount=0;
	$("#clonetable").live("click",function(){
		idcount++;
		var tablebak=$("#nbtablestep5,#nbtablestep6").clone(true).attr("id",function(){return this.getAttribute('id')+idcount});
		tablebak.find("tr td").each(function(){
			$(this).find("button").attr("id",function(){return this.getAttribute('id')+idcount});
			$(this).find("input").attr("id",function(){return this.getAttribute('id')+idcount});
			$(this).find("label").attr("for",function(){return this.getAttribute('for')+idcount});
		}).end().insertAfter("#nbtablestep5,#nbtablestep6");
	});
	
	//第七步上传附件
	var btnarr=[];
	var filearr=[];
	$("#attachfile_1,#attachfile_2,#attachfile_3,#attachfile_4,#attachfile_5,#attachfile_6,#attachfile_7,#attachfile_8,#attachfile_9,#attachfile_10,#attachfile_11").val("");
	$("#attachbtn_1,#attachbtn_2,#attachbtn_3,#attachbtn_4,#attachbtn_5,#attachbtn_6,#attachbtn_7,#attachbtn_8,#attachbtn_9,#attachbtn_10,#attachbtn_11").click(function(){//按钮事件激活
		btnarr=[];//数组置空
		btnarr=$(this).attr("id").split("_");
		$("#attachfile_"+btnarr[1]).click();
	});
	$("#attachfile_1,#attachfile_2,#attachfile_3,#attachfile_4,#attachfile_5,#attachfile_6,#attachfile_7,#attachfile_8,#attachfile_9,#attachfile_10,#attachfile_11").change(function(){//添加
		if($(this).val()!=""){
			filearr=[];//数组置空
			filearr=$(this).attr("id").split("_");
			$("#attachshow_"+filearr[1]).empty();//清空以前的数据
			var attachstr='<li><p class="attachcontent">'+$(this).val()+'</p><a class="attachdetail" href="'+$(this).val()+'" target="_blank">查&nbsp;看</a></li>';
			$("#attachshow_"+filearr[1]).append(attachstr);
		}
	});
	//第八步初始化多选框,提交按钮状态
	$("#agreecheck").removeAttr("checked");
	$("#savebtn8").attr("disabled","disabled");
	$("#agreecheck").change(function(){
		if($(this).is(':checked')){
			$("#savebtn8").removeAttr("disabled").removeClass("savebtn8_def").addClass("savebtn8_sel");
		}else{
			$("#savebtn8").attr("disabled","disabled").removeClass("savebtn8_sel").addClass("savebtn8_def");
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//other codes
	});
	
