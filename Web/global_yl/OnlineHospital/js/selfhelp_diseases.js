// JavaScript Document
$(function(){
	/*search click*/
	var search_text=$("#sh_d_stext"),search_valid=$("#sh_d_valid");
	$("#sh_d_sbtn").click(function(){
		if(search_text.val()==""){
			search_valid.fadeIn(200).text("请输入搜索内容");
			search_valid.delay(2000).fadeOut(500);
			return false;
		}
	});
	search_text.focusin(function(){
		search_valid.text("");
	});
	/*top ul style*/
	var sh_d_main=$("#sh_d_mainitem li");
	sh_d_main.first().addClass("sh_d_lijq");
	sh_d_main.click(function(){
	 	$(this).addClass("sh_d_lijq").siblings().removeClass("sh_d_lijq");	
	});
	/*mid ul click*/
	var sh_d_sub=$("#sh_d_subitem li");
	var sh_d_target=$("#sh_d_target");
	var sh_d_targetarr=[];
	var sh_d_substr="";
	sh_d_sub.click(function(){
		var sh_d_subcurrent=$(this).find("p").text();
		sh_d_substr="<li><p>"+sh_d_subcurrent+"<span></span></p></li>";
		if(sh_d_target.find("li").size()==0){
			sh_d_targetarr.push(sh_d_subcurrent+"<span></span>");
			sh_d_target.append(sh_d_substr);
			return;
		}
		if(sh_d_target.find("li").size()>=1){
			sh_d_targetarr.push(sh_d_subcurrent+"<span></span>");
			var count_same=0;
			for(var i=0;i<sh_d_targetarr.length;i++){
				if(sh_d_subcurrent+"<span></span>"==sh_d_targetarr[i]){
					count_same++;
					if(count_same>=2){
						sh_d_targetarr.length=sh_d_targetarr.length-1;
						/*poput infos*/
						var maskbox=$("#masking_outer");
					    var mask_lay=$("#masking_bg");
					    var closebtn=$("#close_btn");
					    maskbox.show();
					    mask_lay.show();
					    mask_lay.css({width:getWH()[0],height:getWH()[1]});
						$("#error_show2").text("").text("您已经选择了");			 
						closebtn.click(function(){
								maskbox.hide();
								mask_lay.hide();
								mask_lay.css({width:0,height:0});
							});
					    $(window).resize(function(){
								mask_lay.css({width:getWH()[0],height:getWH()[1]});		 
						});
						return;
					}
				}
			}
			sh_d_target.append(sh_d_substr);
		}
	});
	/*bom ul click*/
	var sh_d_targetf=$("#sh_d_target");
	var sh_d_delarr=[];
	sh_d_targetf.find("li p span").live("click",function(e){
		var sh_d_delobj=$(e.target).closest("li");
		var sh_d_delindex=sh_d_delobj.index();
		if(sh_d_targetf.find("li").size()==1){
			sh_d_target.empty();
		}
		if(sh_d_targetf.find("li").size()>=2){
			sh_d_delarr=[];
			sh_d_delobj.siblings().each(function(){
				sh_d_delarr.push($(this).html());
			});
			sh_d_targetf.empty();
			for(var j=0;j<sh_d_delarr.length;j++){
				sh_d_targetf.append("<li>"+sh_d_delarr[j]+"</li>");
			}
		}
	});
})