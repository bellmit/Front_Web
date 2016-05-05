(function($){
	$(function(){
		$("#kinMaxShow").kinMaxShow({
		   height:400,
		   button:{
			 showIndex:false,
			 normal:{background:'#fff',marginRight:'8px',border:'0',right:'46%',bottom:'20px'},
			 focus:{background:'#FEA500',border:'0'}
			},
		
		   callback:function(index,action){
			   switch(index){
				 case 0 :
				   if(action=='fadeIn'){
					$(this).find('.sub_1_1').animate({left:'70px'},600)
					$(this).find('.sub_1_2').animate({top:'60px'},600)
					
				   }else{
					$(this).find('.sub_1_1').animate({left:'110px'},600)
					$(this).find('.sub_1_2').animate({top:'120px'},600)
					
				   };
				   break;
				   
				 case 1 :
				   if(action=='fadeIn'){
					$(this).find('.sub_2_1').animate({left:'-100px'},600)
					$(this).find('.sub_2_2').animate({top:'60px'},600)
				   }else{
					$(this).find('.sub_2_1').animate({left:'-160px'},600) 
					$(this).find('.sub_2_2').animate({top:'20px'},600)
				   };
				   break;
				   
				 case 2 :
				   if(action=='fadeIn'){
					$(this).find('.sub_3_1').animate({bottom:'134px'},600)
				   }else{
					$(this).find('.sub_3_1').animate({bottom:'70px'},600)
				   };
				   break;           
				 
				}
			   }
		  
		  });
	});
})(jQuery);