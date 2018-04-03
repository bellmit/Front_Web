if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		/*产品分类展示*/
		$('.rg-lob-tabwrap').click(function(e){
			var c=e.target,cn=c.nodeName.toLowerCase(),$c,cdata=1;
			if(cn=='ul'){
				return false;
			}else{
				if(cn=='li'){
					$c=$(c);
				}else if(cn=='span'){
					$c=$(c).parent();
				}else if(cn=='i'){
					$c=$(c).parent().parent();
				}
			}
			cdata=$c.attr('data-orderby');
			if(cdata==1){
				$c.removeClass('rg-lob-tabsel').addClass('rg-lob-tabsel-tog').attr('data-orderby','2').siblings().removeClass('rg-lob-tabsel rg-lob-tabsel-tog').attr('data-orderby','1');
			}else if(cdata==2){
				$c.removeClass('rg-lob-tabsel-tog').addClass('rg-lob-tabsel').attr('data-orderby','1').siblings().removeClass('rg-lob-tabsel rg-lob-tabsel-tog').attr('data-orderby','1');
			}
		});
		
		/*加载更多*/
		$('.rg-loadwrap').click(function(e){
			var c=e.target,cn=c.nodeName.toLowerCase(),$c,ldata='',ltype='';
			if(cn=='div'){
				$c=$(c),ldata=$c.attr('data-load'),ltype=$c.attr('data-loadtype');
				switch(ltype){
					case 'comment':
						/*
						to do
						加载更多评论
						*/
						break;
				}
				if(ldata=='top'){
					setTimeout(function(){
						$(window).scrollTop(0);
					},200);
				};
			}
			
			
			
		});
		
		
		
		
		
	});
})(Zepto);