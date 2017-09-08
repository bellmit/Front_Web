/**
 * 路由跳转
 */
(function () {
    'use strict';
    /*使用模块*/
    angular
        .module('app')
        .run(runConfig);

    /*注入*/
    runConfig.$inject = ['$rootScope', '$state', '$stateParams'];

    /*实现或接口*/
    function runConfig($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
}());

/**
 * 路由跳转
 */
(function () {
    'use strict';
    /*使用模块*/
    angular
        .module('app')
        .config(routerConfig);

    /*注入*/
    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /*路由实现*/
    function routerConfig($stateProvider, $urlRouterProvider) {
        /*异常路径路由到主页*/
        $urlRouterProvider.otherwise('app');

        /*路由--登录和首页*/
        $stateProvider
        /*登录和首页*/
            .state('app', {
                url: '/app',
                templateUrl: 'view/index.html',
                controller: 'indexController',
                controllerAs: 'vm',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/app/index/index-controller.js',
                                'js/app/index/index-service.js'
                            ]);
                        }]
                }
            })
            /*管理*/
            .state('admin', {
                url: '/admin',
                templateUrl: 'view/admin/admin.html',
                controller: 'adminController',
                controllerAs: 'vm',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/service/datatable/table.js',
                                'js/service/page/page.js','js/app/admin/admin-controller.js',
                                'js/app/admin/admin-service.js'
                            ]);
                        }]
                }
            })
            /*商家管理*/
            .state('business', {
                url: '/business',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*供应商管理*/
            .state('provider', {
                url: '/provider',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*订单管理*/
            .state('order', {
                url: '/order',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*商品管理*/
            .state('goods', {
                url: '/goods',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*用户管理*/
            .state('user', {
                url: '/user',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*商家商城订单*/
            .state('warehouse', {
                url: '/warehouse',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*财务管理*/
            .state('finance', {
                url: '/finance',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*分润管理*/
            .state('profit', {
                url: '/profit',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*统计管理*/
            .state('statistics', {
                url: '/statistics',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*平台管理*/
            .state('platform', {
                url: '/platform',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            })
            /*设置管理*/
            .state('setting', {
                url: '/setting',
                templateUrl: 'view/index.html',
                resolve: {
                    /*延迟加载，依赖相关组件*/
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([]);
                        }]
                }
            });
    }
}());