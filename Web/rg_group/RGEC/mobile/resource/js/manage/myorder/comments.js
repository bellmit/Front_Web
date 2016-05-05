	if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
		var EventName = {"click": "tap"};
	}else{ //电脑访问
		var EventName = {"click": "click"};
	}
	
	
(function($){
		$(function(){
			/*初始化星星*/
			$('.rg-c-pinfobox').each(function(index, element) {
            var $this=$(this),rg_target=$this.find('.rg-c-startar'),rg_stared=$this.find('.rg-c-pstar'),rg_ttxt=rg_target.text();
						rg_stared.find('div').css({'width':rg_stared.attr('data-star')*25+'px'});
						if(rg_ttxt!=''&&!isNaN(parseInt(rg_ttxt))){
							if(rg_ttxt>5){
								rg_ttxt=5;
							}else if(rg_ttxt<0){
								rg_ttxt=0;
							}
							rg_target.css({'width':rg_ttxt*25+'px'});
						}
			});
			/*according*/
			$('.rg-c-pcomment').on(EventName.click,function(e){
				$(this).next().next().show().end().parent().siblings().find('.rg-c-pcommentbox').hide();
			});
			/*重新打星*/
			$('.rg-c-starres').on(EventName.click,function(e){
				var nodename=e.target.nodeName.toLowerCase(),$this;
				if(nodename=='ul'){
					$this=$(e.target).find('li');
				}else if(nodename=='li'){
					$this=$(e.target);
				}
				var data=$this.attr('data-star');
				$this.parent().prev().html(data).css({'width':data*25+'px'});
			});
			/*评论完成后关闭评论框*/
			$('.rg-pc-submitbtn').on(EventName.click,function(e){
					$(this).parent().parent().hide();
			});
		});
	})(Zepto);