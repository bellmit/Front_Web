import {BASE_CONFIG} from '../config/base.config';
import {ToolService} from './tool.service';

import {Injectable} from '@angular/core';


/*注入类型*/
@Injectable()
export class LoginService {
  private cache = ToolService.getParams(BASE_CONFIG.unique_key);
  private modulekey = 'login';

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

  /*创建缓存*/
  createCache() {
    /*不存在缓存则创建缓存*/
    let tempcache = {};
    BASE_CONFIG.cache_list.forEach((c, i, a) => tempcache[c] = false);
    this.cache = {
      cacheMap: tempcache/*缓存加载情况记录*/,
      routeMap: {
        prev: '',
        current: '',
        size: 0,
        history: []
      }/*路由缓存*/,
      moduleMap: {}/*模块缓存*/,
      menuMap: {}/*菜单缓存*/,
      powerMap: {}/*权限缓存*/,
      loginMap: {}/*登录认证缓存*/,
      settingMap: {}/*设置缓存*/,
      menusourceMap: {}/*解析后的菜单源码缓存，用于菜单加载时直接应用，而不需要解析*/,
      tempMap: {}/*临时缓存*/
    };
  }


  /*获取缓存*/
  getCache() {
    this.cache = ToolService.getParams(BASE_CONFIG.unique_key);
    return this.cache;
  }

  /*更新缓存*/
  setCache(object,key) {
    /*没有索引不操作*/
    if (!key) {
      return false;
    }
    /*没有缓存则创建缓存*/
    if (!this.cache) {
      this.createCache();
      ToolService.setParams(BASE_CONFIG.unique_key,this.cache);
    }
    /*判断缓存索引是否正确*/
    if(!BASE_CONFIG.cache_list.includes(key)){
      return false;
    }
    /*设置缓存*/
    if (object!==null) {
      this.cache[`${key}Map`] = object;
      this.cache[`${BASE_CONFIG.cache_list[0]}Map`][key] = true;
    } else {
      this.cache[`${BASE_CONFIG.cache_list[0]}Map`][key] = false;
    }
    ToolService.setParams(BASE_CONFIG.unique_key, this.cache);
  }
}
