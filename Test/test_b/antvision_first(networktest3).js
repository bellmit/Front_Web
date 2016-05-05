(function(){
	var start_d1=new Date(),address1="http://ct.ee.antvision.cn",address2="http://cn.ee.antvision.cn",t_temp1=0,t_temp2=0;
	var start_t1=start_d1.getTime();
	var netimga=document.createElement("img");
	netimga.src="http://ct.ee.antvision.cn/common/images/antvision/top/logo.png";
	netimga.style.display="none";
	var end_d1=new Date();
	var end_t1=end_d1.getTime();
	t_temp1=end_t1-start_t1;
	var start_d2=new Date();
	var start_t2=start_d2.getTime();
	var netimgb=document.createElement("img");
	netimgb.src="http://cn.ee.antvision.cn/common/images/antvision/top/logo.png";
	netimgb.style.display="none";
	var end_d2=new Date();
	var end_t2=end_d2.getTime();
	t_temp2=end_t2-start_t2;
	alert("t1:"+t_temp1+"t2:"+t_temp2);
	//t_temp1>=t_temp2?window.location.href=address2:window.location.href=address1;
	//t_temp1>=t_temp2?window.localStorage.setItem("t_temp1",address2):window.localStorage.setItem("t_temp2",address1);
	
})();