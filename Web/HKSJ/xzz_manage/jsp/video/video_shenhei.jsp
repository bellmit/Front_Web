<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE>
<html>


<body>
  	 <input type="hidden" id="VIDEO_ID" name="VIDEO_ID" />
	 <table id="videoTable" title="" style=" width:auto;height:90%;"
            data-options="
            rownumbers:true,
            collapsible:false,
            pagination:true,
            method:'post'">
             <thead data-options="frozen:true">
	          <tr>
	          	<th data-options="field:'ADMIN_NAME',align:'center',width:70">审核人</th>
	          	<th data-options="field:'APPROVE_TIME1',align:'center',width:150">审核时间</th>
			  </tr>
			</thead>
            <thead >
	          <tr>
	          	<th data-options="field:'APPROVE_CONTENT',align:'center',width:200,formatter:formatName" >审核内容</th>
				<th data-options="field:'APPROVE_STATUS',align:'center',width:100,formatter:formatType">视频状态</th>
			  </tr>
			</thead>
    </table>
		

</body>
</html>
