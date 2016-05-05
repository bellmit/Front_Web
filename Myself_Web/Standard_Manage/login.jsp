<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ include file="common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="湖南省标准化管理系统,标准化管理系统,电子政务管理" />
<meta name="keywords" content="湖南省标准化管理系统,标准化管理系统,电子政务管理" />
<link type="text/css" rel="stylesheet" href="css/login.css" />
<title>欢迎使用全球锁医疗科技内容管理系统</title>
</head>
<body>
	<div class="container">
		<div class="header">
        	<h4>湖南标准化管理系统</h4>
        </div>
    	<div class="content">
        	<div class="nav_login">
            	<div class="nav_form">
                	<h3>欢迎使用信息管理系统</h3>
                    <div class="nav_msg">${msg}</div>
                    <form action="${base}/login.action" name="loginPage" method="post">
                        	<div class="nav_username"><label for="userCode">用户名:</label><input id="userCode" class="input" name="userCode" type="text" value="system" /></div>
                            <div class="nav_password"><label for="password">密&nbsp;&nbsp;码:</label><input id="password" class="input" name="password" type="password" value="123456" /></div>
                            <div class="nav_verify"><label for="JPEGCODE">验证码:</label><input id="jpegcode" class="input" name="JPEGCODE" type="jpegcode" value="" /><img src="${base}/validateCode"/></div>
                            <div class="nav_submit"><input class="formbutton" onclick="login()" name="login"  type="button" value="登&nbsp;录" /></div>
                            <div class="nav_checked"><label for="RememberMe">记住我:</label><input class="check" name="RememberMe" value="1" type="checkbox" /></div>
                  </form>
                </div>
                
                <div class="nav_infos">
                	<div class="infos_more">
                    	<h3>更多信息</h3>
                    	<p>欢迎使用信息系统, 需要了解更多的内容, 请登录系统, 系统通过菜单的分类能让您很快熟悉它.</p>
                    </div>
                    <div class="infos_counter">
                        <h3>账号支持</h3>
                        <p>如果您忘记了密码,请与管理员联系,管理员将会帮助您重置密码!如果您没有账号,请向部门负责人提交账号开通申请.</p>
                    </div>
                    <div class="infos_links">
                        <h3>Local Accounts</h3>
                        <p>Want to access a local mailbox?<a href="javascript:switchtype()">Click here</a> to access the login page for local system accounts</p>
                    </div>
                    <div class="infos_system">
                        <h3>系统支持</h3>
                        <p>如果您在使用系统的过程中有什么疑问可以联系信息管理部</p>
                    </div>
                    <div class="infos_help">
                     	<a href="#" title="信息系统" target="_blank">Powered by CEIP - The Enterprise Information Portal</a>
                    </div>
                	
                    
                    
                   
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
    	<script type="text/javascript">
  
	  function login(){ 
		return true;
	  }
</script>
</body>
</html>
