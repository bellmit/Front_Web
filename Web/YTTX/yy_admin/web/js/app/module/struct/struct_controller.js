/*首页控制器*/
angular.module('app')
    .controller('StructController', ['structService','toolUtil',function(structService,toolUtil){
        var self=this;

        /*模型--操作权限列表*/
        this.powerlist=structService.getCurrentPower();

        
        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom={
            $admin_struct_submenu:$('#admin_struct_submenu'),
            $admin_struct_list:$('#admin_struct_list'),
            $struct_struct_dialog:$('#struct_struct_dialog'),
            $admin_struct_reset:$('#admin_struct_reset'),
            $struct_user_dialog:$('#struct_user_dialog'),
            $struct_userdetail_dialog:$('#struct_userdetail_dialog'),
            $admin_user_reset:$('#admin_user_reset'),
            $admin_userdetail_show:$('#admin_userdetail_show'),
            $admin_page_wrap:$('#admin_page_wrap'),
            $admin_list_wrap:$('#admin_list_wrap'),
            $admin_batchlist_wrap:$('#admin_batchlist_wrap'),
            $admin_table_checkcolumn:$('#admin_table_checkcolumn'),
            $admin_table_colgroup:$('#admin_table_colgroup'),
            $admin_struct_checkall:$('#admin_struct_checkall')
        };
        jq_dom['$admin_submenu_wrap']=jq_dom.$admin_struct_submenu.prev();

        var jq_dom_power={
            $admin_struct_allpower:$('#admin_struct_allpower')
        };
        /*切换路由时更新dom缓存*/
        structService.initJQDom(jq_dom);
        structService.initJQDomForPower(jq_dom_power);


        /*模型--权限*/
        this.power={
            colgroup:'',
            thead:'',
            tbody:''
        };

        /*模型--tab选项卡*/
        this.tabitem=[{
            name:'运营架构',
            href:'struct',
            power:self.powerlist.organization_add,
            active:'tabactive'
        },{
            name:'角色',
            href:'role',
            power:self.powerlist.role_add,
            active:''
        }];

        /*模型--机构地址*/
        this.address={
            province:{},
            city:{},
            country:{}
        };
        /*模型--店铺地址*/
        this.user_address={
            province:{},
            city:{},
            country:{}
        };
        /*模型--列表地址*/
        this.list_address={
            province:{},
            city:{},
            country:{}
        };
        this.list_addressdata={
            province:'',
            city:'',
            country:''
        };

        /*模型--操作记录*/
        this.record={
            searchactive:''/*搜索激活状态*/,
            searchname:''/*搜索关键词*/,
            prev:null/*上一次操作记录*/,
            current:null/*当前操作记录*/,
            hasdata:false/*下级是否有数据,或者是否查询到数据*/,
            currentId:''/*虚拟挂载点*/,
            currentName:''/*虚拟挂载点*/,
            organizationId:''/*操作id*/,
            organizationName:''/*操作名称*/,
            structId:''/*机构设置Id*/,
            structName:''/*机构设置名称*/,
            layer:0/*操作层*/
        };


        /*模型--机构数据*/
        this.struct={
            type:'add'/*表单类型：新增，编辑；默认为新增*/,
            id:''/*运营商ID，编辑时相关参数*/,
            sysUserId:''/*运营商用户ID，编辑时相关参数*/,
            parentId:''/*上级运营商ID，编辑时相关参数*/,
            fullName:''/*运营商全称*/,
            shortName:''/*运营商简称*/,
            adscriptionRegion:''/*归属地区*/,
            linkman:''/*负责人*/,
            cellphone:''/*手机号码*/,
            telephone:''/*电话号码*/,
            province:''/*省份*/,
            city:''/*市区*/,
            country:''/*县区*/,
            address:''/*详细地址*/,
            isAudited:0/*是否已审核：0：默认，1：已审核*/,
            status:0/*状态：0：正常，1：停用*/,
            remark:''/*备注*/,
            isSettingLogin:1/*是否设置登陆名及密码：1 :是*/,
            username:''/*设置登录名*/,
            password:''/*设置登录密码*/,
            isDesignatedPermit:''/*是否指定权限,0:全部权限 1:指定权限*/,
            checkedFunctionIds:''/*选中权限Ids*/
        };


        /*模型--用户(店铺)*/
        this.user={
            type:'add'/*表单类型：新增，编辑；默认为新增*/,
            filter:''/*表格过滤关键词*/,
            id:''/*用户ID，用于编辑状态*/,
            fullName:''/*店铺全称*/,
            shortName:''/*店铺简称*/,
            name:''/*姓名*/,
            shoptype:'1'/*店铺类型（原为type,因为user模型已经存在type,所以以shoptype代替type字段）：1 旗舰店：2 体验店：3 加盟店*/,
            cellphone:''/*店铺手机号码*/,
            telephone:''/*店铺电话号码*/,
            province:''/*省份*/,
            city:''/*市区*/,
            country:''/*县区*/,
            address:''/*详细地址*/,
            status:0/*状态：0：正常，1：停用*/,
            remark:''/*备注*/
        };


        /*模型--调整位置*/
        this.structpos={
            up:{
                id:'',
                $node:null,
                active:'',
                layer:'',
                parentid:''
            },
            down:{
                id:'',
                $node:null,
                active:'',
                layer:'',
                parentid:''
            }
        };


        /*模型--表格缓存*/
        this.table={
            list1_page:{
                page:1,
                pageSize:10,
                total:0
            },
            list1_config:{
                config:{
                    processing:true,/*大消耗操作时是否显示处理状态*/
                    deferRender:true,/*是否延迟加载数据*/
                    autoWidth:true,/*是否*/
                    paging:false,
                    ajax:{
                        url:toolUtil.adaptReqUrl('/organization/shops'),
                        dataType:'JSON',
                        method:'post',
                        dataSrc:function ( json ) {
                            var code=parseInt(json.code,10),
                                message=json.message;

                            if(code!==0){
                                if(typeof message !=='undefined'&&message!==''){
                                    console.log(message);
                                }else{
                                    console.log('获取用户失败');
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
                                        if(self.record.structId===''){
                                            structService.getColumnData(self.table,self.record.organizationId);
                                        }else{
                                            structService.getColumnData(self.table,self.record.structId)
                                        }
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
                            pageSize:10
                        }
                    },
                    info:false,
                    dom:'<"g-d-hidei" s>',
                    searching:true,
                    order:[[1, "desc" ]],
                    columns: [
                        {
                            "data":"id",
                            "orderable" :false,
                            "searchable" :false,
                            "render":function(data, type, full, meta ){
                                return '<input value="'+data+'" name="check_shopid" type="checkbox" />';
                            }
                        },
                        {
                            "data":"fullName"
                        },
                        {
                            "data":"shortName"
                        },
                        {
                            "data":"name"
                        },
                        {
                            "data":"type",
                            "render":function(data, type, full, meta ){
                                var temptype=parseInt(data,10),
                                    typemap={
                                        1:'旗舰店',
                                        2:'体验店',
                                        3:'加盟店'
                                    };
                                return typemap[temptype];
                            }
                        },
                        {
                            "data":"cellphone",
                            "render":function(data, type, full, meta ){
                                return toolUtil.phoneFormat(data);
                            }
                        },
                        {
                            "data":"telephone",
                            "render":function(data, type, full, meta ){
                                return toolUtil.telePhoneFormat(data);
                            }
                        },
                        {
                            "data":"province",
                            "render":function(data, type, full, meta ){
                                var str='',
                                    province=data||'',
                                    city=full.city||'',
                                    country=full.country||'';

                                if(province){
                                    self.list_addressdata.province=province;
                                    self.list_addressdata.city=city;
                                    self.list_addressdata.country=country;
                                    str+='<div class="inline g-c-gray3">省：</div><div class="inline g-c-gray9">'+self.list_address["province"][province]["key"]+'</div>';
                                    /*查询新值*/
                                    structService.queryAddress({
                                        model:self.list_addressdata,
                                        address:self.list_address,
                                        type:'city'
                                    });
                                    if(city){
                                        str+='<div class="inline g-c-gray3">市：</div><div class="inline g-c-gray9">'+self.list_address["city"][city]["key"]+'</div>';
                                    }
                                    if(country){
                                        str+='<div class="inline g-c-gray3">市：</div><div class="inline g-c-gray9">'+self.list_address["country"][country]["key"]+'</div>';
                                    }
                                }
                                return str;
                            }
                        },
                        {
                            "data":"address"
                        },
                        {
                            "data":"status",
                            "render":function(data, type, full, meta ){
                                var stauts=parseInt(data,10),
                                    str='';

                                if(stauts===0){
                                    str='<div class="g-c-blue3">正常</div>';
                                }else if(stauts===1){
                                    str='<div class="g-c-warn">停用</div>';
                                }else{
                                    str='<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            "data":"remark"
                        },
                        {
                            "data":"id",
                            "render":function(data, type, full, meta ){
                                var btns='';

                                /*查看用户*/
                                if(self.powerlist.user_view){
                                    btns+='<span data-action="detail" data-id="'+data+'"  class="btn-operate">查看</span>';
                                }
                                /*编辑用户*/
                                if(self.powerlist.user_update){
                                    btns+='<span data-action="update" data-id="'+data+'" class="btn-operate">编辑</span>';
                                }
                                /*删除用户*/
                                if(self.powerlist.batch_delete){
                                    btns+='<span  data-action="delete" data-id="'+data+'"  class="btn-operate">删除</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            list_table:null,
            /*列控制*/
            tablecolumn:{
                init_len:12/*数据有多少列*/,
                column_flag:true,
                ischeck:true,/*是否有全选*/
                columnshow:true,
                $column_wrap:jq_dom.$admin_table_checkcolumn/*控制列显示隐藏的容器*/,
                $bodywrap:jq_dom.$admin_batchlist_wrap/*数据展现容器*/,
                hide_list:[1,5,6,7,8,10]/*需要隐藏的的列序号*/,
                hide_len:6,
                column_api:{
                    isEmpty:function () {
                        if(self.table.list_table===null){
                            return false;
                        }
                        return self.table.list_table.data().length===0;
                    }
                },
                $colgroup:jq_dom.$admin_table_colgroup/*分组模型*/,
                $column_btn:jq_dom.$admin_table_checkcolumn.prev(),
                $column_ul:jq_dom.$admin_table_checkcolumn.find('ul')
            },
            /*全选*/
            tablecheckall:{
                checkall_flag:true,
                $bodywrap:jq_dom.$admin_batchlist_wrap,
                $checkall:jq_dom.$admin_struct_checkall,
                checkvalue:0/*默认未选中*/,
                checkid:[]/*默认索引数据为空*/,
                checkitem:[]/*默认node数据为空*/,
                highactive:'item-lightenbatch',
                checkactive:'admin-batchitem-checkactive'
            },
            /*按钮*/
            tableitemaction:{
                $bodywrap:jq_dom.$admin_batchlist_wrap,
                itemaction_api:{
                    doItemAction:function(config){
                        structService.doItemAction({
                            record:self.record,
                            user:self.user,
                            table:self.table
                        },config);
                    }
                }
            }
        };


        /*初始化服务--虚拟挂载点，或者初始化参数*/
        structService.getRoot(self.record);
        /*初始化服务--初始化权限模型头部*/
        structService.createThead({flag:true},self.power);
        /*初始化服务--初始化地址信息*/
        structService.queryAddress({
            type:'province',
            address:self.address,
            model:self.struct
        });
        /*初始化服务--初始化地址信息*/
        structService.queryAddress({
            type:'province',
            address:self.user_address,
            model:self.user
        });
        /*初始化服务--初始化地址信息*/
        structService.queryAddress({
            type:'province',
            address:self.list_address,
            model:self.list_addressdata
        });
        

        /*地址服务--选中地址*/
        this.changeAddress=function (model_str,address_str,type) {
            structService.queryAddress({
                model:self[model_str],
                address:self[address_str],
                type:type
            });
        };


        /*菜单服务--初始化请求菜单*/
        this.initSubMenu=function () {
          structService.getMenuList({
              record:self.record,
              table:self.table
          });
        };
        /*菜单服务--子菜单展开*/
        this.toggleSubMenu=function (e) {
            structService.toggleSubMenu(e,{
                record:self.record,
                table:self.table
            });
        };
        /*菜单服务--跳转至虚拟挂载点*/
        this.rootSubMenu=function (e) {
           structService.rootSubMenu(e,{
               record:self.record,
               table:self.table
           });
        };


        /*机构服务--展开*/
        this.toggleStructList=function (e) {
            structService.toggleStructList(e,{
                record:self.record,
                table:self.table,
                structpos:self.structpos
            });
        };
        /*机构服务--操作机构表单*/
        this.actionStruct=function (config) {
            /*调用编辑机构服务类*/
            structService.actionStruct({
                modal:config,
                record:self.record,
                struct:self.struct,
                address:self.address,
                power:self.power
            });
        };
        /*机构服务--调整位置*/
        this.adjustStructPos=function () {
            structService.adjustStructPos({
                structpos:self.structpos,
                record:self.record,
                table:self.table
            });
        };


        /*弹出层显示隐藏*/
        this.toggleModal=function (config) {
            structService.toggleModal({
                display:config.display,
                area:config.area
            });
        };


        /*表单服务--提交表单*/
        this.formSubmit=function (type) {
            structService.formSubmit({
                struct:self.struct,
                user:self.user,
                table:self.table,
                record:self.record
            },type);
        };
        /*表单服务--重置表单*/
        this.formReset=function (forms,type) {
            /*重置表单模型*/
            structService.formReset({
                forms:forms,
                struct:self.struct,
                user:self.user,
                record:self.record
            },type);
        };
        /*表单服务--选择登录用户名和密码*/
        this.clearLoginInfo=function () {
            /*设置登录名和密码*/
            self.struct.username='';
            self.struct.password='';
        };
        /*表单服务--权限服务--全选权限*/
        this.selectAllPower=function (e) {
            structService.selectAllPower(e);
        };
        /*表单服务--权限服务--确定所选权限*/
        this.getSelectPower=function () {
            structService.getSelectPower(self.struct);
        };
        /*表单服务--权限服务--取消所选权限*/
        this.clearSelectPower=function () {
            structService.clearSelectPower(self.struct);
        };


        /*用户服务--操作用户表单*/
        this.actionUser=function (config) {
            /*调用编辑机构服务类*/
            structService.actionUser({
                modal:config,
                record:self.record,
                address:self.user_address,
                user:self.user
            });
        };
        /*用户服务--过滤表格数据*/
        this.filterDataTable=function () {
            structService.filterDataTable(self.table.list_table,self.user);
        };
        /*用户服务--提交表单*/
        this.userSubmit=function () {
            /*提交服务*/
            structService.userSubmit(self.user,self.setting,self.table);

        };
        /*用户服务--重置表单*/
        this.userReset=function (forms){
            /*重置表单模型*/
            structService.clearFormData(self.user,'user');
            /*重置验证提示信息*/
            structService.clearFormValid(forms);
        };
        /*用户服务--批量删除*/
        this.batchDeleteUser=function () {
            structService.batchDeleteUser({
                record:self.record,
                table:self.table
            });
        };
        /*用户服务--调整运营商*/
        this.adjustOperate=function () {
            console.log('to do');
        };



        /*搜索服务--搜索过滤*/
        this.searchAction=function () {
            structService.getMenuList({
                record:self.record,
                table:self.table
            });
        };
        /*搜索服务--清空过滤条件*/
        this.searchClear=function () {
            self.record.searchname='';
            self.record.searchactive='';
        };

        

    }]);