/*设置总控制器*/
angular.module('app')
    .controller('SettingManageController', ['settingService','toolUtil','$scope',function(settingService,toolUtil,$scope){
        var self=this;


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom={
                $admin_page_wrap:$('#admin_page_wrap'),
                $admin_list_wrap:$('#admin_list_wrap'),
                $admin_batchlist_wrap:$('#admin_batchlist_wrap')
            };

        console.log(setting_ctrl);

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
                                $('#admin_page_wrap')/*jq_dom.$admin_page_wrap*/.pagination({
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
                                $('#admin_page_wrap')/*jq_dom.$admin_page_wrap*/.pagination({
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
                                $('#admin_page_wrap')/*jq_dom.$admin_page_wrap*/.pagination({
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
                $bodywrap:$('#admin_batchlist_wrap')/*jq_dom.$admin_batchlist_wrap*/,
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

        /*切换路由时更新dom缓存*/
        settingService.initJQDom(jq_dom);

        settingService.getColumnData(self.table,self.record);
    }]);