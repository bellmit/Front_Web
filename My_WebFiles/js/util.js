/*
my util javascript file
javascript frame:JQuery
*/



/*---------身份证号码校验----------*/
function validsuserid(Enodes){
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var len=Enodes.value.replace(/\s+/g,"").length;
	var ttval=$("#"+Enodes.getAttribute('id')+"_val");
	if(Enodes.value=="")
		{
		ttval.text("身份证号码不能为空!");
		Enodes.focus();
		return false;
		}
	if(len<=2&&area[parseInt(Enodes.value.substr(0,2))]==null){
		ttval.text("输入的身份证地区不正确!");
		Enodes.focus();
		return false;
		}
	if(len==15||len==18)
		{
		if(area[parseInt(Enodes.value.substr(0,2))]==null)
			{	
					ttval.text("输入的身份证地区不正确!");
					Enodes.focus();
					return false;		
			}
		if(len==15)
			{
				if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(Enodes.value))
				{
							ttval.text("");
							return true;
				}else
				{
							ttval.text("输入的15位身份证号码有错误!");
							Enodes.focus();
							return false;
				}
			}
		if(len==18)
			{
				if(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(Enodes.value))
				{			
							ttval.text("");
							return true;
				}else
				{
							ttval.text("输入的18位身份证号码有错误!");
							Enodes.focus();
							return false;
				}
			}
		}else{
			ttval.text("请输入15位或者18位的身份证号码!");
			Enodes.focus();
			return false;
		}
}

/*---------------邮箱地址解析----------*/
function parseEmailURL(emails){
	var message=emails.substring(emails.indexOf("@")+1,emails.length);
	var mess_first=message.split(".")[0];
	if(mess_first=="sina"){
		return "http://mail."+message+".cn";
	}
	if(mess_first=="yahoo"){
		return "http://mail.cn"+message;
	}
	if(mess_first=="189"){
		return "http://mail."+mess_first+".cn";
	}
	else{
	 	return "http://mail."+message;
	}
}

/*------------模拟弹出窗口提示信息(与获取窗口大小函数配合使用)(有对应html,css,image)--------------*/
/*可不必放在函数中*/
function popupAlert(message){
	   /*事件处理对象引用(变量)定义*/
	   /*背景层引用*/
	   var maskbox=$("#masking_outer");
	   /*遮罩层引用*/
	   var mask_lay=$("#masking_bg");
	   /*关闭按钮引用*/
	   var closebtn=$("#close_btn");
	   /*打开弹出框*/
	   if(message!=""){
		   maskbox.show();
		   mask_lay.show();
		   mask_lay.css({width:getWH()[0],height:getWH()[1]});
			$("#error_show1").text("").text("提示信息");
			$("#error_show2").text("").text(message+"提示信息");				 
		}
	   /*确定按钮事件监听*/
		closebtn.click(function(){
				maskbox.hide();
				mask_lay.hide();
				mask_lay.css({width:0,height:0});
			}); 
	   /*调节窗口大小时触发事件(此部分可能写于函数体外,主要根据mask_lay这个定义变量范围来确定)*/
	   $(window).resize(function(){
				mask_lay.css({width:getWH()[0],height:getWH()[1]});		 
		});
}

/*------------获取窗口大小(此函数用于模拟弹出层遮罩背景)(有对应html,css,image)-------------*/
function getWH(){
		var wharr=[];
		var winWidth=0;
		var winHeight=0;
		// 获取窗口宽度
		if (window.innerWidth)
		{
			winWidth = window.innerWidth;
		}
		else if ((document.body) && (document.body.clientWidth))
		{
			winWidth = document.body.clientWidth;
		}
		// 获取窗口高度
		if (window.innerHeight)
		{
			winHeight = window.innerHeight;
		}
		else if ((document.body) && (document.body.clientHeight))
		{
			winHeight = document.body.clientHeight;
		}
		// 通过深入 Document 内部对 body 进行检测，获取窗口大小
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
		{
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}
		wharr.push(winWidth);
		wharr.push(winHeight);
		return wharr;
}

/*--------------动态删除生成的输入信息(ul模拟)(与添加方法配合使用)-------删除方法-----------*/
var comtemp=[];
var comdelstr="";
var comsize=0;
var comindex=0;
/*可不必放在函数中*/
function delScanInfo(){
	$("#模拟ul容器id值 li 执行按钮").live("click",function(){
				/*清空临时数组*/
				comtemp=[];
				/*清空临时字符串*/
				comdelstr="";
				comsize=$("#模拟ul容器id值 li").size();
				comindex=$(this).parent().index();
				if(comsize<1||!$("#模拟ul容器id值").children().is("li")){
					return false;	
				}
				if(comsize==1){
					$(this).parent().parent().empty();
				}
				if(comsize>=2){
					$("#模拟ul容器id值 li").each(function(){
						if($(this).index()==comindex)
						{
							/*清除删除项(empty()不会删除容器的事件)*/
							$(this).empty();
						}else{
							if(!$(this).html()=="")
							{
								/*存入未被删除项*/
								comtemp.push($(this).html());
							}
						}
					});
					/*清空页面所有值*/
					$("#模拟ul容器id值").empty();
					for(var i=0;i<comtemp.length;i++){//将临时数组数据插入页面
						comdelstr+="<li>"+comtemp[i]+"</li>"
					}
					$("#模拟ul容器id值").append(comdelstr);
				}
	});
}	

/*----------------动态生成输入信息(ul模拟)(与删除方法配合使用)----------添加方法----------*/
var liid=0;
/*可不必放在函数中*/
function createScanInfo(){
	$("#添加按钮id值").live("click",function(){
				var listr='<li><label>名称</label><input type="text" name="Name_'+liid+'" class=""/>'+'<button type="button" id="*_'+liid+'" >删&nbsp;除</button></li>';
				$("#模拟ul容器id值").append(listr);
				liid++;
	});
}

/*-------------校验日期前后关系是否合法-------------*/
function isDateTimes(endNode,startNode){
		var starts=0;
		var ends=0;
		if(endNode.val()!=""&&startNode.val()!=""){
			/*更加实际日期格式判断*/
			starts=Number(startNode.val().replace(/-+/g,""));
			ends=Number(endNode.val().replace(/-+/g,""));
			if((ends-starts)<0){
				return "no";
			}else{
				return "yes";
			}
		}else{
			return "unknow";
		}
}

/*------------获取浏览器地址中的相关参数(broparm)------与ahref和parmindex配合使用--------*/
function getBroParm(){
		if(window.location.href.indexOf("?")!=-1){
		   var browser_url=window.location.search.substring(1).split("&");
		   for(var i=0;i<browser_url.length;i++){
			   if(browser_url[i].split("=")[0]=="channelId"){
					return browser_url[i].split("=")[1]; 
				}
			}
		}
		else{
		 	return "no search url!";	
		}   
}

/*------------------获取目标列表中a的href值并返回参数列表数组(ahref)------与broparm和parmindex配合使用----------------*/
function getTargetParm(TCnodes){
		   var linksarrs=[];
		   var linkstrs;
		   var linkparms;
		   TCnodes.each(function(){
			    /*可根据实际情况判断*/
				linkstrs=$(this).find("a").attr("href");
				linkparms=linkstrs.substring(linkstrs.indexOf("?")+1).split("&");
				for(var j=0;j<linkparms.length;j++){
					if(linkparms[j].split("=")[0]=="channelId"){
						linksarrs.push(linkparms[j].split("=")[1]);
					}
				}	
			});
			return linksarrs;
}

/*---------------返回a中href与浏览器地址对应的索引值(parmindex)-----与ahref和broparm配合使用------------*/
function getParmIndex(TCnodes){
			var brourl=getBroParm();
			return $.inArray(brourl,getTargetParm(TCnodes));
}

/*------------------去除所有空格-------------------*/
function allTrim(str){
	var arr2=str.split("");
	var str2="";
	for(var i=0;i<arr2.length;i++){
		str2+=$.trim(arr2[i]);
	}
	return str2;
}















































































































































































