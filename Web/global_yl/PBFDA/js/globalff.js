// JavaScript Document
$(document).ready(function(){
						   
					 /*当前菜单高亮*/
					 $(".menu ul li a").eq(0).removeClass("menudefault").addClass("menuselect").siblings().removeClass("menudefault");
					 $(".menu ul li a").click(function(){
											var cururl=window.location.href.toLowerCase();
											var newurl=$(this).attr("href").toLowerCase();
											 if(cururl.indexOf(newurl)!=-1){
												 $(this).blur().removeClass("menudefault").addClass("menuselect");
												 return false;
												 }
											   });
					   
					   
					   
					   
					/*登录表单校验*/
					/*用户名校验*/
				   $("#username").focusout(
												  function(){
													  var un=$("#username").val();
													  if(un==""){
														  $("#unvalid").fadeIn(300).text("用户名不能为空");
														  $("#unvalid").delay(1000).fadeOut(1000);
														  return false;
						   								}else{
															//$(".unvalid").css("color","green");
							   								//$(".unvalid").text("用户名填写正确");
														  	$("#unvalid").delay(1000).fadeOut(1000);
															return true;
							   							}
													  });
				   $("#adminusername").focusout(
												  function(){
													  var un=$("#adminusername").val();
													  if(un==""){
														  $("#adminunvalid").fadeIn(300).text("用户名不能为空");
														  $("#adminunvalid").delay(1000).fadeOut(1000);
														  return false;
						   								}else{
															//$(".unvalid").css("color","green");
							   								//$(".unvalid").text("用户名填写正确");
														  	$("#adminunvalid").delay(1000).fadeOut(1000);
															return true;
							   							}
													  });
				   /*密码校验*/
				   $("#password").focusout(
												  function(){
													  var pw=$("#password").val();
													  if(pw.length<6){
														  if(pw.length>=1){
															$("#pwvalid").fadeIn(300).text("密码长度至少6位");
														  	$("#pwvalid").delay(1000).fadeOut(1000);
															return false;
															  }
														  if((pw.length<1)||(pw=="")){
															$("#pwvalid").fadeIn(500).text("密码不能为空");
														  	$("#pwvalid").delay(1000).fadeOut(1000);
														  	return false;
															  }
														  }else{
															  return true;
															  }
													  });
				   /*验证码校验*/
				   $("#datacode").focusout(function(){
					   var varls=$("#datacode").val();
					   if(varls==""){
						   $("#dcvalid").fadeIn(500).text("验证码不能为空");
						   $("#dcvalid").delay(1000).fadeOut(500);
						   return false;
					   }
					   /*if(){
						   //ajax校验输入值与session值对比 
					   }*/				   
				   });
				   
				   $("#admindatacode").focusout(function(){
					   var varls=$("#admindatacode").val();
					   if(varls==""){
						   $("#admindcvalid").fadeIn(500).text("验证码不能为空");
						   $("#admindcvalid").delay(1000).fadeOut(500);
						   return false;
					   }
					   /*if(){
						   //ajax校验输入值与session值对比 
					   }*/				   
				   });
				   
				   /*验证码刷新*/
				   /*
				   $("#dcvalidimg").click(function(){
				   	   //调用java验证码生成方法，同时设置到session中，返回json数据对象，与输入框中的数据对比。
				   	   this.src="/powerSD/validateCode?time"+new Date().getTime();
				   	   });
				   	   */
				   /*
				   $("#admindcvalidimg").click(function(){
				   	   //调用java验证码生成方法，同时设置到session中，返回json数据对象，与输入框中的数据对比。
				   	   this.src="/powerSD/validateCode?time"+new Date().getTime();
				   	   });
				   	   */
				   
				   $("#adminpassword").focusout(
												  function(){
													  var pw=$("#adminpassword").val();
													  if(pw.length<6){
														  if(pw.length>=1){
															$("#adminpwvalid").fadeIn(300).text("密码长度至少6位");
														  	$("#adminpwvalid").delay(1000).fadeOut(1000);
															return false;
															  }
														  if((pw.length<1)||(pw=="")){
															$("#adminpwvalid").fadeIn(500).text("密码不能为空");
														  	$("#adminpwvalid").delay(1000).fadeOut(1000);
														  	return false;
															  }
														  }else{
															  return true;
															  }
													  });
				   /*点击按钮事件*/
				   $("#submits").click(
									   function(){
										   var un=$("#username").val();
										   var pw=$("#password").val();
										   if(un==""){
												alert("用户名为空");
												return false;		   
											   }
										   if(pw.length<6){
												   	if(pw==""){
														alert("密码为空");
														return false;
														}else{
															alert("密码长度少于6位");
															return false;
															}
												   }
											   else{
												   alert("ok"); 
												   //ajax后台交互处理
												   }
										   });
				   
				   $("#adminsubmits").click(
									   function(){
										   var un=$("#adminusername").val();
										   var pw=$("#adminpassword").val();
										   if(un==""){
												alert("用户名为空");
												return false;		   
											   }
										   if(pw.length<6){
												   	if(pw==""){
														alert("密码为空");
														return false;
														}else{
															alert("密码长度少于6位");
															return false;
															}
												   }
											   else{
												   alert("ok"); 
												   //ajax后台交互处理
												   }
										   });
				   
				   
				   //其他类验证代码
		});

/*登录tab*/
$(function(){
							var index = 0;
							$(".login_tab li").eq(index).addClass("login_tabsel").siblings().removeClass("login_tabsel");
							$(".login_tab li").click(function(){
								index = $(".login_tab li").index(this);
								$(".login_tab li").eq(index).addClass("login_tabsel").siblings().removeClass("login_tabsel");
								$(".login_show table").eq(index).show().siblings().hide();
							});
						});

/*选项卡*/
$(function(){   
						$("a.nav-tabtitle").click(function(){
						$(".active").removeClass("nav-tabtitle");		
						$(this).addClass("nav-tabtitle");		
						$(".nav-news").slideUp();
						var content_show = $(this).attr("name");
						$("#"+content_show).slideDown();
					})});

/*友情链接tab*/
$(function(){
							var index = 0;  
							$(".linksmainbox ul li").click(function(){
								index = $(".linksmainbox ul li").index(this);
								$(".links_show ul").eq(index).show().siblings().hide();
							});
						});


