if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		/*初始化*/
		showStar($);
		var numwrap=$('#rg_bn_plugin'),btnsub=$('#rg_bn_btnsub'),btnadd=$('#rg_bn_btnadd'),btntxt=$('#rg_bn_txt'),btnbuy=$('#rg_bn_buybtn'),tobuy=$('.rg-mc-buyagain');
		var rg_pro=$('#rg_pro_listwrap'),rg_com=$('#rg_com_listwrap');
		/*再次购买操作*/
		btnsub.on(EventName.click,function(){
			var curtxt=parseInt(btntxt.val(),10);
			if(curtxt==1||curtxt=='1'){
				return false;
			}else{
				curtxt--;
				btntxt.val(curtxt);
			}
		});
		btnadd.on(EventName.click,function(){
			var curtxt=parseInt(btntxt.val(),10);
			curtxt++;
			btntxt.val(curtxt);
		});
		btnbuy.on(EventName.click,function(){
			numwrap.animate({'top':'100%'},200);
		});
		tobuy.on(EventName.click,function(e){
			numwrap.animate({'top':'0'},200);
			btntxt.val('1');
			e.preventDefault();
		});
		numwrap.on(EventName.click,function(e){
			var $this = $(this);
			var nodename = e.target.nodeName.toLowerCase(), classname = e.target.className;
			if ((nodename == 'div' && classname == 'rg-bn-plugin') || (nodename == 'li' && classname == 'rg-bn-imgwrap') || (nodename == 'li' && classname == 'rg-bn-numberwrap') || (nodename == 'div' && classname == 'rg-bn-closebtn')) {
					$this.animate({'top': '100%'}, 200);
			}
			return false;
		});
		/*tab 切换*/
		$('.rg-mc-tab').on(EventName.click,function(){
			$this=$(this),currentdata=$this.attr('data-comment');
			$this.addClass('rg-lob-tabsel').siblings().removeClass('rg-lob-tabsel');
			if(currentdata=='product'){
				rg_pro.show();
				rg_com.hide();
			}else if(currentdata=='comment'){
				rg_pro.hide();
				rg_com.show();
			}
		});
		/*删除*/
		$('.rg-mc-adelete').on(EventName.click,function(e){
				var isdelete=window.confirm('是否删除');
				if(isdelete){
					$(this).parent().parent().remove();
				}
		});
		/*修改*/
		$('.rg-mc-amodify').on(EventName.click,function(){
				window.location.href="comment.html";
		});
	});
})(Zepto);

	/*评论打星*/
	function showStar($){
		$('#rg_com_listwrap').find('li').each(function(index, element) {
			var $c=$(element),$t=$c.find('.rg-pc-star'),d=$t.attr('data-star');
			$t.find('span').addClass('rg-pc-addstar'+d);
		});
	}