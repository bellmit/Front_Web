// JavaScript Document
$(function(){
		var exc_btn=document.getElementById("insert_btn");/*执行按钮*/
		var i_rows=document.getElementById("insertrows").value;/*行数*/
		var i_columns=document.getElementById("insertcolumns").value;/*列数*/
	exc_btn.onclick=function(){
		if(i_rows==""||i_columns==""){
			var i_p=document.createElement("p").appendChild(document.createTextNode("这是个一行一列的表格"));
			var i_td=document.createElement("td").appendChild(i_p);
			var i_tr=document.createElement("tr").appendChild(i_td);
			var i_table=document.createElement("table").appendChild(i_tr);
			document.getElementById("node_info_show").appendChild(i_table);
		}else{
			i_rows=Number(i_rows);
			i_columns=Number(i_columns);
			if(i_rows==0&&i_columns==0){
				i_rows=1;
				i_columns=1;
				var i_p=document.createElement("p").appendChild(document.createTextNode("这是个一行一列的表格,还是"));
				var i_td=document.createElement("td").appendChild(i_p);
				var i_tr=document.createElement("tr").appendChild(i_td);
				var i_table=document.createElement("table").appendChild(i_tr);
				document.getElementById("node_info_show").appendChild(i_table);
			}
			if(i_rows>10&&i_columns>10){
				i_rows=10;
				i_columns=10;
				var i_table=document.createElement("table");
				for(var i=0;i<i_rows;i++){
					for(var j=0;j<i_columns;j++){
						var i_p=document.createElement("p").appendChild(document.createTextNode("行:"+i+"列:"+j));
						var i_td=document.createElement("td").appendChild(i_p);
						var i_tr=document.createElement("tr").appendChild(i_td);
					}
					i_table.appendChild(i_tr);
				}
				document.getElementById("node_info_show").appendChild(i_table);
			}else{
				var i_table=document.createElement("table");
				for(var i=0;i<i_rows;i++){
					for(var j=0;j<i_columns;j++){
						var i_p=document.createElement("p").appendChild(document.createTextNode("行:"+i+"列:"+j));
						var i_td=document.createElement("td").appendChild(i_p);
						var i_tr=document.createElement("tr").appendChild(i_td);
					}
					i_table.appendChild(i_tr);
				}
				document.getElementById("node_info_show").appendChild(i_table);
			}
		}	
	}	
});
