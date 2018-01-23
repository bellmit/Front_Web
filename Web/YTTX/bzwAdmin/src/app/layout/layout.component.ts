import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  isCollapsed = false;/*当前收起状态*/
  contentBgTheme='default';/*显示区背景切换*/
  contentBgList=['default','dot','whitecross','filter','block','blackcross','blackgrid','vline'];
}
