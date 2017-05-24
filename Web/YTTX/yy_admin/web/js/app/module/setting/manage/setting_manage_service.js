angular.module('app')
    .service('settingManageService',['toolUtil','toolDialog','BASE_CONFIG','loginService','dataTableItemActionService',function(toolUtil,toolDialog,BASE_CONFIG,loginService,dataTableItemActionService){

        /*获取缓存数据*/
        var self=this,
            cache=loginService.getCache();


        /*机构服务--操作机构*/
        this.actionStruct=function (config) {
            var modal=config.modal,
                struct=config.struct,
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
                type:'struct'
            });

            /*根据类型跳转相应逻辑*/
            if(type==='edit'){
                /*查询相关存在的数据*/
                self.queryOperateInfo(config);
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
        /*机构服务--查询机构数据*/
        this.queryOperateInfo=function (config) {
            if(cache===null){
                return false;
            }
            var record=config.record,
                struct=config.struct,
                power=config.power,
                modal=config.modal,
                param=$.extend(true,{},cache.loginMap.param);

            /*判断参数*/
            if(record.structId!==''){
                param['id']=record.structId;
            }else if(record.structId===''){
                param['id']=record.organizationId;
            }

            toolUtil
                .requestHttp({
                    url:'/organization/info',
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
                                    var list=result.organization;
                                    if(list){
                                        /*更新模型*/
                                        for(var i in list){
                                            switch (i){
                                                case 'id':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'fullName':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'shortName':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'adscriptionRegion':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'linkman':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'cellphone':
                                                    struct[i]=toolUtil.phoneFormat(list[i]);
                                                    break;
                                                case 'telephone':
                                                    struct[i]=toolUtil.telePhoneFormat(list[i],4);
                                                    break;
                                                case 'province':
                                                    struct['province']=list['province'];
                                                    struct['city']=list['city'];
                                                    struct['country']=list['country'];
                                                    /*判断是否需要重新数据，并依此更新相关地址模型*/
                                                    self.isReqAddress({
                                                        type:'city',
                                                        address:config.address,
                                                        model:struct
                                                    },true);
                                                    break;
                                                case 'address':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'isAudited':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'status':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'remark':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'isSettingLogin':
                                                    /*是否登录*/
                                                    var temp_login=list[i];
                                                    if(temp_login==='' || isNaN(temp_login) || typeof temp_login==='undefined'){
                                                        temp_login=0;
                                                    }else{
                                                        temp_login=parseInt(temp_login,10);
                                                    }
                                                    struct[i]=temp_login;
                                                    if(temp_login===1){
                                                        /*设置*/
                                                        struct['username']=list['username'];
                                                        /*修改时不设置密码*/
                                                        struct['password']='';
                                                        /*设置权限*/
                                                        /*是否指定权限*/
                                                        var temp_power=list['isDesignatedPermit'];
                                                        if(temp_power==='' || isNaN(temp_power) || typeof temp_power==='undefined'){
                                                            /*默认为：全部权限*/
                                                            temp_power=0;
                                                        }else{
                                                            temp_power=parseInt(list['isDesignatedPermit'],10);
                                                        }
                                                        struct['isDesignatedPermit']=temp_power;
                                                        /*全部权限时，清空权限ids缓存*/
                                                        if(temp_power===0){
                                                            struct['checkedFunctionIds']='';
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
                                                                            organizationId:list['parentId']
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
                                                    }else if(temp_login===0){
                                                        /*未设置*/
                                                        struct['username']='';
                                                        /*置空*/
                                                        struct['password']='';
                                                    }
                                                    break;
                                                case 'sysUserId':
                                                    struct[i]=list[i];
                                                    break;
                                                case 'parentId':
                                                    struct[i]=list[i];
                                                    break;
                                            }

                                        }
                                        /*修正错误*/
                                        self.formCorrect(config,'struct');
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
        

        /*操作记录服务--初始化操作参数(搜索模式或者重置操作参数模式)*/
        this.initRecord=function (record,flag) {
            /*是否重置数据*/
            if(flag){
                record.hasdata=false;
            }
            record.layer=0;
            record.organizationId=record.currentId;
            record.organizationName=record.currentName;
            record.structId='';
            record.structName='';
            if(record.prev!==null){
                record.prev.removeClass('sub-menuactive');
                record.current.removeClass('sub-menuactive');
                record.prev=null;
            }else if(record.current!==null){
                record.current.removeClass('sub-menuactive');
            }
            record.current=null;
        };


        /*数据服务--请求数据--获取表格数据*/
        this.getColumnData=function (table,id){
            if(cache===null){
                return false;
            }else if(!table){
                return false;
            }
            /*如果存在模型*/
            var data= $.extend(true,{},table.list1_config.config.ajax.data);
            if(typeof id!=='undefined'){
                /*设置值*/
                data['organizationId']=id;
                /*参数赋值*/
                table.list1_config.config.ajax.data=data;

                if(table.list_table===null){
                    /*初始请求*/
                    var temp_param=cache.loginMap.param;
                    table.list1_config.config.ajax.data['adminId']=temp_param.adminId;
                    table.list1_config.config.ajax.data['token']=temp_param.token;
                    table.list_table=self.$admin_list_wrap.DataTable(table.list1_config.config);
                    /*调用列控制*/
                    dataTableColumnService.initColumn(table.tablecolumn,table.list_table);
                    /*调用全选与取消全选*/
                    dataTableCheckAllService.initCheckAll(table.tablecheckall);
                    /*调用按钮操作*/
                    dataTableItemActionService.initItemAction(table.tableitemaction);
                }else {
                    /*清除批量数据*/
                    dataTableCheckAllService.clear(table.tablecheckall);
                    table.list_table.ajax.config(table.list1_config.config.ajax).load();
                }
            }else if(typeof id==='undefined' && table.list_table!==null && typeof data['organizationId']!=='undefined'){
                /*清除批量数据*/
                dataTableCheckAllService.clear(table.tablecheckall);
                table.list_table.ajax.config(table.list1_config.config.ajax).load();
            }
        };
        /*数据服务--过滤表格数据*/
        this.filterDataTable=function (list_table,user) {
            if(list_table===null){
                return false;
            }
            var filter=user.filter;
            list_table.search(filter).columns().draw();
        };
        /*数据服务--表格全选与取消全选*/
        this.initCheckAll=function (tablecheckall) {
            dataTableCheckAllService.initCheckAll(tablecheckall);
        };
        /*数据服务--表格单项操作*/
        this.initItemAction=function (tableitemaction,$scope) {
            dataTableItemActionService.initItemAction(module_id,tableitemaction,$scope);
        };
        /*数据服务--操作按钮*/
        this.doItemAction=function (model,config) {
            var id=config.id,
                action=config.action;

            if(action==='detail'){
                self.queryUserInfo(null,id,action);
            }else if(action==='delete'){
                self.batchDeleteUser(model,id);
            }else if(action==='update'){
                self.queryUserInfo(model,id,action);
            }
        };


    }]);