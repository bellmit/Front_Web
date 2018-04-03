(function($){
	$(function(){
		var radiomap={"有":"1","无":"0","1":"有","0":"无"}
		/*单选按钮初始化*/
		var radiostr=["#house_radio","#houseloan_radio","#car_radio","#carloan_radio"];
		(function(objstr){
			var initobj=objstr,initlen=objstr.length;
			for(var i=0;i<initlen;i++){
				var curwrap=initobj[i],tarstr=curwrap.split("_")[0],tartext=$(tarstr).val();
				$(curwrap).find("li").each(function() {
					var curobj=$(this),curtext=curobj.text();
					if(tartext==radiomap[curtext]&&curtext!=""){
						curobj.addClass("radiosel");
						return false;
					}
				});
			} 
		})(radiostr);
		/*单选按钮事件监听*/
		$("#house_radio,#houseloan_radio,#car_radio,#carloan_radio").find("li").click(function(){
			var curobj=$(this),parid=curobj.parent().attr("id").split("_")[0],curtext=curobj.text();
			curobj.addClass("radiosel").siblings().removeClass("radiosel");
			$("#"+parid).val(radiomap[curtext]);
		});
	});
})(jQuery);