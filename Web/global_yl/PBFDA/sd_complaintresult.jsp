<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.net.URLEncoder" %>
<%@ taglib prefix="powercms" uri="/WEB-INF/tld/powercms.tld" %>
<%@ include file="/html/cms_template/common/taglibs.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="css/global_subpage.css"/>
<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/global_subpage.js"></script>
<meta name="description" content="浦北县食品药品监督管理局,浦北药监局,食品药品监督管理局,浦北县人民医院,药品流通领域监督管理,浦北新医改,药品投诉,医疗机构查询,药品缺陷批号,药品不良反应,药品抽送检,药品质量事故,药品企业诚信档案"/>
<meta name="keywords" content="浦北县食品药品监督管理局,浦北药监局,食品药品监督管理局,浦北县人民医院,药品流通领域监督管理,浦北新医改,药品投诉,医疗机构查询,药品缺陷批号,药品不良反应,药品抽送检,药品质量事故,药品企业诚信档案"/>
<title>浦北药监局</title>
</head>
<body>
	<div class="container">
    	<jsp:include page="/html/cms_template/powerSD/sd_head.jsp"/>
         <div class="drugscontent">
        	<div class="drugstopbox">
            	<h4>举报投诉</h4>
            </div>
            <div class="drugsmiddlebox">
            	<div class="drugsmain" title="">
                	<h4 class="drugstitle">投诉结果提交完成</h4>
                    <br>
            <tr align="center" style=""  class="trbg01"> 
              <td height=18 colspan="5" bgcolor="#FFFFFF">&nbsp;<font color="#FF0000">提交成功</font></TD>
            </tr>
            <td style=""  > 
              <td height=114 colspan="5" valign="top" bgcolor="#FFFFFF"><br>
              <p>谢谢，您的办件已提交系统</p>                  
              <p>您可以使用以下查询码，在网站上查询相关处理结果</p>
              <p>查询码：<font color=red>790872</font></p></TD>
            </tr>
            <tr align="center" >
              <td height="50" colspan="5" bgcolor="#FFFFFF">
			  	<a href="<%=request.getContextPath() %><%=templatePath %>powerSD/sd_complaint.jsp?channelId=103&siteId=${siteId}"><input type="button" value="返回"/></a>
			</td>
              </tr>                
          </table></td>
        </tr>
</table>
     <jsp:include page="/html/cms_template/powerSD/sd_footer.jsp"/>
</body>
</html>
