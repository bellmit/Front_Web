/*引入依赖*/
import { Component,Input } from '@angular/core';


@Component({
  selector: 'demo-test-theme',
  templateUrl: './test-theme.html'
})


/*导出组件类*/
export class DemoTestThemeComponent {
  @Input() testTheme='';
}
