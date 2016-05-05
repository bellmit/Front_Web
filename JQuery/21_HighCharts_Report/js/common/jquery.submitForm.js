/*表单提交插件*/
(function($){
	$.fn.submitForm = function(set){
		
		var opt = $.extend({},set);
		
		return this.each(function(index,el) {
			var $this = $(el), action = $this.attr("action"), method = $this.attr("method"), subbtn = $this.find("button[name='submit']");	
			
			subbtn.click(function(e){
				e.preventDefault();
				var data = $this.serialize();
				$this.siblings(".result").replaceWith("");
				$.ajax({
					url:action,
					data:data,
					success: function(data){
						console.log(data);
						if(data.status == "y"){
							//data.msg==4  时是邮箱认证   不要计时器
							if(data.msg==4){
								$this.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "</p>");
								$this.slideUp();
							}else{
								$this.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "<span id='timer'>3</span>秒后自动刷新...</span></p>");
								$this.slideUp();
								var timer = setInterval(function(){ var t = $("#timer");t.text(parseInt($("#timer").text())-1);},1000);
								setTimeout(function(){ timer=null; window.location.reload();},3800);
							}
						}else if(data.status == "n"){
							$this.after("<div class='result error'><p><span class='error'></span><span class='txt'>" + data.info + "！</span></p>");
						}else{
							$this.after("<div class='result error'><p><span class='error'></span><span class='txt'>返回数据错误！</span></p>");
							}//end if
						}
					})
				})
			});
		}
})(jQuery)