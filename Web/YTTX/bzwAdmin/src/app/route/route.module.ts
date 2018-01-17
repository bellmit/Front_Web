import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';


import { IndexComponent }  from '../index/index.component';
import { DemoComponent }  from '../demo/demo.component';
import { F0FComponent }  from './f0f.component';



const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'demo', component: DemoComponent },
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: F0FComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRouterModule {}
