(function($){
	$(document).on('pagecreate',function(){
		var $pt=$('#popuptouch');
		/*touch event*/
		$pt.find('li').each(function(index, element) {
			var otxt=element.innerHTML,o=$(element);
			var txt=otxt.replace(/\s*/g,'');
			switch(txt){
				case 'tap':
					o.bind('tap',function(){
						alert('this is tap event');
					});
					break;
				case 'taphold':
					o.bind('taphold',function(){
						alert('this is taphold event');
					});
					break;
				case 'swipe':
					o.bind('swipe',function(){
						alert('this is swipe event');
					});
					break;
				case 'swipeleft':
					o.bind('swipeleft',function(){
						alert('this is swipeleft event');
					});
					break;
				case 'swiperight':
					o.bind('swiperight',function(){
						alert('this is swiperight event');
					});
					break;	
			}	
		});
		/*orientation event*/
		$(window).bind('orientationchange',function(e){
			alert(e.orientation);
		});
	});
	
	
	
})(jQuery);