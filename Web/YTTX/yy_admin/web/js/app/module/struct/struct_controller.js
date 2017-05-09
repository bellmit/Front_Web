/*首页控制器*/
angular.module('app')
    .controller('StructController', ['structService','powerService','toolUtil',function(structService,powerService,toolUtil){
        var self=this;

        /*模型--操作权限列表*/
        this.powerlist=structService.getCurrentPower();

        
        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom={
            $admin_struct_submenu:$('#admin_struct_submenu'),
            $admin_struct_list:$('#admin_struct_list'),
            $struct_setting_dialog:$('#struct_setting_dialog'),
            $struct_user_dialog:$('#struct_user_dialog'),
            $struct_userdetail_dialog:$('#struct_userdetail_dialog'),
            $admin_struct_reset:$('#admin_struct_reset'),
            $admin_user_reset:$('#admin_user_reset'),
            $admin_userdetail_show:$('#admin_userdetail_show'),
            $admin_page_wrap:$('#admin_page_wrap'),
            $admin_list_wrap:$('#admin_list_wrap'),
            $admin_struct_batchlist:$('#admin_struct_batchlist'),
            $admin_struct_checkcolumn:$('#admin_struct_checkcolumn'),
            $admin_struct_colgroup:$('#admin_struct_colgroup'),
            $admin_struct_checkall:$('#admin_struct_checkall')
        };
        jq_dom['$admin_submenu_wrap']=jq_dom.$admin_struct_submenu.prev();
        
        var jq_dom_power={
            $admin_struct_allpower:$('#admin_struct_allpower')
        };
        /*切换路由时更新dom缓存*/
        structService.initJQDom(jq_dom);
        powerService.initJQDom(jq_dom_power);


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
            power:self.powerlist.structadd,
            active:'tabactive'
        },{
            name:'角色',
            href:'role',
            power:self.powerlist.roleadd,
            active:''
        }];


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
            layer:0/*操作层*/
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
                        url:toolUtil.adaptReqUrl('/organization/users'),
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
                                        structService.getColumnData(self.table);
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
                                return '<input value="'+data+'" name="check_userid" type="checkbox" />';
                            }
                        },
                        {
                            "data":"phone",
                            "render":function(data, type, full, meta ){
                                return toolUtil.phoneFormat(data);
                            }
                        },
                        {
                            "data":"address"
                        },
                        {
                            "data":"nickName"
                        },
                        {
                            "data":"machineCode"
                        },
                        {
                            "data":"identityState",
                            "render":function(data, type, full, meta ){
                                var stauts=parseInt(data,10),
                                    statusmap={
                                        0:"未验证",
                                        1:"正在验证",
                                        2:"验证通过",
                                        3:"验证不通过"
                                    },
                                    str='';

                                if(stauts===0){
                                    str='<div class="g-c-warn">'+statusmap[stauts]+'</div>';
                                }else if(stauts===1){
                                    str='<div class="g-c-gray9">'+statusmap[stauts]+'</div>';
                                }else if(stauts===2){
                                    str='<div class="g-c-blue1">'+statusmap[stauts]+'</div>';
                                }else if(stauts===3){
                                    str='<div class="g-c-red1">'+statusmap[stauts]+'</div>';
                                }else{
                                    str='<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            "data":"createTime"
                        },
                        {
                            "data":"status"
                        },
                        {
                            "data":"remark"
                        },
                        {
                            "data":"id",
                            "render":function(data, type, full, meta ){
                                var btns='',
                                    addUserId=full.addUserId,
                                    organizationId=full.organizationId;

                                /*查看用户*/
                                if(self.powerlist.userdetail){
                                    btns+='<span data-action="detail" data-addUserId="'+addUserId+'" data-id="'+data+'"  data-organizationId="'+organizationId+'"  class="btn-operate">查看</span>';
                                }
                                /*编辑用户*/
                                if(self.powerlist.userupdate){
                                    btns+='<span data-addUserId="'+addUserId+'"  data-action="update" data-id="'+data+'" data-organizationId="'+organizationId+'" class="btn-operate">编辑</span>';
                                }
                                /*删除用户*/
                                if(self.powerlist.userdelete){
                                    btns+='<span data-addUserId="'+addUserId+'"  data-action="delete" data-id="'+data+'" data-organizationId="'+organizationId+'" class="btn-operate">删除</span>';
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
                init_len:10/*数据有多少列*/,
                column_flag:true,
                ischeck:true,/*是否有全选*/
                columnshow:true,
                $column_wrap:jq_dom.$admin_struct_checkcolumn/*控制列显示隐藏的容器*/,
                $bodywrap:jq_dom.$admin_struct_batchlist/*数据展现容器*/,
                hide_list:[4,5,6,7,8]/*需要隐藏的的列序号*/,
                hide_len:5,
                column_api:{
                    isEmpty:function () {
                        if(self.table.list_table===null){
                            return false;
                        }
                        return self.table.list_table.data().length===0;
                    }
                },
                $colgroup:jq_dom.$admin_struct_colgroup/*分组模型*/,
                $column_btn:jq_dom.$admin_struct_checkcolumn.prev(),
                $column_ul:jq_dom.$admin_struct_checkcolumn.find('ul')
            },
            /*全选*/
            tablecheckall:{
                checkall_flag:true,
                $bodywrap:jq_dom.$admin_struct_batchlist,
                $checkall:jq_dom.$admin_struct_checkall,
                checkvalue:0/*默认未选中*/,
                checkid:[]/*默认索引数据为空*/,
                checkitem:[]/*默认node数据为空*/,
                highactive:'item-lightenbatch',
                checkactive:'admin-batchitem-checkactive'
            },
            /*按钮*/
            tableitemaction:{
                $bodywrap:jq_dom.$admin_struct_batchlist,
                itemaction_api:{
                    doItemAction:function(config){
                        structService.doItemAction({
                            setting:self.setting,
                            user:self.user,
                            table:self.table
                        },config);
                    }
                }
            }
        };


        /*虚拟挂载点，或者初始化参数*/
        structService.getRoot(self.record);


        /*初始化权限模型头部*/
        powerService.createThead({
            flag:true
        },self.power);

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