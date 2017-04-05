angular.module('app')
    .service('structService',['toolUtil','toolDialog','BASE_CONFIG','loginService',function(toolUtil,toolDialog,BASE_CONFIG,loginService){

        /*获取缓存数据*/
        var cache=loginService.getCache(),
            $admin_struct_submenu=$('#admin_struct_submenu'),
            $admin_struct_list=$('#admin_struct_list'),
            $struct_setting_dialog=$('#struct_setting_dialog'),
            $struct_pos_dialog=$('#struct_pos_dialog'),
            self=this;





        /*导航服务--获取虚拟挂载点*/
        this.getRoot=function () {
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var logininfo=cache.loginMap;
                return {
                    'orgname':logininfo.username,
                    'id':logininfo.param.organizationId
                };
            }else{
                /*退出系统*/
                cache=null;
                toolUtil.loginTips({
                    clear:true,
                    reload:true
                });
                return null;
            }
        };
        /*导航服务--获取导航*/
        this.getMenuList=function (config) {
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var param=$.extend(true,{},cache.loginMap.param);

                param['isShowSelf']=0;
                if(config.search!==''){
                    param['orgname']=config.search;
                }

                if(typeof config.type!=='undefined'&&config.type==='search'){
                    /*检索则清空查询内容*/
                    $admin_struct_submenu.html('');
                    $admin_struct_list.html('');
                }

                var layer,
                    id,
                    $wrap;

                /*初始化加载*/
                if(typeof config.$reqstate==='undefined'){
                    layer=0;
                    /*根目录则获取新配置参数*/
                    id=param['organizationId'];
                    $wrap=$admin_struct_submenu;
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
                            $wrap:$admin_struct_list,
                            setting:config.setting
                        });
                        return false;
                    }
                    param['organizationId']=id;
                }


                toolUtil
                    .requestHttp({
                        url:'/organization/lowers/search'/*'json/goods/mall_goods_attr.json'*/,
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
                                        islogin=false;
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
                                                        $wrap:$admin_struct_list,
                                                        setting:config.setting
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
                                                        orgname:config.$reqstate.attr('data-label'),
                                                        $wrap:$admin_struct_list,
                                                        setting:config.setting
                                                    });
                                                }
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                str=self.resolveMenuList(list,BASE_CONFIG.submenulimit,{
                                                    layer:layer,
                                                    id:id
                                                });
                                                $wrap.html(str);
                                                if(layer!==0){
                                                    config.$reqstate.attr({
                                                        'data-isrequest':true
                                                    });
                                                }

                                                /*填充子数据到操作区域,同时显示相关操作按钮*/
                                                self.initOperate({
                                                    data:list,
                                                    $wrap:$admin_struct_list,
                                                    layer:layer,
                                                    setting:config.setting
                                                });
                                            }
                                        }else{
                                            /*填充子数据到操作区域,同时显示相关操作按钮*/
                                            self.initOperate({
                                                data:null,
                                                $wrap:$admin_struct_list,
                                                setting:config.setting
                                            });
                                        }
                                    }else{
                                        if(layer===0){
                                            $wrap.html('<li><a>暂无数据</a></li>');
                                        }
                                        /*填充子数据到操作区域,同时显示相关操作按钮*/
                                        self.initOperate({
                                            data:null,
                                            $wrap:$admin_struct_list,
                                            setting:config.setting
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
                                $wrap:$admin_struct_list,
                                setting:config.setting
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
        /*导航服务--解析导航--递归解析*/
        this.doMenuList=function (obj,config) {
            
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
                str='<li><a data-isrequest="false" data-parentid="'+parentid+'" data-label="'+label+'" data-layer="'+layer+'" data-id="'+id+'" class="sub-menu-title" href="#" title="">'+label+'</a>';
            }else{
                str='<li><a data-parentid="'+parentid+'"  data-label="'+label+'"  data-layer="'+layer+'" data-id="'+id+'" href="#" title="">'+label+'</a></li>';
            }

            /*
            to do

            可能需要判断权限操作
            */
            /*if(goodstypeedit_power){
                str+='<span data-parentid="'+parentid+'"  data-action="edit" data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-pencil"></i>&nbsp;&nbsp;编辑\
						</span>';

                /!*编辑状态*!/
                stredit+='<span data-parentid="'+parentid+'"  data-action="confirm"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-bs-success">\
									<i class="fa-check"></i>&nbsp;&nbsp;确定\
								</span>\
								<span data-action="cance"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray10">\
									<i class="fa-close"></i>&nbsp;&nbsp;取消\
								</span>';
            }*/

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


        /*机构设置--初始化操作区域*/
        this.initOperate=function (config) {
            var data=config.data,
                $wrap;

            if(typeof config.$wrap==='undefined'){
                $wrap=$admin_struct_list;
                config['$wrap']=$wrap;
            }else{
                $wrap=config.$wrap;
            }

            if(data===null){
                /*清空内容*/
                $wrap.html('');
                /*设置操作状态*/
                config.setting.add_substruct_state=false;
                config.setting.adjust_pos_state=false;
                config.setting.id='';
                config.setting.orgname='';
                config.setting.c_id='';
                config.setting.c_orgname='';
            }else{
                /*设置操作状态*/
                if(data===''){
                    config.setting.add_substruct_state=true;
                    config.setting.adjust_pos_state=false;
                    config.setting.id=config.id;
                    config.setting.orgname=config.orgname?config.orgname:'';
                    config.setting.c_id='';
                    config.setting.c_orgname='';
                    /*清空内容*/
                    $wrap.html('');
                }else{
                    if(config.layer===0){
                        /*虚拟挂载点*/
                        config.setting.id=config.id;
                        config.setting.orgname=config.orgname;
                    }else{
                        config.setting.id='';
                        config.setting.orgname='';
                    }
                    config.setting.add_substruct_state=true;
                    config.setting.adjust_pos_state=true;
                    config.setting.c_id='';
                    config.setting.c_orgname='';
                    self.renderOperate(config);
                }
            }
        };
        /*机构设置--填充数据至操作区域*/
        this.renderOperate=function (config) {
            var i=0,
                list=config.data,
                len=list.length,
                str='',
                layer=config.layer;

            var curitem,
                id,
                orgname;

            if(layer>=BASE_CONFIG.submenulimit){
                config.$wrap.html('');
            }else{
                layer++;
                for(i;i<len;i++){
                        curitem=list[i];
                        id=curitem['id'];
                        orgname=curitem['orgname'];
                    str+='<li class="ts-reload" data-label="'+orgname+'" data-id="'+id+'" data-layer="'+layer+'">'+orgname+'<span title="加载数据" data-isrequest="false" data-id="'+id+'"></span><ul></ul></li>';
                }
                $(str).appendTo(config.$wrap.html(''));
            }
        };
        /*机构设置--获取机构列表*/
        this.getOperateList=function (config) {
            var islogin=loginService.isLogin(cache);
            if(islogin){
                var param=$.extend(true,{},cache.loginMap.param);

                param['isShowSelf']=0;
                if(config.search!==''){
                    param['orgname']=config.search;
                }

                /*非根目录则获取新请求参数*/
                param['organizationId']=config.id;

                toolUtil
                    .requestHttp({
                        url:'/organization/lowers/search'/*'json/goods/mall_goods_attr.json'*/,
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
                                        islogin=null;
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
                                                config.$wrap.html('');
                                                /*清除显示下级菜单导航图标*/
                                                config.$reqstate.attr({
                                                    'data-isrequest':true
                                                });
                                                config.$li.removeClass();
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                config.$reqstate.attr({
                                                    'data-isrequest':true,
                                                    'title':'查看'
                                                });
                                                config.$li.removeClass().addClass('ts-child');
                                                var i=0;
                                                for(i;i<len;i++){
                                                    var curitem=list[i];
                                                    str+='<li data-label="'+curitem['orgname']+'" data-id="'+curitem['id']+'">'+curitem["orgname"]+'</li>';
                                                }
                                                $(str).appendTo(config.$wrap.html(''));
                                            }
                                        }else{
                                            config.$reqstate.attr({
                                                'data-isrequest':true
                                            });
                                            /*防止重复请求*/
                                            setTimeout(function () {
                                                config.$reqstate.attr({
                                                    'data-isrequest':false
                                                });
                                            },2000);
                                        }
                                    }else{
                                        config.$reqstate.attr({
                                            'data-isrequest':true
                                        });
                                        config.$li.removeClass();
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
                            config.$reqstate.attr({
                                'data-isrequest':true
                            });
                            config.$li.removeClass();
                        });
            }else{
                loginService.loginOut();
            }
        };
        /*添加子机构*/
        this.addSubStruct=function (config) {
            /*if(config.id===''&&config.orgname===''){
                toolDialog.show({
                    type:'warn',
                    value:'没有父机构或父机构不存在'
                });
                return false;
            }*/
            
        };


        /*编辑操作*/
        this.toggleModal=function (config,fn) {
            if(config.display==='show'){
                if(config.area==='setting'){
                    $struct_setting_dialog.modal('show',{backdrop:'static'});
                }else if(config.area==='pos'){
                    $struct_pos_dialog.modal('show',{backdrop:'static'});
                }
                if(fn&&typeof fn==='function'){
                    fn.call(null);
                }
            }else if(config.display==='hide'){
                if(config.area==='setting'){
                    $struct_setting_dialog.modal('hide');
                    /*$struct_setting_dialog.on('hide.bs.modal',fn);*/
                }else if(config.area==='pos'){
                    $struct_pos_dialog.modal('hide');
                    /*$struct_pos_dialog.on('hide.bs.modal',fn);*/
                }
            }
        };
        
        /*表单类服务--重置表单数据*/
        this.structReset=function () {
            
        };
        /*表单类服务--提交表单数据*/
        this.structSubmit=function () {

        };
        


        
        /*提交编辑数据*/
        this.updateRootOrgname=function(edit) {
            if(edit.rootorgname===''){
              return false;
            }else{
                /*to do*/
                toolDialog.show({
                    type:'succ',
                    value:'编辑成功'
                });
                edit.editstate=true;
            }
        };
        


        /*var cache=toolUtil.getParams(BASE_CONFIG.unique_key),
            menudata=null;

        /!*获取登陆信息*!/
        this.isLogin=function () {
            var logininfo=toolUtil.isLogin(cache),
                islogin=false;
            if(logininfo){
                islogin=toolUtil.validLogin(cache.loginMap,BASE_CONFIG.basedomain);
                if(!islogin){
                    /!*不合格缓存信息，需要清除缓存*!/
                    toolUtil.loginOut({
                        router:'login',
                        tips:true
                    });
                }
                return islogin;
            }else{
                return false;
            }
        };
        /!*处理登陆请求*!/
        this.reqAction=function (resp,param) {
            var data=resp.data,
                status=parseInt(resp.status,10);

            if(status===200){
                var code=parseInt(data.code,10),
                    result=data.result,
                    message=data.message;
                if(code!==0){
                    if(typeof message !=='undefined'&&message!==''){
                        toastr.info(message);
                    }
                    return false;
                }else{
                    /!*设置缓存*!/
                    this.setCache({
                        'isLogin':true,
                        'datetime':moment().format('YYYY-MM-DD|HH:mm:ss'),
                        'reqdomain':BASE_CONFIG.basedomain,
                        'username':param,
                        'param':{
                            'adminId':encodeURIComponent(result.adminId),
                            'token':encodeURIComponent(result.token),
                            'organizationId':encodeURIComponent(result.organizationId)
                        }
                    });
                    /!*加载菜单*!/
                    this.loadMenuData(function () {
                        /!*重新刷新页面*!/
                        window.location.reload();
                    });
                    /!*加载动画*!/
                    toolUtil.loading('show');
                    var loadingid=setTimeout(function () {
                        /!*更新缓存*!/
                        cache=toolUtil.getParams(BASE_CONFIG.unique_key);
                        /!*路由跳转*!/
                        $state.go('app');
                        toolUtil.loading('hide',loadingid);
                    },1000);
                    return true;
                }
            }else{
                return false;
            }
        };
        /!*加载菜单数据*!/
        this.loadMenuData=function (fn) {
            /!*判断登陆缓存是否有效*!/
            var self=this,
                islogin=self.isLogin();
            if(islogin){
                if(!cache.cacheMap.menuload){
                    toolUtil
                        .requestHttp({
                            url:'/module/menu',
                            method:'post',
                            set:true,
                            data:cache.loginMap.param
                        })
                        .then(function(resp){
                                var data=resp.data,
                                    status=parseInt(resp.status,10);

                                if(status===200){
                                    var code=parseInt(data.code,10),
                                        message=data.message;
                                    if(code!==0){
                                        if(typeof message !=='undefined'&&message!==''){
                                            console.log('message');
                                        }
                                        if(code===999){
                                            /!*退出系统*!/
                                            toolUtil.loginOut({
                                                router:'login',
                                                tips:true
                                            });
                                        }
                                    }else{
                                        /!*加载数据*!/
                                        var result=data.result;
                                        if(typeof result!=='undefined'){
                                            /!*flag:是否设置首页*!/
                                            var list=toolUtil.resolveMainMenu(result.menu,true);
                                            if(list!==null){
                                                /!*设置缓存*!/
                                                cache['cacheMap']={
                                                    menuload:true,
                                                    powerload:true
                                                };
                                                cache['moduleMap']=list['module'];
                                                cache['menuMap']=list['menu'];
                                                cache['powerMap']=list['power'];
                                                /!*更新缓存*!/
                                                toolUtil.setParams(BASE_CONFIG.unique_key,cache);
                                                /!*执行回掉*!/
                                                if(typeof fn==='function'){
                                                    fn();
                                                }
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
                            });
                }
            }else{
                toolUtil.loginOut({
                    router:'login',
                    tips:true
                });
            }
        };
        /!*获取菜单数据*!/
        this.getMenuData=function () {
            if(menudata===null){
                var self=this,
                    islogin=self.isLogin();

                if(islogin){
                    if(cache.cacheMap.menuload){
                        /!*直接加载缓存*!/
                        var list=toolUtil.loadMainMenu(cache.menuMap);
                        if(list!==null){
                            menudata=list;
                            return menudata;
                        }
                    }
                }else{
                    toolUtil.loginOut({
                        router:'login',
                        tips:true
                    });
                }
                return null;
            }else{
                return menudata;
            }
        };
        /!**!/
        /!*获取验证码*!/
        this.getValidCode=function (config) {
            var xhr = new XMLHttpRequest();

            xhr.open("post",BASE_CONFIG.basedomain + BASE_CONFIG.baseproject + config.url, true);

            xhr.responseType = "blob";
            xhr.onreadystatechange = function() {
                if (this.status == 200) {
                    var blob = this.response,
                        img = document.createElement("img");

                    img.alt='验证码';
                    try{
                        img.onload = function(e) {
                            window.URL.revokeObjectURL(img.src);
                        };
                        img.src = window.URL.createObjectURL(blob);
                    }catch (e){
                        console.log('不支持URL.createObjectURL');
                    }

                    if(config.wrap){
                        angular.element('#'+config.wrap).html(img)||$('#'+config.wrap).html(img);
                    }else if(config.fn&&typeof config.fn==='function'){
                        config.fn.call(null,img);
                    }
                }
            };
            xhr.send();
        };
        /!*设置缓存*!/
        this.setCache=function (data) {
            if(cache){
                cache.loginMap=data;
            }else{
                cache={
                    cacheMap:{
                        menuload:false,
                        powerload:false
                    },
                    routeMap:{
                        prev:'',
                        current:'',
                        setting:false
                    },
                    moduleMap:{},
                    menuMap:{},
                    powerMap:{},
                    loginMap:data,
                    settingMap:{}
                };
            }
            toolUtil.setParams(BASE_CONFIG.unique_key,cache);
        };*/
    }]);