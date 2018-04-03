$(function(){
  $('.p_userinfo dt').hover(function(){
    $('.modify-pho').show();
  },function(){
   $('.modify-pho').hide();
  })
  $('.sidebar-nav i').click(function(){
    if($(this).parent().next().is(":visible")){
	   $(this).parent().next().hide();
	}else{
	   $(this).parent().next().show();
	}
   
  })
  
  //table
  $('.p_tableList tr').mouseover(function(){
    $(this).addClass('tr-over').mouseout(function(){
	 $(this).removeClass('tr-over');
	})
  })
  $('.p_tableList tr:even').addClass('even');
  
  //p_tab('click','.p-tabs>ul>li','.tab-list','active');
  p_tab('click','.reportNav li','.report-group','btnhover')
  
  function p_tab(event,obj,objcon,classname){
   $(obj).bind(event,function(){
    var index=$(this).index();
    $(this).addClass(classname).siblings().removeClass(classname);
	$(objcon).eq(index).show().siblings().hide();
   })	
}


})
//sendCode

var countdown=60;
function settime(val) {
var t=setTimeout(function() {
settime(val)
},1000);
if (countdown == 0) {
val.removeAttribute("disabled");
val.value="免费获取验证码";
countdown = 60;
clearTimeout(t);
} else {
val.setAttribute("disabled", true);
val.value="重新发送(" + countdown + ")";
countdown--;
}
}
