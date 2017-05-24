/*设置总控制器*/
angular.module('app')
    .controller('SettingController', ['settingService',function(settingService){
        var self=this;

        /*模型--操作权限列表*/
        this.powerlist=settingService.getCurrentPower();

        /*模型--菜单列表*/
        this.listitem=[{
            name:'完善信息',
            power:self.powerlist.organization_info,
            href:'setting.info',
            active:''
        },{
            name:'更改密码',
            power:self.powerlist.pwd_update,
            href:'setting.pwd',
            active:''
        },{
            name:'设置子管理',
            power:(self.powerlist.child_add || self.powerlist.child_edit || self.powerlist.child_delete),
            href:'setting.manage',
            active:''
        },{
            name:'分润设置',
            power:self.powerlist.setting_profit,
            href:'setting.profit',
            active:''
        }];
        
        


    }]);