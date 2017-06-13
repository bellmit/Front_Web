'use strict';

/**
 * 路由跳转
 */
angular.module('app')
    .run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
         $rootScope.$state = $state;
         $rootScope.$stateParams = $stateParams;
     }]).config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            /*异常路径路由到主页*/
            $urlRouterProvider.otherwise('app');

            /*路由*/
            $stateProvider
                .state('app', {
                    url: '/app',
                    views:{
                        'container':{
                            templateUrl: 'tpl/index.html'
                        }
                    },
                    resolve: {
                        /*延迟加载，依赖相关组件*/
                        loadMyCtrl: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/app/directives/index.js','js/app/module/index/index_controller.js']);
                            }]
                    }
                });
        }
    ]
);