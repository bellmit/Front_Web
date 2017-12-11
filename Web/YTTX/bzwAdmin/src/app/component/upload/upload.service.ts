/*引入依赖*/
import {Injectable} from '@angular/core';

@Injectable()


/*导出图片预览类*/
export class UploadViewService {
  /*初始化隐藏预览*/
  /*constructor(showview: false) {
    this['showview'] = showview;
  }*/
  /*切换显示预览*/
  toggleView() {
    this['showview'] = !this['showview'];
    return this['showview'];
  }
  /*删除预览文件*/
  deleteView(){
    /*to do*/
  }
}
