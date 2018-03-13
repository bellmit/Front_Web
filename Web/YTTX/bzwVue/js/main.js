(function () {
    Vue.component('cc-slide',{
        
    });


    /*创建导航示例*/
    new Vue({
        el: '#header_menu',
        data:{
            menuitem:[{
                    href: 'index',
                    name: '首页'
                },
                {
                    href: 'product',
                    name: '功能模块'
                },
                {
                    href: 'news',
                    name: '新闻资讯'
                },
                {
                    href: 'scene',
                    name: '场景展现'
                },
                {
                    href: 'contact',
                    name: '联系我们'
                }
            ]
        }
    });
})();