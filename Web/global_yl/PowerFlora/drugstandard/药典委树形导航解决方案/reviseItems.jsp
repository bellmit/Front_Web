<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="cn.kyinfo.bsn.webUtil.StdReviseWebUtil,cn.kyinfo.bsn.webUtil.EtpWebUtil,java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%
String path = request.getRequestURI();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<base href="<%=basePath %>"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>国家药典委员会--修订事项</title>
<meta name="description" content="药品标准业务管理系统,药品标准业务受理中心,国家药典委员会,业务办理,企业中心,信息公示" />
<meta name="keywords" content="药品标准业务管理系统,药品标准业务受理中心,国家药典委员会,业务办理,企业中心,信息公示" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/etpWeb/css/drugstandard/drugstandard.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/html/etpWeb/css/zTreeStyle/zTreeStyle.css"/>
<script type="text/javascript" src="<%=request.getContextPath() %>/html/etpWeb/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/html/etpWeb/js/jquery/jquery.ztree.all-3.2.min.js"></script>
<c:choose>
  <c:when test="${classId==1}">
     <script type="text/javascript" src="<%=request.getContextPath() %>/html/etpWeb/js/drugstandard/formulateitems.js"></script>
  </c:when>
  <c:when test="${classId==2}">
     <script type="text/javascript" src="<%=request.getContextPath() %>/html/etpWeb/js/drugstandard/reviseitems.js"></script>
  </c:when>
  <c:when test="${classId==4}">
     <script type="text/javascript" src="<%=request.getContextPath() %>/html/etpWeb/js/drugstandard/errataitems.js"></script>
  </c:when>
  <c:when test="${classId==5}">
     <script type="text/javascript" src="<%=request.getContextPath() %>/html/etpWeb/js/drugstandard/explainitems.js"></script>
  </c:when>
</c:choose>
<script type="text/javascript">
function reloadIndex(rootPath){
   window.opener.location=rootPath+"/bsn/company/register/etpLogin.action";
}
</script>
<script type="text/javascript">
		var treeZone;
		var settingZone = {
				data:{
		        	simpleData: {
		        		enable : true,
		        		idKey : "id",
		        		pIdKey : "pId"
		        	}
		        },
		        async: {
					enable: true,
					url:"<%=request.getContextPath() %>/bsn/stdRevise/getReviseItems.action",
					autoParam:["id"],
					dataFilter: filter
		        },
		        callback: {
					onClick: onClickZone
				}
			};
        function Node(id, pId, name, isParent){
            this.id = id;  
            this.pId = pId;  
            this.name = name;
			this.isParent = isParent;
        };      
        function filter(treeId, parentNode, childNodes) {
        	var filterNodes=[];
			if (!childNodes) return null;
			var isParent;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
				
				if(childNodes[i].leaf==0){
					isParent = true;
					filterNodes.push(new Node(childNodes[i].id, childNodes[i].pId, childNodes[i].name, isParent));
				}else{
					isParent = false;
					filterNodes.push(new Node(childNodes[i].id, childNodes[i].pId, childNodes[i].name, isParent));
				}
			}
			return filterNodes;
		};
		function onClickZone(e, treeId, treeNode) {
			var idindex=e.target.id.split("_")[1];
			var zTree = $.fn.zTree.getZTreeObj("treeZone_"+idindex),
			nodes = zTree.getSelectedNodes(),
			zoneName = "";
			zoneId = "";
			nodes.sort(function compare(a,b){return a.id-b.id;});
			for (var i=0; i<nodes.length; i++) {
				zoneId += nodes[i].id + ",";
				zoneName += nodes[i].name + ",";
			}
			if (zoneId.length > 0 ) zoneId = zoneId.substring(0, zoneId.length-1);
			if (zoneName.length > 0 ) zoneName = zoneName.substring(0, zoneName.length-1);
			var zoneIdObj = $("#zoneid_"+idindex);
			var zoneNameObj = $("#zonename_"+idindex);
			zoneIdObj.attr("value", zoneId);
			zoneNameObj.attr("value", zoneName);
			hideMenuZone(idindex);
		};
		function showMenuZone(indexs){
			var treeNodes=[];
			hideMenuZone(indexs);			
			$.ajax({
				url : "<%=request.getContextPath() %>/bsn/stdRevise/getReviseItems.action",
				type : "post",
				async : true,
				dataType: "json",
				success : function(data){
					var isParent;
		            $.each(data, function(i, item){
		            	if(item.leaf==0){
		            		isParent = true;
		            	}else{
		            		isParent = false;
		            	};
		            	treeNodes.push(new Node(item.id, item.pId, item.name, isParent));
		            	$.fn.zTree.init($("#treeZone_"+indexs), settingZone, treeNodes);
		            });
                }
			});
		}
		function hideMenuZone(indexs){
			var zoneObj = $("#zonename_"+indexs);
			$("#zoneContent_"+indexs).css({left:0,top:zoneObj.outerHeight() + "px"}).slideToggle(20);
		}
</script>
</head>
<body onload="reloadIndex('<%=request.getContextPath() %>')">
<div class="init_datatemp" id="init_datatemp">${stdItems}</div>
<script type="text/javascript">
var init_datatemp=document.getElementById("init_datatemp");
var reviseItemsStr=init_datatemp.innerHTML;
init_datatemp.innerHTML="";
init_datatemp=null;
var reSonArr=[];
var reParentArr=[];
var reviseItemsArr=[];
if(reviseItemsStr.length>=3){
	reviseItemsStr=reviseItemsStr.substring(2,reviseItemsStr.length-2).replace(/[{]/g,"");
	reviseItemsArr=reviseItemsStr.replace(/(\,\s)/g,",").split("},");
	for(var m=0;m<reviseItemsArr.length;m++){
		var sonarr=reviseItemsArr[m].split(",");
		for(var t=0;t<sonarr.length;t++){
			reSonArr.push(sonarr[t].split("=")[1]);
		}
		reParentArr.push(reSonArr);
		reSonArr=[];
	}
	reviseItemsArr=reParentArr.slice(0);
	reParentArr=[];
}
</script>
    <div class="header">
    	<div class="banner">
            <h1>国家药典委员会</h1>
            <h2>药品标准业务受理中心</h2>
        </div>
    </div>
    <div class="container">
    	<div class="content">
        	<div class="sidebox">
            	<div class="nav-title">
                    <h3>资料填写</h3>
                    <h4>${className}申请</h4>
                </div>
                <div class="nav-remark">
                	<h5>温馨提示</h5>
                    <p>原文：填写标准【性状】段落的原文。</p>
                    <p>${classCode}：填写${classCode}后的情况。</p>
                </div>
            </div>
            <div class="mainbox">
            	<div class="dsposition2">
                	<ul class="dscurpos_btn">
                    	<li class="dscp_btn1"><a href="javascript:void(0);" onfocus="this.blur();" title="申请信息"></a></li>
                    	<li class="dscp_btn2"><a href="javascript:void(0);" onfocus="this.blur();" title="${classCode}事项"></a></li>
                        <li class="dscp_btn3"><a href="javascript:void(0);" onfocus="this.blur();" title="资料目录"></a></li>
                    </ul>
                </div>
                <form action="<%=request.getContextPath() %>/bsn/stdRevise/bsnReviseItems.action" method="post" id="reviseitems">
                	<input type="hidden" name="bseqId" value="${bseqId}"/>
                    <input type="hidden" name="length" id="length"/>
                    
                <div class="dscontent">
                	<table cellpadding="0" cellspacing="0" class="dsstep2" id="dsstep2">
                    <colgroup>
                    	<col class="ds_rig1"/>
                        <col class="ds_rig2"/>
                        <col class="ds_rig3"/>
                    </colgroup>
                    	<tr>
                        	<td>&nbsp;</td>
                            <td><button type="button" id="add_items" class="add_items">点击新增事项</button></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                        	<td colspan="3">
                            	<table cellpadding="0" cellspacing="0" class="dsstep2_inner" id="dsstep2_inner">
                                	<colgroup>
                                        <col class="ds_rig1_inner"/>
                                        <col class="ds_rig2_inner"/>
                                        <col class="ds_rig3_inner"/>
                                        <col class="ds_rig4_inner"/>
                                    </colgroup>
                                    <tr id="ds_itemstarget_0">
                                        <td><label class="main_name">事项:</label></td>
                                        <td>
                                            <div class="ri_tree">
                                            	<input type="hidden" name="zoneId_0" id="zoneid_0" readonly="readonly" value="0"/>
                                                <input type="text" name="zoneName_0" id="zonename_0" readonly="readonly" value=""/>
                                                <button type="button" onclick="showMenuZone(0)">选择</button>
                                                <div id="zoneContent_0" class="list">
                                                    <ul id="treeZone_0" class="ztree"></ul>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="originalwrap">
                                                <label for="original_0">原文：</label>
                                                <textarea name="original_0" id="original_0"></textarea>
                                            </div>
                                            <div class="revisewrap">
                                                <label for="revise_0"><c:if test="${classId==5}">疑问：</c:if><c:if test="${classId!=5}">${classCode}:</c:if></label>
                                                <textarea name="revise_0" id="revise_0"></textarea>
                                            </div>
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">&nbsp;</td>
                        </tr>
                        <tr class="trline">
                            <td>&nbsp;</td>
                            <td><a href="<%=request.getContextPath() %>/bsn/stdRevise/upFromItemsStep.action?bseqId=${bseqId}" class="prebtn2">上一步</a><button type="button" class="savebtn2" id="savebtn2">保存并进入下一步</button></td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="footer">
    	<div class="infos">
        	<p>本站由国家药典委员会主办 版权所有 未经许可禁止转载或建立镜像</p>
            <p>Copyright © 2012-2015 SFDA All Rights Reserved</p>
            <p>备案序号:京ICP备05064905号</p>
            <p>国家药典委员会信息小组建设和维护</p>
        </div>
    </div>
</body>
</html>
