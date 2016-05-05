$(document).ready(
				  function(){
					$(".main > a").click(
						function(){
							var sonNode=$(this).next("ul");
							sonNode.slideToggle("1000");
							});
})

















