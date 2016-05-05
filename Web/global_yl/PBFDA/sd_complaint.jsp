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
                	<h4 class="drugstitle">投诉须知</h4>
                    <br>
            <form action="sd_complaintshow.jsp?channelId=103&siteId=${siteId}" method="post" name="theFormS" style="margin:0px">
              <table width="90%" border="0" cellpadding="1" cellspacing="1" class="formTable">
              <tr>
                <td width="18%" align="right" bgcolor="#B2DCFE">请输入查询码：
                </td>
                <td width="82%" bgcolor="#EFEFEF"><input type="text" name="scSearchkey" size="40" value="" id="scSearchkey"/>
                  <input type="submit" value="查询处理结果">
                </td>
              </tr>
            </table>
          </form>
            <br>
<table width="990" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td style="padding-top:15px; padding-bottom:15px;"><table width="941" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td valign="top" class="wsxfxz_contet">　　欢迎您通过&quot;广东省食品药品监督管理局网上信访&quot;栏目向我局提出建议、意见和投诉请求。请您先了解并遵守中华人民共和国国务院《信访条例》及《广东省实施&lt;信访条例&gt;办法》、《广东省食品药品监督管理局网上信访须知》。<br><br>
          　　<strong>一、受理范围</strong><br><br>
          　　您可以根据《信访条例》的规定，通过本栏目，向我局反映情况，提出建议、意见或者投诉请求，主要包括： <br>
          　　（一）对省食品药品监管局执行法律、法规、规章等方面提出的意见和建议； <br>
          　　（二）对省食品药品监管局以及省局直属事业单位和各市以下食品药品监管部门工作人员的办事效率、工作作风等方面的批评、建议、意见；<br>
          　　（三）属于省食品药品监管局职责范围有权作出处理决定的其他信访事项。<br><br>
          　　<strong>二、注意事项</strong><br><br>
          　　1、请您客观准确填写有关信息，留下您的联系电话、电子邮箱及其他联系方式，以便我局了解情况、依法处理并及时回复。<br>
          　　2、提出的信访事项应当客观真实，不得有扰乱公共秩序、妨害国家和公共安全的内容；不得有涉及国家秘密、商业秘密及公民隐私的内容。 <br>
          　　3、如提出投诉举报的，请详细列明被投诉举报对象的名称、地址和具体的违法事实，尽可能详细提供涉嫌违法产品的有关情况（如：具体产品名称、批准文号、生产　　　&nbsp;&nbsp;&nbsp;厂家、批号、规格等），以便能及时立案查处。<br>
          　　4、您可以根据提交成功后网站所提供的登记号、查询密码，查询相应的处理情况。<br><br>
          　　<strong>三、办理程序</strong> <br><br>
          　　我局将按照《信访条例》、《广东省实施&lt;信访条例&gt;办法》等法律法规的要求，及时转送、交办、分发您提出的投诉请求事项，并督促有关部门依法处理、及时回复。 <br>
          　　具体办理流程是：群众发送诉求或建议事项→我局接收、登记后将有关事项转送、交办、分发给相关部门→相关部门依法处理、并回复反馈有关情况→信访人查询办理　　情况。</td>
      </tr>
      <tr>
        <td align="center" style="padding-top:15px;"><table width="163" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="74"><a href="<%=request.getContextPath() %><%=templatePath %>powerSD/sd_complaintinfo.jsp?channelId=103&siteId=${siteId}"><input type="button" value="已阅读" name="" width="74" height="27"></a></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
                </div>
            </div>
            
      </div>
	</div>
     <jsp:include page="/html/cms_template/powerSD/sd_footer.jsp"/>
</body>
</html>
