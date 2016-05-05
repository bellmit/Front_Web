<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE>
<html>
  <head>
  <title>汇总统计</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="小自传后台汇总统计">
	<meta http-equiv="description" content="小自传后台汇总统计">
	<link rel="stylesheet" href="../css/public.css" />
	<link rel="stylesheet" href="../css/schcct/css/common.css">
	<link id="cssFile" rel="stylesheet" href="../css/schcct/skins/cyan.css">
	<link rel="stylesheet" href="../css/pilelot-ui.css"/>
</head>

<body>
<table class="table1">
  <thead>
    <tr class="cssth">
      <th colspan="8">小自传-汇总统计</th>
    </tr>
  </thead>
  <tbody>
    <tr class="rowOdd"> 
      <td>小自传总资产</td>
      <td>${result.cz_all+result.xt_all }</td>
      <td>用户充值金额</td>
      <td>${result.cz_all }</td>
      <td>系统产生金额</td>
      <td>${result.xt_all }</td>
      <td></td>
      <td></td>
    </tr>
    <tr class="rowOdd">
      <td>今日结余总资产</td>
      <td>${result.cz_all+result.xt_all-result.kc_today-result.dh_today }</td>
      <td>今日系统生产自传币</td>
      <td>${result.xt_today }</td>
      <td>今日提现金额</td>
      <td>0</td>
      <td>今日充值金额</td>
      <td>${result.cz_today }</td>
    </tr>
    <tr class="rowOdd">
      <td>本周结余总资产</td>
      <td>${result.cz_all+result.xt_all-result.kc_week-result.dh_week }</td>
      <td>本周系统生产自传币</td>
      <td>${result.xt_week }</td>
      <td>本周提现金额</td>
      <td>0</td>
      <td>本周充值金额</td>
      <td>${result.cz_week }</td>
    </tr>
    <tr class="rowOdd">
      <td>本月结余总资产</td>
      <td>${result.cz_all+result.xt_all-result.kc_month-result.dh_month }</td>
      <td>本月系统生产自传币</td>
      <td>${result.xt_month }</td>
      <td>本月提现金额</td>
      <td>0</td>
      <td>本月充值金额</td>
      <td>${result.cz_month }</td>
    </tr>
    <tr class="rowOdd">
      <td>平台总用户数</td>
      <td>${result.rs_all }</td>
      <td>今日注册用户数</td>
      <td>${result.zc_today }</td>
      <td>今日活跃用户数</td>
      <td>${result.hy_today }</td>
      <td></td>
      <td></td>
    </tr>
    <tr class="rowOdd">
      <td>今日发文</td>
      <td>${result.fw_today }</td>
      <td>今日随记</td>
      <td>${result.sj_today }</td>
      <td>今日评论</td>
      <td>${result.pl_today }</td>
      <td></td>
      <td></td>
    </tr>
    <tr class="rowOdd">
      <td>今日充值人数</td>
      <td>${result.czrs_today }</td>
      <td>本周充值人数</td>
      <td>${result.czrs_week }</td>
      <td>本月充值人数</td>
      <td>${result.czrs_month }</td>
      <td></td>
      <td></td>
    </tr>
    <tr class="rowOdd">
      <td>今日提现人数</td>
      <td>0</td>
      <td>本周提现人数</td>
      <td>0</td>
      <td>本月提现人数</td>
      <td>0</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</body>
</html>
