/*首页控制器*/
angular.module('app')
    .controller('SettingInfoController', ['settingService',function(settingService){
        var self=this;


        /*模型--操作记录*/
        this.record={
            organizationId:''/*操作id*/,
            organizationName:''/*操作名称*/,
            token:''/*凭证*/,
            adminId:''
        };

        /*模型--机构信息*/
        this.struct={
             linkman:''/*负责人*/,
             cellphone:''/*手机号码*/,
             address:''/*详细地址*/,
             remark:''/*备注*/,
             payeeName:''/*收款人姓名*/,
             depositBank:''/*开户银行*/,
             payeeAccount:''/*收款帐号*/
        };

        /*初始化服务--初始化参数*/
        settingService.getRoot(self.record);

        

        /*表单服务--提交表单*/
        this.formSubmit=function (type) {
            settingService.formSubmit({
                record:self.record,
                struct:self.struct
            },type);
        };
        /*表单服务--重置表单*/
        this.formReset=function (forms,type) {
            settingService.formReset({
                record:self.record,
                struct:self.struct,
                forms:forms
            },type);
        };

        
    }]);