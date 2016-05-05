<?xml version="1.0" encoding="utf-8"?>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.net.URLEncoder" %>
<%@ taglib prefix="powercms" uri="/WEB-INF/tld/powercms.tld" %>
<%@ include file="/html/cms_template/common/taglibs.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
<head>
<%
  String path = request.getRequestURI();
  String basePath = request.getScheme() + "://"
          + request.getServerName() + ":" + request.getServerPort()
          + path;
  java.util.List list = cn.glmedical.powersd.bsn.service.util.WebsiteServiceUtil.fingPagePassPlainType();
  request.setAttribute("list",list);
%>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta http-equiv="Content-Language" content="zh-CN" />
<meta content="all" name="robots" />
<link type="text/css" rel="stylesheet" href="css/global_subpage.css"/>
<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/global_subpage.js"></script>
<script type="text/javascript" src="js/global_menustyle.js"></script>
<script type="text/javascript" src="js/jquery.metadata.js"></script>
<script type="text/javascript" src="js/jquery.validate.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script> 
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script> 
<meta name="description" content="浦北县食品药品监督管理局,浦北药监局,食品药品监督管理局,浦北县人民医院,药品流通领域监督管理,浦北新医改,药品投诉,医疗机构查询,药品缺陷批号,药品不良反应,药品抽送检,药品质量事故,药品企业诚信档案"/>
<meta name="keywords" content="浦北县食品药品监督管理局,浦北药监局,食品药品监督管理局,浦北县人民医院,药品流通领域监督管理,浦北新医改,药品投诉,医疗机构查询,药品缺陷批号,药品不良反应,药品抽送检,药品质量事故,药品企业诚信档案"/>
<title>浦北药监局</title>
<script> 
  /*校验增加*/
  $(document).ready(function(){
		$("#complainForm").validate({
			rules:{
				'plainmanage.complainTitle': {   
	                required: true ,
	                maxlength :60
                },
            	'drugname': {   
                	required: true 
            	},
            	'ctypeId': {   
                	required: true 
            	},
            	'plainmanage.total': {   
	                required: true ,
	                payCount: true,
	                maxlength :12
                },
                'plainmanage.serial': {   
	                required: true , 
	                maxlength :20
                },
                'plainmanage.manufactured': {   
	                required: true
                },
                'plainmanage.expiry': {   
	                required: true
                },
                'custName': {   
                	required: true 
            	},
            	'plainmanage.complainAntName': {   
                	required: true,
                	maxlength :60 
            	},
            	'plainmanage.complainAntContac': {   
                	required: true,
                	maxlength :1000 
            	},
            	'plainmanage.complainContent': {   
                	required: true,
                	maxlength :1000 
            	},
            	'jpegCode': {   
                	required: true
            	}
		   },
		   messages:{ 
           		'drugname': {   
                	required: "药品必须选择一个!"   
          		},
          		'plainmanage.complainTitle': {   
	                required: "标题不能为空!" ,
	                maxlength: $.format("标题最多{0}个字符！")
           		},
          		'ctypeId': {   
                	required: "投诉类型必须选择一个!"   
          		},
          		'plainmanage.total': {   
	                required: "数量不能为空!" ,
	                maxlength: $.format("标题最多{0}个字符！"),  
	                payCount : "请输入有效数字!"
           		},
           		'plainmanage.serial': {   
	                required: "批号不能为空!" ,
	                maxlength: $.format("标题最多{0}个字符！")
           		},
           		'plainmanage.manufactured': {   
	                required: "生产日期不能为空!"
           		},
           		'plainmanage.expiry': {   
	                required: "有效期限不能为空!"
           		},
           		'custName': {   
                	required: "药店必须选择一个!"   
          		},
          		'plainmanage.complainAntName': {   
                	required: "投诉者不能为空!",
                	maxlength: $.format("标题最多{0}个字符！")   
          		},
          		'plainmanage.complainAntContac': {   
                	required: "联系方式不能为空!",
                	maxlength: $.format("标题最多{0}个字符！")   
          		},
          		'plainmanage.complainContent': {   
                	required: "投诉内容不能为空!",
                	maxlength: $.format("标题最多{0}个字符！")   
          		},
          		'jpegCode': {   
                	required: "验证码不能为空!"
          		}
		   }
		   //errorPlacement: function(error, element) {  //验证消息放置的地方   
               //error.appendTo( element.parent("td").next("td") );   
           //}
		});
	}); 
</script>
</head>
<body>
	<div class="container">
    	<jsp:include page="/html/cms_template/powerSD/sd_head.jsp"/>
        <div class="cptcontent">
        	<div class="cpttopbox">
            	<h4>举报投诉</h4>
            </div>
            <div class="cptbottombox">
            	<p>请填写药品质量投诉表，以此维护您的用药合法权利，我们将会进行调查审定，查处属实后一定严厉处罚.</p>
                <div class="cptforms">
                	<form id="complainForm" method="post" action="${base}/sdplat/plain/palinInfoSave.action">
                    	<table border="0" cellspacing="0" cellpadding="0" class="cpttable">
                    	<input name="siteId" type="hidden"  value="${param.siteId}"/>
                    	<input name="channelId" type="hidden"  value="${param.channelId}"/>
                    	  <tr>
							<input name="plainmanage.complainTitle" type="hidden"  value="<%=request.getParameter("plainmanage.complainTitle") %>"/>
							<input name="plainmanage.ctypeId" type="hidden"  value="<%=request.getParameter("plainmanage.ctypeId") %>"/>
							<input name="plainmanage.artId" type="hidden"  value="<%=request.getParameter("plainmanage.artId") %>"/>
							<input name="drugname" type="hidden"  value="<%=request.getParameter("drugname") %>"/>
							<input name="spec" type="hidden"  value="<%=request.getParameter("spec") %>"/>
							<input name="factory" type="hidden"  value="<%=request.getParameter("factory") %>"/>
							<input name="unit" type="hidden"  value="<%=request.getParameter("unit") %>"/>
							<input name="plainmanage.total" type="hidden"  value="<%=request.getParameter("plainmanage.total") %>"/>
							<input name="plainmanage.serial" type="hidden"  value="<%=request.getParameter("plainmanage.serial") %>"/>
							<input name="manufactured" type="hidden"  value="<%=request.getParameter("manufactured") %>"/>
							<input name="expiry" type="hidden"  value="<%=request.getParameter("expiry") %>"/>
							<input name="plainmanage.custId" type="hidden"  value="<%=request.getParameter("plainmanage.custId") %>"/>
							<input name="custName" type="hidden"  value="<%=request.getParameter("custName") %>"/>
							<input name="plainmanage.buyPlace" type="hidden"  value="<%=request.getParameter("plainmanage.buyPlace") %>"/>
							<input name="plainmanage.complainContent" type="hidden"  value="<%=request.getParameter("plainmanage.complainContent") %>"/>
							<input name="plainmanage.notes" type="hidden"  value="<%=request.getParameter("plainmanage.notes") %>"/>
                          </tr> 
                        <colgroup class="cpttfir"></colgroup>
                        <colgroup class="cpttsec"></colgroup>
                        <colgroup class="cpttthr"></colgroup>
                        <colgroup class="cpttfou"></colgroup>
                        <colgroup class="cpttfiv"></colgroup>
                        <colgroup class="cpttlas"></colgroup>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cptman">投&nbsp;诉&nbsp;者</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="plainmanage.complainAntName" type="text" class="cptman" id="cptman" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                            <td><span>*</span></td>
                            <td><label for="cptcontact">联系方式</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="plainmanage.complainAntContac" type="text" class="cptcontact" id="cptcontact" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                          </tr>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cptvalid">验&nbsp;证&nbsp;码</label></td>
                            <td colspan="4"><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="jpegCode" type="text" class="cptvalid" id="jpegcode" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/>&nbsp;&nbsp;&nbsp;&nbsp;<img class="cptvalidimg" id="cptvalidimg" alt="" src="${base}/validateCode"/>${warnMessage}</td>
                          </tr>

                          <tr>
                          	<td><span></span></td>
                            <td></td>
                            <td colspan="4"><input name="cptsubmit" type="submit" class="cptsubmit"  id="cptsubmit" value="下&nbsp;步"/><span class="cptsubremark">(药品投诉提交之后，质量监察员审查通过之后发布，并及时更新处理流程，通知投诉人并接受公众监督。)</span></td>
                          </tr>
                        </table>    
                  	</form>
                </div>
            </div>
        </div>
	</div>
    <jsp:include page="/html/cms_template/powerSD/sd_footer.jsp"/>
</body>
</html>
