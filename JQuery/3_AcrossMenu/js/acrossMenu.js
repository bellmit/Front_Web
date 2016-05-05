$(document).ready(
				  function(){
					$(".main > a").click(
						function(){
							var sonNode=$(this).next("ul");
							/**<!--if(sonNode.css("display")=="none"){
							sonNode.css("display","block"); 
							}
							else{
							sonNode.css("display","none"); 
							}
							-->
							**/
							//sonNode.show(500);
							//sonNode.hide(500);
							//sonNode.toggle(500);/
							sonNode.slideToggle(300);
							});	
					$(".main").hover(
						function(){
							$(this).children("ul").slideDown(300);
					  },function(){
						  $(this).children("ul").slideUp(300);
										 });
})

















