/*
 * 	easyAccordion 0.1 - jQuery plugin
 *	written by Andrea Cima Serniotti	
 *	http://www.madeincima.eu
 *
 *	Copyright (c) 2010 Andrea Cima Serniotti (http://www.madeincima.eu)
 *	Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 *	Built for jQuery library http://jquery.com
 */
 
(function(jQuery) {
	jQuery.fn.easyAccordion = function(options) {
	
	var defaults = {			
		slideNum: true,
		autoStart: false,
		slideInterval: 2000
	};
			
	this.each(function() {
		
		var settings = jQuery.extend(defaults, options);		
		jQuery(this).find('dl.teacher-dl').addClass('easy-accordion');
		
		
		// -------- 设置变量 ------------------------------------------------------------------------------
		
		jQuery.fn.setVariables = function() {
			dlWidth = jQuery(this).width();
			dlHeight = jQuery(this).height();
			dtWidth = jQuery(this).find('dt.teacher-dt').outerHeight();
			if (jQuery.browser.msie){ dtWidth = $(this).find('dt.teacher-dt').outerWidth();}
			dtHeight = dlHeight - (jQuery(this).find('dt.teacher-dt').outerWidth()-jQuery(this).find('dt.teacher-dt').width());
			slideTotal = jQuery(this).find('dt.teacher-dt').size();
			ddWidth = dlWidth - (dtWidth*slideTotal) - (jQuery(this).find('dd.teacher-dd').outerWidth(true)-jQuery(this).find('dd.teacher-dd').width());
			ddHeight = dlHeight - (jQuery(this).find('dd.teacher-dd').outerHeight(true)-jQuery(this).find('dd.teacher-dd').height());
		};
		jQuery(this).setVariables();
	
		
		// -------- 修复一些怪异的跨浏览器的问题由于CSS旋转 -------------------------------------

		if (jQuery.browser.safari){ var dtTop = (dlHeight-dtWidth)/2; var dtOffset = -dtTop;  /* Safari and Chrome */ }
		if (jQuery.browser.mozilla){ var dtTop = dlHeight - 20; var dtOffset = - 20; /* FF */ }
		if (jQuery.browser.msie){ var dtTop = 0; var dtOffset = 0; /* IE */ }
		
		
		// -------- 把事情打理好 ------------------------------------------------------------------------------
		
		var f = 1;
		jQuery(this).find('dt.teacher-dt').each(function(){
			jQuery(this).css({'width':dtHeight,'top':dtTop,'margin-left':dtOffset});	
			if(settings.slideNum == true){
				jQuery('<span class="slide-number">'+0+f+'</span>').appendTo(this);
				if(jQuery.browser.msie){	
					var slideNumLeft = parseInt(jQuery(this).find('.slide-number').css('left')) - 14;
					jQuery(this).find('.slide-number').css({'left': slideNumLeft})
					if(jQuery.browser.version == 6.0 || jQuery.browser.version == 7.0){
						jQuery(this).find('.slide-number').css({'bottom':'auto'});
					}
					if(jQuery.browser.version == 8.0){
					var slideNumTop = jQuery(this).find('.slide-number').css('bottom');
					var slideNumTopVal = parseInt(slideNumTop) + parseInt(jQuery(this).css('padding-top'))  - 12; 
					jQuery(this).find('.slide-number').css({'bottom': slideNumTopVal}); 
					}
				} else {
					var slideNumTop = jQuery(this).find('.slide-number').css('bottom');
					var slideNumTopVal = parseInt(slideNumTop) + parseInt(jQuery(this).css('padding-top')); 
					jQuery(this).find('.slide-number').css({'bottom': slideNumTopVal}); 
				}
			}
			f = f + 1;
		});
		
		if(jQuery(this).find('.active').size()) { 
			jQuery(this).find('.active').next('dd.teacher-dd').addClass('active');
		} else {
			jQuery(this).find('dt.teacher-dt:first').addClass('active').next('dd.teacher-dd').addClass('active');
		}
		
		jQuery(this).find('dt.teacher-dt:first').css({'left':'0'}).next().css({'left':dtWidth});
		jQuery(this).find('dd.teacher-dd').css({'width':ddWidth,'height':ddHeight});	

		
		// -------- 功能 ------------------------------------------------------------------------------
		
		jQuery.fn.findActiveSlide = function() {
				var i = 1;
				this.find('dt.teacher-dt').each(function(){
				if(jQuery(this).hasClass('active')){
					activeID = i; // 选中的幻灯片
				} else if (jQuery(this).hasClass('no-more-active')){
					noMoreActiveID = i; // 选中更活跃的幻灯片
				}
				i = i + 1;
			});
		};
			
		jQuery.fn.calculateSlidePos = function() {
			var u = 2;
			jQuery(this).find('dt.teacher-dt').not(':first').each(function(){	
				var activeDtPos = dtWidth*activeID;
				if(u <= activeID){
					var leftDtPos = dtWidth*(u-1);
					jQuery(this).animate({'left': leftDtPos});
					if(u < activeID){ // If the item sits to the left of the active element
						jQuery(this).next().css({'left':leftDtPos+dtWidth});	
					} else{ // If the item is the active one
						jQuery(this).next().animate({'left':activeDtPos});
					}
				} else {
					var rightDtPos = dlWidth-(dtWidth*(slideTotal-u+1));
					jQuery(this).animate({'left': rightDtPos});
					var rightDdPos = rightDtPos+dtWidth;
					jQuery(this).next().animate({'left':rightDdPos});	
				}
				u = u+ 1;
			});
			setTimeout( function() {
				jQuery('.easy-accordion').find('dd.teacher-dd').not('.active').each(function(){ 
					jQuery(this).css({'display':'none'});
				});
			}, 400);
			
		};
	
		jQuery.fn.activateSlide = function() {
			this.parent('dl.teacher-dl').setVariables();	
			this.parent('dl.teacher-dl').find('dd.teacher-dd').css({'display':'block'});
			this.parent('dl.teacher-dl').find('dd.teacher-dd.plus').removeClass('plus');
			this.parent('dl.teacher-dl').find('.no-more-active').removeClass('no-more-active');
			this.parent('dl.teacher-dl').find('.active').removeClass('active').addClass('no-more-active');
			this.addClass('active').next().addClass('active');	
			this.parent('dl.teacher-dl').findActiveSlide();
			if(activeID < noMoreActiveID){
				this.parent('dl.teacher-dl').find('dd.teacher-dd.no-more-active').addClass('plus');
			}
			this.parent('dl.teacher-dl').calculateSlidePos();	
		};
	
		jQuery.fn.rotateSlides = function(slideInterval, timerInstance) {
			var accordianInstance = jQuery(this);
			timerInstance.value = setTimeout(function(){accordianInstance.rotateSlides(slideInterval, timerInstance);}, slideInterval);
			jQuery(this).findActiveSlide();
			var totalSlides = jQuery(this).find('dt.teacher-dt').size();
			var activeSlide = activeID;
			var newSlide = activeSlide + 1;
			if (newSlide > totalSlides) newSlide = 1;
			jQuery(this).find('dt.teacher-dt:eq(' + (newSlide-1) + ')').activateSlide(); // activate the new slide
		}


		// -------- Let's do it! ------------------------------------------------------------------------------
		
		function trackerObject() {this.value = null}
		var timerInstance = new trackerObject();
		
		jQuery(this).findActiveSlide();
		jQuery(this).calculateSlidePos();
		
		if (settings.autoStart == true){
			var accordianInstance = jQuery(this);
			var interval = parseInt(settings.slideInterval);
			timerInstance.value = setTimeout(function(){
				accordianInstance.rotateSlides(interval, timerInstance);
				}, interval);
		} 

		jQuery(this).find('dt.teacher-dt').not('active').click(function(){		
			jQuery(this).activateSlide();
			clearTimeout(timerInstance.value);
		});	
				
		if (!(jQuery.browser.msie && jQuery.browser.version == 6.0)){ 
			jQuery('dt.teacher-dt').hover(function(){
				jQuery(this).addClass('hover');
			}, function(){
				jQuery(this).removeClass('hover');
			});
		}
	});
	};
})(jQuery);