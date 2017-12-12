/*引入依赖*/
import {Component} from '@angular/core';
/*import * as Mock from './assets/js/mock.min.js';*/

/*使用第三方类库*/
declare var Mock:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


/*导出组件类*/
export class AppComponent {
  testTheme='祝你一路顺风';
  changeTheme(){
    this.testTheme=Mock.Random.title();
  }
}
