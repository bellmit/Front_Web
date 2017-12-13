import {BaseConfig} from '../config/base.config';

/*引入jquery*/
declare var $: any;

/*局部变量*/
let base_config = BaseConfig.getBaseConfig(),
  system_unique_key = base_config.unique_key || '';

export class ToolUtil {

  /*返回系统唯一标识符*/
  static getSystemUniqueKey() {
    return system_unique_key;
  };

  /*判断是否盒模型*/
  static supportBox() {
    let elem = document.getElementsByTagName('body')[0],
      bs = window.getComputedStyle(elem, null).getPropertyValue("box-sizing") || document.defaultView.getComputedStyle(elem, null) || $(elem).css('boxSizing');
    return bs && bs === 'border-box';
  };

  /*判断是否支持JSON*/
  static supportJSON() {
    return JSON && JSON.stringify && typeof JSON.stringify === 'function';
  };

  /*判断是否支持本地存储*/
  static supportStorage() {
    return localStorage && sessionStorage;
  }

  /*判断是否支持图片*/
  static supportImage() {
    if (window.URL) {
      return window.URL.createObjectURL && typeof window.URL.createObjectURL === 'function';
    } else {
      return false;
    }
  }

  /*清除本地存储--清除当前标识数据*/
  static clear(flag) {
    if (flag) {
      sessionStorage.removeItem(system_unique_key);
    } else {
      localStorage.removeItem(system_unique_key);
    }
  }

  /*清除本地存储--清除所有数据*/
  static clearAll(flag){
    if (flag) {
      sessionStorage.clear();
    } else {
      localStorage.clear();
    }
  }

  /*递归查找缓存对象*/
  paramsItem(config, type, action) {
    let key = config.key,
      cache = config.cache,
      value = '';

    for (let i in cache) {
      if (type === 'set') {
        value = config.value;
        if (i === key) {
          cache[i] = value;
          return true;
        } else {
          if (typeof cache[i] === 'object') {
            this.paramsItem({
              key: key,
              value: value,
              cache: cache[i]
            }, type, null);
          }
        }
      } else if (type === 'get') {
        if (i === key) {
          return cache[i];
        } else {
          if (typeof cache[i] === 'object') {
            this.paramsItem({
              key: key,
              cache: cache[i]
            }, type, null);
          }
        }
      } else if (type === 'find') {
        if (i === key) {
          if (action === 'delete') {
            delete cache[i];
          } else if (action === 'other') {
            /*to do*/
          }
          return true;
        } else {
          if (typeof cache[i] === 'object') {
            this.paramsItem({
              key: key,
              cache: cache[i]
            }, type, null);
          }
        }
      }
    }
  }

  /*设置本地存储*/
  setParams(key, value, flag) {
    if (key === system_unique_key) {
      if (flag) {
        /*为localstorage*/
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        /*默认为localstorage*/
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      let cache = null;
      if (flag) {
        cache = JSON.parse(sessionStorage.getItem(system_unique_key));
      } else {
        cache = JSON.parse(localStorage.getItem(system_unique_key));
      }
      if (cache !== null) {
        if (typeof key !== 'undefined') {
          this.paramsItem({
            key: key,
            value: value,
            cache: cache
          }, 'set', null);
        }
      } else {
        cache = {};
        cache[key] = value;
      }
      if (flag) {
        /*为localstorage*/
        sessionStorage.setItem(system_unique_key, JSON.stringify(cache));
      } else {
        /*默认为localstorage*/
        localStorage.setItem(system_unique_key, JSON.stringify(cache));
      }
    }
  }

  /*获取本地存储*/
  getParams(key, flag) {
    if (key === system_unique_key) {
      if (flag) {
        return JSON.parse(sessionStorage.getItem(system_unique_key)) || null;
      } else {
        return JSON.parse(localStorage.getItem(system_unique_key)) || null;
      }
    } else {
      let cache = null;
      if (flag) {
        cache = sessionStorage.getItem(system_unique_key);
      } else {
        cache = localStorage.getItem(system_unique_key);
      }
      if (cache !== null) {
        if (typeof key !== 'undefined') {
          return this.paramsItem({
            key: key,
            cache: JSON.parse(cache)
          }, 'get', null);
        }
        return JSON.parse(cache);
      } else {
        return null;
      }
    }
  }

  /*删除本地存储*/
  removeParams(key, flag) {
    if (key === system_unique_key) {
      if (flag) {
        sessionStorage.removeItem(key);
      } else {
        localStorage.removeItem(key);
      }
    } else {
      let cache = null;
      if (flag) {
        cache = sessionStorage.getItem(system_unique_key);
      } else {
        cache = localStorage.getItem(system_unique_key);
      }
      if (cache !== null) {
        if (typeof key !== 'undefined') {
          this.paramsItem({
            key: key,
            cache: JSON.parse(cache)
          }, 'find', 'delete');
          if (flag) {
            /*为localstorage*/
            sessionStorage.setItem(system_unique_key, JSON.stringify(cache));
          } else {
            /*默认为localstorage*/
            localStorage.setItem(system_unique_key, JSON.stringify(cache));
          }
        }
      }
    }
  }





}
