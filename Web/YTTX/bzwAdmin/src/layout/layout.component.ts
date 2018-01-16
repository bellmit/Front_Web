import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html',
  styleUrls: ['../assets/css/base.css','./layout.component.css']
})
export class LayoutComponent {
  /*当前收起状态*/
  isCollapsed = false;
}
