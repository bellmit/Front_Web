(function($,w){
	/*设备判断*/
	if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
			var EventName = {"click": "tap"};
	}else{ //电脑访问
			var EventName = {"click": "click"};
	}
	$(function(){
		/*页面元素引用*/
		$favoriteclose=$('#favoriteclose'),
		$favoritewrap=$('#favoritewrap'),
		$sc_menuwrap=$('#sc_menuwrap'),
		$sc_menuclose=$('#sc_menuclose');
		/*搜索*/
		$('#store_search_btn').on(EventName.click,function(){
			var $c=$(this),$s=$c.prev('input');
			if(''==$s.text()){
				common_obj.modal({
					title: '温馨提示',
					content: '搜索关键字不能为空！',
					ok: '确认', 
					okfn: function () {
						$('#form').submit();
					}
				},1);
				return false;
			}
		});
		/*购物车*/
		$('#shoppingcart').on(EventName.click,function(){
			$sc_menuwrap.show();
		});
		$sc_menuclose.on(EventName.click,function(){
			$sc_menuwrap.hide();
		});
		/*收藏店铺*/
		$('#addfavorite').on(EventName.click,function(e){
			e.preventDefault();
			$favoritewrap.animate({top:'0'},200).find('p').show();
			return false;
		});
		/*提示信息操作过后收藏店铺*/
		$favoriteclose.on(EventName.click,function(e){
			$favoritewrap.animate({top:'100%'},200).find('p').hide();
			setTimeout(function(){
				common_obj.AddFavorite();
			},200);
		});
	});
})(Zepto,window);