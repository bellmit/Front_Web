/*
my common javascript file
javascript frame:JQuery
*/
$(function(){
	/*------------表单校验-------------*/
	var validid1="";
	$("#表单id号").validate({
		   rules:{
				'pwd':{   
					required: true,
					rangelength : [6,20]
				},
				'repwd':{   
					required: true,
					equalTo: "#signpwd"
				}
		   },
		   messages:{ 
				'pwd':{   
					required:"密码不能为空",
					rangelength:"密码需在6到20个字符之间"
				},
				'repwd':{   
					required:"确认密码不能为空",
					equalTo:"确认密码与密码不一致"
				}
		   },
		   /*通过之后,回调情况*/
		   submitHandler:function(form){
			form.submit();
		   },
		   /*不通过,回调情况*/
		   invalidHandler:function(form,validator){
				return false;
		   },
		   /*验证不通过提示信息(自己指定提示信息显示位置)*/
		   errorPlacement:function(error,element){
				validid1=element.attr("id");
				$("#"+validid1+"_val").html(error.text());
		   },
			/*验证通过*/
		   success:function(){}
		})
			
	/*------------需要经过同意等选择框提示信息后执行---------------*/		
	/*初始化多选框选择状态(未选)*/
	$("#多选框id值").removeAttr("checked");
	/*初始化执行按钮状态(未激活状态)*/
	$("#执行按钮id值").attr("disabled","disabled");
	/*执行按钮事件*/
	$("#多选框id值").click(function(){
		if($(this).is(':checked')){
			$("#执行按钮id值").removeAttr("disabled").removeClass("执行按钮默认状态样式").addClass("执行按钮激活状态样式");
		}else{
			$("#执行按钮id值").attr("disabled","disabled").removeClass("执行按钮激活状态样式").addClass("执行按钮默认状态样式");
		}
	});

	/*-----------------自定义表单校验方法(邮编校验),在rules中加入vpcode规则即可,messages中就不需要添加了-----------------*/
	jQuery.validator.addMethod("vpcode",function(value,element){
			  var vzcode=/^[0-9]{6}$/;
			  return this.optional(element)||(vzcode.test(value));
		},"邮编格式不合法");		
			
	/*----------------身份证校验(与util.js配合使用)------------------*/
	$("#执行按钮id值").submit(function(){
		var detect_ct=$("#下拉框id值 option:selected").text();
		if(detect_ct=="身份证"){
			return validsuserid(document.getElementById("身份证输入框id值"));
		}
		if(detect_ct!="身份证"){
			$("#身份证提示信息框id值").text("");
			if(document.getElementById("certno").value==""){
				$("#身份证提示信息框id值").text("证件编号不能为空")
				$("#身份证输入框id值").focus();
				return false;
			}	
		}
	});	
	
	/*----------------回到顶部(html,css,image)-----------------*/
	$(window).scroll(function(){
		var outerbox=$("#gototop_outer");
		$(this).scrollTop()>=300?outerbox.fadeIn(500):outerbox.fadeOut(500);
	});
	$("#gototop_outer").click(function(){
		$("html,body").animate({scrollTop:0},800);
	});
	
	/*----------------表格样式、隔行换色、鼠标移入效果、去掉下边框和右边框------------------------*/
	/*去掉最后一行的下边框*/
	$("#表格id值 tbody tr:last").find("td").css("border-bottom","none");
	/*去掉最后一列的右边框*/
    $("#表格id值 tbody tr").find("td:last").css("border-right","none");
    /*隔行换色*/
    $("#表格id值 tbody tr:odd").css("background","#eee");
    /*鼠标移入移出效果*/
    $("#表格id值 tbody tr").hover(function(){
								$(this).addClass("tbodysel");
								},
								function(){
								$(this).removeClass("tbodysel");
		   });
    /*隔行换色与鼠标效果叠加*/
    $("#表格id值 tbody tr:odd").hover(function(){
								$(this).css("background","#eefaff");
								},
								function(){
								$(this).css("background","#eee");
		});
		
	/*------------------模拟下拉框选择(html,css,image)----------------------*/
	/*初始化模拟值*/
	var listr="";
	$("#cpttype option").each(function(){
		listr+="<li>"+$(this).text()+"</li>";
	});
	$("#select_mode_action").append(listr);
	/*初始化文本显示值*/
	$("#select_mode_show").val($("#select_mode_action li:first").text());
	/*文本显示框单击事件*/
	$("#select_mode_show").click(function(){
		$("#select_mode_action").toggle(500);
		$("#select_def").toggle();
		$("#select_sel").toggle();
	});
	/*下拉列表单击事件*/
	$("#select_mode_action li").click(function(){
		$("#cpttype_valid").text("");
		$("#select_def").toggle();
		$("#select_sel").toggle();
		$("#select_mode_show").val("").val($(this).text());
		$("#custtypeid option").eq($(this).index()).attr("selected","true").siblings().removeAttr("selected");
		$("#select_mode_action").fadeOut(500);
	});
	/*表单提交执行校验*/
	$("#表单执行按钮id值").click(function(){
		var custtval=$("#select_mode_show");
		if(custtval.val()==""||custtval.val()=="---请选择---"){
			$("#cpttype_valid").text("投诉类型不能为空");
			custtval.focus();
			return false;
		}else{
			$("#cpttype_valid").text("");
		}
	});
	
	/*---------------校验日期前后关系是否合法(与util.js的日期前后关系校验配合使用)且日期已经作了非空校验----------------*/
	$("#表单执行按钮id值").click(function(){
		var prodt=$("#开始日期id值");
		var dthav=$("#结束日期id值");
		if(isDateTimes(dthav,prodt)=="no"){
			$("#"+dthav.attr('id')+"_valid").text("提示信息");
			dthav.focus();
			return false;
		}
		else if(isDateTimes(dthav,prodt)=="yes"){
			$("#"+dthav+"_valid").text("");
		}else{
			dthav.focus();
		}
	});
	
	/*----------------搜索输入框--------------------*/
	/*设置输入框默认样色和输入颜色*/
	var cptsv=$("#查询输入框id值");
	var cptsm=$("#查询提示框id值")
	if(cptsv.val()!="请输入查询码"){
		cptsv.css({"color":"#000"});
	}
	if(cptsv.val()=="请输入查询码"){
		cptsv.css({"color":"#666"});
	}
    setInterval(cptsearchcss,1000);
   /*输入框获取焦点事件*/
   cptsv.focusin(function(){
		cptsm.hide();		
		if($(this).val()=="请输入查询码"){
			$(this).val("");
			cptsv.css({"color":"#666"});
		}
		if($(this)!="请输入查询码")	
		{
			cptsv.css({"color":"#000"});
		}
	});
   /*输入框只能输入数字(可根据实际情况调整更改)*/
   cptsv.keyup(function(){
			this.value=$(this).val().replace(/\D+/g,""); 
	});
   /*查询执行事件*/
   $("#查询执行按钮id值").click(function(){
		  if(cptsv.val()==""){
			  cptsm.fadeIn(100).text("请输入查询码！");
			  cptsm.delay(1000).fadeOut(300);
			  return false;													  
			}												
		  if(cptsv.val()=="请输入查询码"){
			  $("#输入框id值").val("");
			  cptsm.fadeIn(100).text("请输入查询码！");
			  cptsm.delay(1000).fadeOut(300);
			  return false;
		  }
	});
	
	/*--------------模拟图片切换效果----------------*/
	/*图片轮播切换*/
	var maxindex=$("#newsimgbtn li:last").index();//获取图片数量索引最大值
	var getindex=0;//当前默认索引值
	/*默认执行播放动画*/
	silderPlay(getindex);
	/*自动轮播*/
	var indexid=setInterval(function(){
		 silderPlay(getindex);
		 getindex++;
		 if(getindex>maxindex)
			 {
				getindex=0;
			 }
		 },8000);
	/*轮播鼠标行为*/
	hoversilderPlay(indexid);
	
	
	/*----------------textarea内容加载时自动调节高度、监听键盘事件--------------------*/
	$("#textarea").css({height:document.getElementById("textarea").scrollHeight});
	$("#textarea").keyup(function(){$(this).css({height:this.scrollHeight});});
	
	
	
	/*----------------用mouseover和mouseout模拟hover事件（因为hover事件不是标准事件），使textarea大小变化--------------------*/
	$("#textarea").live("mouseover mouseout",function(e){
		 if(e.type=="mouseover"){$(this).animate({height:"200px"},500);}
		 if(e.type=="mouseout"){$(this).animate({height:"100px"},500);}
	});
	
	
	
	/*------------点击操起区域之外部分触发相关事件(在body中点击让select收缩)--------------*/
	$(document).click(function(e){
		var isshow=document.getElementById("select");
		/*目标当前状态必须为显示状态*/
		if(isshow.style.display=="block"){
			/*点击的对象不是当前目标对象*/
			if(e.target.id!="select"){
				isshow.style.display="none";
			}
		}		
	});
	

	/*------------最流畅动画解决方案(流畅,内存不易泄露)-------------*/
	window.requestAnimFrame=function(){
		return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(func){window.setTimeout(func,1000/60)}}();
	
	
	
	/*------------本地存储技术(WebStorage)-------------*/
	/*sessionStorage*/
	window.sessionStorage.setValue="数据源";/*set*/
	var getStr=window.sessionStorage.setValue;/*get*/
	/*localStorage*/
	window.localStorage.setItem("数据标识","数据源");/*set*/
	window.localStorage.getItem("数据标识");/*get*/
	
	
	
	/*------------页面数据库技术(WebSqlDataBase)-------------*/
	/*create database(获取数据库实例)*/
	var db=function getDB(){
		try{
			/*数据库名称、版本号、数据库描述信息、初始化数据库大小*/
			var mydb=window.openDatabase("yp_db","1.0","test web sql database,the source from pages table,user jquery frame",10*1024*1024);
			if(!mydb){
				/*创建数据库失败*/
				alert("create database fail");
				return;	
			}
			return mydb;
		}catch(err){
			/*不支持html5的websqldatabase浏览器*/
			alert("fail:"+err);
			return;
		}
	}
	/*create table(创建数据表)*/
	if(db){
		db.transaction(function(tx){
			/*数据表名称(主键、类型、约束;字段、类型;......)*/
			tx.executeSql("CREATE TABLE yp_db_test(id int UNIQUE,xh int,d1 TEXT,d2 TEXT)");
		});
	}
	/*delete table(删除数据表)*/
	if(db){db.transaction(function(tx){tx.executeSql("DROP TABLE yp_db_test");});}
	/*select table(查询数据)*/
	if(db){
		 db.transaction(function(tx){
				tx.executeSql("SELECT * FROM yp_db_test",[],function(tx,result){
					for(var i=0;i<result.rows.length;i++){
						var data_str="<tr><td><p>"+result.rows.item(i)["xh"]+"</p></td><td><p>"+result.rows.item(i)["d1"]+"</p></td><td><p>"+result.rows.item(i)["d2"]+"</p></td></tr>";	
						$("#targetshow").append(data_str);
					}
			  },null);
		 });
	}
	/*insert datas into table(插入数据)*/
	if(db){
		 db.transaction(function(tx){
			 tx.executeSql("INSERT INTO yp_db_test(xh,d1,d2) values(?,?,?)",["数据源1","数据源2","数据源3"]);
		 })
	}
	/*update datas from table(更新数据)*/
	if(db){
		 db.transaction(function(tx){
			 tx.executeSql("UPDATE yp_db_test(d2) set d2=? where id=?",["需要修改的数据字段","需要修改数据索引(条件)"]);
		 })
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

			
});







/*----------查询输入框默认值与输入值样式-----------------*/
function cptsearchcss(){
	var cptsvf=$("#查询输入框id值");
	if(cptsvf.val()!="请输入查询码"){
		cptsv.css({"color":"#000"});
	}
	if(cptsvf=="请输入查询码"){
		cptsv.css({"color":"#666"});
	}
}

/*------------------图片轮播切换效果----------------------*/
/*鼠标移入移出事件*/
function hoversilderPlay(indexid){
	var maxindexf=$("#newsimgbtn li:last").index();
	$("#newsimgbtn li").hover(function(){
			getindex=$(this).index();
			clearInterval(indexid);
			silderPlay(getindex)
		  },
		  function(){
			var getindex=$(this).index();
			indexid=setInterval(function(){
						 silderPlay(getindex);
						 getindex++;
						 if(getindex>maxindexf)
							 {
								getindex=0;
							 }
						 },8000);  
	});
}
/*轮播效果*/
function silderPlay(getindex){
	var curindex=0;
	var imgremark="";
	var imgtitle="";
	$("#silderimg").css({'background':getColors()});
	$("#newsimgbtn li").eq(getindex).removeClass("imgbtndef").addClass("imgbtnsel").siblings().removeClass("imgbtnsel").addClass("imgbtndef");			
	imgremark=$("#silderimg a").eq(getindex).find("img").attr("alt");
	imgtitle=$("#silderimg a").eq(getindex).find("img").attr("title");
	$("#newsimgremark li").eq(getindex).text(imgremark).removeClass("imgremarkhide").addClass("imgremarkshow").siblings().removeClass("imgremarkshow").addClass("imgremarkhide");
	$("#newsimgtitle li").eq(getindex).text(imgtitle).removeClass("imgtitlehide").addClass("imgtitleshow").siblings().removeClass("imgtitleshow").addClass("imgtitlehide");
	$("#silderimg a").eq(getindex).fadeIn(1000).siblings().fadeOut(1000);
}
/*随机背景颜色名*/
function getColors(){
	var	colorarr=['BurlyWood','Chartreuse','DarkKhaki','Darkorange','DeepSkyBlue','Gold','GreenYellow','LightPink','Orange','OrangeRed'];
	var	sjys=Math.ceil(Math.random()*10);
	return colorarr[sjys-1];
}


