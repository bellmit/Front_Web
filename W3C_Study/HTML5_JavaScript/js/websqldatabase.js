// JavaScript Document
$(function(){
	/*init params*/
	var res_arr=[];
	var res_operate_arr=[];
	var res_temp_arr=[];
	var tar_container=$("#wsql_target_parent");
	/*init data*/
	(function(){
		if(window.localStorage.getItem("target_table")!=""||window.localStorage.getItem("target_table")!=null){
			tar_container.append(window.localStorage.getItem("target_table"));
		}
	})();
	var is_target=tar_container.children().is("table");
	/*init table data*/
	/*create database*/
	var db=getDB();
	if(db){queryDB(db,$("#wsql_target"),false);}
	/*drop database*/
	$("#wsql_dropbtn").click(function(){
		if(db){
				db.transaction(function(tx){ 
				tx.executeSql("DROP TABLE yp_db_test");
			})
			$("#wsql_target").empty();
			alert("drop table success");
			return;	
		}else{
			return;	
		}
	});
	/*delete table*/
	$("#wsql_deletebtn").click(function(){
		var hasdata=0;
		var params=Number(parseInt(window.prompt("请输入序号:(数据源中的序号)","")));
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM yp_db_test",[],function(tx,result){hasdata=result.rows.length;},null);
		});
		if(params<0||(hasdata!=0&&params<1)){
			alert("序号输入错误");
			return;
		}else{
			if(db){
				 db.transaction(function(ta){ 
						ta.executeSql('DELETE FROM yp_db_test where xh=?',[params],function(result){alert("delete success");},function(tx,error){alert(error)}); 
				 }); 
				 queryDB(db,$("#wsql_target"),false);
				 return;	
			}else{
				 return;	
			}
		}
	});
	/*import data*/
	$("#wsql_importbtn").click(function(){
		if(window.localStorage.getItem("data_resource")==""||window.localStorage.getItem("data_resource")==null){
			$("#wsql_resource tr td").each(function(){
				res_arr.push($(this).find("p").text());
        	});
			window.localStorage.setItem("data_resource",res_arr);
		}
	});
	/*empty data*/
	$("#wsql_emptybtn").click(function(){
		if(window.localStorage.getItem("data_resource")!=""){
			window.localStorage.setItem("data_resource","");
		}
	});
	/*create database*/
	$("#wsql_createbtn").live("click",function(){
		var tablestr="";
		if(!is_target&&tar_container.find("table").size()<1){
			tablestr="<table cellpadding=\"0\" cellspacing=\"0\" id=\"wsql_target\"></table>";
			window.localStorage.setItem("target_table",tablestr);
			tar_container.append(tablestr);
		}else if(window.localStorage.getItem("target_table")==""){
			tablestr="<table cellpadding=\"0\" cellspacing=\"0\" id=\"wsql_target\"></table>";
			window.localStorage.setItem("target_table",tablestr);
			tar_container.append(tablestr);
		}else if(is_target&&tar_container.find("table").size()>=1){
			return;
		}
	});
	/*drop database*/
	$("#wsql_dropbtn").live("click",function(){
		var target_parent=document.getElementById("wsql_target_parent");
		if(is_target&&tar_container.find("table").size()>=1){
			target_parent.removeChild(target_parent.lastChild);
			window.localStorage.setItem("target_table","");			
		}else if(window.localStorage.getItem("target_table")!=""){
			target_parent.removeChild(target_parent.lastChild);
			window.localStorage.setItem("target_table","");
		}
	});
	/*insert database*/
	$("#wsql_insertbtn").click(function(){
		var data_resource=window.localStorage.getItem("data_resource");
		var target_table=window.localStorage.getItem("target_table");
		if(data_resource==""||data_resource==null){
			alert("没有数据源！");
			return
		}
		if(target_table==""||target_table==null){
			alert("没有数据容器！");
			return
		}
		data_resource=data_resource.split(",");
		var dataindex=$("#wsql_resource tr").size();
		var dataline=Math.ceil(data_resource.length/dataindex);
		for(var i=0;i<data_resource.length;i++){
			res_temp_arr.push(data_resource[i]);
			if(Number(i+1)%dataline==0){
				res_operate_arr.push(res_temp_arr);
				res_temp_arr=[];
			}
		}
		/*create database*/
		var db=getDB();
		/*create table*/
		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE yp_db_test(id int UNIQUE,xh int,d1 TEXT,d2 TEXT,d3 TEXT,d4 TEXT,d5 TEXT,d6 TEXT,d7 TEXT)");
		})
		/*insert database*/
		db.transaction(function(tx){
			var params=Number(parseInt(window.prompt("请输入序号:(数据源中的序号)","")));
			if(params>dataindex||params<=0){
				alert("序号输入错误");
				return;
			}
			params=params-1;
			tx.executeSql("INSERT INTO yp_db_test(xh,d1,d2,d3,d4,d5,d6,d7) values(?,?,?,?,?,?,?,?)",[res_operate_arr[params][0],res_operate_arr[params][1],res_operate_arr[params][2],res_operate_arr[params][3],res_operate_arr[params][4],res_operate_arr[params][5],res_operate_arr[params][6],res_operate_arr[params][7]]);
		})
		/*execute database(append elements)*/
		queryDB(db,$("#wsql_target"),true);
	});

	/*select database*/
	$("#wsql_selectbtn").click(function(){queryDB(db,$("#wsql_target"),false);});
});




function queryDB(db,datawrap,flags){
	if(flags){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM yp_db_test",[],function(tx,result){
				for(var i=0;i<result.rows.length;i++){
					var tr_str="<tr><td><p>"+result.rows.item(i)["xh"]+"</p></td><td><p>"+result.rows.item(i)["d1"]+"</p></td><td><p>"+result.rows.item(i)["d2"]+"</p></td><td><p>"+result.rows.item(i)["d3"]+"</p></td><td>"+result.rows.item(i)["d4"]+"</p></td><td><p>"+result.rows.item(i)["d5"]+"</p></td><td><p>"+result.rows.item(i)["d6"]+"</p></td><td><p>"+result.rows.item(i)["d7"]+"</p></td></tr>";
						datawrap.empty();
						datawrap.append(tr_str);
				}
			},null);
		});
	}else{
		datawrap.empty();
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM yp_db_test",[],function(tx,result){
				for(var i=0;i<result.rows.length;i++){
					var tr_str="<tr><td><p>"+result.rows.item(i)["xh"]+"</p></td><td><p>"+result.rows.item(i)["d1"]+"</p></td><td><p>"+result.rows.item(i)["d2"]+"</p></td><td><p>"+result.rows.item(i)["d3"]+"</p></td><td>"+result.rows.item(i)["d4"]+"</p></td><td><p>"+result.rows.item(i)["d5"]+"</p></td><td><p>"+result.rows.item(i)["d6"]+"</p></td><td><p>"+result.rows.item(i)["d7"]+"</p></td></tr>";
						datawrap.append(tr_str);
				}
			},null);
		});
	}
}

function getDB(){
		try{
			var db=window.openDatabase("yp_db","1.0","test web sql database,the source from pages table,user jquery frame",10*1024*1024);
			if(!db){
				alert("create database fail");
				return;	
			}
			return db;
		}catch(err){
			alert("fail:"+err);
			return;
		}
	}








