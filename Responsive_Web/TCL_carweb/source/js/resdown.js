$(function(){	
	/*分页选中高亮显示样式*/
	var ser_pro_pages=$("#ser_pro_pages"),bro_url=window.location.href,pagelist_info=$("#pagelist_info").text(),pagelist_arr=[];
	var current_url=bro_url.substring(bro_url.lastIndexOf('/')+1);
	if(pagelist_info!=""){
		pagelist_arr=pagelist_info.substring(0,pagelist_info.length-1).split(",");
		var plen=pagelist_arr.length;
		var last_pagevalue=pagelist_arr[plen-1].split("_")[1].split(".")[0],first_pagevalue=pagelist_arr[0].split("_")[1].split(".")[0];
		var lilist="",cur_index=0;
		var gotopagestr="<li><input name=\"pagestext\" id=\"pagestext\"/><button type=\"button\" id=\"pagesbtn\" class=\"sp_pages_last\">确 定</button></li>";
		var pagestext=$("#pagestext"),pagesbtn=$("#pagesbtn");
		/*初始化分页按钮显示*/
		if(plen<=5){ser_pro_pages.css({"width":50*(plen+2)});}
		/*分页记忆当前选中项*/
		for(var bb=0;bb<pagelist_arr.length;bb++){
			if(pagelist_arr[bb]==current_url){
				cur_index=bb+1;
				break;	
			}
		}
		/*分页数据大于9的情况*/
		if(cur_index<=5){
			var initlen=plen<9?plen:9;
			for(var aa=0;aa<initlen;aa++){
				var temp_pagelista=pagelist_arr[aa].split("_")[1];
				var temp_pagevaluea=temp_pagelista.split(".")[0];
				if(pagelist_arr[aa]==current_url){
					lilist+="<li><a style=\"color:#fff;border:1px solid #c60004;font-weight:bold;background:#c60004;\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[aa]+"/">"+temp_pagevaluea+"</a></li>";
				}else{
					lilist+="<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[aa]+"/">"+temp_pagevaluea+"</a></li>";
				}
			}
			if(plen>9){
				lilist+="<li><p>...</p></li><li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[plen-1]+"/">"+last_pagevalue+"</a></li>";
				ser_pro_pages.append(lilist+gotopagestr);
			}else{
				ser_pro_pages.append(lilist);
			}
		}else{
			var maxindex=plen-cur_index>=4?4:plen-cur_index,minindex=cur_index-5>=0?cur_index-5:plen-cur_index-1;
			for(var cc=minindex;cc<cur_index+maxindex;cc++){
				var temp_pagelistc=pagelist_arr[cc].split("_")[1];
				var temp_pagevaluec=temp_pagelistc.split(".")[0];
				if(cc==cur_index-1){
					lilist+="<li><a style=\"color:#fff;border:1px solid #c60004;font-weight:bold;background:#c60004;\" href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[cc]+"/">"+temp_pagevaluec+"</a></li>";
				}else{
					lilist+="<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[cc]+"/">"+temp_pagevaluec+"</a></li>";
				}
			}
			if(cur_index<=plen-5){
				if(plen-cur_index==5){
					lilist+="<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[plen-1]+"/">"+last_pagevalue+"</a></li>";
					ser_pro_pages.append("<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[0]+"/">"+first_pagevalue+"</a></li><li><p>...</p></li>"+lilist+gotopagestr);
				}else{
					if(cur_index==6){
						lilist+="<li><p>...</p></li><li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[plen-1]+"/">"+last_pagevalue+"</a></li>";
						ser_pro_pages.append("<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[0]+"/">"+first_pagevalue+"</a></li>"+lilist+gotopagestr);
					}else{
						lilist+="<li><p>...</p></li><li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[plen-1]+"/">"+last_pagevalue+"</a></li>";
						ser_pro_pages.append("<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[0]+"/">"+first_pagevalue+"</a></li><li><p>...</p></li>"+lilist+gotopagestr);	
					}
				}
			}else{
				if(cur_index==6){
					ser_pro_pages.append("<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[0]+"/">1</a></li>"+lilist);
				}else{
					ser_pro_pages.append("<li><a href=../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/""+pagelist_arr[0]+"/">1</a></li><li><p>...</p></li>"+lilist+gotopagestr);	
				}
			}
		}
		/*分页跳转*/
		pagestext.live("keyup",function(){
			if(/\D/.test(this.value)){
				this.value="";
			}else if(parseInt(this.value)>last_pagevalue||parseInt(this.value)<=0){
				this.value="";
			}
		})
		pagesbtn.live("click",function(){
			handle_PageTo();
		});
		pagestext.live("keydown",function(e){
			if(e.keyCode=13){
				handle_PageTo();
			}else{
				return false;
			}
		});
		function handle_PageTo(){
			var pvalues=document.getElementById("pagestext").value;
			if(pvalues==""||pvalues=="undefined"){
				return false;
			}else{
				var gotourl=bro_url.substring(0,bro_url.lastIndexOf('/')+1);
				var gotostr=gotourl+pagelist_arr[0].replace(/\d/g,pvalues);
				window.location.href=gotostr;
			}
		}
		
	}
});