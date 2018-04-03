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
  /*药品选择弹出框*/
  function drugSelector(){ 
  		var getv = window.showModalDialog('${base}/common/selector/findPageDrugAction.action', null, 'dialogWidth:650px;dialogHeight:450px;help:no;unadorned:no;resizable:no;status:no');
 		if (getv != null)
        {  
           document.forms[0].artId.value=getv.split(",")[0];
           document.forms[0].drugname.value=getv.split(",")[1];
           document.forms[0].cptstandard.value=getv.split(",")[2];
           document.forms[0].cptpro.value=getv.split(",")[3];
        }
  }
   /*企业单位选择弹出框*/
  function companySelector(){ 
  		var getc = window.showModalDialog('${base}/common/selector/findPageCompanyAction.action', null, 'dialogWidth:650px;dialogHeight:450px;help:no;unadorned:no;resizable:no;status:no');
  		if (getc != null)
        {   
           document.forms[0].custId.value=getc.split(",")[0];
           document.forms[0].custName.value=getc.split(",")[1];
           document.forms[0].buyPlace.value=getc.split(",")[2];  
        }
  } 
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

	//获取表单值
	function getFormValue(){
		var formParam = new Array();
		for(i=0;i<document.forms["complainForm"].elements[i].length;i++){
			formParam[i] = forms["complainForm"].elements[i].value;
			}
			return formParam;
		}
	
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
                	<form id="complainForm" method="post" action="sd_complaintperson.jsp?channelId=103&siteId=${siteId}">
                    	<table border="0" cellspacing="0" cellpadding="0" class="cpttable">
                    	<input name="siteId" type="hidden"  value="${param.siteId}"/>
                    	<input name="channelId" type="hidden"  value="${param.channelId}"/> 
                        <colgroup class="cpttfir"></colgroup> 
                        <colgroup class="cpttsec"></colgroup>
                        <colgroup class="cpttthr"></colgroup>
                        <colgroup class="cpttfou"></colgroup>
                        <colgroup class="cpttfiv"></colgroup>
                        <colgroup class="cpttlas"></colgroup>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cpttitle">投诉标题</label></td>
                            <td>
                            	 <img src="images/cpt_comtextl.png" class="cpttxtimgl"/> 
                            	 <input name="plainmanage.complainTitle" type="text" id="cpttitle" class="cpttitle"/>
                            	 <img src="images/cpt_comtextr.png" class="cpttxtimgr"/>
                            </td>
                            <td><span>*</span></td>
                            <td><label>投诉类型</label></td>
                            <td>
                            <!--
                                     <select name="plainmanage.ctypeId" id="cpttype" type="text" class="cpttype">
										<option value="">--请选择类型--</option> 
										<c:forEach items = "${list}" var="plainmanageType">
											<option value="${plainmanageType.CTYPEID}">${plainmanageType.CTYPENAME}</option> 
										</c:forEach>	
									</select>  
-->
						<select name="plainmanage.ctypeId" id="cpttype" type="text" class="cpttype">
                            <c:forEach items = "${list}" var="plainmanageType">
								<option value="${plainmanageType.CTYPEID}">${plainmanageType.CTYPENAME}</option> 
							</c:forEach>
                        </select>                      
                        <div class="mncpttype" id="mncpttype">
                        	<div class="cpttypeshow" id="cpttypeshow">
                            	<div class="cpttypecontent" id="cpttypecotent">---请选择---</div>
                                <div class="cpttypebtn" id="cpttypebtn">
                                	<img src="images/cpt_selecticonc.png" alt="" id="cpttypeimgdef" class="cpttypeimgdef"/>
                        			<img src="images/cpt_selecticonh.png" alt=""  id="cpttypeimgsel" class="cpttypeimgsel"/>
                            	</div>
                            </div>
                        	<ul class="cpttypeul"  id="cpttypeul"></ul>
                        </div>
                            </td>
                          </tr>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="artId">药品名称</label></td>
                            <td>
                            	<div class="cptdn">
                            	    <input name="plainmanage.artId" id="artId" type="hidden" />
                                	<img src="images/cpt_comtextl.png" class="cpttxtimgl"/>
                                	<input name="drugname" type="text" class="drugname" id="drugname" readonly="readonly"/><img src="images/cpt_comtextr.png" class="cpttxtimgr"/>
                                    <input name="cptdnbtn" type="button" onClick = "drugSelector()" class="cptdnbtn" id="cptdnbtn" value="选&nbsp;&nbsp择"/>
                                </div>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td><span></span></td>
                            <td><label for="cptstandard">规&nbsp;&nbsp;&nbsp;&nbsp;格</label></td>
                            <td>
                               <img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="spec" type="text" class="cptstandard"  id="cptstandard" readonly="readonly" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/>
							</td>
                            <td>&nbsp;</td>
                            <td><label for="cptpro">厂家场地</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="factory" type="text" class="cptpro" id="cptpro"  readonly="readonly"/><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                          </tr>
                          <tr>
                            <td><span></span></td>
                            <td><label for="cptunit">单&nbsp;&nbsp;&nbsp;&nbsp;位</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/>
                             <input name="unit" type="text" class="cptunit" id="cptunit" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                            <td><span>*</span></td>
                            <td><label for="cptbuynum">购买数量</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="plainmanage.total" id="cptbuynum" type="text" class="cptbuynum" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                          </tr>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cptpronum">生产批号</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="plainmanage.serial" type="text" class="cptpronum" id="cptpronum"/><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cptprodt">生产日期</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="manufactured" type="text" class="cptprodt" id="cptprodt" onfocus="WdatePicker({isShowClear:false,readOnly:true})" onclick="WdatePicker({isShowClear:false,readOnly:true})" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                            <td><span>*</span></td>
                            <td><label for="cptdthav">有效期限</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="expiry" type="text" class="cptdthav" id="cptdthav" onfocus="WdatePicker({isShowClear:false,readOnly:true})" onclick="WdatePicker({isShowClear:false,readOnly:true})"/><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                          </tr>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cptstore">购买药店</label></td>
                            <td>
                            	<div class="cpts">
                                	<input name="plainmanage.custId" id="custId"  type="hidden" />
                                	<img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="custName" type="text" class="cptstore" id="custName" readonly="readonly"/>
                                	<img src="images/cpt_comtextr.png" class="cpttxtimgr"/>
                                    <input name="cptsbtn"  type="button" onClick = "companySelector()" class="cptsbtn" id="cptsbtn" value="选&nbsp;&nbsp择"/>
                                </div>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td><span></span></td>
                            <td><label for="cptaddress">购买地点</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/>
                             <input name="plainmanage.buyPlace" type="text" class="cptaddress" id="buyPlace" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td><span>*</span></td>
                            <td><label for="cptcontents">投诉内容</label></td>
                            <td colspan="4"><textarea name="plainmanage.complainContent" class="cptcontents" id="cptcontents"></textarea></td>
                          </tr>
                          <tr>
                            <td><span></span></td>
                            <td><label for="cptremark">说明备注</label></td>
                            <td><img src="images/cpt_comtextl.png" class="cpttxtimgl"/><input name="plainmanage.notes" type="text" class="cptremark" id="cptremark" /><img src="images/cpt_comtextr.png" class="cpttxtimgr"/></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                          	<td><span></span></td>
                            <td></td>
                            <td colspan="4"><input name="cptsubmit" type="submit" class="cptsubmit"  id="cptsubmit" value="下&nbsp;步"  onclick="getFormValue()"/><span class="cptsubremark">(药品投诉提交之后，质量监察员审查通过之后发布，并及时更新处理流程，通知投诉人并接受公众监督。)</span></td>
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
