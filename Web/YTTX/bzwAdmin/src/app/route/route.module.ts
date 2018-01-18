import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {IndexComponent} from '../index/index.component';
import {DemoSelfComponent} from '../demo/self/demoself.component';
import {DemoSelfThemeComponent} from "../demo/self/component/demoselftheme.component";
import {DemoSelfBtnComponent} from "../demo/self/component/demoselfbtn.component";
import {F0FComponent} from './f0f.component';



const appRoutes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'demo-self',
    component: DemoSelfComponent,
    children:[{
      path:'',
      component: DemoSelfThemeComponent
    },{
      path:'demo-self-btn',
      component: DemoSelfBtnComponent
    }]
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'/*outlet:'container' */
  },
  {
    path: '**',
    component: F0FComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRouterModule {
}
