angular.module('login.service', [])
    .service('loginService', ['toolUtil', 'BASE_CONFIG', '$state', function (toolUtil, BASE_CONFIG, $state) {
        var self = this,
            cache = toolUtil.getParams(BASE_CONFIG.unique_key)/*缓存凭证*/,
            mainmenu = []/*缓存菜单*/;


        /*获取登陆信息*/
        this.isLogin = function (hc) {
            var logininfo = false,
                islogin = false,
                flag = typeof hc !== 'undefined' ? true : false;

            if (flag) {
                logininfo = toolUtil.isLogin(hc);
            } else {
                logininfo = toolUtil.isLogin(cache);
            }

            if (logininfo) {
                if (flag) {
                    islogin = toolUtil.validLogin(hc.loginMap, BASE_CONFIG.basedomain);
                } else {
                    islogin = toolUtil.validLogin(cache.loginMap, BASE_CONFIG.basedomain);
                }
                /*如果缓存失效则清除缓存*/
                if (!islogin) {
                    this.clearCache();
                    toolUtil.clear();
                }
                return islogin;
            }
            return islogin;
        };
        /*处理登陆请求*/
        this.reqAction = function (model) {
            toolUtil.requestHttp({
                url: '/sysuser/login',
                method: 'post',
                set: true,
                data: {
                    username: model.login.username,
                    password: model.login.password,
                    identifyingCode: model.login.identifyingCode
                }
            }).then(function (resp) {
                    var data = resp.data,
                        status = parseInt(resp.status, 10);

                    if (status === 200) {
                        var code = parseInt(data.code, 10),
                            result = data.result,
                            message = data.message;
                        if (code !== 0) {
                            if (typeof message !== 'undefined' && message !== '') {
                                toastr.info(message);
                            }
                            model.login.islogin = false;
                        } else {
                            /*加载动画*/
                            toolUtil.loading({
                                type:'show',
                                model:model.app_config
                            });
                            /*设置缓存*/
                            self.setCache({
                                'isLogin': true,
                                'datetime': moment().format('YYYY-MM-DD|HH:mm:ss'),
                                'reqdomain': BASE_CONFIG.basedomain,
                                'username': model.login.username,
                                'param': {
                                    'adminId': encodeURIComponent(result.adminId),
                                    'token': encodeURIComponent(result.token),
                                    'organizationId': encodeURIComponent(result.organizationId)
                                }
                            });
                            /*加载菜单*/
                            self.loadMenuData(model);
                            /*更新缓存*/
                            cache = toolUtil.getParams(BASE_CONFIG.unique_key);
                            toolUtil.loading({
                                type:'hide',
                                model:model.app_config
                            });
                            model.login.islogin = true;
                        }
                    } else {
                        model.login.islogin = false;
                    }
                },
                function (resp) {
                    model.login.islogin = false;
                    var message = resp.data.message;
                    if (typeof message !== 'undefined' && message !== '') {
                        toastr.error(message);
                    } else {
                        toastr.error('登录失败');
                    }
                });
        };
        /*加载菜单数据*/
        this.loadMenuData = function (config) {
            /*判断登陆缓存是否有效*/
            if (!cache.cacheMap.menuload) {
                toolUtil
                    .requestHttp({
                        url: '/module/menu',
                        method: 'post',
                        set: true,
                        data: cache.loginMap.param
                    })
                    .then(function (resp) {
                            var data = resp.data,
                                status = parseInt(resp.status, 10);

                            if (status === 200) {
                                var code = parseInt(data.code, 10),
                                    message = data.message;
                                if (code !== 0) {
                                    if (typeof message !== 'undefined' && message !== '') {
                                        console.log(message);
                                    }
                                    if (code === 999) {
                                        /*退出系统*/
                                        self.loginOut(true);
                                    }
                                } else {
                                    /*加载数据*/
                                    var result = data.result;
                                    if (typeof result !== 'undefined') {
                                        /*flag:是否设置首页*/
                                        var list = toolUtil.resolveMainMenu(result.menu, true);
                                        /*执行初始化导航*/
                                        if (config) {
                                            console.log(list);
                                            console.log(config);
                                            self.renderMenuData({
                                                headeritem: config.login.headeritem,
                                                flag: true,
                                                list: toolUtil.loadMainMenu(list['menu'])
                                            })
                                        }
                                        if (list !== null) {
                                            /*设置缓存*/
                                            cache['cacheMap'] = {
                                                menuload: true,
                                                powerload: true
                                            };
                                            cache['moduleMap'] = list['module'];
                                            cache['menuMap'] = list['menu'];
                                            cache['powerMap'] = list['power'];
                                            /*更新缓存*/
                                            toolUtil.setParams(BASE_CONFIG.unique_key, cache);
                                        }
                                    }
                                }
                            }
                        },
                        function (resp) {
                            var message = resp.data.message;
                            if (typeof message !== 'undefined' && message !== '') {
                                console.log(message);
                            } else {
                                console.log('请求菜单失败');
                            }
                        });
            }
        };
        /*直接获取数据源,flag:是否需要首页*/
        this.renderMenuData = function (config) {
            if (config.list && config.list !== null) {
                mainmenu = config.list;
                if (config.flag) {
                    config.headeritem = mainmenu.slice(0);

                } else {
                    config.headeritem = mainmenu.slice(1);
                }
            } else {
                mainmenu = [];
            }
        };
        /*获取菜单数据,flag:是否需要首页*/
        this.getMenuData = function (model, flag) {
            console.log(model);
            if (mainmenu.length === 0) {
                if (cache.cacheMap.menuload) {
                    /*直接加载缓存*/
                    var list = toolUtil.loadMainMenu(cache.menuMap);
                    if (list !== null) {
                        mainmenu = list;
                        if (flag) {
                            model = mainmenu.slice(0);

                        } else {
                            model = mainmenu.slice(1);
                        }
                    } else {
                        mainmenu = [];
                    }
                }
            } else {
                if (flag) {
                    model = mainmenu.slice(0);
                } else {
                    model = mainmenu.slice(1);
                }
            }
            console.log(model);
        };
        /*获取验证码*/
        this.getValidCode = function (config) {
            var xhr = new XMLHttpRequest();

            xhr.open("post", toolUtil.adaptReqUrl(config.url), true);

            xhr.responseType = "blob";
            xhr.onreadystatechange = function () {
                if (this.status == 200) {
                    var blob = this.response,
                        img = document.createElement("img");

                    img.alt = '验证码';
                    try {
                        img.onload = function (e) {
                            window.URL.revokeObjectURL(img.src);
                        };
                        img.src = window.URL.createObjectURL(blob);
                    } catch (e) {
                        console.log('不支持URL.createObjectURL');
                    }

                    if (config.wrap) {
                        angular.element('#' + config.wrap).html(img) || $('#' + config.wrap).html(img);
                    } else if (config.fn && typeof config.fn === 'function') {
                        config.fn.call(null, img);
                    }
                }
            };
            xhr.send();
        };
        /*设置缓存*/
        this.setCache = function (data) {
            if (cache) {
                cache.loginMap = data;
            } else {
                cache = {
                    cacheMap: {
                        menuload: false,
                        powerload: false
                    },
                    routeMap: {
                        prev: '',
                        current: '',
                        setting: false
                    },
                    moduleMap: {},
                    menuMap: {},
                    powerMap: {},
                    loginMap: data,
                    settingMap: {}
                };
            }
            toolUtil.setParams(BASE_CONFIG.unique_key, cache);
        };
        /*退出系统*/
        this.loginOut = function (flag) {
            this.clearCache();
            toolUtil.clear();
            /*路由*/
            if(flag){
                $state.go('app');
            }
            return true;
        };
        /*清除缓存*/
        this.clearCache = function () {
            cache = null;
            mainmenu = [];
        };
        /*获取已经存在的缓存*/
        this.getCache = function () {
            return cache;
        };
    }]);