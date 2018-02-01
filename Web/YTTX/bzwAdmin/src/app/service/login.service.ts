import {BASE_CONFIG} from '../config/base.config';
import {ToolService} from './tool.service';
import {TestService} from './test.service';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/*declare var moment: any;*/


/*注入类型*/
@Injectable()
export class LoginService {
    private cache = ToolService.getCache();
    private modulekey = 'login';
    private bgTheme = 'default';

    constructor(private test: TestService, private http: HttpClient) {
    }

    /*
    缓存模板
    cache = {
      cacheMap: {
        menuload: false,
        powerload: false,
        menusoruce: false
      }/!*缓存加载情况记录*!/,
      routeMap: {
        prev: '',
        current: '',
        history: []
      }/!*路由缓存*!/,
      moduleMap: {}/!*模块缓存*!/,
      menuMap: {}/!*菜单缓存*!/,
      powerMap: {}/!*权限缓存*!/,
      loginMap: {
        'isLogin': true,
        'datetime':'',
        'reqdomain': '',
        'username': '',
        'param': {
          'adminId': '',
          'token': '',
          'organizationId': ''
        }
      }/!*登录认证缓存*!/,
      settingMap: {}/!*设置缓存*!/,
      menuSourceMap: {}/!*解析后的菜单源码缓存，用于菜单加载时直接应用，而不需要解析*!/,
      tempMap: {}/!*临时缓存*!/
    };*/


    /*是否登录*/
    isLogin(cache) {
        let logininfo = false,
            islogin = false,
            flag = cache && typeof cache !== 'undefined';

        if (flag) {
            logininfo = ToolService.isLogin(cache);
        } else {
            logininfo = ToolService.isLogin(this.cache);
        }

        if (logininfo) {
            if (flag && cache.loginMap) {
                islogin = ToolService.validLogin(cache.loginMap);
            } else {
                islogin = ToolService.validLogin(cache.loginMap);
            }
            /*如果缓存失效则清除缓存*/
            if (!islogin) {
                this.clearCache();
                ToolService.clear();
            }
            return islogin;
        }
        return islogin;
    }

    /*清除缓存*/
    clearCache() {
        this.cache = null;
    }


    /*获取缓存*/
    getCache() {
        this.cache = ToolService.getCache();
        return this.cache;
    }

    /*更新缓存*/
    setCache(value, key) {
        /*没有索引不操作*/
        if (!key) {
            return false;
        }
        /*判断缓存索引是否正确*/
        if (!BASE_CONFIG.cache_list.includes(key)) {
            return false;
        }
        /*设置缓存*/
        if (value !== null) {
            this.cache[`${key}Map`] = value;
            this.cache[`${BASE_CONFIG.cache_list[0]}Map`][key] = true;
        } else {
            this.cache[`${BASE_CONFIG.cache_list[0]}Map`][key] = false;
        }
        ToolService.setCache(this.cache);
    }


    /*顶部导航获取登录信息*/
    getLoginInfo(flag) {
        let list = [{
            name: '用户名',
            value: 'zhangsan'
        }, {
            name: '登录时间',
            value: '2018-01-29'/*moment().format('YYYY-MM-DD|HH:mm:ss')*/
        }, {
            name: '',
            value: '退出'
        }];
        return flag ? list : [];
    }

    /*登录面板获取背景*/
    getBgTheme() {
        let bg = Math.floor(Math.random() * (BASE_CONFIG.contentBgList.length - 1));
        if (isNaN(bg)) {
            return this.bgTheme;
        }
        return BASE_CONFIG.contentBgList[bg].value;
    }

    /*ToolService.adaptReqUrl({
        debug: debug,
        url: '/sysuser/login',
      })*/
    /*{
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data:config.value
    }*/
    /*if (debug) {
              data = this.test.testToken('list');
            }*/

    /*请求登录*/
    loginSubmit(config) {
        let param = config.form.value,
            debug = config.debug;
        this.http.get('assets/json/test.json').subscribe(data => {
            console.log('ok');
        }, error => {
            console.log('error');
        });
    }

}
