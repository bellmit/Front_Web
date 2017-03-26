angular.module('app')
    .service('structService',['toolUtil','toolDialog','BASE_CONFIG','loginService',function(toolUtil,toolDialog,BASE_CONFIG,loginService){

        /*获取缓存数据*/
        var cache=toolUtil.getParams(BASE_CONFIG.unique_key),
            struct_submenu_dom=document.getElementById('admin_struct_submenu'),
            struct_list_dom=document.getElementById('admin_struct_list'),
            self=this;

        /*
        导航服务类
        获取导航*/
        this.getMenuList=function (condition) {

            /*
            template

             <li>\
                 <a class="sub-menu-title" href="#" title="">菜单列表1</a>\
                 <ul>\
                     <li>\
                        <a class="sub-menu-title" href="#" title="">菜单列表1</a>\
                         <ul>\
                            <li><a href="#" title="">菜单列表1</a></li>\
                         </ul>\
                     </li>\
                 </ul>\
             </li>

            * */

            var islogin=loginService.isLogin(cache);
            if(islogin){
                var param=$.extend(true,{},cache.loginMap.param);

                param['isShowSelf']=0;
                if(condition!==''){
                    param['orgname']=condition;
                }
                toolUtil
                    .requestHttp({
                        url:'json/goods/mall_goods_attr.json',
                        method:'post',
                        set:false,
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
                                        toolUtil.loginTips({
                                            clear:true,
                                            reload:true
                                        });
                                    }
                                }else{
                                    /*加载数据*/
                                    struct_list_dom.innerHTML='';
                                    var result=data.result;
                                    if(typeof result!=='undefined'){
                                        /*flag:是否设置首页*/
                                        var list=result.list,
                                            str='';
                                        if(list){
                                            var len=list.length;
                                            if(len===0){
                                                struct_submenu_dom.innerHTML='<li><a>暂无数据</a></li>';
                                            }else{
                                                /*数据集合，最多嵌套层次*/
                                                str=''+self.resolveMenuList(list,6)+'';
                                                struct_submenu_dom.innerHTML=str;
                                            }
                                        }
                                    }else{
                                        struct_submenu_dom.innerHTML='<li><a>暂无数据</a></li>';
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
                            struct_submenu_dom.innerHTML='<li><a>暂无数据</a></li>';
                            struct_list_dom.innerHTML='';
                        });
            }else{
                loginService.loginOut();
            }
        };

        /*解析导航--开始解析*/
        this.resolveMenuList=function (obj,limit) {
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
                layer=1;



            if(len!==0){
                for(i;i<len;i++){
                    var curitem=menulist[i],
                        hassub=/*curitem["hasSub"]*/typeof curitem['list']!=='undefined';
                    if(hassub){
                        str+=self.doItemMenuList(curitem,{
                                flag:true,
                                limit:limit,
                                layer:layer,
                                parentid:''
                            })+'<ul></ul></li>';
                    }else{
                        str+=self.doItemMenuList(curitem,{
                            flag:false,
                            limit:limit,
                            layer:layer,
                            parentid:''
                        });
                    }
                }
                return str;
            }else{
                return false;
            }
        };

        /*解析导航--递归解析*/
        this.doMenuList=function (obj,config) {
            
        };

        /*解析导航--公共解析*/
        this.doItemMenuList=function (obj,config) {
            var curitem=obj,
                id=curitem["id"],
                label=curitem["name"],
                str='',
                flag=config.flag,
                limit=config.limit,
                layer=config.layer,
                parentid=config.parentid;


            if(flag){
                str='<li data-parentid="'+parentid+'" data-label="'+label+'" data-layer="'+layer+'" data-id="'+id+'"><a href="#" title="">'+label+'</a></li>';
            }else{
                str='<li data-parentid="'+parentid+'" data-label="'+label+'"  data-layer="'+layer+'" data-id="'+id+'"><a href="#" title="">'+label+'</a></li>';
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

        /*获取机构列表*/
        this.getStructList=function () {
            
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