import {BaseConfig} from '../config/base.config';

/*引入jquery*/
declare var $: any;

/*局部变量*/
let base_config = BaseConfig.getBaseConfig(),
  system_unique_key = base_config.unique_key || '';

export class ToolUtil {
  /*constructor(){
    this.supportStorage();
  }*/

  /*返回系统唯一标识符*/
  getSystemUniqueKey() {
    return system_unique_key;
  };

  /*判断是否支持本地存储*/
  supportBox() {
    let elem = document.getElementsByTagName('body')[0],
      bs = window.getComputedStyle(elem, null).getPropertyValue("box-sizing") || document.defaultView.getComputedStyle(elem, null) || $(elem).css('boxSizing');
    return bs && bs === 'border-box';
  };

  supportStorage() {
    return (localStorage && sessionStorage) ? true : false;
  }
}
