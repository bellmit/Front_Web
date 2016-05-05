//hasTip插件：显示提示信息
(function($){
	
	$.fn.hasTip = function(option){
		//插件配置
		var opt = $.extend({},option);
		
		return this.each(function(i,el){
			var $this = $(el);
			$this.find(".floattip").hide();
			
			$this.hover(function(e){
				$this.find(".floattip").stop().fadeIn();
				setTimeout(function(){$this.find(".floattip").fadeOut();},3000)
			});
		})
	}
})(jQuery)