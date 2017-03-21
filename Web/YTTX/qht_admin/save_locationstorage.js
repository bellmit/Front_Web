/*
 * 这是一张 JavaScript 代码草稿纸。
 *
 * 输入一些 JavaScript，然后可点击右键或从“执行”菜单中选择：
 * 1. 运行 对选中的文本求值(eval) (Ctrl+R)；
 * 2. 查看 对返回值使用对象查看器 (Ctrl+I)；
 * 3. 显示 在选中内容后面以注释的形式插入返回的结果。 (Ctrl+L)
 */
//allow pasting
var cacheobj={
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
        loginMap:{
                'isLogin':true,
                'datetime':moment().format('YYYY-MM-DD|HH:mm:ss'),
                'reqdomain':'http://10.0.5.226:8080',
                'currentdomain':'',
                'username':'admin',
                'param':{
                        adminId: "1",
                        token: "e024d481-e4cc-4cd5-8263-57715d7265d4",
                        organizationId: "2"
                }
        },
        settingMap:{} 
};



localStorage.setItem('qht_admin_unique_key',JSON.stringify(cacheobj));