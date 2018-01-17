import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  /*当前收起状态*/
  isCollapsed = false;
  /*显示区背景切换*/
  contentBgTheme='default';
}
