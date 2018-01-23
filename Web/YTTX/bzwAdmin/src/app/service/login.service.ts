import {BASE_CONFIG} from '../config/base.config';
import {ToolUtil} from '../tool/tool.util';
import { Injectable } from '@angular/core';


/*注入类型*/
@Injectable()
export class LoginService {
  private cache=ToolUtil.getParams(BASE_CONFIG.unique_key);


  /*处理登陆请求,model:为模型数据*/



  /*是否登录*/
  isLogin(cache) {
    let logininfo = false,
      islogin = false,
      flag = cache && typeof cache !== 'undefined';

    if (flag) {
      logininfo = ToolUtil.isLogin(cache,);
    } else {
      logininfo = ToolUtil.isLogin(cache);
    }

    if (logininfo) {
      if (flag && cache.loginMap) {
        islogin = ToolUtil.validLogin(cache.loginMap);
      } else {
        islogin = ToolUtil.validLogin(cache.loginMap);
      }
      /*如果缓存失效则清除缓存*/
      if (!islogin) {
        this.clearCache();
        ToolUtil.clear();
      }
      return islogin;
    }
    return islogin;
  }

  /*清除内部私有缓存*/
  clearCache() {
    this.cache = null;
  }

}
