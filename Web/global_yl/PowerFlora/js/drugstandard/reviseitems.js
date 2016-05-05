// JavaScript Document
$(function(){
	var tr_str="";
	$("#add_items").live("click",function(){
		var current_index=0;
		var next_index_id=$("#ds_itemstarget_"+current_index).next().attr("id");
		while(typeof(next_index_id)!="undefined"){
			current_index++;
			next_index_id=$("#ds_itemstarget_"+current_index).next().attr("id");
		}
		tr_str="<tr id=\"ds_itemstarget_"+Number(current_index+1)+"\" class=\"item_format\"><td><label class=\"main_name\">事项:</label></td><td><div class=\"ri_tree\"><select name=\"items\" id=\"items_"+Number(current_index+1)+"\"><option value=\"1\">462</option><option value=\"2\">2452</option><option value=\"3\">24352</option><option value=\"4\">2452</option></select></div></td><td><label class=\"main_name\" for=\"original_"+Number(current_index+1)+"\">原文:</label></td><td><textarea name=\"original"+Number(current_index+1)+"\" id=\"original_"+Number(current_index+1)+"\"></textarea></td><td><label class=\"main_name\" for=\"revise_"+Number(current_index+1)+"\">修订:</label></td><td><textarea name=\"revise"+Number(current_index+1)+"\" id=\"revise_"+Number(current_index+1)+"\"></textarea></td><td>&nbsp;</td></tr>";
		$("#ds_itemstarget_"+current_index).after(tr_str);
	});
});