<%@ Page Language="C#" AutoEventWireup="true" CodeFile="add.aspx.cs" Inherits="tools_flexsc_add" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>图片批量上传</title>

    <script src="AC_OETags.js" language="javascript"></script>

    <script src="history/history.js" language="javascript"></script>

    <style>
body { margin: 0px; overflow:hidden }
.kind{padding:15px 0px 0px 44px;}
.zz{width:480px; height:25px; position:absolute; padding-right:10px; text-align:right; top:505px; left:640px; background:#fafafa; z-index:1000;}
.fla{position:absolute; z-index:-1000;}
</style>

    <script language="JavaScript" type="text/javascript">
<!--
// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 10;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 0;
// -----------------------------------------------------------------------------
// -->
    </script>

</head>
<body scroll="no">
    <form id="form1" runat="server">
        <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
                <td class="kind">
                    请先选择分类：<asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DropDownList1_SelectedIndexChanged">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#FFFFFF" style="height: 500px">

                    <script language="JavaScript" type="text/javascript">AC_FL_RunContent( 'id','KunLunUpFile','width','926','height','500','codebase','http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab','src','KunLunUpFile','quality','high','bgcolor','#869ca7','name','KunLunUpFile','align','middle','play','true','loop','false','allowscriptaccess','sameDomain','pluginspage','http://www.adobe.com/go/getflashplayer','movie','KunLunUpFile' ); //end AC code</script>

                    <div class="fla">
                        <noscript>
                            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="KunLunUpFile" width="926"
                                height="500" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
                                <param name="movie" value="KunLunUpFile.swf" />
                                <param name="quality" value="high" />
                                <param name="wmode" value="transparent" />
                                <param name="allowScriptAccess" value="sameDomain" />
                                <embed src="KunLunUpFile.swf" quality="high" bgcolor="#869ca7" width="926" height="500"
                                    name="KunLunUpFile" align="middle" play="true" loop="false" allowscriptaccess="sameDomain"
                                    type="application/x-shockwave-flash"> </embed>
                            </object>
                        </noscript>
                    </div>
                </td>
            </tr>
        </table>
        <div class="zz">
        </div>
    </form>
</body>
</html>
