(function(){
	// 创建一个Socket实例
	var socket1 = new WebSocket('ws://ct.ee.antvision.cn');
	var start_d1=new Date(),address1="http://ct.ee.antvision.cn",address2="http://cn.ee.antvision.cn",t_temp1=0,t_temp2=0;
	var start_t1=start_d1.getTime();
	socket1.onopen = function(event) {
	  	socket1.send('test net');
	};
	socket1.onmessage = function(event) {}
	socket1.onclose = function(event) {}
	var end_d1=new Date();
	var end_t1=end_d1.getTime();
	t_temp1=end_t1-start_t1;
	var start_d2=new Date();
	var start_t2=start_d2.getTime();
	var socket2 = new WebSocket('ws://cn.ee.antvision.cn');
	socke2t.onopen = function(event) {
	  	socket2.send('test net');
	};
	socket2.onmessage = function(event) {}
	socket2.onclose = function(event) {}
	var end_d2=new Date();
	var end_t2=end_d2.getTime();
	t_temp2=end_t2-start_t2;
	alert("t1:"+t_temp1+"t2:"+t_temp2);
	
})();