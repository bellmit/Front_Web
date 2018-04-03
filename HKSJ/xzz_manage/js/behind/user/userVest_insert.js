 window.onload = function () {/*
		$.ajax({
			type : "post",
			dataType : "json",
			contentType : "application/json;charset=utf-8",
			url : "getTypeOneList.do",
			success : function(result) {	
				var listHtml = "<option value=''>请选择</option>";
				$.each(result, function(i, n) {
					listHtml += "<option value="+n.TYPEONE_ID+">"+n.TYPEONE_NAME+"</option>";
				});
				$("#VEST_ONE").html(listHtml);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.messager.alert("提示",errorThrown,"info");
			}
		});
	*/};

function add()
		{
			var name = $("#account").val().replace(/[ ]/g,"");
			
			if(name=="" || name.length < 4 || name.length > 20)
			{
				$.messager.alert("提示","账号名称长度为4~12位","info",function(){document.getElementById("account").focus();});
				return;
			}
			else
			{
				var t = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
				if(!t.test(name)){  
					$.messager.alert("提示","账号须以英文字母开头,只能包含字母、数字或下划线!","info",function(){document.getElementById("account").focus();});
					return;
				}
			}
			
			var password = $("#password").val().replace(/[ ]/g,""); 
			
			if(password=="" || password.length < 8 || password.length > 16){
				$.messager.alert("提示","密码长度为8~16位","info",function(){document.getElementById("password").focus();});
				return;
			} 
			
			if($("#nickname").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","昵称不能为空","info",function(){document.getElementById("nickname").focus();});
				return;
			}
			
		/*	if($("#attributeAdmin").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","关联运营账户不能为空","info",function(){document.getElementById("attributeAdmin").focus();});
				return;
			} */
			 
			/*if($('input[name="SEX"]:checked').length==0)
			{
				$.messager.alert("提示","性别不能为空","info");
				return;
			}
			if($("#EMAIL").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","邮箱不能为空","info",function(){document.getElementById("EMAIL").focus();});
				return;
			}
			else
			{
			  var email = document.getElementById("EMAIL").value;
			  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(!myreg.test(email))
              {
            	  $.messager.alert("提示","请输入有效的E_mail！","info",function(){document.getElementById("EMAIL").focus();});
                  return;
              }
			}
			if($("#VEST_ONE").val().replace(/[ ]/g,"")==""){
				$.messager.alert("提示","类型不能为空","info",function(){document.getElementById("VEST_ONE").focus();});
				return;
			}*/
			document.getElementById("baocunid").disabled="disabled";
			var da = $("#insertorupdForm").serialize();
			console.log(da);
		 	$.post('user/save.do',da,function(result){
				if(result==1) //修改成功
				{
					 window.parent.tb.load();
					 parent.$('#windowDiv').window('close');
				}
				else if(result==2)
				{
					 $.messager.alert("提示","登录名、昵称有重复","info");
					document.getElementById("baocunid").disabled="";
				}
				else
				{
					 $.messager.alert("提示","保存失败","info");
					document.getElementById("baocunid").disabled="";
				}
			})
		}