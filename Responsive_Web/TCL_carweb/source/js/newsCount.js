$(function() {
	var url = $("#deskpath").val() + "/news/doupdateNews?callBack=?&pk="+ new Date().getTime();// 获取访问前端的路径
	var data = {
		seqid : $("#seqid").val()
	};
	$.getJSON(url, data, function(json) {
		if(json.success){
			$("#readtimes").text(json.num);
		};
	});

});