(function($){
	$(function(){
		$("#btnSubmit").click(function () {
            //var data = { userName: "112" }
            // var data = $("#submit").serialize();
            var url = "test";
            $.ajax({
                url: url,
                data: "",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    debugger;
                    alert(data.Name);
                },
                error: function (e) {

                }
            })
        });

        $("#listYear").change(function () {
            var year = $("#listYear").val();
            var month = $("#listMonth").val();
            if (month == "2") {
                var url = "GetDayData";
                var params = { year: year, month: month };
                $.ajax({
                    url: url,
                    data: params,
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        data = data.Day.Data;
                        var str = "<select id='listDay' name='listDay'>";
                        for (var i = 0; i < data.length; i++) {
                            str += "<option value='" + data[i].Value + "'>" + data[i].Text + "</option>";
                        }
                        str += "</select>";
                        var parent = $("#listDay").parent();
                        $(parent).children().remove();
                        $(parent).append(str);
                    },
                    error: function (e) {
                        alert("系统出错，请稍后再试！");
                    }
                });
            }
        });

        $("#listMonth").change(function () {
            var year = $("#listYear").val();
            var month = $("#listMonth").val();
            var url = "GetDayData";
            var params = { year: year, month: month };
            $.ajax({
                url: url,
                data: params,
                type: "POST",
                dataType: "json",
                success: function (data) {
                    data = data.Day.Data;
                    var str = "<select id='listDay' name='listDay'>";
                    for (var i = 0; i < data.length; i++) {
                        str += "<option value='" + data[i].Value + "'>" + data[i].Text + "</option>";
                    }
                    str += "</select>";
                    var parent = $("#listDay").parent();
                    $(parent).children().remove();
                    $(parent).append(str);
                },
                error: function (e) {
                    alert("系统出错，请稍后再试！");
                }
            });
        })
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
})(jQuery);		