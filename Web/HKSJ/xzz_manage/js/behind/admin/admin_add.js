$(function(){
			//初始用户等级
			$.post('queryRoleByAdmin.do',function(data){
				var selObj = $("#ROLE_ID"); 
				selObj.append("<option value='-1'>请选择</option>");
				for ( var d in data) {
					selObj.append("<option value='"+data[d].ROLE_ID+"'>"+data[d].ROLE_NAME+"</option>");
				}
			})
		})
		
		function add()
		{
			if($("#ADMIN_NAME").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","账号不能为空","info",function(){document.getElementById("ADMIN_NAME").focus();});
				return;
			}
			if($("#PASSWORD").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","密码不能为空","info",function(){document.getElementById("PASSWORD").focus();});
				return;
			}
			if($("#NICKNAME").val().replace(/[ ]/g,"")=="")
			{
				$.messager.alert("提示","昵称不能为空","info",function(){document.getElementById("NICKNAME").focus();});
				return;
			}
			if($('input[name="SEX"]:checked').length==0)
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
            	  $.messager.alert("提示",'请输入有效的E_mail！',"info",function(){document.getElementById("EMAIL").focus();});
                  return;
              }
			}
			document.getElementById("baocunid").disabled="disabled";
			$.post('saveAdmin.do',$("#insertorupdForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load({start:0});
					parent.$('#windowDiv').window('close');
				}
				else if(result==0)
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