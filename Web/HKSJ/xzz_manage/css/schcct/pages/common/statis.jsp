<%
String ctx = request.getContextPath();
String imgPath = "/schoolyard_image";

%>

<link rel="stylesheet" href="<%=ctx%>/schcct/css/common.css">
<link id="cssFile" rel="stylesheet" href="<%=ctx%>/schcct/skins/cyan.css">
<script type="text/javascript">var contextPath="<%=ctx%>";</script>
<script src="<%=ctx%>/js-cct/jquery.min.js"></script>
<script type="text/javascript" src="<%=ctx%>/js-cct/lhgdialog/lhgdialog.min.js"></script>
<script type="text/javascript" src="<%=ctx%>/js-cct/areadata.js"></script>
<script type="text/javascript">
//imeiNum change unicode
var stringToHex = function(str) {
	  var val="";
		for(var i = 0; i < str.length; i++){
			if(val == "")
				val = str.charCodeAt(i).toString(16);
			else
				val +=","+ str.charCodeAt(i).toString(16);
		}
	   return val;
	};

var utfenicodeUni = function (str){
	var ss="";
	var arr = str.split(",");
	for(var i=0; i < arr.length; i++){
		ss += ("00"+arr[i]);
	}
	return ss;
};
</script>
