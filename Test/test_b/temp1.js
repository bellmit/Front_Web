//open db:
db = openDatabase("ToDo", "0.1", "A list of to do items.", 200000); 


//db is null:
if(!db)  
alert("Failed to connect to database."); 


//select db:
db.transaction(function(tx){
	tx.executeSql("SELECT COUNT(*) FROM ToDo",[],function(result){},function(tx, error){}); 
});

//select db fail:
db.transaction(function(tx){
	tx.executeSql("SELECT COUNT(*) FROM ToDo",[],null,function(tx,error){
			tx.executeSql("CREATE TABLE ToDo (id REAL UNIQUE,label TEXT,timestamp REAL)",[],null,null);
		});
	}); 
     
//insert db:
//1:
db.transaction(function(tx){
	tx.executeSql("INSERT INTO ToDo (label,timestamp) values(?,?)",[label,new Date().getTime()], null, null);
}); 
//2:
db.transaction(function(tx){
	tx.executeSql("INSERT INTO ToDo (label, timestamp) values "("Test", 1265925077487));
}); 
//INSERT INTO ToDo (label, timestamp) values ("Test", 1265925077487) 

//execute result:
db.transaction(function(tx){
	tx.executeSql("SELECT * FROM ToDo",[],function(tx, result){
		for(var i = 0;i< result.rows.length;i++){
			document.write('<b>'+result.rows.item(i)['label']+'</b><br/>');
			}
		},null);
}); 



/*

<canvas id="canvas" class="showcanvas">
	<img alt="no html5 tag" src="images/no-html5.png" id="notags" class="notags" />
</canvas>

<div id="showcanvas" class="showcanvas"></div>

if(!canvas.getContext){
	document.getElementById("notags").style.display="block";
	return;
}

var c=document.createElement("canvas");
var wraps=document.getElementById("showcanvas");
c.id="canvas";
var nodeimgs=document.createElement("img");
nodeimgs.alt="no html5 tag";
nodeimgs.src="images/no-html5.png";
nodeimgs.id=nodeimgs.className="notags";
if(!c.getContext){
	nodeimgs.style.display="block";
	wraps.style.backgroundColor="#fff";
	wraps.appendChild(c.appendChild(nodeimgs));
}
wraps.appendChild(c);

*/