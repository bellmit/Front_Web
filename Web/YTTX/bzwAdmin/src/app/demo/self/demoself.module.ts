import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';


const demoRoutes: Routes = [
  { path: 'demo-self-theme'}
];


@NgModule({
  imports: [
    RouterModule.forChild(
      demoRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class DemoSelfModule { }
