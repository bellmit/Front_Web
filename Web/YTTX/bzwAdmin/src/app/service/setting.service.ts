import {BASE_CONFIG} from '../config/base.config';
import {ToolService} from './tool.service';

import {Injectable} from '@angular/core';


/*注入类型*/
@Injectable()
export class SettingService {
  private modulekey = 'setting';
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



  /*获取背景设置*/
  getBgTheme(){


  }
}
