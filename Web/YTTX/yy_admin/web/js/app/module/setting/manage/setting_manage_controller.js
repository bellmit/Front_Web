/*首页控制器*/
angular.module('app')
    .controller('SettingManageController', ['settingService','settingManageService',function(settingService,settingManageService){
        var self=this;


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom={
            $admin_page_wrap:$('#admin_page_wrap'),
            $admin_list_wrap:$('#admin_list_wrap'),
            $admin_batchlist_wrap:$('#admin_batchlist_wrap'),
            $setting_manage_dialog:$('#setting_manage_dialog')
        },
        jq_dom_power={
            $admin_struct_allpower:$('#admin_struct_allpower')
        };

        /*切换路由时更新dom缓存*/
        settingService.initJQDom(jq_dom);
        structService.initJQDomForPower(jq_dom_power);

        /*模型--权限*/
        this.power={
            colgroup:'',
            thead:'',
            tbody:''
        };

        /*模型--操作记录*/
        this.record={
            organizationId:''/*操作id*/,
            organizationName:''/*操作名称*/,
            token:''/*凭证*/,
            adminId:''
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
            checkedFunctionIds:''/*选中权限Ids*/
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
                        url:/*toolUtil.adaptReqUrl('/organization/goodsorder/list')*/'json/test.json',
                        dataType:'JSON',
                        method:'post',
                        dataSrc:function ( json ) {
                            /*测试代码*/
                            var json=orderService.testGetOrderList();


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
                                        orderService.getColumnData(self.table,self.record.role);
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
                            "data":"merchantName"
                        },
                        {
                            "data":"merchantPhone",
                            "render":function(data, type, full, meta ){
                                return toolUtil.phoneFormat(data);
                            }
                        },
                        {
                            "data":"orderNumber"
                        },
                        {
                            "data":"totalMoney",
                            "render":function(data, type, full, meta ){
                                return toolUtil.moneyCorrect(data,12)[0];
                            }
                        },
                        {
                            "data":"orderState",
                            "render":function(data, type, full, meta ){
                                var stauts=parseInt(data,10),
                                    statusmap={
                                        0:"待付款",
                                        1:"取消订单",
                                        6:"待发货",
                                        9:"待收货",
                                        20:"待评价",
                                        21:"已评价"
                                    },
                                    str;

                                if(stauts===0){
                                    str='<div class="g-c-blue3">'+statusmap[stauts]+'</div>';
                                }else if(stauts===1){
                                    str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
                                }else if(stauts===6 || stauts===9 || stauts===20){
                                    str='<div class="g-c-warn">'+statusmap[stauts]+'</div>';
                                }else if(stauts===21){
                                    str='<div class="g-c-green1">'+statusmap[stauts]+'</div>';
                                }else{
                                    str='<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            "data":"paymentType",
                            "render":function(data, type, full, meta ){
                                var stauts=parseInt(data,10),
                                    statusmap={
                                        1:"微信",
                                        2:"支付宝",
                                        3:"其它"
                                    };
                                return '<div class="g-c-blue3">'+statusmap[stauts]+'</div>';
                            }
                        },
                        {
                            "data":"orderTime"
                        },
                        {
                            /*to do*/
                            "data":"id",
                            "render":function(data, type, full, meta ){
                                var btns='';

                                /*查看订单*/
                                if(self.powerlist.order_details){
                                    btns+='<span data-action="detail" data-id="'+data+'"  class="btn-operate">查看</span>';
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
                        orderService.doItemAction({
                            record:self.record,
                            table:self.table
                        },config);
                    }
                }
            }
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