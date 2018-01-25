import {ToolService} from '../service/tool.service';
import {Component} from '@angular/core';

import {LoginService} from "../service/login.service";
import {SettingService} from "../service/setting.service";

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  /*布局模型*/
  layout = {
    isCollapsed: false/*当前收起状态*/,
    contentBgTheme: ToolService.getParams('contentBgTheme') || 'default'/*显示区背景切换*/,
    contentBgList: [{
      name: '默认',
      value: 'default'
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
    support: ToolService.supportBox() && ToolService.supportJSON() && ToolService.supportStorage() && ToolService.supportImage()/*是否兼容*/
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
  constructor(private loginservice: LoginService, private settingservice: SettingService) {
    //this.loginservice.setCache({},'setting');
  }


  /*切换背景*/
  toggleBgTheme(bgtheme) {
    ToolService.getParams('contentBgTheme');
    //console.log(ToolService.getParams('contentBgTheme'));
    /*this.layout.contentBgTheme = bgtheme.value;

    this.loginservice.setCache({
      'contentBgTheme': bgtheme.value
    },'setting');*/
  }


}
