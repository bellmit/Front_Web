/*
 * 这是一张 JavaScript 代码草稿纸。
 *
 * 输入一些 JavaScript，然后可点击右键或从“执行”菜单中选择：
 * 1. 运行 对选中的文本求值(eval) (Ctrl+R)；
 * 2. 查看 对返回值使用对象查看器 (Ctrl+I)；
 * 3. 显示 在选中内容后面以注释的形式插入返回的结果。 (Ctrl+L)
 */
//allow pasting
var cacheobj = {
        'cacheMap': {
                'menuload': true,
                'powerload': true
        },
        'routeMap': {
                'prev': '',
                'current': '',
                'setting': false
        },
        'moduleMap': {
                '0': {
                        'id': 0,
                        'code': 'app',
                        'module': 'app'
                },
                '10': {
                        'id': 10,
                        'code': 'yttx-oragnization',
                        'module': 'struct'
                },
                '30': {
                        'id': 30,
                        'code': 'yttx-order-manager',
                        'module': 'order'
                },
                '50': {
                        'id': 50,
                        'code': 'yttx-finance-manager',
                        'module': 'finance'
                },
                '70': {
                        'id': 70,
                        'code': 'yttx-device-manager',
                        'module': 'equipment'
                },
                '90': {
                        'id': 90,
                        'code': 'yttx-setting',
                        'module': 'setting'
                }
        },
        'menuMap': {
                '0': {
                        'id': 0,
                        'code': 'app',
                        'name': '首页',
                        'href': 'app',
                        'module': 'app'
                },
                '10': {
                        'id': 10,
                        'code': 'yttx-oragnization',
                        'name': '机构',
                        'href': 'struct',
                        'module': 'struct',
                        'sub': [
                                {
                                        'modClass': 'yttx-oragnization-operator',
                                        'modCode': 'yttx-oragnization-operator',
                                        'modId': 10,
                                        'modLink': 'yttx-oragnization-operator',
                                        'modName': '运营架构'
                                },
                                {
                                        'modClass': 'yttx-oragnization-role',
                                        'modCode': 'yttx-oragnization-role',
                                        'modId': 10,
                                        'modLink': 'yttx-oragnization-role',
                                        'modName': '角色'
                                }
                        ]
                },
                '30': {
                        'id': 30,
                        'code': 'yttx-order-manager',
                        'name': '订单管理',
                        'href': 'order',
                        'module': 'order'
                },
                '50': {
                        'id': 50,
                        'code': 'yttx-finance-manager',
                        'name': '财务管理',
                        'href': 'finance',
                        'module': 'finance',
                        'sub': [
                                {
                                        'modClass': 'yttx-clear-stats',
                                        'modCode': 'yttx-clear-stats',
                                        'modId': 50,
                                        'modLink': 'yttx-clear-stats',
                                        'modName': '清算统计'
                                },
                                {
                                        'modClass': 'yttx-profit-stats',
                                        'modCode': 'yttx-profit-stats',
                                        'modId': 50,
                                        'modLink': 'yttx-profit-stats',
                                        'modName': '分润统计'
                                }
                        ]
                },
                '70': {
                        'id': 70,
                        'code': 'yttx-device-manager',
                        'name': '设备管理',
                        'href': 'equipment',
                        'module': 'equipment'
                },
                '90': {
                        'id': 90,
                        'code': 'yttx-setting',
                        'name': '设置',
                        'href': 'setting',
                        'module': 'setting',
                        'sub': [
                                {
                                        'modClass': 'yttx-improve-info',
                                        'modCode': 'yttx-improve-info',
                                        'modId': 90,
                                        'modLink': 'yttx-improve-info',
                                        'modName': '完善信息'
                                },
                                {
                                        'modClass': 'yttx-pwd-update',
                                        'modCode': 'yttx-pwd-update',
                                        'modId': 90,
                                        'modLink': 'yttx-pwd-update',
                                        'modName': '更改密码'
                                },
                                {
                                        'modClass': 'yttx-setting-child',
                                        'modCode': 'yttx-setting-child',
                                        'modId': 90,
                                        'modLink': 'yttx-setting-child',
                                        'modName': '设置子管理'
                                },
                                {
                                        'modClass': 'yttx-setting-profit',
                                        'modCode': 'yttx-setting-profit',
                                        'modId': 90,
                                        'modLink': 'yttx-setting-profit',
                                        'modName': '分润设置'
                                }
                        ]
                }
        },
        'powerMap': {
                '0': {
                        'id': 0,
                        'code': 'app',
                        'name': '首页',
                        'href': 'app',
                        'module': 'app'
                },
                '10': {
                        'id': 10,
                        'code': 'yttx-oragnization',
                        'name': '机构',
                        'href': 'struct',
                        'module': 'struct',
                        'sub': [
                                {
                                        'modClass': 'yttx-oragnization-operator',
                                        'modCode': 'yttx-oragnization-operator',
                                        'modId': 10,
                                        'modLink': 'yttx-oragnization-operator',
                                        'modName': '运营架构'
                                },
                                {
                                        'modClass': 'yttx-oragnization-role',
                                        'modCode': 'yttx-oragnization-role',
                                        'modId': 10,
                                        'modLink': 'yttx-oragnization-role',
                                        'modName': '角色'
                                }
                        ]
                },
                '30': {
                        'id': 30,
                        'code': 'yttx-order-manager',
                        'name': '订单管理',
                        'href': 'order',
                        'module': 'order'
                },
                '50': {
                        'id': 50,
                        'code': 'yttx-finance-manager',
                        'name': '财务管理',
                        'href': 'finance',
                        'module': 'finance',
                        'sub': [
                                {
                                        'modClass': 'yttx-clear-stats',
                                        'modCode': 'yttx-clear-stats',
                                        'modId': 50,
                                        'modLink': 'yttx-clear-stats',
                                        'modName': '清算统计'
                                },
                                {
                                        'modClass': 'yttx-profit-stats',
                                        'modCode': 'yttx-profit-stats',
                                        'modId': 50,
                                        'modLink': 'yttx-profit-stats',
                                        'modName': '分润统计'
                                }
                        ]
                },
                '70': {
                        'id': 70,
                        'code': 'yttx-device-manager',
                        'name': '设备管理',
                        'href': 'equipment',
                        'module': 'equipment'
                },
                '90': {
                        'id': 90,
                        'code': 'yttx-setting',
                        'name': '设置',
                        'href': 'setting',
                        'module': 'setting',
                        'sub': [
                                {
                                        'modClass': 'yttx-improve-info',
                                        'modCode': 'yttx-improve-info',
                                        'modId': 90,
                                        'modLink': 'yttx-improve-info',
                                        'modName': '完善信息'
                                },
                                {
                                        'modClass': 'yttx-pwd-update',
                                        'modCode': 'yttx-pwd-update',
                                        'modId': 90,
                                        'modLink': 'yttx-pwd-update',
                                        'modName': '更改密码'
                                },
                                {
                                        'modClass': 'yttx-setting-child',
                                        'modCode': 'yttx-setting-child',
                                        'modId': 90,
                                        'modLink': 'yttx-setting-child',
                                        'modName': '设置子管理'
                                },
                                {
                                        'modClass': 'yttx-setting-profit',
                                        'modCode': 'yttx-setting-profit',
                                        'modId': 90,
                                        'modLink': 'yttx-setting-profit',
                                        'modName': '分润设置'
                                }
                        ]
                }
        },
        'loginMap': {
                'isLogin': true,
                'datetime': '2017-03-22|08:11:02',
                'reqdomain': 'http://10.0.5.226:8080',
                'username': 'admin',
                'param': {
                        'adminId': '1',
                        'token': 'a094fd1a-f8f9-4f0a-a496-b60e0c530fe7',
                        'organizationId': '2'
                }
        },
        'settingMap': {
        }
};
localStorage.setItem('qht_admin_unique_key', JSON.stringify(cacheobj));
