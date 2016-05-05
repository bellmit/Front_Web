(function($){
	
	var defaultOpt = {
			width:73,
			height:12,
			look:"#pawlook",
			txttip:true
			}
		
	var txttip = {
			'default':"",
		 	'weak':"较弱",
			'mid':"中等",
			'strength':"较强"
		}
		
	$.fn.AuthPasswd= function(opt){
		
		var opt = $.extend({},defaultOpt,opt)
		if(opt.txttip){ $(opt.look).before("<span class='txttip'></span>");}
		$(this).keyup(function(){
			console.log("here");
			var t = checkPasswd($(this).val(),opt.look);
			if(opt.txttip){
				$(opt.look).siblings(".txttip").text(txttip[t]);
				}
			});
	}
	
	function checkPasswd(string, look) {
		console.log(look)
		var $look = $(look);
		if(string.length >=6) {
			if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+\D+/.test(string)) {
				$look.removeClass("weak").removeClass("mid").addClass("strength");
				$look.siblings(".txttip").css("color","#80C269");
				return "strength";
				//noticeAssign(1);
			}else if(/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string) || /\W+\D+/.test(string)) {
				if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
					$look.removeClass("mid").removeClass("strength").addClass("mid");
					$look.siblings(".txttip").css("color","#EFB14E");
					return "mid";
					//noticeAssign(-1);
				}else if(/\[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
					$look.removeClass("weak").removeClass("strength").addClass("mid");
					$look.siblings(".txttip").css("color","#EFB14E");
					return "mid";
					//noticeAssign(-1);
				}else if(/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
					$look.removeClass("weak").removeClass("strength").addClass("mid");
					$look.siblings(".txttip").css("color","#EFB14E");
					return "mid";
					//noticeAssign(-1);
				}else{
					$look.removeClass("strength").removeClass("mid").addClass("weak");
					$look.siblings(".txttip").css("color","#D73B23");
					return "weak";
					//noticeAssign(0);
				}
			}
		}else{
			$(look).removeClass("strength").removeClass("mid").removeClass("weak");
			return "default";
		}
	}
})(jQuery)