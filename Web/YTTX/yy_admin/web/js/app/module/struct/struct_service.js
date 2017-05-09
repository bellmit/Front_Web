angular.module('app')
    .service('structService',['toolUtil','toolDialog','BASE_CONFIG','loginService','powerService','dataTableColumnService','dataTableCheckAllService','dataTableItemActionService','$timeout','$sce',function(toolUtil,toolDialog,BASE_CONFIG,loginService,powerService,dataTableColumnService,dataTableCheckAllService,dataTableItemActionService,$timeout,$sce){

        /*获取缓存数据*/
        var self=this,
            module_id=10/*模块id*/,
            cache=loginService.getCache(),
            structform_reset_timer=null,
            userform_reset_timer=null;


        /*权限*/
        var powermap=powerService.getCurrentPower(module_id);
        
        /*初始化权限*/
        var init_power={
            organization_add:toolUtil.isPower('organization-add',powermap,true)/*添加机构*/,
            organization_edit:toolUtil.isPower('organization-edit',powermap,true)/*编辑机构*/,
            role_add:toolUtil.isPower('role-add',powermap,true),/*添加*/
            user_add:toolUtil.isPower('user-add',powermap,true)/*添加用户*/,
            user_view:toolUtil.isPower('user-view',powermap,true)/*查看用户*/,
            user_update:toolUtil.isPower('user-update',powermap,true)/*编辑用户*/,
            batch_delete:toolUtil.isPower('batch-delete',powermap,true)/*删除用户*/,
            operator_adjustment:toolUtil.isPower('operator-adjustment',powermap,true)/*调整运营商*/
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

        /*导航服务--获取虚拟挂载点*/
        this.getRoot=function (record) {
            if(cache===null){
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                record['currentId']='';
                record['currentName']='';
                record['organizationId']='';
                record['organizationName']='';
                return false;
            }
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var logininfo=cache.loginMap;
                record['currentId']=logininfo.param.organizationId;
                record['currentName']=logininfo.username;
                record['organizationId']=logininfo.param.organizationId;
                record['organizationName']=logininfo.username;
            }else{
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                record['currentId']='';
                record['currentName']='';
                record['organizationId']='';
                record['organizationName']='';
            }
        };
        /*导航服务--获取导航*/
        this.getMenuList=function (config) {
            if(cache){
                if(config.record.organizationId==='' || typeof config.record.organizationId==='undefined'){
                    return false;
                }

                var record=config.record,
                    param=$.extend(true,{},cache.loginMap.param);

                /*判断是否为搜索模式*/
                if(config.record.searchname!==''){
                    self.initRecord(config.record,true);
                    param['fullName']=record.searchname;
                }

                var layer=record.layer,
                    id=record.organizationId,
                    $wrap;

                param['isShowSelf']=0;
                param['organizationId']=id;


                /*初始化加载*/
                if(record.current===null){
                    /*根目录则获取新配置参数*/
                    $wrap=self.$admin_struct_submenu;
                }else{
                    /*非根目录则获取新请求参数*/
                    $wrap=record.current.next();
                    /*判断是否是合法的节点*/
                    if(layer>=BASE_CONFIG.submenulimit){
                        return false;
                    }
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
                                    if(typeof message !=='undefined' && message!==''){
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
                                                record.hasdata=false;
                                                if(layer===0){
                                                    $wrap.html('<li><a>暂无数据</a></li>');
                                                    self.$admin_submenu_wrap.attr({
                                                        'data-list':false
                                                    });
                                                }else{
                                                    $wrap.html('');
                                                    /*清除显示下级菜单导航图标*/
                                                    record.current.attr({
                                                        'data-isrequest':true
                                                    }).removeClass('sub-menu-title sub-menu-titleactive');
                                                }
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                str=self.resolveMenuList(list,BASE_CONFIG.submenulimit,{
                                                    layer:layer,
                                                    id:id
                                                });
                                                if(str!==''){
                                                    if(layer===0){
                                                        /*搜索模式*/
                                                        self.$admin_submenu_wrap.attr({
                                                            'data-list':true
                                                        });
                                                    }
                                                    record.hasdata=true;
                                                    $(str).appendTo($wrap.html(''));
                                                }else{
                                                    record.hasdata=false;
                                                    if(layer===0){
                                                        /*搜索模式*/
                                                        self.$admin_submenu_wrap.attr({
                                                            'data-list':false
                                                        });
                                                    }
                                                }
                                                if(layer!==0){
                                                    record.current.attr({
                                                        'data-isrequest':true
                                                    });
                                                }
                                            }
                                        }else{
                                            if(layer===0){
                                                $wrap.html('<li><a>暂无数据</a></li>');
                                                self.$admin_submenu_wrap.attr({
                                                    'data-list':false
                                                });
                                            }
                                            record.hasdata=false;
                                        }
                                    }else{
                                        if(layer===0){
                                            $wrap.html('<li><a>暂无数据</a></li>');
                                            self.$admin_submenu_wrap.attr({
                                                'data-list':false
                                            });
                                        }
                                        record.hasdata=false;
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
                            if(layer===0){
                                record.hasdata=false;
                                $wrap.html('<li><a>暂无数据</a></li>');
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
        /*导航服务--解析导航--开始解析*/
        this.resolveMenuList=function (obj,limit,config) {
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


            if(len!==0){
                for(i;i<len;i++){
                    var curitem=menulist[i];
                    /*到达极限的前一项则不创建子菜单容器*/
                    if(limit>=1&&layer>=limit){
                        str+=self.doItemMenuList(curitem,{
                                flag:false,
                                limit:limit,
                                layer:layer,
                                id:config.id
                            })+'</li>';
                    }else{
                        str+=self.doItemMenuList(curitem,{
                                flag:true,
                                limit:limit,
                                layer:layer,
                                id:config.id
                            })+'<ul></ul></li>';
                    }
                }
                return str;
            }else{
                return '';
            }
        };
        /*导航服务--解析导航--公共解析*/
        this.doItemMenuList=function (obj,config) {
            var curitem=obj,
                id=curitem["id"],
                label=curitem["fullName"]||'',
                str='',
                flag=config.flag,
                layer=config.layer,
                parentid=config.id;


            if(flag){
                str='<li><a data-isrequest="false" data-parentid="'+parentid+'" data-layer="'+layer+'" data-id="'+id+'" class="sub-menu-title" href="#" title="">'+label+'</a>';
            }else{
                str='<li><a data-parentid="'+parentid+'"  data-layer="'+layer+'" data-id="'+id+'" href="#" title="">'+label+'</a></li>';
            }
            return str;
        };
        /*导航服务--校验导航--校验导航服务的正确性*/
        this.validSubMenuLayer=function (layer) {
            if(typeof layer==='undefined'){
                return false;
            }
            var layer=parseInt(layer,10);
            if(layer<1){
              return false;
            }
            if(layer>BASE_CONFIG.submenulimit){
                return false;
            }
            return true;
        };
        /*导航服务--显示隐藏菜单*/
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
                haschild=$this.hasClass('sub-menu-title'),
                $child,
                isrequest=false,
                temp_layer,
                temp_id,
                temp_label;


            temp_layer=$this.attr('data-layer');
            temp_id=$this.attr('data-id');
            temp_label=$this.html();


            /*模型缓存*/
            var record=config.record;

            /*变更操作记录模型--激活高亮*/
            if(record.current===null){
                record.current=$this;
            }else{
                record.prev=record.current;
                record.current=$this;
                record.prev.removeClass('sub-menuactive');
            }
            record.current.addClass('sub-menuactive');

            /*变更模型*/
            record.layer=temp_layer;
            record.organizationId=temp_id;
            record.organizationName=temp_label;

            /*查询子集*/
            if(haschild){
                $child=$this.next();
                if($child.hasClass('g-d-showi')){
                    /*隐藏*/
                    $child.removeClass('g-d-showi');
                    $this.removeClass('sub-menu-titleactive');
                    record.hasdata=true;
                }else{
                    /*显示*/
                    $child.addClass('g-d-showi');
                    $this.addClass('sub-menu-titleactive');
                    isrequest=$this.attr('data-isrequest');
                    if(isrequest==='false'){
                        /*重新加载*/
                        /*获取非根目录数据*/
                        self.getMenuList(config);
                    }else if(isrequest==='true'){
                        /*已加载的直接遍历存入操作区域*/
                        if(haschild){
                            record.hasdata=true;
                            //self.copySubMenu($child);
                        }else{
                            record.hasdata=false;
                        }
                    }

                }
            }else{
                record.hasdata=false;
                /*没有子节点，同时节点层次未达到极限值*/
                /*temp_layer=$this.attr('data-layer');
                islayer=self.validSubMenuLayer(temp_layer);*/
            }
        };
        /*导航服务--跳转至虚拟挂载点*/
        this.rootSubMenu=function (e,config) {
            var $this=$(e.target),
                islist=$this.attr('data-list'),
                record=config.record;

            /*切换显示隐藏*/
            $this.toggleClass('sub-menu-titleactive');
            self.$admin_struct_submenu.toggleClass('g-d-showi');

            if(islist==='true'){
                record.hasdata=true;
                //self.copySubMenu($child);
            }else if(islist==='false'){
                record.hasdata=false;
            }
            /*更新操作模型*/
            self.initRecord(record);
        };
        /*导航服务--拷贝本级数据(to do)*/
        this.copySubMenu=function ($wrap) {
            var data=$wrap.find('>li >a'),
                len=data.size();

            if(len!==0){
                /*有数据节点*/
                var list=[];
                data.each(function () {
                    var citem=$(this),
                        label=citem.html(),
                        id=citem.attr('data-id');
                    list.push({
                        label:label,
                        id:id
                    });
                });
                return list;
            }else{
                return null;
            }



            /*var data=$child.find('>li >a'),
                list=[],
                len=data.size();
            if(len!==0){
                /!*有数据节点*!/
                data.each(function () {
                    var citem=$(this),
                        orgname=citem.html(),
                        id=citem.attr('data-id');
                    list.push({
                        orgname:orgname,
                        id:id
                    });
                });
            }else{
                /!*无数据节点*!/
                temp_layer=$this.attr('layer');
                islayer=self.validSubMenuLayer(temp_layer);
                if(islayer){
                    /!*其他节点*!/
                    self.initOperate({
                        data:'',
                        id:temp_id,
                        setting:setting,
                        table:table
                    });
                }else{
                    /!*错误节点*!/
                    self.initOperate({
                        data:null,
                        setting:setting,
                        table:table
                    });
                }
            }*/
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
            record.settingId='';
            if(record.prev!==null){
                record.prev.removeClass('sub-menuactive');
                record.current.removeClass('sub-menuactive');
                record.prev=null;
            }else if(record.current!==null){
                record.current.removeClass('sub-menuactive');
            }
            record.current=null;
        };


    }]);