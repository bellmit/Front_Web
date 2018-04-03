function add()
		{
			 
			if($("#nickname").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","昵称不能为空","info",function(){document.getElementById("nickname").focus();});
				return;
			}
			if($('input[name="sex"]:checked').length==0)
			{
				$.messager.alert("提示","性别不能为空","info");
				return;
			}
			 
			/*if($("#email").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","邮箱不能为空","info",function(){document.getElementById("email").focus();});
				return;
			}
			else
			{
			  var email = document.getElementById("email").value;
			  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(!myreg.test(email))
              {
            	  $.messager.alert("提示","请输入有效的E_mail！","info",function(){document.getElementById("email").focus();});
                  return;
              }
			}*/
			document.getElementById("baocunid").disabled="disabled";
			$.post('user/updateUser.do',$("#insertorupdForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load();
					parent.$('#windowDiv').window('close');
				}
				else if(result==2)
				{
					 $.messager.alert("提示","昵称有重复","info");
					document.getElementById("baocunid").disabled="";
				}
				else
				{
					 $.messager.alert("提示","保存失败","info");
					document.getElementById("baocunid").disabled="";
				}
			})
		}