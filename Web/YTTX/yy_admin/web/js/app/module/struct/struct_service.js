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
            structadd:toolUtil.isPower('organization-add',powermap,true)/*添加机构*/,
            structedit:toolUtil.isPower('organization-edit',powermap,true)/*编辑机构*/,
            roleadd:toolUtil.isPower('role-add',powermap,true),/*添加*/
            useradd:toolUtil.isPower('user-add',powermap,true)/*添加用户*/,
            userdetail:toolUtil.isPower('user-view',powermap,true)/*查看用户*/,
            userupdate:toolUtil.isPower('user-update',powermap,true)/*编辑用户*/,
            userdelete:toolUtil.isPower('batch-delete',powermap,true)/*删除用户*/,
            operateadjust:toolUtil.isPower('operator-adjustment',powermap,true)/*调整运营商*/
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
                var param=$.extend(true,{},cache.loginMap.param);

                param['isShowSelf']=0;
                if(config.search!==''){
                    param['orgname']=config.search;
                }

                if(typeof config.type!=='undefined' && config.type==='search'){
                    /*检索则清空查询内容*/
                    self.$admin_struct_submenu.html('');
                    self.$admin_struct_list.html('');
                }

                var layer,
                    id,
                    $wrap;

                /*初始化加载*/
                if(typeof config.$reqstate==='undefined'){
                    layer=0;
                    /*根目录则获取新配置参数*/
                    id=param['organizationId'];
                    $wrap=self.$admin_struct_submenu;
                }else{
                    /*非根目录则获取新请求参数*/
                    layer=config.$reqstate.attr('data-layer');
                    $wrap=config.$reqstate.next();
                    id=config.$reqstate.attr('data-id');

                    /*判断是否是合法的节点*/
                    if(layer>=BASE_CONFIG.submenulimit){
                        /*遇到极限节点，不查询数据*/
                        self.initOperate({
                            data:null,
                            $wrap:self.$admin_struct_list,
                            setting:config.setting,
                            table:config.table
                        });
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
                                                if(layer===0){
                                                    $wrap.html('<li><a>暂无数据</a></li>');
                                                    /*填充子数据到操作区域,同时显示相关操作按钮*/
                                                    self.initOperate({
                                                        data:'',
                                                        id:id,
                                                        $wrap:self.$admin_struct_list,
                                                        setting:config.setting,
                                                        table:config.table
                                                    });
                                                }else{
                                                    $wrap.html('');
                                                    /*清除显示下级菜单导航图标*/
                                                    config.$reqstate.attr({
                                                        'data-isrequest':true
                                                    }).removeClass('sub-menu-title sub-menu-titleactive');
                                                    /*填充子数据到操作区域,同时显示相关操作按钮*/
                                                    self.initOperate({
                                                        data:'',
                                                        id:id,
                                                        orgname:config.$reqstate.html(),
                                                        $wrap:self.$admin_struct_list,
                                                        setting:config.setting,
                                                        table:config.table
                                                    });
                                                }
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                str=self.resolveMenuList(list,BASE_CONFIG.submenulimit,{
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

                                                /*填充子数据到操作区域,同时显示相关操作按钮*/
                                                self.initOperate({
                                                    data:list,
                                                    $wrap:self.$admin_struct_list,
                                                    id:id,
                                                    layer:layer,
                                                    setting:config.setting,
                                                    table:config.table
                                                });
                                            }
                                        }else{
                                            /*填充子数据到操作区域,同时显示相关操作按钮*/
                                            self.initOperate({
                                                data:null,
                                                $wrap:self.$admin_struct_list,
                                                setting:config.setting,
                                                table:config.table
                                            });
                                        }
                                    }else{
                                        if(layer===0){
                                            $wrap.html('<li><a>暂无数据</a></li>');
                                        }
                                        /*填充子数据到操作区域,同时显示相关操作按钮*/
                                        self.initOperate({
                                            data:null,
                                            $wrap:self.$admin_struct_list,
                                            setting:config.setting,
                                            table:config.table
                                        });
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
                                $wrap.html('<li><a>暂无数据</a></li>');
                            }
                            /*填充子数据到操作区域,同时显示相关操作按钮*/
                            self.initOperate({
                                data:null,
                                $wrap:self.$admin_struct_list,
                                setting:config.setting,
                                table:config.table
                            });
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

            if(limit>=1&&layer>limit){
                /*如果层级达到设置的极限清除相关*/
                return false;
            }



            if(len!==0){
                for(i;i<len;i++){
                    var curitem=menulist[i];
                    /*到达极限的前一项则不创建子菜单容器*/
                    if(limit>=1&&layer>=limit){
                        str+=self.doItemMenuList(curitem,{
                                flag:false,
                                limit:limit,
                                layer:layer,
                                parentid:config.id
                            })+'</li>';
                    }else{
                        str+=self.doItemMenuList(curitem,{
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
        /*导航服务--解析导航--公共解析*/
        this.doItemMenuList=function (obj,config) {
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
                islayer;


            temp_layer=$this.attr('data-layer');
            temp_id=$this.attr('data-id');


            /*模型缓存*/
            var record=config.record,
                edit=config.edit,
                setting=config.setting,
                table=config.table;

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

            edit.layer=temp_layer;
            edit.id=temp_id;
            edit.editstate=true;
            edit.orgname=$this.html();

            /*查询子集*/
            if(haschild){
                $child=$this.next();
                if($child.hasClass('g-d-showi')){
                    /*隐藏*/
                    $child.removeClass('g-d-showi');
                    $this.removeClass('sub-menu-titleactive');
                    /*是否已经加载过数据*/
                    isrequest=$this.attr('data-isrequest');
                    if(isrequest==='true'){
                        /*清空隐藏节点数据*/
                        self.initOperate({
                            data:'',
                            id:temp_id,
                            setting:setting,
                            table:table
                        });
                    }
                }else{
                    /*显示*/
                    isrequest=$this.attr('data-isrequest');
                    if(isrequest==='false'){
                        /*重新加载*/
                        /*获取非根目录数据*/
                        self.getMenuList({
                            search:record.searchname,
                            $reqstate:$this,
                            setting:setting,
                            table:table
                        });
                    }else if(isrequest==='true'){
                        /*已加载的直接遍历存入操作区域*/
                        if(haschild){
                            var data=$child.find('>li >a'),
                                list=[],
                                len=data.size();
                            if(len!==0){
                                /*有数据节点*/
                                data.each(function () {
                                    var citem=$(this),
                                        orgname=citem.html(),
                                        id=citem.attr('data-id');
                                    list.push({
                                        orgname:orgname,
                                        id:id
                                    });
                                });
                                self.initOperate({
                                    data:list,
                                    layer:temp_layer,
                                    id:temp_id,
                                    setting:setting,
                                    table:table
                                });
                            }else{
                                /*无数据节点*/
                                temp_layer=$this.attr('layer');
                                islayer=self.validSubMenuLayer(temp_layer);
                                if(islayer){
                                    /*其他节点*/
                                    self.initOperate({
                                        data:'',
                                        id:temp_id,
                                        setting:setting,
                                        table:table
                                    });
                                }else{
                                    /*错误节点*/
                                    self.initOperate({
                                        data:null,
                                        setting:setting,
                                        table:table
                                    });
                                }
                            }
                        }
                    }
                    $child.addClass('g-d-showi');
                    $this.addClass('sub-menu-titleactive');
                }
            }else{
                /*没有子节点，同时节点层次未达到极限值*/
                temp_layer=$this.attr('data-layer');
                islayer=self.validSubMenuLayer(temp_layer);
                if(islayer){
                    /*其他节点*/
                    self.initOperate({
                        data:'',
                        id:temp_id,
                        setting:setting,
                        table:table
                    });
                }else{
                    /*错误节点*/
                    self.initOperate({
                        data:null,
                        setting:setting,
                        table:table
                    });
                }
            }
        };
        /*导航服务--跳转虚拟挂载点*/
        this.rootSubMenu=function (e,config) {
            var $this=$(e.target),
                $child=$this.next();

            var data=$child.find('>li >a'),
                list=[],
                len=data.size();
            if(len!==0){
                data.each(function () {
                    var citem=$(this),
                        orgname=citem.html(),
                        id=citem.attr('data-id');
                    list.push({
                        orgname:orgname,
                        id:id
                    });
                });
                self.initOperate({
                    data:list,
                    layer:0,
                    id:config.root.id,
                    orgname:config.root.orgname,
                    setting:config.setting,
                    table:config.table
                });
            }

            /*清除高亮模型*/
            if(config.record.prev!==null){
                config.record.prev.removeClass('sub-menuactive');
                config.record.prev=null;
            }
            if(config.record.current!==null){
                config.record.current.removeClass('sub-menuactive');
                config.record.current=null;
            }

            /*更新编辑模型*/
            config.edit.editstate=false;
            config.edit.id=config.root.id;
            config.edit.layer=0;
            config.edit.orgname=config.root.orgname;
        };



    }]);