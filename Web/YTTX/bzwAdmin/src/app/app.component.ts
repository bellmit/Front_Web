/*引入依赖*/
import {Component} from '@angular/core';
import {UploadViewService} from './component/upload/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


/*导出组件类*/
export class AppComponent {
  showview = false;


  toggleView() {
    this.showview = !this.showview;
    console.log(this.showview);
  }
}
