// JavaScript Document
$(function(){
		var mc='<object height="500" width="800" align="center" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0">';
		mc+='<param value="http://images.cnblogs.com/cnblogs_com/csharp/clock.swf" name="movie"/><param value="high" name="quality"/><param value="transparent" name="wmode"/>';
		mc+='<embed height="500" width="800" align="center" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="http://images.cnblogs.com/cnblogs_com/csharp/clock.swf"/></object>';
		$("#my_block").html(mc);
	});	