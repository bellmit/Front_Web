/*首页控制器*/
angular.module('app')
    .controller('SettingPwdController', ['settingService',function(settingService){
        var self=this;


        /*模型--操作记录*/
        this.record={
            organizationId:''/*操作id*/,
            organizationName:''/*操作名称*/,
            token:''/*凭证*/,
            adminId:''
        };

        /*模型--机构信息*/
        this.pwd={
            password:''/*旧密码*/,
            newPassword:''/*新密码*/,
            confirm_newPassword:''/*确认密码*/
        };

        /*初始化服务--初始化参数*/
        settingService.getRoot(self.record);

        

        /*表单服务--提交表单*/
        this.formSubmit=function (type) {
            settingService.formSubmit({
                record:self.record,
                pwd:self.pwd
            },type);
        };

        
    }]);