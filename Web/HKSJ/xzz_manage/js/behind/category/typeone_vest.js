//选择的行数据
		var r = window.parent.select;
		$(function(){
			$("#VEST_ONE").val(r.typeoneId);
		});	
	
		function add()
		{
			var name=$("#USER_NAME").val().replace(/[ ]/g,"");
			if(name=="" || name.length < 6 || name.length > 20)
			{
				$.dialog.alert("账号名称长度为6~12位!",function(){document.getElementById("USER_NAME").focus();});
				return;
			}
			else
			{
				var t = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
				if(!t.test(name)){  
					$.dialog.alert("账号须以英文字母开头,只能包含字母、数字或下划线!",function(){document.getElementById("USER_NAME").focus();});
					return;
				}
			}
			if($("#NICK").val().replace(/[ ]/g,"")=="")
			{
				$.dialog.alert("昵称不能为空",function(){document.getElementById("NICK").focus();});
				return;
			}
			var psword=$("#PASSWORD").val().replace(/[ ]/g,"");
			if(psword=="" || psword.length<8 || psword.length>16)
			{
				$.dialog.alert("密码长度为8~16位!",function(){document.getElementById("PASSWORD").focus();});
				return;
			}
			document.getElementById("baocunid").disabled="disabled";
			$.post('insertVestUser.do',$("#insertorupdForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load();
					parent.$('#windowDiv').window('close');
				}
				else if(result==0)
				{
					$.messager.alert("提示","账号名称或昵称已存在","info");
					document.getElementById("baocunid").disabled="";
				}
				else
				{
					$.messager.alert("提示","保存失败","info");
					document.getElementById("baocunid").disabled="";
				}
			})
		}