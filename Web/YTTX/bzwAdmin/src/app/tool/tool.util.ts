import {BaseConfig as bcof} from '../config/base.config';

let base_config = bcof.getBaseConfig(),
  system_unique_key = base_config.unique_key || '',
  tools = {
    /*返回系统唯一标识符*/
    getSystemUniqueKey() {
      return system_unique_key;
    },
    /*判断是否支持本地存储*/
    supportBox() {
      let elem = document.getElementsByTagName('body')[0],
        bs = window.getComputedStyle(elem, null).getPropertyValue("box-sizing") || document.defaultView.getComputedStyle(elem, null) || $(elem).css('boxSizing');
      return bs && bs === 'border-box';
    },
  };

export class ToolUtil {

}
