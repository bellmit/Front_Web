(function($){
	
	$(document).ready(function(e) {
        
		//初始化页面
		init();
		
		//绑定拦截器
		$("body").click(docClick);
		$(".floattip").hover(docHover);
		
		//click事件拦截器
		function docClick(e){
			var $target = $(e.target), actiontype = $target.attr("actiontype");
			
			switch(actiontype){
				case "set":
					break;
				case "gotoVip":
					break;
				default:	
					$("span.tip").fadeOut();
			}	
		}
		
		//hover事件拦截器
		function docHover(e){
			var $target =$(e.target)
			var $tip = $target.children("span.tip");
			$tip.fadeIn();
			setTimeout(function(){
				$tip.fadeOut();
				},3000)
		}
		
		//页面初始化
		function init(){
			//初始化checkbox元件
			$(".checkbox").checkbox({handler:setCheckBox});
			
			$(".smstip .txt").click(function(){
				$(this).siblings(".checkbox").click();
			});
		}
		
		//消息设置
		function setCheckBox(e){
			var $target = $(e.target);
			if($target.hasClass("checkbox")){
				var action = $target.attr("data-action"), type = $target.attr("data-type"), flag = $target.attr("status")=="checked" ? 1 : 0, name= $target.find("input").attr("name");
				$target.after("<span class='ajaxtip'>seting...</span>");
				var data = {};
				data[name]=flag;
				data["messageRemindTypeId"]=type;
				//console.log(data);
				//alert(action+":"+$target.attr("status"))
				$.ajax({
					url:action,
					type:'POST',
					data:data,
					success: function(data){
						//消息异步设置回调，data.status为是否设置成功标记，data.info为设置返回信息
						if(data.status=="y"){
							$target.siblings('.ajaxtip').text(data.info).css("color","green");
						}else{
							$target.siblings('.ajaxtip').text(data.info).css("color","red");
						}
						setTimeout(function(){ $target.siblings('.ajaxtip').replaceWith("");},3000);
					}
				})
			}else{
				//console.log("not checkbox")	
			}
		}
		
    });
	
})(jQuery)