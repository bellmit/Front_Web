import {ToolUtil} from '../tool/tool.util';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  /*布局模型*/
  layout = {
    isCollapsed: false/*当前收起状态*/,
    contentBgTheme: ToolUtil.getParams('setting-bg') || 'default'/*显示区背景切换*/,
    contentBgList: [{
      name: '默认',
      value: 'defalut'
    }, {
      name: '小星',
      value: 'dot'
    }, {
      name: '斜线',
      value: 'whitecross'
    }, {
      name: '滤镜',
      value: 'filter'
    }, {
      name: '块状',
      value: 'block'
    }]/*显示区背景列表*/,
    support: ToolUtil.supportBox() && ToolUtil.supportJSON() && ToolUtil.supportStorage() && ToolUtil.supportImage()/*是否兼容*/
  };

  /*用户模型*/
  user = {
    info: [{
      name: '用户名',
      value: 'zhangsan'
    }, {
      name: '登录时间',
      value: (() => {
        let d = new Date();
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
      })()
    }]
  };

  /*构造函数*/
  constructor() {

  }


  /*切换背景*/
  toggleBgTheme(bgtheme) {
    this.layout.contentBgTheme = bgtheme.value;
    ToolUtil.setParams('setting-bg', bgtheme.value);
  }


}
