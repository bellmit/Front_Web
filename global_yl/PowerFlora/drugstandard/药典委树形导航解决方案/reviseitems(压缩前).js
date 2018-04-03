// JavaScript Document
$(function(){
	/*init formdata*/
	var initlen=0;
	if(typeof(reviseItemsArr)=="undefined"||reviseItemsArr==null){
		initlen=0;
	}else{
		initlen=reviseItemsArr.length;
	};
	var del_arr=reviseItemsArr.slice(0);
	var initstr=delstr="<colgroup><col class=\"ds_rig1_inner\"/><col class=\"ds_rig2_inner\"/><col class=\"ds_rig3_inner\"/><col class=\"ds_rig4_inner\"/></colgroup>";
	var textlength=document.getElementById("length");
	var initwrap=$("#dsstep2_inner");
	if(initlen>=1){
		var initarr=[];
		initwrap.empty();
		for(var k=0;k<initlen;k++){
			initarr.push(initdata(k,reviseItemsArr));
		}
		initwrap.append(initstr+initarr);
	}
		
	/*create element*/
	var tr_str="";
	$("#add_items").live("click",function(){
		var current_index=0;
		var next_index_id=$("#ds_itemstarget_"+current_index).next().attr("id");
		while(typeof(next_index_id)!="undefined"){
			current_index++;
			next_index_id=$("#ds_itemstarget_"+current_index).next().attr("id");
		}
		tr_str="<tr id=\"ds_itemstarget_"+Number(current_index+1)+"\"><td><label class=\"main_name\">事项:</label></td><td><div class=\"ri_tree\"><input type=\"hidden\" value=\""+Number(current_index+1)+"\" name=\"zoneId_"+Number(current_index+1)+"\" id=\"zoneid_"+Number(current_index+1)+"\" readonly=\"readonly\" /><input type=\"text\" value=\"\" name=\"zoneName_"+Number(current_index+1)+"\" id=\"zonename_"+Number(current_index+1)+"\" /><button type=\"button\" onclick=\"showMenuZone("+Number(current_index+1)+")\">选择</button><div id=\"zoneContent_"+Number(current_index+1)+"\" class=\"list\"><ul id=\"treeZone_"+Number(current_index+1)+"\" class=\"ztree\"></ul></div></div></td><td><div class=\"originalwrap\"><label  for=\"original_"+Number(current_index+1)+"\">原文:</label><textarea name=\"original_"+Number(current_index+1)+"\" id=\"original_"+Number(current_index+1)+"\"></textarea></div><div class=\"revisewrap\"><label for=\"revise_"+Number(current_index+1)+"\">修订:</label><textarea name=\"revise_"+Number(current_index+1)+"\" id=\"revise_"+Number(current_index+1)+"\"></textarea></div></td><td><p class=\"delitems\" id=\"delitems_"+Number(current_index+1)+"\">删除</p></td></tr>";
		$("#ds_itemstarget_"+current_index).after(tr_str);
		textlength.value=initwrap.find("tr").size();
	});
	
	/*delete element*/
	initwrap.find("tr td p").live("click",function(){
		var del_dataarr=[];
		var delid=$(this).attr("id").split("_")[1];
		if(initlen>=1){/*有初始化数据情况*/
			var islen=parseInt(delid)+1;
			if(islen>initlen){/*删除的无数据项*/
				$("#ds_itemstarget_"+delid).remove();
			}else if(islen<=initlen){/*删除的有数据项*/
				del_arr.splice(delid,1);
				initwrap.empty();
				for(var m=0;m<del_arr.length;m++){
					del_dataarr.push(initdata(m,del_arr));
				}
				initwrap.append(delstr+del_dataarr);
			}
		}else{/*没有初始化数据情况*/
			$("#ds_itemstarget_"+delid).remove();
			
		}
		textlength.value=initwrap.find("tr").size();
	});
	
	/*submit click valid*/
	var inputarr=[];
	var areaarr=[];
	var datalen=0;
	var inputtext="";
	var areatext1=areatext2="";
	$("#savebtn2").live("click",function(){
		textlength.value="";
		inputarr=[];
		areaarr=[];
		areatext1=areatext2="";
		datalen=initwrap.find("tr").size();
		initwrap.find("tr").each(function(){
			inputtext=$(this).find("input[type='text']").val();
			areatext1=$(this).find("textarea:first").val();
			areatext2=$(this).find("textarea:last").val();
			if(inputtext!=""){
				inputarr.push(inputtext);	
			}
			if(areatext1!=""&&areatext2!=""){
				areaarr.push(areatext1);
				areaarr.push(areatext2);	
			}
        });
		if(inputarr.length!=datalen){
			alert("请选择事项");
			return false;
		}else if((areaarr.length/2)!=datalen){
			alert("请填写\"原文信息\" 或者 \"修订信息\"");
			return false;
		}else{
			textlength.value=inputarr.length;
			$("#reviseitems").submit();
		}
	});
	/*textarea css*/
	initwrap.find("textarea").live("mouseover mouseout",function(e){
		 if(e.type=="mouseover"){
			 if($(this).height()>100){
				return false;	
			 }else{
				$(this).animate({
					height:"200px"
				},500);
			 } 
		 }
		 if(e.type=="mouseout"){
			 if($(this).height()<200){
				return false;	
			 }else{
				$(this).animate({
					height:"100px"
				},300);
			 }
		 }
	});
});

/*init data*/
function initdata(steps,arrs){
			var initdata_a="";
			var initdata_b="";
			if(steps==0){
				initdata_a="<tr id=\"ds_itemstarget_"+steps+"\"><td><label class=\"main_name\">事项:</label></td><td><div class=\"ri_tree\"><input type=\"hidden\" value=\""+arrs[steps][3]+"\" name=\"zoneId_"+steps+"\" id=\"zoneid_"+steps+"\" readonly=\"readonly\" /><input type=\"text\" value=\""+arrs[steps][0]+"\" name=\"zoneName_"+steps+"\" id=\"zonename_"+steps+"\"/><button type=\"button\" onclick=\"showMenuZone("+steps+")\">选择</button><div id=\"zoneContent_"+steps+"\" class=\"list\"><ul id=\"treeZone_"+steps+"\" class=\"ztree\"></ul></div></div></td><td><div class=\"originalwrap\"><label  for=\"original_"+steps+"\">原文:</label><textarea name=\"original_"+steps+"\" id=\"original_"+steps+"\">"+arrs[steps][2]+"</textarea></div><div class=\"revisewrap\"><label for=\"revise_"+steps+"\">修订:</label><textarea name=\"revise_"+steps+"\" id=\"revise_"+steps+"\">"+arrs[steps][1]+"</textarea></div></td><td>&nbsp;</td></tr>"
			}else if(steps>=1){
				initdata_b+="<tr id=\"ds_itemstarget_"+steps+"\"><td><label class=\"main_name\">事项:</label></td><td><div class=\"ri_tree\"><input type=\"hidden\" value=\""+arrs[steps][3]+"\" name=\"zoneId_"+steps+"\" id=\"zoneid_"+steps+"\" readonly=\"readonly\" /><input type=\"text\" value=\""+arrs[steps][0]+"\" name=\"zoneName_"+steps+"\" id=\"zonename_"+steps+"\"/><button type=\"button\" onclick=\"showMenuZone("+steps+")\">选择</button><div id=\"zoneContent_"+steps+"\" class=\"list\"><ul id=\"treeZone_"+steps+"\" class=\"ztree\"></ul></div></div></td><td><div class=\"originalwrap\"><label  for=\"original_"+steps+"\">原文:</label><textarea name=\"original_"+steps+"\" id=\"original_"+steps+"\">"+arrs[steps][2]+"</textarea></div><div class=\"revisewrap\"><label for=\"revise_"+steps+"\">修订:</label><textarea name=\"revise_"+steps+"\" id=\"revise_"+steps+"\">"+arrs[steps][1]+"</textarea></div></td><td><p class=\"delitems\" id=\"delitems_"+steps+"\">删除</p></td></tr>"
			}
			return initdata_a+initdata_b;
}