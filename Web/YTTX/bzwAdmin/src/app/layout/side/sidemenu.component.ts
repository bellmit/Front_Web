import {Component,OnInit} from '@angular/core';
import {SideMenuService} from './sidemenu.service'

@Component({
  selector: 'admin-side-menu',
  templateUrl: './sidemenu.component.html'
})
export class SideMenuComponent /*implements OnInit*/{
  menuitem=[];


  /*构造函数*/
  constructor(private sidemenuservice: SideMenuService){

  }



  /*
  伪代码
  获取缓存，判断是否登录；
  如果登录则加载菜单；
  * */

  /*加载菜单缓存*/
  loadSideMenu(){}

  /**/

}
