// JavaScript Document
$(function(){
	//jQuery.param test
	$("#test1btn").click(function(){
		var obj1={jquery_param:520,parameter_serialize:888};
		$("#test1text").val("jquery_param:"+obj1.jquery_param+",parameter_serialize:"+obj1.parameter_serialize);
		$("#test1show").text($.param(obj1));
	});
	//jQuery.trim test
	$("#test2btn").click(function(){
		var str2=$("#test2text").val();
		$("#test2show").text($.trim(str2));
		$("#test2show1").text(allTrim(str2));
	});
	//jQuery.type test
	$("#test3btn").click(function(){
		var arr3=$("#test3text").val().split(",");
		var arr3f=[];
		arr3f.push("jQuery.type("+arr3[0]+")==="+$.type(true));
		arr3f.push("jQuery.type("+arr3[1]+")==="+$.type(520));
		arr3f.push("jQuery.type("+arr3[2]+")==="+$.type("type test"));
		arr3f.push("jQuery.type("+arr3[3]+")==="+$.type(function(){}));
		arr3f.push("jQuery.type("+arr3[4]+")==="+$.type([]));
		arr3f.push("jQuery.type("+arr3[5]+")==="+$.type(new Date()));
		arr3f.push("jQuery.type("+arr3[6]+")==="+$.type(/test/));
		arr3f.push("jQuery.type("+arr3[7]+")==="+$.type(null));
		arr3f.push("jQuery.type("+arr3[8]+")==="+$.type(undefined));
		$("#test3show").text(arr3f);
	});
	//jQuery.isNumeric test
	$("#test4btn").click(function(){
		var arr4=$("#test4text").val().split(",");
		var arr4f=[];
		for(var i=0;i<arr4.length;i++){
			arr4f.push("  jQuery.isNumeric("+arr4[i]+")的结果为:"+$.isNumeric(arr4[i]));
		}
		$("#test4show").text(arr4f);
	});
	//jQuery.contains test
	$("#test5btn").click(function(){
		$("#test5show").text($.contains(document.getElementById("jq_test"),document.getElementById("test5btn")));
		$("#test5show1").text($.contains(document.getElementById("test5btn"),document.getElementById("jq_test")));
	});
	//jQuery.merge(unique) test
	$("#test6btn").click(function(){
		var arr6=$("#test6text").val().split(",");
		var arr6f=$("#test6text1").val().split(",");
		$("#test6show").text($.merge(arr6,arr6f));
		$("#test6show1").text($.unique($.merge(arr6,arr6f)).reverse());
	});
	//jQuery.inArray test
	$("#test7btn").click(function(){
		var arr7=$("#test7text").val().split(",");
		var find7=window.prompt("请输入需要查找的内容:","");
		if($.inArray(find7,arr7)!=-1){
			switch(find7){
				case "丹妹子":$("#test7show").text("哟西!  '"+find7+"'！ 我喜欢你呃,呵呵!");
				break;
				case "涛爷小朋友":$("#test7show").text(find7+"'！ 得赶紧找个嫂子");
				break;
				case "老邓":$("#test7show").text(find7+"！ 一个好男人,未婚的女青年们,赶紧下手吧!!!");
				break;
				case "饶博士":$("#test7show").text(find7+"！ 有点像憨豆,不过人挺好的.");
				break;
				case "丹丹":$("#test7show").text("亲爱的'"+find7+"'. 一个内向的小朋友,挺喜欢她的,可惜高攀不起.");
				break;
				case "猴子":$("#test7show").text(find7+"！ 那家伙尽干坏事.太坏了!");
				break;
				default:$("#test7show").text("恭喜您! 您要查找的内容 '"+find7+"' 在数据集合中.");
			}
		}else{
			$("#test7show").text("对不起,您要查找的内容 '"+find7+"' 不在数据集合中!");
		}
	});
	//jQuery.map test
	$("#test8btn").click(function(){
		var newarr8=["饶博士","老邓","涛爷小朋友","丹妹子","丹丹","猴子","实施四金刚","小贺","小易"];
		var targetval=$("#test8text1");
		targetval.val("");
		var arr8=$("#test8text").val().split(",");
		var arr8f=[];
		var mapPrintCount=window.prompt("您要添加内容的个数(正整数):","");
		for(var i=0;i<mapPrintCount;i++){
			arr8f.push(i);
		}
		var tgcontent=$.merge(arr8,$.map(arr8f,function(){
			return window.prompt("您要分别添加的具体内容:","");
		}))
		for(var j=0;j<tgcontent.length;j++){
			if($.inArray(tgcontent[j],newarr8)!=-1){
				targetval.css({"color":"#0f6","text-decoration":"underline"});
				targetval.val(tgcontent);
			}else{
				targetval.css({"color":"#f00","text-decoration":"none"});
				targetval.val(tgcontent);	
			}
		}
	});
	//jQuery.grep test
	$("#test9btn").click(function(){
		var arr9=$("#test9text").val().split(",");
		$("#test9text1").val("").val($.grep(arr9,function(m){return m>0;},false));
	});
	//jQuery.each test
	$("#test10btn").click(function(){
		var arr10=$("#test10text").val().split(",");
		$.each(arr10,function(keys,maps){alert(maps);});
	});
	$("#test10btn1").click(function(){
		var arr10f=[];
		$("#test10ul li").each(function(){arr10f.push($(this).text());});
		alert(arr10f);
	});
	
	
	
	
	
	
	
	//other codes
});