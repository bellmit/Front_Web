angular.module('app')
    .controller('IndexController', ['loginService',function(loginService){

        /*快捷方式*/
        this.headeritem=this.$parent.login.headeritem.slice(1);


        /*主内容侧边栏*/
        this.menuitem=Mock.mock({
            'list|2-10':[{
                "name":/[a-z]{2,5}/,
                "value":/[0-9a-zA-Z]{2,10}/
            }]
        }).list;


    }]);