/*设置总控制器*/
angular.module('app')
    .controller('SettingController', ['settingService','toolUtil',function(settingService,toolUtil){
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


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom={
                $admin_page_wrap:$('#admin_page_wrap'),
                $admin_list_wrap:$('#admin_list_wrap'),
                $admin_batchlist_wrap:$('#admin_batchlist_wrap'),
                $admin_manage_reset:$('#admin_manage_reset'),
                $setting_manage_dialog:$('#setting_manage_dialog'),
                $admin_struct_menu:$('#admin_struct_menu')
            },
            jq_dom_power={
                $allpower:$('#admin_setting_allpower')
            };
        jq_dom['$allstruct']=jq_dom.$admin_struct_menu.prev().find('label');

        /*切换路由时更新dom缓存*/
        settingService.initJQDom(jq_dom);
        settingService.initJQDomForPower(jq_dom_power);


        /*模型--权限*/
        this.power={
            colgroup:'',
            thead:'',
            tbody:''
        };

        /*模型--操作记录*/
        this.record={
            searchactive:''/*搜索激活状态*/,
            searchname:''/*搜索关键词*/,
            organizationId:''/*操作id*/,
            organizationName:''/*操作名称*/,
            token:''/*凭证*/,
            adminId:'',
            prev:null/*上一次操作记录*/,
            current:null/*当前操作记录*/,
            layer:0,
            currentId:'',
            currentName:'',
            managestruct:{}/*子管理--选中的机构信息*/
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


        /*模型--子管理信息*/
        this.manage={
            type:'add'/*表单类型：新增，编辑；默认为新增*/,
            id:''/*子管理ID，编辑时相关参数*/,
            fullName:''/*子管理全称*/,
            cellphone:''/*手机号码*/,
            username:''/*设置登录名*/,
            password:''/*设置登录密码*/,
            remark:''/*备注*/,
            isDesignatedOrg:0/*是否指定运营商：0：默认，1：指定*/,
            designatedOrgIds:''/*指定运营商Ids*/,
            isDesignatedPermit:0/*是否指定权限,0:全部权限 1:指定权限*/,
            checkedFunctionIds:''/*选中权限Ids*/,
            filter:''/*管理列表过滤*/
        };


        /*模型--表格缓存*/
        this.table={
            list1_page:{
                page:1,
                pageSize:20,
                total:0
            },
            list1_config:{
                config:{
                    processing:true,/*大消耗操作时是否显示处理状态*/
                    deferRender:true,/*是否延迟加载数据*/
                    autoWidth:true,/*是否*/
                    paging:false,
                    ajax:{
                        url:toolUtil.adaptReqUrl('/sysuser/child/list'),
                        dataType:'JSON',
                        method:'post',
                        dataSrc:function ( json ) {
                            var code=parseInt(json.code,10),
                                message=json.message;

                            if(code!==0){
                                if(typeof message !=='undefined' && message!==''){
                                    console.log(message);
                                }else{
                                    console.log('获取子管理失败');
                                }
                                if(code===999){
                                    /*退出系统*/
                                    toolUtil.loginTips({
                                        clear:true,
                                        reload:true
                                    });
                                }
                                return [];
                            }
                            var result=json.result;
                            if(typeof result==='undefined'){
                                /*重置分页*/
                                self.table.list1_page.total=0;
                                self.table.list1_page.page=1;
                                jq_dom.$admin_page_wrap.pagination({
                                    pageNumber:self.table.list1_page.page,
                                    pageSize:self.table.list1_page.pageSize,
                                    total:self.table.list1_page.total
                                });
                                return [];
                            }

                            if(result){
                                /*设置分页*/
                                self.table.list1_page.total=result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap.pagination({
                                    pageNumber:self.table.list1_page.page,
                                    pageSize:self.table.list1_page.pageSize,
                                    total:self.table.list1_page.total,
                                    onSelectPage:function(pageNumber,pageSize){
                                        /*再次查询*/
                                        var temp_param=self.table.list1_config.config.ajax.data;
                                        self.table.list1_page.page=pageNumber;
                                        self.table.list1_page.pageSize=pageSize;
                                        temp_param['page']=self.table.list1_page.page;
                                        temp_param['pageSize']=self.table.list1_page.pageSize;
                                        self.table.list1_config.config.ajax.data=temp_param;
                                        settingService.getColumnData(self.table,self.record);
                                    }
                                });

                                var list=result.list;
                                if(list){
                                    var vi=0,
                                        vlen=list.length;
                                    for(vi;vi<vlen;vi++){
                                        if(!list[vi] || list[vi]===null){
                                            return [];
                                        }
                                    }
                                    return list;
                                }else{
                                    return [];
                                }
                            }else{
                                /*重置分页*/
                                self.table.list1_page.total=0;
                                self.table.list1_page.page=1;
                                jq_dom.$admin_page_wrap.pagination({
                                    pageNumber:self.table.list1_page.page,
                                    pageSize:self.table.list1_page.pageSize,
                                    total:self.table.list1_page.total
                                });
                                return [];
                            }
                        },
                        data:{
                            page:1,
                            pageSize:20
                        }
                    },
                    info:false,
                    dom:'<"g-d-hidei" s>',
                    searching:true,
                    order:[[1, "desc" ]],
                    columns: [
                        {
                            "data":"fullname"
                        },
                        {
                            "data":"isDesignatedOrg",
                            "render":function(data, type, full, meta ){
                                var designatedOrg=parseInt(data,10);
                                if(designatedOrg===0){
                                    return '<div class="g-c-blue3">本机构级下属机构</div>';
                                }else if(designatedOrg===1){
                                    return '<div class="g-c-blue3">指定机构</div>';
                                }else{
                                    return '<div class="g-c-warn">其他</div>';
                                }
                            }
                        },
                        {
                            "data":"isDesignatedPermit",
                            "render":function(data, type, full, meta ){
                                var designatedPermit=parseInt(data,10);
                                if(designatedPermit===0){
                                    return '<div class="g-c-blue3">全部权限</div>';
                                }else if(designatedPermit===1){
                                    return '<div class="g-c-blue3">指定权限</div>';
                                }else{
                                    return '<div class="g-c-warn">其他</div>';
                                }
                            }
                        },
                        {
                            /*to do*/
                            "data":"id",
                            "render":function(data, type, full, meta ){
                                var btns='';

                                /*查看订单*/
                                if(self.powerlist.child_edit){
                                    btns+='<span data-action="update" data-id="'+data+'"  class="btn-operate">编辑</span>';
                                }
                                if(self.powerlist.child_delete){
                                    btns+='<span data-action="delete" data-id="'+data+'"  class="btn-operate">删除</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            list_table:null,
            /*按钮*/
            tableitemaction:{
                $bodywrap:jq_dom.$admin_batchlist_wrap,
                itemaction_api:{
                    doItemAction:function(config){
                        settingService.doItemAction({
                            modal:{
                                type:'edit',
                                area:'manage',
                                display:'show'
                            },
                            record:self.record,
                            manage:self.manage,
                            table:self.table,
                            power:self.power,
                            type:'manage'
                        },config);
                    }
                }
            }
        };



        /*初始化服务--初始化参数*/
        settingService.getRoot(self.record);
        /*初始化服务--初始化权限模型头部*/
        settingService.createThead({flag:true},self.power);
        /*初始化服务--查询子管理列表*/
        settingService.getColumnData(self.table,self.record);




        /*表单服务--提交表单*/
        this.formSubmit=function (type) {
            settingService.formSubmit({
                record:self.record,
                manage:self.manage,
                pwd:self.pwd,
                table:self.table,
                struct:self.struct
            },type);
        };
        /*表单服务--重置表单*/
        this.formReset=function (forms,type) {
            settingService.formReset({
                record:self.record,
                struct:self.struct,
                manage:self.manage,
                forms:forms
            },type);
        };
        /*表单服务--权限服务--全选权限*/
        this.selectAllPower=function (e) {
            settingService.selectAllPower(e);
        };
        /*表单服务--权限服务--确定所选权限*/
        this.getSelectPower=function () {
            settingService.getSelectPower(self.manage);
        };
        /*表单服务--权限服务--取消所选权限*/
        this.clearSelectPower=function () {
            settingService.clearSelectPower(self.manage);
        };
        /*表单服务--机构服务--全选机构*/
        this.selectAllStruct=function (e) {
            settingService.selectAllStruct(e);
        };
        /*表单服务--机构服务--确定所选机构*/
        this.getSelectStruct=function () {
            settingService.getSelectStruct(self.manage);
        };
        /*表单服务--机构服务--取消所选机构*/
        this.clearSelectStruct=function () {
            settingService.clearSelectStruct(self.manage);
        };


        /*机构服务--初始化加载机构*/
        this.initStructList=function (e) {
            settingService.initStructList(e,{
                record:self.record,
                manage:self.manage
            });
        };
        /*机构服务--加载机构角色*/
        this.getStructList=function () {
            settingService.getStructList({
                record:self.record
            });
        };
        /*机构服务--显示隐藏*/
        this.toggleStructList=function (e) {
            settingService.toggleStructList(e,{
                record:self.record
            });
        };



        /*弹出层显示隐藏*/
        this.toggleModal=function (config) {
            settingService.toggleModal({
                display:config.display,
                area:config.area
            });
        };


        /*子管理--添加子管理*/
        this.actionManage=function (config) {
            settingService.actionManage({
                modal:config,
                record:self.record,
                manage:self.manage,
                power:self.power
            });
        };


        /*数据列表--过滤数据*/
        this.filterDataTable=function () {
          settingService.filterDataTable(self.table.list_table,self.manage);
        };



        /*搜索服务--搜索过滤*/
        this.searchAction=function () {
            /*清除全选*/
            jq_dom.$allstruct.remove();
            /*重置记录*/
            settingService.initRecord(self.record);
            /*初始化加载数据*/
            settingService.getStructList({
                record:self.record
            });
        };
        /*搜索服务--清空过滤条件*/
        this.searchClear=function () {
            self.record.searchname='';
            self.record.searchactive='';
        };

    }]);