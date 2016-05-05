// JavaScript Document
$(document).ready(function(){
						  	var rinitheight=document.getElementById("resolvent").scrollHeight;
						  	$("#resolvent").css({height:rinitheight});
						   $("#resolvent").keyup(function(){
													   $(this).css({height:this.scrollHeight});
									});
							var rinitheight=document.getElementById("mind").scrollHeight;
						  	$("#mind").css({height:rinitheight});
						   $("#mind").keyup(function(){
													   $(this).css({height:this.scrollHeight});
									});

						   var rinitheight=document.getElementById("result").scrollHeight;
						  	$("#result").css({height:rinitheight});
						   $("#result").keyup(function(){
													   $(this).css({height:this.scrollHeight});
									});
						   
						   $(".nav-firtr label,.nav-sectr label,.nav-thrtr label,.nav-foutr label,.nav-fivtr label,.nav-sixtr label").hover(function(){																																				 $(this).css({color:'red',cursor:'pointer'});																																				 },function(){
$(this).css({color:'black'});																																																																							 });
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   });
