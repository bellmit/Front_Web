angular.module('app')
    .controller('IndexController', ['loginService',function(loginService){



        this.quickitem=[];

        /*主内容快捷导航*/
        loginService.getMenuData(this.quickitem,false);


        /*主内容侧边栏*/
        this.menuitem=Mock.mock({
            'list|2-10':[{
                "name":/[a-z]{2,5}/,
                "value":/[0-9a-zA-Z]{2,10}/
            }]
        }).list;


    }]);