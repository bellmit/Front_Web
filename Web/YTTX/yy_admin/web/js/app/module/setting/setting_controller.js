/*首页控制器*/
angular.module('app')
    .controller('SettingController', ['settingService','toolUtil',function(settingService,toolUtil){
        var self=this;

        /*模型--操作权限列表*/
        this.powerlist=settingService.getCurrentPower();


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/


        /*模型--菜单列表*/
        this.listitem=[{
            name:'完善信息',
            type:'organization_info',
            power:self.powerlist.organization_info,
            href:'setting.organization_info',
            active:'menuactive'
        },{
            name:'更改密码',
            type:'pwd',
            power:self.powerlist.pwd_update,
            href:'setting.pwd',
            active:''
        },{
            name:'设置子管理',
            type:'sub_manage',
            power:(self.powerlist.child_add || self.powerlist.child_edit || self.powerlist.child_delete),
            href:'setting.sub_manage',
            active:''
        },{
            name:'分润设置',
            type:'profit',
            power:self.powerlist.setting_profit,
            href:'setting.profit',
            active:''
        }];


    }]);