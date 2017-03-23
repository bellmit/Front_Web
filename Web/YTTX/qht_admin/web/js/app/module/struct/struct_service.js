angular.module('app')
    .service('structService',['toolUtil','BASE_CONFIG','loginService',function(toolUtil,BASE_CONFIG,loginService){

        /*获取缓存数据*/
        var cache=toolUtil.getParams(BASE_CONFIG.unique_key),
            struct_submenu_dom=document.getElementById('admin_struct_submenu'),
            struct_list_dom=document.getElementById('admin_struct_list');

        /*获取导航*/
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
                if(condition!==''){
                    param['orgname']=condition;
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
                                        console.log('message');
                                    }
                                    if(code===999){
                                        /*退出系统*/
                                        toolUtil.loginOut({
                                            router:'login',
                                            tips:true
                                        });
                                    }
                                }else{
                                    /*加载数据*/
                                    var result=data.result;
                                    if(typeof result!=='undefined'){
                                        /*flag:是否设置首页*/
                                        var list=result.list,
                                            str='';
                                        if(list){
                                            var i=0,
                                                len=list.length;
                                            if(len===0){
                                                //struct_submenu_dom.innerHTML='<li><a>暂无数据</a></li>';
                                                //struct_list_dom.innerHTML='';
                                            }else{
                                                for(i;i<len;i++){
                                                    var tempitem=list[i];
                                                    str+='<li><a data-id="'+tempitem['id']+'" href="#" title="">'+tempitem['orgname']+'</a></li>';
                                                }
                                                //struct_submenu_dom.innerHTML=str;
                                            }
                                        }
                                    }else{
                                        //struct_submenu_dom.innerHTML='<li><a>暂无数据</a></li>';
                                        //struct_list_dom.innerHTML='';
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
                            //struct_submenu_dom.innerHTML='<li><a>暂无数据</a></li>';
                            //struct_list_dom.innerHTML='';
                        });
            }
        };


        /*获取机构列表*/
        this.getStructList=function () {
            
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