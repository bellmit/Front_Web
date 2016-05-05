// JavaScript Document
$(document).ready(function(){
						  	var rinitheight=document.getElementById("remark").scrollHeight;
						  	$("#remark").css({height:rinitheight});
						   $("#remark").keyup(function(){
													   $(this).css({height:this.scrollHeight});
									});
							var rinitheight=document.getElementById("choicesend").scrollHeight;
						  	$("#choicesend").css({height:rinitheight});
						   $("#choicesend").keyup(function(){
													   $(this).css({height:this.scrollHeight});
									});

						   var rinitheight=document.getElementById("approveresult").scrollHeight;
						  	$("#approveresult").css({height:rinitheight});
						   $("#approveresult").keyup(function(){
													   $(this).css({height:this.scrollHeight});
									});
						   
						   $(".nav-zertr,.nav-firtr label,.nav-sectr label,.nav-thrtr label,.nav-foutr label,.nav-fivtr label,.nav-sixtr label,.nav-sevtr label,.nav-eigtr label,.nav-nintr label,.nav-tentr label,.nav-evetr label,.nav-twotr label").hover(function(){																																				 $(this).css({color:'red',cursor:'pointer'});																																				 },function(){
$(this).css({color:'black'});																																																																							 });
						   
						   
						   
						   
						   
						   });
