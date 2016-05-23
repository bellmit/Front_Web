$(function(){
  //导航栏下拉列表
  $("#nav-center").mouseover(function(){
    $("#nav-user").css("display","block")
  })
  $("#nav-center").mouseout(function(){
    $("#nav-user").css("display","none")
  })
})

//左侧固定导航
$(function () {
  $(window).scroll(function(){
    if ($(window).scrollTop()>100){
      $("#back-to-top").fadeIn(200);
    } else {
      $("#back-to-top").fadeOut(200);
    }
  });
  // 当点击跳转链接后，回到页面顶部位置
  $("#back-to-top").click(function(){
    $('body,html').animate({scrollTop:0},300);
    return false;
  });
});

//登录验证
$(function(){
  $("#login").click(function(){
    var uname=$("#login-uname");
    var pwd=$("#login-pwd");
    var ualert=$("#login-alert");
    var code=$("#login-yzm");
    var msg="";
    console.log($("#login-yanzheng").html().toLowerCase());
    if($.trim(uname.val())==""){
      msg="用户名不能为空";
      console.log(msg);
      uname.focus();
    }else if(!/^1\d{10}$/.test($.trim(uname.val()))){
      msg="用户名格式不正确";
      uname.focus();
      console.log(msg);
    }else if($.trim(pwd.val())==""){
      msg="密码不能为空";
      pwd.focus();
      console.log(msg);
    }else if(!/^.{6,20}$/.test($.trim(pwd.val()))){
      msg="密码6-20个字符";
      pwd.focus();
      console.log(msg);
      console.log(pwd.val());
    }else if($.trim(code.val())==""){
      msg="验证码不能为空";
      code.focus();
      console.log(msg);
    }else if($("#login-yanzheng").html().toLowerCase()!= $.trim(code.val()).toLowerCase()){
      msg="验证码错误";
      code.focus();
      console.log(msg);
      console.log(code.val().toLowerCase());
    }else{
      msg="登录成功";
    }
    if(msg){
      ualert.css("display","block");
      ualert.animate({
        width:"240px",
        height:"40px"
      },200);
      ualert.html("<span></span>"+msg);
    }
  })
  $(document).keydown(function(event){
    if (event.keyCode === 13){ // 按了回车键
      $("#login").trigger("click");
    }
  });
})
//注册验证
$(function(){
  $("#register").click(function(){
    var uname=$("#reg-phone");
    var pwd=$("#reg-pwd");
    var repwd=$("#reg-repwd");
    var ualert=$("#reg-alert");
    var code=$("#re-yanzheng");
    var msg="";
    if($.trim(uname.val())==""){
      msg="手机号不能为空";
      console.log(msg);
      uname.focus();
    }else if(!/^1\d{10}$/.test($.trim(uname.val()))){
      msg="手机号格式不正确";
      uname.focus();
      console.log(msg);
    }else if($.trim(pwd.val())==""){
      msg="密码不能为空";
      pwd.focus();
      console.log(msg);
    }else if(!/^.{6,20}$/.test($.trim(pwd.val()))){
      msg="密码6-20个字符";
      pwd.focus();
      console.log(msg);
      console.log(pwd.val());
    }
    //else if($.trim(repwd.val())==""){
    //  msg="两次输入密码不一致";
    //  repwd.focus();
    //  console.log(msg);
    //}
    else if(repwd.val()!=pwd.val()){
      msg="两次输入密码不一致";
      repwd.focus();
      //console.log(msg);
      //console.log(repwd.val());
    }else{
      msg="登录成功";
    }
    if(msg){
      ualert.css("display","block");
      ualert.animate({
        width:"240px",
        height:"38px"
      },200);
      ualert.html("<span></span>"+msg);
      console.log(ualert.html());
    }
  })
  $(document).keydown(function(event){
    if (event.keyCode === 13){ // 按了回车键
      $("#register").trigger("click");
    }
  });
})
//忘记密码
$(function(){
  $("#forget").click(function(){
    var uname=$("#for-phone");
    var pwd=$("#for-pwd");
    var repwd=$("#for-repwd");
    var ualert=$("#for-alert");
    var code=$("#re-yanzheng");
    var msg="";
    if($.trim(uname.val())==""){
      msg="手机号不能为空";
      console.log(msg);
      uname.focus();
    }else if(!/^1\d{10}$/.test($.trim(uname.val()))){
      msg="手机号格式不正确";
      uname.focus();
      console.log(msg);
    }else if($.trim(pwd.val())==""){
      msg="密码不能为空";
      pwd.focus();
      console.log(msg);
    }else if(!/^.{6,20}$/.test($.trim(pwd.val()))){
      msg="密码6-20个字符";
      pwd.focus();
      console.log(msg);
      console.log(pwd.val());
    }else if($.trim(repwd.val())==""){
      msg="两次输入密码不一致";
      repwd.focus();
      console.log(msg);
    }else if(repwd.val()!=pwd.val()){
      msg="两次输入密码不一致";
      pwd.focus();
      console.log(msg);
      console.log(repwd.val());
    }else{
      msg="登录成功";
    }
    if(msg){
      ualert.css("display","block");
      ualert.animate({
        width:"240px",
        height:"40px"
      },200);
      ualert.html("<span></span>"+msg);
    }
  })
  $(document).keydown(function(event){
    if (event.keyCode === 13){ // 按了回车键
      $("#forget").trigger("click");
    }
  });
})