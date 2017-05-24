angular.module('app')
    .service('settingService',['toolUtil','toolDialog','loginService','powerService','$timeout',function(toolUtil,toolDialog,loginService,powerService,$timeout){

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
                                    if(type==='user'){
                                        /*重置表单*/
                                        self.addFormDelay({
                                            type:type
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
        /*表单类服务--补全或修正不存在的默认信息*/
        this.formCorrect=function (config,type) {
            if(!config && !type){
                return false;
            }
            var model=config[type];
            if(!model){
                return false;
            }
            if(type==='user'){
                if(model['shoptype']==='' || typeof model['shoptype']==='undefined' || model['shoptype']===null){
                    model['shoptype']=1;
                }
                if(model['status']==='' || typeof model['status']==='undefined' || model['status']===null){
                    model['status']=0;
                }
            }else if(type==='struct'){
                if(model['isAudited']==='' || typeof model['isAudited']==='undefined' || model['isAudited']===null){
                    model['isAudited']=0;
                }
                if(model['status']==='' || typeof model['status']==='undefined' || model['status']===null){
                    model['status']=0;
                }
                if(model['isSettingLogin']==='' || typeof model['isSettingLogin']==='undefined' || model['isSettingLogin']===null){
                    model['isSettingLogin']=0;
                }
                if(model['isDesignatedPermit']==='' || typeof model['isDesignatedPermit']==='undefined' || model['isDesignatedPermit']===null){
                    model['isDesignatedPermit']=0;
                }
            }
        };
        /*表单类服务--权限服务--全选权限*/
        this.selectAllPower=function (e) {
            powerService.selectAllPower(e);
        };
        /*表单类服务--权限服务--确定所选权限*/
        this.getSelectPower=function (struct) {
            var temppower=powerService.getSelectPower();
            if(temppower){
                struct.checkedFunctionIds=temppower.join();
            }else{
                struct.checkedFunctionIds='';
            }
        };
        /*表单类服务--权限服务--取消所选权限*/
        this.clearSelectPower=function (struct) {
            struct.checkedFunctionIds='';
            powerService.clearSelectPower();
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