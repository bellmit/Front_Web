/*管理中心--用户--所有用户*/
function alluserMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menupwd.gif\" /><a id=\"alluser_pwd\" href=\"#\" title=\"\">密码</a></li><li><img alt=\"\" src=\"../images/operate/menuupload.gif\" /><a id=\"alluser_upload\" href=\"#\" title=\"\">上传</a></li><li><img alt=\"\" src=\"../images/operate/menuremove.gif\" /><a id=\"alluser_remove\" href=\"#\" title=\"\">移除</a></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"alluser_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"alluser_info\" href=\"#\" title=\"\">属性</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"alluser_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
function winalluserMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winalluser_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winalluser_smallicon\" href=\"#\" title=\"\">小图标</a></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"winalluser_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"winalluser_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"winalluser_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心--群组--所有群组*/
function allgroupMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"allgroup_delete\" href=\"#\" title=\"\">删除</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"allgroup_info\" href=\"#\" title=\"\">属性</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"allgroup_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
function winallgroupMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuadd.gif\" /><a id=\"winallgroup_new\" href=\"#\" title=\"\">新建组</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winallgroup_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winallgroup_smallicon\" href=\"#\" title=\"\">小图标</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"winallgroup_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"winallgroup_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心--群组--其他群组*/
function othergroupMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"othergroup_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"othergroup_delete\" href=\"#\" title=\"\">从组中删除</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"othergroup_info\" href=\"#\" title=\"\">属性</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"othergroup_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
function winothergroupMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menujoin.gif\" /><a id=\"winothergroup_join\" href=\"#\" title=\"\">添加成员</a></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"winothergroup_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"winothergroup_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
/*管理中心--资源*/
function manageresMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1]-100;
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuopen.gif\" /><a id=\"res_open\" href=\"#\" title=\"\">打开</a></li><li><img alt=\"\" src=\"../images/operate/menushare.gif\" /><a id=\"res_share\" href=\"#\" title=\"\">共享</a></li><li><img alt=\"\" src=\"../images/operate/menudownload.gif\" /><a id=\"res_download\" href=\"#\" title=\"\">下载</a></li><li><img alt=\"\" src=\"../images/operate/menucut.gif\" /><a id=\"res_cut\" href=\"#\" title=\"\">剪切</a></li><li><img alt=\"\" src=\"../images/operate/menucopy.gif\" /><a id=\"res_copy\" href=\"#\" title=\"\">复制</a></li><li><img alt=\"\" src=\"../images/operate/menupaste.gif\" /><a id=\"res_paste\" href=\"#\" title=\"\">粘贴</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"res_delete\" href=\"#\" title=\"\">删除</a></li><li><img alt=\"\" src=\"../images/operate/menufileurl.gif\" /><a id=\"res_fileurl\" href=\"#\" title=\"\">文件URL</a></li><li><img alt=\"\" src=\"../images/operate/menuresrate.gif\" /><a id=\"res_resrate\" href=\"#\" title=\"\">资源费率</a></li><li><img alt=\"\" src=\"../images/operate/menurename.gif\" /><a id=\"res_rename\" href=\"#\" title=\"\">重命名</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"res_info\" href=\"#\" title=\"\">属性</a></li></ul>"});
}
function winmanageresMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1]-100;
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuadd.gif\" /><a id=\"winres_new\" href=\"#\" title=\"\">新建</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_new\"><li><img alt=\"\" src=\"../images/operate/menustructure.gif\" /><a id=\"winres_mulu\" href=\"#\" title=\"\">目录</a></li><li><img alt=\"\" src=\"../images/operate/menufile.gif\" /><a id=\"winres_file\" href=\"#\" title=\"\">文件</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuup.gif\" /><a id=\"winres_up\" href=\"#\" title=\"\">向上</a></li><li><img alt=\"\" src=\"../images/operate/menustructure.gif\" /><a id=\"winres_mlshuzk\" href=\"#\" title=\"\">目录树展开</a></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"winres_mlshupx\" href=\"#\" title=\"\">目录树排序</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_mlshupx\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_byname\" href=\"#\" title=\"\">按目录名称</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_bytime\" href=\"#\" title=\"\">按创建时间</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_byhand\" href=\"#\" title=\"\">手动</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"winres_show\" href=\"#\" title=\"\">显示</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_show\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_smallicon\" href=\"#\" title=\"\">小图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_detailicon\" href=\"#\" title=\"\">详细信息</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuicon.gif\" /><a id=\"winres_sort\" href=\"#\" title=\"\">排列图标</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_sort\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_sortname\" href=\"#\" title=\"\">按文件名称</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_sortsize\" href=\"#\" title=\"\">按文件大小</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_sorttime\" href=\"#\" title=\"\">按创建时间</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menupages.gif\" /><a id=\"winres_pages\" href=\"#\" title=\"\">翻页</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_pages\"><li><img alt=\"\" src=\"../images/operate/menupre.gif\" /><a id=\"winres_pre\" href=\"#\" title=\"\">上一页</a></li><li><img alt=\"\" src=\"../images/operate/menunext.gif\" /><a id=\"winres_next\" href=\"#\" title=\"\">下一页</a></li><li><img alt=\"\" src=\"../images/operate/menugoto.gif\" /><a id=\"winres_goto\" href=\"#\" title=\"\">转到</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menupaste.gif\" /><a id=\"winres_paste\" href=\"#\" title=\"\">粘贴</a></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"winres_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"winres_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心--权限*/
function authorityMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuauthority.gif\" /><a id=\"res_authority\" href=\"#\" title=\"\">权限</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"res_delete\" href=\"#\" title=\"\">删除</a></li></ul>"});
}
function winauthorityMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuadd.gif\" /><a id=\"winres_add\" href=\"#\" title=\"\">添加</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_add\"><li><img alt=\"\" src=\"../images/operate/menuuser.gif\" /><a id=\"winres_user\" href=\"#\" title=\"\">用户</a></li><li><img alt=\"\" src=\"../images/operate/menugroup.gif\" /><a id=\"winres_group\" href=\"#\" title=\"\">群组</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuauthority.gif\" /><a id=\"winres_qx\" href=\"#\" title=\"\">权限</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_qx\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_userqx\" href=\"#\" title=\"\">用户权限</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_groupqx\" href=\"#\" title=\"\">群组权限</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"winres_show\" href=\"#\" title=\"\">显示</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winres_show\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winres_smallicon\" href=\"#\" title=\"\">小图标</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"winres_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"winres_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"winres_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心-授权*/
function powerMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"power_delete\" href=\"#\" title=\"\">删除</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"power_info\" href=\"#\" title=\"\">属性</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"power_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
function winpowerMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuauthority.gif\" /><a id=\"winpower_add\" href=\"#\" title=\"\">添加权限</a></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"winpower_show\" href=\"#\" title=\"\">显示</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winpower_show\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winpower_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winpower_smallicon\" href=\"#\" title=\"\">小图标</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"winpower_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"winpower_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心--审核*/
function approvalMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuapproval.gif\" /><a id=\"approval_approval\" href=\"#\" title=\"\">审核</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"approval_delete\" href=\"#\" title=\"\">删除</a></li></ul>"});
}
function winapprovalMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuapproval.gif\" /><a id=\"winapproval_approval\" href=\"#\" title=\"\">审核全部</a></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"winapproval_show\" href=\"#\" title=\"\">显示</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_winapproval_show\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winapproval_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"winapproval_smallicon\" href=\"#\" title=\"\">小图标</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menupre.gif\" /><a id=\"winapproval_pre\" href=\"#\" title=\"\">上一页</a></li><li><img alt=\"\" src=\"../images/operate/menunext.gif\" /><a id=\"winapproval_next\" href=\"#\" title=\"\">下一页</a></li><li><img alt=\"\" src=\"../images/operate/menugoto.gif\" /><a id=\"winapproval_goto\" href=\"#\" title=\"\">转到</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"winapproval_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"winapproval_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心--信息*/
function informationMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"information_delete\" href=\"#\" title=\"\">删除</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"information_info\" href=\"#\" title=\"\">属性</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"information_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
function wininformationMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuadd.gif\" /><a id=\"wininfo_add\" href=\"#\" title=\"\">添加</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"wininfo_delete\" href=\"#\" title=\"\">删除全部</a></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"wininfo_show\" href=\"#\" title=\"\">显示</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_wininfo_show\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"wininfo_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"wininfo_smallicon\" href=\"#\" title=\"\">小图标</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"wininfo_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"wininfo_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"wininfo_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}
/*管理中心--统计*/
function statisticsMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menustatistics.gif\" /><a id=\"statistics_statistics\" href=\"#\" title=\"\">统计</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"statistics_info\" href=\"#\" title=\"\">属性</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"statistics_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
function winstatisticsMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"wintj_show\" href=\"#\" title=\"\">显示</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_wintj_show\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"wintj_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"wintj_smallicon\" href=\"#\" title=\"\">小图标</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"wintj_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"wintj_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"wintj_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}

/*管理中心--日志*/
function logMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1]-120;
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"log_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menucurrentlog.gif\" /><a id=\"log_current\" href=\"#\" title=\"\">显示当天日志</a></li><li><img alt=\"\" src=\"../images/operate/menualllog.gif\" /><a id=\"log_all\" href=\"#\" title=\"\">显示所有日志</a></li><li><img alt=\"\" src=\"../images/operate/menupre.gif\" /><a id=\"log_pre\" href=\"#\" title=\"\">上一页</a></li><li><img alt=\"\" src=\"../images/operate/menunext.gif\" /><a id=\"log_next\" href=\"#\" title=\"\">下一页</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"log_delete\" href=\"#\" title=\"\">清空日志</a></li><li><img alt=\"\" src=\"../images/operate/menufind.gif\" /><a id=\"log_find\" href=\"#\" title=\"\">查找</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"log_help\" href=\"#\" title=\"\">帮助</a></li></ul>"});
}
/*资源中心菜单显示*/
function filesMenuShow(posarr){
	var posfilex=posarr[0],posfiley=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posfilex,"top":posfiley},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuopen.gif\" /><a id=\"files_open\" href=\"#\" title=\"\">打开</a></li><li><img alt=\"\" src=\"../images/operate/menucut.gif\" /><a id=\"files_cut\" href=\"#\" title=\"\">剪切</a></li><li><img alt=\"\" src=\"../images/operate/menupaste.gif\" /><a id=\"files_paste\" href=\"#\" title=\"\">粘贴</a></li><li><img alt=\"\" src=\"../images/operate/menuremove.gif\" /><a id=\"files_remove\" href=\"#\" title=\"\">删除</a></li><li><img alt=\"\" src=\"../images/operate/menurename.gif\" /><a id=\"files_rename\" href=\"#\" title=\"\">重命名</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"files_info\" href=\"#\" title=\"\">属性</a></li></ul>"});
}
/*下载中心菜单显示*/
function downloadMenuShow(posarr){
	var posdowx=posarr[0],posdowy=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posdowx,"top":posdowy},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menudownload.gif\" /><a id=\"download_dow\" href=\"#\" title=\"\">下载</a></li><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"download_info\" href=\"#\" title=\"\">属性</a></li></ul>"});
}
function windownloadMenuShow(posarr){
	var posdowx=posarr[0],posdowy=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posdowx,"top":posdowy},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"window_bigicon\" href=\"#\" title=\"\">大图标</a></li><li><img alt=\"\" src=\"../images/operate/menudefault.gif\" /><a id=\"window_smallicon\" href=\"#\" title=\"\">小图标</a></li><li><img alt=\"\" src=\"../images/operate/menupre.gif\" /><a id=\"window_pre\" href=\"#\" title=\"\">上一页</a></li><li><img alt=\"\" src=\"../images/operate/menunext.gif\" /><a id=\"window_next\" href=\"#\" title=\"\">下一页</a></li><li><img alt=\"\" src=\"../images/operate/menugoto.gif\" /><a id=\"window_goto\" href=\"#\" title=\"\">转到</a></li><li><img alt=\"\" src=\"../images/operate/menuhelp.gif\" /><a id=\"window_help\" href=\"#\" title=\"\">帮助</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"window_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}


/*权限管理菜单显示*/
function manageMenuShow(posarr){
	var posmanagex=posarr[0],posmanagey=posarr[1]-100;
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posmanagex,"top":posmanagey},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"../images/operate/menuadd.gif\" /><a id=\"user_addgroup\" href=\"#\" title=\"\">添加群组</a></li><li><img alt=\"\" src=\"../images/operate/menudelete.gif\" /><a id=\"user_deletegroup\" href=\"#\" title=\"\">删除群组</a></li><li><img alt=\"\" src=\"../images/operate/menumanage.gif\" /><a id=\"user_managegroup\" href=\"#\" title=\"\">管理群组</a><div class=\"sub_menuicon\"><span></span></div><ul class=\"sub_menuwrap\" id=\"sub_managegroup\"><li><img alt=\"\" src=\"../images/operate/menuinfo.gif\" /><a id=\"user_groupinfo\" href=\"#\" title=\"\">查看群组资料</a></li><li><img alt=\"\" src=\"../images/operate/menujoin.gif\" /><a id=\"user_joingroup\" href=\"#\" title=\"\">申请加入组</a></li></ul></li><li><img alt=\"\" src=\"../images/operate/menushow.gif\" /><a id=\"user_show\" href=\"#\" title=\"\">显示</a></li><li><img alt=\"\" src=\"../images/operate/menuicon.gif\" /><a id=\"user_sorticon\" href=\"#\" title=\"\">排列图标</a></li><li><img alt=\"\" src=\"../images/operate/menupages.gif\" /><a id=\"user_pages\" href=\"#\" title=\"\">翻页</a></li><li><img alt=\"\" src=\"../images/operate/menupaste.gif\" /><a id=\"user_paste\" href=\"#\" title=\"\">粘贴</a></li><li><img alt=\"\" src=\"../images/operate/menuflush.gif\" /><a id=\"user_flush\" href=\"#\" title=\"\">刷新</a></li><li><img alt=\"\" src=\"../images/operate/menuabout.gif\" /><a id=\"user_about\" href=\"#\" title=\"\">关于</a></li></ul>"});
}


/*搜索中心菜单显示*/
function searchMenuShow(posarr){
	var posfilex=posarr[0],posfiley=posarr[1];
	$.blockUI({css:{"width":"102px","height":"auto","background-color":"#fff","left":posfilex,"top":posfiley},message:"<ul class=\"popupmenu_wrap\" id=\"popupmenu\"><li><img alt=\"\" src=\"images/operate/menuopen.gif\" /><a id=\"files_open\" href=\"#\" title=\"\">打开</a></li><li><img alt=\"\" src=\"images/operate/menucut.gif\" /><a id=\"files_cut\" href=\"#\" title=\"\">剪切</a></li><li><img alt=\"\" src=\"images/operate/menupaste.gif\" /><a id=\"files_paste\" href=\"#\" title=\"\">粘贴</a></li><li><img alt=\"\" src=\"images/operate/menuremove.gif\" /><a id=\"files_remove\" href=\"#\" title=\"\">删除</a></li><li><img alt=\"\" src=\"images/operate/menurename.gif\" /><a id=\"files_rename\" href=\"#\" title=\"\">重命名</a></li><li><img alt=\"\" src=\"images/operate/menuinfo.gif\" /><a id=\"files_info\" href=\"#\" title=\"\">属性</a></li></ul>"});
}


/*显示切换大小图标*/
function showIcon(wrap,names){
	var iconobj=wrap.find("li:first"),iconclass=iconobj.attr("class");
	if(names=="big"){
		if(typeof iconclass!="undefined"&&iconclass!=""){
			wrap.find("li").each(function(){$(this).removeClass("smallicon");});
		}
	}else if(names=="small"){
		if(typeof iconclass=="undefined"||iconclass!="smallicon"){
			wrap.find("li").each(function(){$(this).addClass("smallicon");});
		}
	}	
}

/*
popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
*/
function popup_alert(infos,target_url,popup_type,popup_btn){
		var inf=arguments[0],turl=arguments[1],pt=arguments[2],pb=arguments[3],delay_id,temp_inf=[],temp_str="";
		if(inf.indexOf("异常信息:")!=-1){
			temp_str=inf;
			inf="";
			temp_inf=temp_str.split("异常信息:");
			for(var ti=0;ti<temp_inf.length;ti++){
				inf+=temp_inf[ti];
			}
		}
		if(pb=="none"){
			/*无按钮的成功框*/
			if(pt=="yes"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'306px','height':'156px'},message:"<div id=\"popup_wrapie\" class=\"popup_wrapie\"><p>"+inf+"</p></div>"});
					}else{
						$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap\" class=\"popup_wrap\"><p>"+inf+"</p></div>"});
					}
				}else{
					$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap\" class=\"popup_wrap\"><p>"+inf+"</p></div>"});
				}			
			/*无按钮的失败框*/
			}else if(pt=="no"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'406px','height':'106px'},message:"<div id=\"popup_wrap_errorie\" class=\"popup_wrap_errorie\"><p>"+inf+"</p></div>"});
					}else{
						$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap_error\" class=\"popup_wrap_error\"><p>"+inf+"</p></div>"});
					}
				}else{
					$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div id=\"popup_wrap_error\" class=\"popup_wrap_error\"><p>"+inf+"</p></div>"});
				}
			}
			/*确认事件*/
			if(turl!="undefined"){
				delay_id=setTimeout($.unblockUI,1000);
				var tourl_id=setTimeout(function(){
					window.location.href = turl;
				},1005);
			}else{
				delay_id=setTimeout($.unblockUI,1000);
				$("#popup_wrap_error,#popup_wrap_errorie,#popup_wrap,#popup_wrapie").hover(function(){
					clearTimeout(delay_id);
				},function(){
					delay_id=setTimeout($.unblockUI,500);
				});
			}
		}
		if(pb=="have"){
			/*有按钮的成功框*/
			if(pt=="yes"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'306px','height':'156px'},message:"<div class=\"popup_wrapie\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确&nbsp;认</a></div>"});
					}else{
						$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确&nbsp;认</a></div>"});
					}
				}else{
					$.blockUI({css:{'width':'306px','height':'156px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确&nbsp;认</a></div>"});
				}
			/*有按钮的失败框*/
			}else if(pt=="no"){
				/*使用blockUI插件*/
				if($.browser.msie){
					if($.browser.version<7){
						$.blockUI({css:{'width':'406px','height':'106px'},message:"<div class=\"popup_wrap_errorie\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确&nbsp;认</a></div>"});
					}else{
						$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap_error\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确&nbsp;认</a></div>"});
					}
				}else{
					$.blockUI({css:{'width':'406px','height':'106px','-moz-box-shadow':'none','-ms-box-shadow':'none','-o-box-shadow':'none','-webkit-box-shadow':'none','box-shadow':'none','background-color':'transparent'},message:"<div class=\"popup_wrap_error\"><p>"+inf+"</p><a id=\"popup_btn\" title=\"\" href=\"\">确&nbsp;认</a></div>"});
				}
			}
			/*确认事件*/
			$("#popup_btn").click(function(e){
				e.preventDefault();
				setTimeout(function(){
					$.unblockUI();
					if(turl!="undefined")window.location.href = turl;
				},20);
			});
		}	
}
