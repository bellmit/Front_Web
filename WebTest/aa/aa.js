// JavaScript Document
	   /*获取选择内容*/
				$(".ddfntbody tr td input[type='checkbox']").change(function(){
								var flag=0;
								if($(this).attr("checked")=="checked"){
										flag=1;
								}
								if($(this).attr("checked")=="undefined"){
										flag=0;
								}
																			 
								if(flag==1){
									//var arr=new Array();
									var len=$(this).parent().parent().find("td").length;
									//var str=$(this).parent().parent().find("td").text();
									var str="";
									for(var i=1;i<len-3;i++){
										var con="<td>"+$(this).parent().parent().find("td").eq(i).text()+"</td>";
										str=str+con;
									}
									str="<tr>"+str+"</tr>"
									$(".ddfnchecktr").append(str);
								}
								if(flag==0){
									var index=$(".ddfntbody tr td input[type='checkbox']").index(this)+1;	
									var ds=$(".ddfnchecktr tr td:first-child").text();
									if(index==ds){
										$(".ddfnchecktr tr").remove(index(ds));
										}
									
									//alert(ds);
								}													  
						});