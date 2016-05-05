// JavaScript Document
	
(function($){
	$.fn.schArc = function(){
		return this.each(function(i,el){
			var $this = $(el), canvas = $this.find("canvas")[0], v = $this.attr("data-v");
			var trim_Version=""; 
			if(document.all){
				var b_version=navigator.appVersion;
				var version=b_version.split(";");
				trim_Version=version[1].replace(/[ ]/g,"");
			}
			
			if(trim_Version=="MSIE7.0" || trim_Version=="MSIE6.0" || trim_Version=="MSIE8.0" || !canvas.getContext){
				$(canvas).siblings(".per").replaceWith("");
				$(canvas).replaceWith("<span>"+v+"%</span>");
				
			}else{
				var ctx = canvas.getContext('2d');
				ctx.fillStyle="#E54D35";
				var pi2 = Math.PI*2, per4_1 = Math.PI/2;
				
				v = parseInt(v);
				v = v/100;
				v = v*pi2;		
				v = v - per4_1;	
				ctx.sector(30,32,21,-per4_1,v).fill();
			}
		});
	}	
})(jQuery)