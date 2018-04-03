function moveOption(e1, e2){
	try{
		for(var i=0;i<e1.options.length;i++){
			if(e1.options[i].selected){
			var e = e1.options[i];
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i=i-1;
			}
		}
		document.myform.sort.value=getvalue(document.myform.list2);
	}
	catch(e){}
}
function getvalue(geto){
	var allvalue ="";
	for(var i=0;i<geto.options.length;i++){
		allvalue +=geto.options[i].value +",";
	}
	return allvalue;
}
function changepos(obj,index)
{
	if(index==-1){
		if (obj.selectedIndex>0){
			obj.options(obj.selectedIndex).swapNode(obj.options(obj.selectedIndex-1))
		}
	}
	else if(index==1){
		if (obj.selectedIndex<obj.options.length-1){
			obj.options(obj.selectedIndex).swapNode(obj.options(obj.selectedIndex+1))
		}
	}
}
function save(){
	 $.ajax({
         type: "post",
         url: "toUpdateSort.do?sortParam="+$("#sort").val(),
         dataType: "json",
         success: function(result){
        	if(result==true){ //修改成功
     			alert("修改成功");
     			window.parent.tb.load();
     			parent.$('#windowDiv').window('close');
     		}
     		else{
     			alert("修改失败");
     			window.parent.tb.load();
     			parent.$('#windowDiv').window('close');
     		}
         }
     });
}
