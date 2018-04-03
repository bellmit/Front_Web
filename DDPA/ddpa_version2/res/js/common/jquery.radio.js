// JavaScript Document
(function($){
	$.fn.imgRadio = function(opt){
		return this.each(function(i,el){
			
			var $this = $(el), $radio = $this.find("input"), isChecked = $radio.attr("checked"), name = $radio.attr("name");
			$this.addClass(name);
			
			if(isChecked){
				$this.addClass("checked");
			}else{
				$this.removeClass("checked");
			}
			$radio.hide();
			
			$this.click(function(e){
				var c = "." + name;
				
				$(c).removeClass("checked").find("input").removeAttr("checked");
				
				$this.addClass("checked");
				$radio.attr("checked");
				
				if(opt.handler){
					opt.handler(e);
				}
			});
		});
	}	
})(jQuery)