angular.module('app')
    .service('settingService',['toolUtil','loginService','powerService',function(toolUtil,loginService,powerService){

        /*获取缓存数据*/
        var self=this,
            module_id=90/*模块id*/,
            cache=loginService.getCache();

        var powermap=powerService.getCurrentPower(module_id);

        /*struct={
            token:''/!*凭证信息*!/,
            adminId:''/!*管理员ID*!/,
            organizationId:''/!*组织机构id*!/,
            showtoken:'',
            organizationName:'',
            id:''/!*运营商ID*!/,
            fullName:''/!*全称*!/,
            parentId:''/!*上级运营商ID*!/,
            linkman:''/!*负责人*!/,
            cellphone:''/!*手机号码*!/,
            address:''/!*详细地址*!/,
            remark:''/!*备注*!/,
            payeeName:''/!*收款人姓名*!/,
            depositBank:''/!*开户银行*!/,
            payeeAccount:''/!*收款帐号*!/
        };*/

        /*初始化权限*/
        var init_power={
            organization_info:toolUtil.isPower('organization-info',powermap,true)/*机构信息*/,
            pwd_update:toolUtil.isPower('pwd-update',powermap,true)/*更改密码*/,
            child_add:toolUtil.isPower('child-add',powermap,true)/*添加子管理*/,
            child_edit:toolUtil.isPower('child-edit',powermap,true)/*编辑子管理*/,
            child_delete:toolUtil.isPower('child-delete',powermap,true)/*删除子管理*/,
            setting_profit:toolUtil.isPower('setting-profit',powermap,true)/*分润设置*/
        };
        
        /*扩展服务--查询操作权限*/
        this.getCurrentPower=function () {
            return init_power;
        };

        /*初始化服务--获取虚拟挂载点*/
        this.getStruct=function (struct) {
            if(cache===null){
                struct['organizationId']='';
                struct['organizationName']='';
                struct['adminId']='';
                struct['token']='';
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                return false;
            }
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var logininfo=cache.loginMap;
                struct['organizationId']=logininfo.param.organizationId;
                struct['organizationName']=logininfo.username;
                struct['adminId']=logininfo.param.adminId;
                struct['token']=logininfo.param.token;
            }else{
                struct['organizationId']='';
                struct['organizationName']='';
                struct['adminId']='';
                struct['token']='';
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
            }
        };

    }]);