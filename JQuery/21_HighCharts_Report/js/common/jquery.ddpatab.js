/* jquery tab简易插件
*  author : liyuzhong 
*/
(function($){
	$.fn.DDPATab = function(opts,handler){
		var defaults = {}
		
		defaults = $.extend({},defaults,opts);
		
		var $this = $(this);
		
		$("#tabcontent .tabc", $this).hide(); // Initially hide all content
		$("#tabs li:first", $this).attr("id","current"); // Activate first tab
		$("#tabcontent .tabc:first", $this).addClass("cur").show(); // Show first tab content
		
		$('#tabs li', $this).click(function(e) {
			location.hash = "";
			e.preventDefault();        
			$("#tabcontent .tabc", $this).removeClass("cur").hide(); //Hide all content
			$("#tabs li", $this).attr("id",""); //Reset id's
			$(this).attr("id","current"); // Activate this
			$($("a",$(this)).attr('name')).addClass("cur").show(); // Show content for current tab
			
			//回调
			//console.log(typeof(handler))
			if(handler){
				handler(e);
			}
		});
	}
})(jQuery)