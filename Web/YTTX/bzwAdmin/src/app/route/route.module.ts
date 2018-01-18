import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {IndexComponent} from '../index/index.component';
import {DemoSelfComponent} from '../demo/self/demoself.component';
import {DemoSelfThemeComponent} from "../demo/self/component/demoselftheme.component";
import {F0FComponent} from './f0f.component';



const appRoutes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'demo-self', component: DemoSelfComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'/*outlet:'container' */},
  {path: '**', component: F0FComponent}
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
