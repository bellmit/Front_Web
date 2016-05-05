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

            	<h4>投诉信息查看</h4>
            </div>
            <div class="drugsmiddlebox">
            	<div class="drugsmain" title="">
                	<h4 class="drugstitle">投诉结果【】详细信息</h4>
                    <table border="0" cellspacing="0" cellpadding="0" class="drugstable" id="sd_defectstable">
                      <colgroup class="drugstablel"></colgroup>
                      <colgroup class="drugstabler"></colgroup>
                      <tr>
                        <td>投诉标题:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>投诉类型:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>药品名称:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>规格:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>厂家产地:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>单位:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>购买数量:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>生产批号:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>生产日期:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>有效期限:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>购买药店:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>购买地点:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>投诉类容:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>备注:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="2" height="10" bgcolor="#EFEFEF">
                      </td>
                      </tr>
                      <tr>
                        <td>投诉者:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>联系方式:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="2" height="10" bgcolor="#EFEFEF">
                      </td>
                      </tr>
                      <tr>
                        <td>处理状态:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>回复类型:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>恢复类容:</td>
                        <td></td>
                      </tr>

                    </table>
                </div>
            </div>
            
      </div>
	</div>
     <jsp:include page="/html/cms_template/powerSD/sd_footer.jsp"/>
</body>
</html>
