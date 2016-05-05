/**
* checkbox plugin
* author : liyuzhong
*/
(function($){
	
	$.fn.checkbox = function(option){
		var opt = option;
		return this.each(function(index, element) {
			
			var $this = $(element), $cb_input	= $this.children("input[type='checkbox']");
			
            if(opt.checkAll){
				console.log("checkall");
				$cb_input.attr("checked","checked");
			}else if(opt.checkNone){
				console.log("checknone");
				//$cb_input.removeAttr("checked");
			}
			
			$this.removeClass("checked unchecked disabled noedit")
			if($cb_input.attr("disabled")=="disabled" || $cb_input.attr("disabled") == "true"){
				if($cb_input.attr("checked")=="checked" || $cb_input.attr("checked") == "true"){
					$this.addClass("noedit").attr("status","noedit");
				}else{
					
					$this.addClass("disabled").attr("status","disabled");
				}
			}else{
				
				if($cb_input.attr("checked")=="checked" || $cb_input.attr("checked") == "true"){
					$this.addClass("checked").attr("status",$cb_input.attr("checked"));
				}else{
					$this.addClass("unchecked").attr("status","unchecked");
				}
			}
		
			$(this).live("click",change); 
			
			function change(e){
				var $target = $(e.target),isDis = $target.children("input[type='checkbox']").attr("disabled"), isChecked = $target.children("input[type='checkbox']").attr("checked");
				 if(isDis == "disabled" || isDis == "true"){ 
					 return;
				}else{
					if(isChecked == "checked" || isChecked == "true"){
						
						$cb_input.removeAttr("checked");
						$target.removeClass("checked").addClass("unchecked").attr("status","unchecked");
					}else{
						$cb_input.attr("checked","checked");
						$target.removeClass("unchecked").addClass("checked").attr("status","checked");
					}
				}
				
				if(opt.handler){
					opt.handler(e);
				}
			}
			
			return {
				checked: function(){
					$cb_input.attr("checked","checked");
					$this.removeClass("checked unchecked disabled noedit")
					$this.addClass("checked").attr("status",$cb_input.attr("checked"));
				},			
				unchecked : function(){
					$cb_input.removeAttr("checked");
					$this.removeClass("checked unchecked disabled noedit")
					$this.addClass("unchecked").attr("status",$cb_input.attr("checked"));
				}
			}
		
       });
	}
		
})(jQuery)