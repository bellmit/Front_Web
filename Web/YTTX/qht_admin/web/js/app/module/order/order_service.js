angular.module('app')
    .service('orderService',['toolUtil','toolDialog','BASE_CONFIG','loginService','powerService','dataTableColumnService','$timeout',function(toolUtil,toolDialog,BASE_CONFIG,loginService,powerService,dataTableColumnService,$timeout){

        /*获取缓存数据*/
        var self=this,
            module_id=30/*模块id*/,
            cache=loginService.getCache();

        var powermap=powerService.getCurrentPower(module_id);

        /*初始化权限*/
        var init_power={
            orderprint:toolUtil.isPower('order-print',powermap,true)/*订单打印*/,
            orderexport:toolUtil.isPower('order-export',powermap,true)/*订单导出*/,
            orderdetails:toolUtil.isPower('order-details',powermap,true)/*订单详情*/
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
        /*扩展服务--查询操作权限*/
        this.getCurrentPower=function () {
            return init_power;
        };


        /*弹出层服务*/
        this.toggleModal=function (config,fn) {
            var temp_timer=null,
                type_map={
                    'member':self.$admin_member_dialog,
                    'role':self.$admin_role_dialog,
                    'rolegroup':self.$admin_rolegroup_dialog
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
                if(config.area==='role' || config.area==='rolegroup' || config.area==='member'){
                    self.clearFormDelay();
                }
            }
        };


        /*订单查询服务--请求数据--获取表格数据*/
        this.getColumnData=function (table,record){
            if(cache===null){
                return false;
            }else if(!table && !record){
                return false;
            }

            /*如果存在模型*/
            var data= $.extend(true,{},table.list1_config.config.ajax.data),
                temp_param;

            /*适配参数*/
            for(var i in record){
                if(i==='startTime' || i==='endTime'){
                    if(record[i]===''){
                        delete data[i];
                    }else{
                        data[i]=record[i];

                    }
                }else if(i==='organizationId'){
                    if(record[i]===''){
                        data[i]='';
                        return false;
                    }else{
                        data[i]=record[i];
                    }
                }
            }

            /*参数赋值*/
            table.list1_config.config.ajax.data=data;
            if(table.list_table===null){
                temp_param=cache.loginMap.param;
                table.list1_config.config.ajax.data['adminId']=temp_param.adminId;
                table.list1_config.config.ajax.data['token']=temp_param.token;
                /*初始请求*/
                table.list_table=self.$admin_list_wrap.DataTable(table.list1_config.config);
                /*调用列控制*/
                dataTableColumnService.initColumn(table.tablecolumn,table.list_table);
            }else {
                table.list_table.ajax.config(table.list1_config.config.ajax).load();
            }
        };
        /*订单查询服务--过滤表格数据*/
        this.filterDataTable=function (table,record) {
            if(table.list_table===null){
                return false;
            }
            table.list_table.search(record.filter).columns().draw();
        };


        /*菜单服务--获取导航*/
        this.getSubMenu=function (config) {
            if(cache){
                var param=$.extend(true,{},cache.loginMap.param);
                param['isShowSelf']=0;
                var layer,
                    id,
                    $wrap;

                /*初始化加载*/
                if(!config.$reqstate){
                    layer=0;
                    /*根目录则获取新配置参数*/
                    id=param['organizationId'];
                    $wrap=self.$admin_order_submenu;
                    if(config.table && config.table.list_table===null && config.record){
                        config.record.organizationId=id;
                        self.getColumnData(config.table,config.record);
                    }
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
                                                if(config.$reqstate){
                                                    config.$reqstate.attr({
                                                        'data-isrequest':true
                                                    }).removeClass('sub-menu-title sub-menu-titleactive');
                                                }
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                str=self.resolveSubMenu(list,BASE_CONFIG.submenulimit,{
                                                    layer:layer,
                                                    id:id
                                                });
                                                if(str!==''){
                                                    $(str).appendTo($wrap.html(''));
                                                }
                                                if(layer!==0 && config.$reqstate){
                                                    config.$reqstate.attr({
                                                        'data-isrequest':true
                                                    });
                                                }
                                            }
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
        /*菜单服务--解析导航--开始解析*/
        this.resolveSubMenu=function (obj,limit,config) {
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
                        str+=self.doItemSubMenu(curitem,{
                                flag:false,
                                limit:limit,
                                layer:layer,
                                parentid:config.id
                            })+'</li>';
                    }else{
                        str+=self.doItemSubMenu(curitem,{
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
        /*菜单服务--解析导航--公共解析*/
        this.doItemSubMenu=function (obj,config) {
            var curitem=obj,
                id=curitem["id"],
                label=curitem["orgname"],
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
        /*菜单服务--显示隐藏机构*/
        this.toggleSubMenu=function (e,config) {
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


            /*模型缓存*/
            var record=config.record;

            /*变更操作记录模型--激活高亮*/
            record.organizationId=temp_id;

            /*变更操作记录模型--激活高亮*/
            if(record.current===null){
                record.current=$this;
            }else{
                record.prev=record.current;
                record.current=$this;
                record.prev.removeClass('sub-menuactive');
            }
            record.current.addClass('sub-menuactive');

            self.getColumnData(config.table,config.record);

            /*查询子集*/
            haschild=$this.hasClass('sub-menu-title');
            if(haschild){
                $child=$this.next();
                /*是否已经加载过数据*/
                isrequest=$this.attr('data-isrequest');
                if(isrequest==='false'){
                    /*重新加载*/
                    config['$reqstate']=$this;
                    self.getSubMenu(config);
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
                    }
                }
            }
        };
        /*菜单服务--查询用户*/
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
                    url:'/organization/users',
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
                                            str+='<li data-id="'+list[i]["id"]+'">'+list[i]["nickName"]+'</li>';
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


    }]);