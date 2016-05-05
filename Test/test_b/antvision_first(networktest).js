
	var start_d1=new Date(),address1="http://ct.ee.antvision.cn",address2="http://cn.ee.antvision.cn";
	var start_t1=start_d1.getTime();
	if(typeof window.sessionStorage.t_temp1=="undefined"||typeof window.sessionStorage.t_temp2=="undefined"){
		window.sessionStorage.t_temp1="1";
		window.sessionStorage.t_temp2="2";
	}
	jQuery.getScript("http://ct.ee.antvision.cn/common/scripts/jquery-1.5.min.js",function(){
		var end_d1=new Date();
		var end_t1=end_d1.getTime();
		window.sessionStorage.t_temp1=end_t1-start_t1;
	});
	var start_d2=new Date();
	var start_t2=start_d2.getTime();
	jQuery.getScript("http://cn.ee.antvision.cn/common/scripts/jquery-1.5.min.js",function(){
		var end_d2=new Date();
		var end_t2=end_d2.getTime();
		window.sessionStorage.t_temp2=end_t2-start_t2;
	});
	
	
	function changNet(){
		if(typeof window.sessionStorage.t_temp1!="undefined"||typeof window.sessionStorage.t_temp2!="undefined"){
    		var t_temp1=window.sessionStorage.t_temp1,t_temp2=window.sessionStorage.t_temp2;
    		t_temp1>t_temp2?window.self.location=address2:window.self.location=address1;
    	}else{
    		window.self.location=address1;
    	}
	}


/*
	var start_d1=new Date(),address1="http://ct.ee.antvision.cn",address2="http://cn.ee.antvision.cn";
	var start_t1=start_d1.getTime();
	if(typeof window.sessionStorage.t_temp1=="undefined"||typeof window.sessionStorage.t_temp2=="undefined"){
		window.sessionStorage.t_temp1="1";
		window.sessionStorage.t_temp2="2";
	}
	jQuery.getScript("http://ct.ee.antvision.cn/common/scripts/jquery-1.5.min.js",function(){
		var end_d1=new Date();
		var end_t1=end_d1.getTime();
		window.sessionStorage.t_temp1=end_t1-start_t1;
	});
	var start_d2=new Date();
	var start_t2=start_d2.getTime();
	jQuery.getScript("http://cn.ee.antvision.cn/common/scripts/jquery-1.5.min.js",function(){
		var end_d2=new Date();
		var end_t2=end_d2.getTime();
		window.sessionStorage.t_temp2=end_t2-start_t2;
	});
	
	
	function changNet(){
		if(typeof window.sessionStorage.t_temp1!="undefined"||typeof window.sessionStorage.t_temp2!="undefined"){
    		var t_temp1=window.sessionStorage.t_temp1,t_temp2=window.sessionStorage.t_temp2;
    		t_temp1>t_temp2?window.self.location=address2:window.self.location=address1;
    	}else{
    		window.self.location=address1;
    	}
	}
*#


#*$.post("222.247.35.68",function(){
		var end_d1=new Date(),end_t1=end_d1.getTime();
		return function(){
			temp1=end_t1-start_t1;
		}
	});
	var start_d2=new Date(),start_t2=start_d2.getTime();
	$.post("58.20.37.185",function(){
		var end_d2=new Date(),end_t2=end_d2.getTime();
		return function(){
			temp2=end_t2-start_t2;
		}
	});
	
	if(typeof temp1!="undefined"&&typeof temp2!="undefined"){
		return temp1>temp2?address2:address1;
	}else if(typeof temp1!="undefined"){
		return address1;
	}else if(typeof temp2!="undefined"){
		return address2;
	}else{
		return address1;
	}*/



/*
	function createHttp(){
	return window.XMLHttpRequest?xmlhttp=new XMLHttpRequest():xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
(function(){
	var xmlhttp1=createHttp(),xmlhttp2=createHttp(),start_d1=new Date();
	var start_t1=start_d1.getTime();
	//address1
    xmlhttp1.onreadystatechange=function()
      {
          if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
            {
				var end_d=new Date();
				var end_t=end_d.getTime();
				return function(){var temp1=parseInt(Math.round(end_t-start_t1),10);}
            }
      }
    xmlhttp1.open("POST","address1",true);
    xmlhttp1.send();
	//address2
	var start_d2=new Date();
	var start_t2=start_d2.getTime();
	xmlhttp2.onreadystatechange=function()
      {
          if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
            {
				var end_d=new Date();
				var end_t=end_d.getTime();
				return function(){var temp2=parseInt(Math.round(end_t-start_t2),10);}
            }
      }
    xmlhttp2.open("POST","address2",true);
    xmlhttp2.send();
	
	if(typeof temp1!="undefined"&&typeof temp2!="undefined"){
		if(temp1>temp2){
			return address2;
    	}else{
    		return address1;
    	}
	}
})();
*/
