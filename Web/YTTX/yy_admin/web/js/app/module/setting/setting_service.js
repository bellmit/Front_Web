angular.module('app')
    .service('settingService',['toolUtil','toolDialog','loginService','powerService','dataTableItemActionService','$timeout','$sce',function(toolUtil,toolDialog,loginService,powerService,dataTableItemActionService,$timeout,$sce){

        /*获取缓存数据*/
        var self=this,
            module_id=90/*模块id*/,
            cache=loginService.getCache(),
            manageform_reset_timer=null;

        var powermap=powerService.getCurrentPower(module_id);

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
        /*扩展服务--初始化jquery dom节点*/
        this.initJQDom=function (dom) {
            if(dom){
                /*复制dom引用*/
                for(var i in dom){
                    self[i]=dom[i];
                }
            }
        };
        /*扩展服务--初始化jquery dom节点(power)*/
        this.initJQDomForPower=function (dom) {
            powerService.initJQDom(dom);
        };
        /*扩展服务--弹出层显示隐藏*/
        this.toggleModal=function (config,fn) {
            var temp_timer=null,
                type_map={
                    'manage':self.$setting_manage_dialog,
                    'managedetail':self.$setting_managedetail_dialog
                };
            if(config.display==='show'){
                if(typeof config.delay!=='undefined'){
                    temp_timer=setTimeout(function () {
                        type_map[config.area].modal('show',{backdrop:'static'});
                        clearTimeout(temp_timer);
                        temp_timer=null;
                    },config.delay);
                    if(fn&&typeof fn==='function'){
                        fn.call(null);
                    }
                }else{
                    type_map[config.area].modal('show',{backdrop:'static'});
                    if(fn&&typeof fn==='function'){
                        fn.call(null);
                    }
                }
            }else if(config.display==='hide'){
                if(typeof config.delay!=='undefined'){
                    temp_timer=setTimeout(function () {
                        type_map[config.area].modal('hide');
                        clearTimeout(temp_timer);
                        temp_timer=null;
                    },config.delay);
                }else{
                    type_map[config.area].modal('hide');
                }
                /*清除延时任务序列*/
                if(config.area==='manage'){
                    self.clearFormDelay();
                }
            }
        };
        /*扩展服务--初始化权限模型头部*/
        this.createThead=function (config,power) {
            powerService.createThead(config,power);
        };


        /*初始化服务--基础机构信息*/
        this.getRoot=function (record) {
            if(cache===null){
                record['organizationId']='';
                record['organizationName']='';
                record['adminId']='';
                record['token']='';
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                return false;
            }
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var logininfo=cache.loginMap;
                record['organizationId']=logininfo.param.organizationId;
                record['organizationName']=logininfo.username;
                record['adminId']=logininfo.param.adminId;
                record['token']=logininfo.param.token;
            }else{
                record['organizationId']='';
                record['organizationName']='';
                record['adminId']='';
                record['token']='';
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
            }
        };


        /*子管理服务--新增子管理*/
        this.actionManage=function (config) {
            var modal=config.modal,
                manage=config.manage,
                record=config.record,
                power=config.power,
                type=modal.type;

            /*判断是否是合法的节点，即是否有父机构*/
            if(record.organizationId===''){
                toolDialog.show({
                    type:'warn',
                    value:'没有父机构或父机构不存在'
                });
                return false;
            }

            /*如果存在延迟任务则清除延迟任务*/
            self.clearFormDelay();
            /*通过延迟任务清空表单数据*/
            self.addFormDelay({
                type:'manage'
            });

            /*根据类型跳转相应逻辑*/
            if(type==='edit'){
                /*查询相关存在的数据*/
                self.queryManageInfo(config);
            }else if(type==='add'){
                /*to do*/
                /*查询权限--先查询当前权限*/
                powerService.reqPowerList({
                    url:'/organization/permission/select',
                    param:{
                        organizationId:record.organizationId
                    }
                },power);
                /*显示弹窗*/
                self.toggleModal({
                    display:modal.display,
                    area:modal.area
                });
            }



        };
        /*子管理服务--查询子管理*/
        this.queryManageInfo=function (config) {
            if(cache===null){
                return false;
            }
            var record=config.record,
                manage=config.manage,
                power=config.power,
                modal=config.modal,
                param={};

            /*判断参数*/
            param['token']=record.token;
            param['adminId']=record.adminId;
            /*param['organizationId']=record.organizationId;*/
            param['id']=manage.id;


            toolUtil
                .requestHttp({
                    url:'/sysuser/child/view',
                    method:'post',
                    set:true,
                    data:param
                })
                .then(function(resp){
                        var data=resp.data,
                            status=parseInt(resp.status,10);

                        if(status===200){
                            var code=parseInt(data.code,10),
                                message=data.message;
                            if(code!==0){
                                if(typeof message !=='undefined' && message!==''){
                                    console.log(message);
                                }else{
                                    console.log('请求数据失败');
                                }

                                if(code===999){
                                    /*退出系统*/
                                    cache=null;
                                    toolUtil.loginTips({
                                        clear:true,
                                        reload:true
                                    });
                                }
                            }else{
                                /*加载数据*/
                                var result=data.result;
                                if(typeof result!=='undefined'){
                                    var list=result.child;
                                    if(list){
                                        /*更新模型*/
                                        for(var i in list){
                                            switch (i){
                                                case 'id':
                                                    manage[i]=list[i];
                                                    break;
                                                case 'fullName':
                                                    manage[i]=list[i];
                                                    break;
                                                case 'cellphone':
                                                    manage[i]=toolUtil.phoneFormat(list[i]);
                                                    break;
                                                case 'username':
                                                    manage[i]=list[i];
                                                    break;
                                                case 'remark':
                                                    manage[i]=list[i];
                                                    break;
                                                case 'isDesignatedOrg':
                                                    /*是否指定运营商*/
                                                    var temp_org=list['isDesignatedOrg'];
                                                    if(temp_org==='' || isNaN(temp_org) || typeof temp_org==='undefined'){
                                                        /*默认为：继承上级运营商*/
                                                        temp_org=0;
                                                    }else{
                                                        temp_org=parseInt(temp_org,10);
                                                    }
                                                    manage['isDesignatedOrg']=temp_org;

                                                    /*继承上级机构，清空选中机构*/
                                                    if(temp_org===0){
                                                        manage['designatedOrgIds']='';
                                                    }
                                                    break;
                                                case 'isDesignatedPermit':
                                                    /*是否指定权限*/
                                                    var temp_power=list['isDesignatedPermit'];

                                                    /*设置权限*/
                                                    if(temp_power==='' || isNaN(temp_power) || typeof temp_power==='undefined'){
                                                        /*默认为：全部权限*/
                                                        temp_power=0;
                                                    }else{
                                                        temp_power=parseInt(temp_power,10);
                                                    }
                                                    manage['isDesignatedPermit']=temp_power;
                                                    /*全部权限时，清空权限ids缓存*/
                                                    if(temp_power===0){
                                                        manage['checkedFunctionIds']='';
                                                    }

                                                    /*查询权限--先查询当前权限(子级权限) --> 再查父级权限  --> 存在父子级权限，过滤子级权限*/
                                                    powerService.reqPowerList({
                                                        url:'/organization/permission/select',
                                                        source:true,/*是否获取数据源*/
                                                        sourcefn:function (cs) {
                                                            /*数据源*/
                                                            var child_data=cs,
                                                                parent_data;
                                                            if(child_data!==null){
                                                                /*存在数据源*/
                                                                powerService.reqPowerList({
                                                                    url:'/organization/permission/select',
                                                                    source:true,/*是否获取数据源*/
                                                                    sourcefn:function (ps) {
                                                                        /*数据源*/
                                                                        parent_data=ps;
                                                                        if(parent_data!==null){
                                                                            /*存在数据源，开始过滤权限数据*/
                                                                            var filter_data=powerService.filterPower(parent_data,child_data);
                                                                            if(filter_data){
                                                                                /*过滤后的数据即映射到视图*/
                                                                                var power_html=powerService.resolvePowerList({
                                                                                    menu:filter_data
                                                                                });
                                                                                /*更新模型*/
                                                                                if(power_html && power){
                                                                                    power['tbody']=$sce.trustAsHtml(power_html);
                                                                                }
                                                                            }else{
                                                                                toolDialog.show({
                                                                                    type:'warn',
                                                                                    value:'过滤后的权限数据不正确'
                                                                                });
                                                                                return false;
                                                                            }
                                                                        }else{
                                                                            /*提示信息*/
                                                                            toolDialog.show({
                                                                                type:'warn',
                                                                                value:'没有父级权限数据'
                                                                            });
                                                                            return false;
                                                                        }
                                                                    },
                                                                    param:{
                                                                        organizationId:record.organizationId
                                                                    }
                                                                },power);
                                                            }else{
                                                                /*提示信息*/
                                                                toolDialog.show({
                                                                    type:'warn',
                                                                    value:'没有子级权限数据'
                                                                });
                                                                return false;
                                                            }
                                                        },
                                                        param:{
                                                            organizationId:list['id']
                                                        }
                                                    },power);
                                                    break;
                                            }
                                        }
                                        /*显示弹窗*/
                                        self.toggleModal({
                                            display:modal.display,
                                            area:modal.area
                                        });
                                    }else{
                                        /*提示信息*/
                                        toolDialog.show({
                                            type:'warn',
                                            value:'获取编辑数据失败'
                                        });
                                    }
                                }
                            }
                        }
                    },
                    function(resp){
                        var message=resp.data.message;
                        if(typeof message !=='undefined'&&message!==''){
                            console.log(message);
                        }else{
                            console.log('请求机构失败');
                        }
                    });
        };

        /*表单类服务--执行延时任务序列*/
        this.addFormDelay=function (config) {
            /*映射对象*/
            var type=config.type,
                type_map={
                    'manage':{
                        'timeid':manageform_reset_timer,
                        'dom':self.$admin_manage_reset
                    }
                };
            /*执行延时操作*/
            type_map[type]['timeid']=$timeout(function(){
                /*触发重置表单*/
                type_map[type]['dom'].trigger('click');

            },0);
        };
        /*表单类服务--清除延时任务序列*/
        this.clearFormDelay=function (did) {
            if(did  &&  did!==null){
                $timeout.cancel(did);
                did=null;
            }else{
                /*如果存在延迟任务则清除延迟任务*/
                if(manageform_reset_timer!==null){
                    $timeout.cancel(manageform_reset_timer);
                    manageform_reset_timer=null;
                }
            }
        };
        /*表单类服务--重置表单*/
        this.formReset=function (config,type) {
            if(type ==='struct'){
                /*重置表单模型,如果是2参数则为特殊重置，1个参数为通用重置*/
                self.clearFormData(config[type],type);
            }
            /*重置验证提示信息*/
            self.clearFormValid(config.forms);
        };
        /*表单类服务--提交表单数据*/
        this.formSubmit=function (config,type) {
            if(cache){
                var action='',
                    param={},
                    req_config={
                        method:'post',
                        set:true
                    },
                    record=config.record,
                    tip_map={
                        'add':'新增',
                        'edit':'编辑',
                        'update':'修改',
                        'struct':'组织机构',
                        'manage':'子管理',
                        'pwd':'密码'
                    };

                if(record.organizationId===''){
                    return false;
                }

                param['adminId']=record.adminId;
                param['token']=record.token;
                /*适配参数*/
                if(type==='struct'){
                    /*公共配置*/
                    param['fullName']=record.organizationName;
                    param['linkman']=config[type]['linkman'];
                    param['cellphone']=toolUtil.trims(config[type]['cellphone']);
                    param['address']=config[type]['address'];
                    param['remark']=config[type]['remark'];
                    param['payeeName']=config[type]['payeeName'];
                    param['depositBank']=config[type]['depositBank'];
                    param['payeeAccount']=config[type]['payeeAccount'];

                    /*判断是新增还是修改*/
                    action='update';
                    param['id']=record.organizationId;
                    req_config['url']='/organization/info/improve';
                }else if(type==='pwd'){
                    /*公共配置*/
                    param['password']=config[type]['password'];
                    param['newPassword']=config[type]['newPassword'];

                    /*判断是新增还是修改*/
                    action='update';
                    req_config['url']='/sysuser/pwd/update';
                }else if(type==='manage'){
                    /*公共配置*/
                    param['fullName']=config[type]['fullName'];
                    param['cellphone']=toolUtil.trims(config[type]['cellphone']);
                    param['username']=config[type]['username'];
                    param['password']=config[type]['password'];
                    param['remark']=config[type]['remark'];

                    /*选择机构*/
                    var isDesignatedOrg=config[type]['isDesignatedOrg'];
                    if(isDesignatedOrg==='' || typeof isDesignatedOrg==='undefined' || isNaN(isDesignatedOrg)){
                        isDesignatedOrg=0;
                    }else{
                        isDesignatedOrg=parseInt(isDesignatedOrg,10);
                    }
                    param['isDesignatedOrg']=isDesignatedOrg;
                    if(isDesignatedOrg===1){
                        param['designatedOrgIds']=config[type]['designatedOrgIds'];
                    }
                    /*选择权限*/
                    var isDesignatedPermit=config[type]['isDesignatedPermit'];
                    if(isDesignatedPermit==='' || typeof isDesignatedPermit==='undefined' || isNaN(isDesignatedPermit)){
                        isDesignatedPermit=0;
                    }else{
                        isDesignatedPermit=parseInt(isDesignatedPermit,10);
                    }
                    param['isDesignatedPermit']=isDesignatedPermit;
                    if(isDesignatedPermit===1){
                        param['checkedFunctionIds']=config[type]['checkedFunctionIds'];
                    }

                    /*判断是新增还是修改*/
                    if(config[type]['id']!==''){
                        action='edit';
                        req_config['url']='/sysuser/child/update';
                    }else{
                        action='add';
                        req_config['url']='/sysuser/child/add';
                    }
                }
                req_config['data']=param;

                toolUtil
                    .requestHttp(req_config)
                    .then(function(resp){
                            var data=resp.data,
                                status=parseInt(resp.status,10);

                            if(status===200){
                                var code=parseInt(data.code,10),
                                    message=data.message;
                                if(code!==0){
                                    if(typeof message !=='undefined' && message!==''){
                                        toolDialog.show({
                                            type:'warn',
                                            value:message
                                        });
                                    }else{
                                        toolDialog.show({
                                            type:'warn',
                                            value:tip_map[action]+tip_map[type]+'失败'
                                        });
                                    }
                                    if(code===999){
                                        /*退出系统*/
                                        cache=null;
                                        toolUtil.loginTips({
                                            clear:true,
                                            reload:true
                                        });
                                    }
                                    return false;
                                }else{
                                    /*操作成功即加载数据*/
                                    /*to do*/
                                    if(type==='manage'){
                                        /*重置表单*/
                                        self.addFormDelay({
                                            type:type
                                        });
                                        /*加载列表数据*/
                                        //self.getColumnData(config.table,config.record);
                                        /*弹出框隐藏*/
                                        self.toggleModal({
                                            display:'hide',
                                            area:type,
                                            delay:1000
                                        });
                                    }
                                    /*提示操作结果*/
                                    toolDialog.show({
                                        type:'succ',
                                        value:tip_map[action]+tip_map[type]+'成功'
                                    });
                                }
                            }
                        },
                        function(resp){
                            var message=resp.data.message;
                            if(typeof message !=='undefined'&&message!==''){
                                toolDialog.show({
                                    type:'warn',
                                    value:message
                                });
                            }else{
                                toolDialog.show({
                                    type:'warn',
                                    value:tip_map[action]+tip_map[type]+'失败'
                                });
                            }
                        });
            }else{
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
            }
        };
        /*表单类服务--清空表单模型数据*/
        this.clearFormData=function (mode,type) {
            if(!mode){
                return false;
            }

            if(typeof type!=='undefined' && type!==''){
                /*特殊重置*/
                if(type==='struct'){
                    /*重置机构数据模型*/
                    (function () {
                        for(var i in mode){
                            mode[i]='';
                        }
                    })(mode);
                }
            }else {
                /*通用重置*/
                (function () {
                    for(var i in mode){
                        if(i==='type'){
                            /*操作类型为新增*/
                            mode[i]='add';
                        }else{
                            mode[i]='';
                        }
                    }
                })(mode);
            }
        };
        /*表单类服务--重置表单数据*/
        this.clearFormValid=function (forms) {
            if(forms){
                var temp_cont=forms.$$controls;
                if(temp_cont){
                    var len=temp_cont.length,
                        i=0;
                    forms.$dirty=false;
                    forms.$invalid=true;
                    forms.$pristine=true;
                    forms.valid=false;

                    if(len!==0){
                        for(i;i<len;i++){
                            var temp_item=temp_cont[i];
                            temp_item['$dirty']=false;
                            temp_item['$invalid']=true;
                            temp_item['$pristine']=true;
                            temp_item['$valid']=false;
                        }
                    }
                }
            }
        };
        /*表单类服务--权限服务--全选权限*/
        this.selectAllPower=function (e) {
            powerService.selectAllPower(e);
        };
        /*表单类服务--权限服务--确定所选权限*/
        this.getSelectPower=function (model) {
            var temppower=powerService.getSelectPower();
            if(temppower){
                model.checkedFunctionIds=temppower.join();
            }else{
                model.checkedFunctionIds='';
            }
        };
        /*表单类服务--权限服务--取消所选权限*/
        this.clearSelectPower=function (model) {
            model.checkedFunctionIds='';
            powerService.clearSelectPower();
        };
        /*表单类服务--权限服务--全选权限*/
        this.selectAllPower=function (e) {
            powerService.selectAllPower(e);
        };
        /*表单类服务--权限服务--确定所选权限*/
        this.getSelectPower=function (model) {
            var temppower=powerService.getSelectPower();
            if(temppower){
                model.checkedFunctionIds=temppower.join();
            }else{
                model.checkedFunctionIds='';
            }
        };
        /*表单类服务--权限服务--取消所选权限*/
        this.clearSelectPower=function (model) {
            model.checkedFunctionIds='';
            powerService.clearSelectPower();
        };


        /*数据服务--请求数据--获取表格数据*/
        this.getColumnData=function (table,record){
            if(cache===null){
                return false;
            }else if(!table && !record){
                return false;
            }
            /*参数赋值*/
            table.list1_config.config.ajax.data=$.extend(true,{},table.list1_config.config.ajax.data);
            if(table.list_table===null){
                table.list1_config.config.ajax.data['adminId']=record.adminId;
                table.list1_config.config.ajax.data['token']=record.token;
                table.list1_config.config.ajax.data['organizationId']=record.organizationId;
                /*初始请求*/
                table.list_table=self.$admin_list_wrap.DataTable(table.list1_config.config);
                console.log('ccc');
                /*调用按钮操作*/
                dataTableItemActionService.initItemAction(table.tableitemaction);
            }else {
                table.list_table.ajax.config(table.list1_config.config.ajax).load();
            }
        };
        /*数据服务--过滤表格数据*/
        this.filterDataTable=function (list_table,manage) {
            if(list_table===null){
                return false;
            }
            var filter=manage.filter;
            list_table.search(filter).columns().draw();
        };
        /*数据服务--子管理列表操作按钮*/
        this.doItemAction=function (model,config) {
            var id=config.id,
                action=config.action;

            if(action==='update'){
                /*编辑*/
                /*判断是否是合法的节点，即是否有父机构*/
                if(model.record.organizationId===''){
                    toolDialog.show({
                        type:'warn',
                        value:'没有父机构或父机构不存在'
                    });
                    return false;
                }
                /*如果存在延迟任务则清除延迟任务*/
                self.clearFormDelay();
                /*通过延迟任务清空表单数据*/
                self.addFormDelay({
                    type:model.type
                });
                model[model.type].id=id;
                self.queryManageInfo(config);
            }else if(action==='delete'){
                /*清算订单*/
                self.deleteManage(model,{
                    type:'base',
                    id:id
                });
            }
        };
        /*数据服务--删除子管理列表数据*/
        this.deleteManage=function (model,config) {
            if(cache===null){
                return false;
            }

            var type=config.type,
                record=model.record,
                table=model.table;

            if(type==='batch'){
                /*批量处理--to do*/
                return false;
            }else if(type==='base'){
                /*单个处理*/
                var id=config.id;
                if(isNaN(id)){
                    toolDialog.show({
                        type:'warn',
                        value:'请选中相关数据'
                    });
                    return false;
                }
            }

            /*确认是否清算*/
            toolDialog.sureDialog('',function () {
                /*适配参数*/
                var param={};
                param['adminId']=record.adminId;
                if(type==='batch'){
                    /*to do*/
                }else if(type==='base'){
                    param['id']=id;
                }

                /*执行清算操作*/
                toolUtil
                    .requestHttp({
                        url:'/sysuser/child/delete',
                        method:'post',
                        set:true,
                        data:param
                    })
                    .then(function(resp){

                            var data=resp.data,
                                status=parseInt(resp.status,10);

                            if(status===200){
                                var code=parseInt(data.code,10),
                                    message=data.message;
                                if(code!==0){
                                    if(typeof message !=='undefined'&&message!==''){
                                        /*提示信息*/
                                        toolDialog.show({
                                            type:'warn',
                                            value:message
                                        });
                                    }else{
                                        /*提示信息*/
                                        toolDialog.show({
                                            type:'warn',
                                            value:'删除子管理失败'
                                        });
                                    }

                                    if(code===999){
                                        /*退出系统*/
                                        cache=null;
                                        toolUtil.loginTips({
                                            clear:true,
                                            reload:true
                                        });
                                    }
                                }else{
                                    /*提示信息*/
                                    toolDialog.show({
                                        type:'succ',
                                        value:'删除子管理成功'
                                    });
                                    /*重新加载数据*/
                                    self.getColumnData(table,record);
                                }
                            }
                        },
                        function(resp){
                            var message=resp.data.message;
                            if(typeof message !=='undefined' && message!==''){
                                console.log(message);
                            }else{
                                console.log('删除子管理失败');
                            }
                        });
            },type==='base'?'是否真要删除子管理':'是否真要批量删除子管理',true);

        };


        /*机构服务--获取虚拟挂载点*/
        this.getMemberRoot=function (record) {
            if(cache===null){
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                record['currentId']='';
                record['currentName']='';
                return false;
            }
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var logininfo=cache.loginMap;
                record['currentId']=logininfo.param.organizationId;
                record['currentName']=logininfo.username;
            }else{
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                record['currentId']='';
                record['currentName']='';
            }
        };
        /*机构服务--获取导航*/
        this.getMemberList=function (config) {
            if(cache){
                var param=$.extend(true,{},cache.loginMap.param);
                param['isShowSelf']=0;
                var layer,
                    id,
                    $wrap;

                /*初始化加载*/
                if(!config){
                    layer=0;
                    /*根目录则获取新配置参数*/
                    id=param['organizationId'];
                    $wrap=self.$admin_member_menu;
                }else{
                    /*非根目录则获取新请求参数*/
                    layer=config.$reqstate.attr('data-layer');
                    $wrap=config.$reqstate.next();
                    id=config.$reqstate.attr('data-id');

                    /*判断是否是合法的节点*/
                    if(layer>=BASE_CONFIG.submenulimit){
                        return false;
                    }
                    param['organizationId']=id;
                }


                toolUtil
                    .requestHttp({
                        url:'/organization/lowers/search',
                        method:'post',
                        set:true,
                        data:param
                    })
                    .then(function(resp){
                            var data=resp.data,
                                status=parseInt(resp.status,10);

                            if(status===200){
                                var code=parseInt(data.code,10),
                                    message=data.message;
                                if(code!==0){
                                    if(typeof message !=='undefined'&&message!==''){
                                        console.log(message);
                                    }

                                    if(code===999){
                                        /*退出系统*/
                                        cache=null;
                                        toolUtil.loginTips({
                                            clear:true,
                                            reload:true
                                        });
                                    }
                                }else{
                                    /*加载数据*/
                                    var result=data.result;
                                    if(typeof result!=='undefined'){
                                        var list=result.list,
                                            str='';
                                        if(list){
                                            var len=list.length;
                                            if(len===0){
                                                $wrap.html('');
                                                /*清除显示下级菜单导航图标*/
                                                config.$reqstate.attr({
                                                    'data-isrequest':true
                                                }).removeClass('sub-menu-title sub-menu-titleactive');
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                str=self.resolveMemberList(list,BASE_CONFIG.submenulimit,{
                                                    layer:layer,
                                                    id:id
                                                });
                                                if(str!==''){
                                                    $(str).appendTo($wrap.html(''));
                                                }
                                                if(layer!==0){
                                                    config.$reqstate.attr({
                                                        'data-isrequest':true
                                                    });
                                                }
                                            }
                                            self.queryUserList(id);
                                        }else{
                                            $wrap.html('');
                                        }
                                    }else{
                                        if(layer===0){
                                            $wrap.html('');
                                        }
                                    }
                                }
                            }
                        },
                        function(resp){
                            var message=resp.data.message;
                            if(typeof message !=='undefined'&&message!==''){
                                console.log(message);
                            }else{
                                console.log('请求菜单失败');
                            }
                            $wrap.html('');
                        });
            }else{
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
            }
        };
        /*机构服务--解析导航--开始解析*/
        this.resolveMemberList=function (obj,limit,config) {
            if(!obj||typeof obj==='undefined'){
                return false;
            }
            if(typeof limit==='undefined'||limit<=0){
                limit=1;
            }
            var menulist=obj,
                str='',
                i=0,
                len=menulist.length,
                layer=config.layer;

            layer++;

            if(limit>=1&&layer>limit){
                /*如果层级达到设置的极限清除相关*/
                return false;
            }

            if(len!==0){
                for(i;i<len;i++){
                    var curitem=menulist[i];
                    /*到达极限的前一项则不创建子菜单容器*/
                    if(limit>=1&&layer>=limit){
                        str+=self.doItemMemberList(curitem,{
                                flag:false,
                                limit:limit,
                                layer:layer,
                                parentid:config.id
                            })+'</li>';
                    }else{
                        str+=self.doItemMemberList(curitem,{
                                flag:true,
                                limit:limit,
                                layer:layer,
                                parentid:config.id
                            })+'<ul></ul></li>';
                    }
                }
                return str;
            }else{
                return false;
            }
        };
        /*机构服务--解析导航--公共解析*/
        this.doItemMemberList=function (obj,config) {
            var curitem=obj,
                id=curitem["id"],
                label=curitem["fullName"],
                str='',
                flag=config.flag,
                layer=config.layer,
                parentid=config.parentid;

            if(flag){
                str='<li><a data-isrequest="false" data-parentid="'+parentid+'" data-layer="'+layer+'" data-id="'+id+'" class="sub-menu-title" href="#" title="">'+label+'</a>';
            }else{
                str='<li><a data-parentid="'+parentid+'" data-layer="'+layer+'" data-id="'+id+'" href="#" title="">'+label+'</a></li>';
            }
            return str;
        };
        /*机构服务--显示隐藏机构*/
        this.toggleMemberList=function (e,config) {
            /*阻止冒泡和默认行为*/
            e.preventDefault();
            e.stopPropagation();

            /*过滤对象*/
            var target=e.target,
                node=target.nodeName.toLowerCase();
            if(node==='ul'||node==='li'){
                return false;
            }
            var $this=$(target),
                haschild,
                $child,
                isrequest=false,
                temp_id=$this.attr('data-id');


            /*查询子集*/
            haschild=$this.hasClass('sub-menu-title');
            if(haschild){
                $child=$this.next();
                /*是否已经加载过数据*/
                isrequest=$this.attr('data-isrequest');
                if(isrequest==='false'){
                    /*重新加载*/
                    self.getMemberList({
                        $reqstate:$this
                    });
                    /*切换显示隐藏*/
                    if($child.hasClass('g-d-showi')){
                        $child.removeClass('g-d-showi');
                        $this.removeClass('sub-menu-titleactive');
                    }else{
                        $child.addClass('g-d-showi');
                        $this.addClass('sub-menu-titleactive');
                    }
                }else{
                    /*切换显示隐藏*/
                    if($child.hasClass('g-d-showi')){
                        $child.removeClass('g-d-showi');
                        $this.removeClass('sub-menu-titleactive');
                    }else{
                        $child.addClass('g-d-showi');
                        $this.addClass('sub-menu-titleactive');
                        self.queryUserList(temp_id);
                    }
                }
            }else{
                self.queryUserList(temp_id);
            }
        };
        /*机构服务--查询用户*/
        this.queryUserList=function (id) {
            if(cache===null){
                return false;
            }else if(typeof id==='undefined'){

                return false;
            }

            var  param=$.extend(true,{},cache.loginMap.param);
            /*判断参数*/
            param['organizationId']=id;


            toolUtil
                .requestHttp({
                    url:'/organization/shops',
                    method:'post',
                    set:true,
                    data:param
                })
                .then(function(resp){
                        var data=resp.data,
                            status=parseInt(resp.status,10);

                        if(status===200){
                            var code=parseInt(data.code,10),
                                message=data.message;
                            if(code!==0){
                                if(typeof message !=='undefined'&&message!==''){
                                    console.log(message);
                                }else{
                                    console.log('请求数据失败');
                                }

                                if(code===999){
                                    /*退出系统*/
                                    cache=null;
                                    toolUtil.loginTips({
                                        clear:true,
                                        reload:true
                                    });
                                }
                                self.$admin_user_wrap.html('');
                                return false;
                            }else{
                                /*加载数据*/
                                var result=data.result;
                                if(typeof result!=='undefined'){
                                    var list=result.list,
                                        str='';
                                    if(angular.isObject(list)){
                                        /*修改：更新模型*/
                                        for(var i in list){
                                            str+='<li data-id="'+list[i]["id"]+'">'+list[i]["fullName"]+'</li>';
                                        }
                                        if(str!==''){
                                            $(str).appendTo(self.$admin_user_wrap.html(''));
                                        }else {
                                            self.$admin_user_wrap.html('');
                                        }
                                    }else{
                                        self.$admin_user_wrap.html('');
                                    }
                                }else{
                                    self.$admin_user_wrap.html('');
                                }
                            }
                        }
                    },
                    function(resp){
                        var message=resp.data.message;
                        self.$admin_user_wrap.html('');
                        if(typeof message !=='undefined'&&message!==''){
                            console.log(message);
                        }else{
                            console.log('请求用户失败');
                        }
                    });
        };


        /*测试服务--获取订单列表*/
        this.testGetOrderList=function () {
            return {
                message:'ok',
                code:0,
                result:Mock.mock({
                    'count':50,
                    'list|5-15':[{
                        "id":/[0-9]{1,2}/,
                        "merchantName":/(周一|杨二|张三|李四|王五|赵六|马七|朱八|陈九){1}/,
                        "merchantPhone":/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$){1}/,
                        "orderTime":moment().format('YYYY-MM-DD HH:mm:ss'),
                        "orderNumber":/[0-9a-zA-Z]{18}/,
                        "orderState":/(0|1|6|9|20|21|[2-5]){1}/,
                        "totalMoney":/(^(([1-9]{1}\d{0,8})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$){1}/,
                        "paymentType":/[1-3]{1}/
                    }]
                })
            };
        };
        /*测试服务--获取订单列表*/
        this.testGetOrderDetail=function () {
            return {
                status:200,
                data:{
                    message:'ok',
                    code:0,
                    result:Mock.mock({
                        'order|1':[{
                            "id":/[0-9]{1,2}/,
                            "merchantName":/[0-9a-zA-Z]{2,10}/,
                            "merchantPhone":/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$){1}/,
                            "orderTime":moment().format('YYYY-MM-DD HH:mm:ss'),
                            "orderNumber":/[0-9a-zA-Z]{18}/,
                            "orderState":/(0|1|6|9|20|21|[2-5]){1}/,
                            "totalMoney":/(^(([1-9]{1}\d{0,8})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$){1}/,
                            "paymentType":/[1-3]{1}/
                        }],
                        'details|1-10':[{
                            "id":/[0-9]{1,2}/,
                            "goodsName":/[0-9a-zA-Z]{2,10}/,
                            "goodsPrice":/(^(([1-9]{1}\d{0,8})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$){1}/,
                            "quantlity":/[0-9]{1,2}/
                        }]
                    })
                }
            };
        };



    }]);