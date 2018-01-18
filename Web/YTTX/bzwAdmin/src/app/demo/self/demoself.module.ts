import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
/*import {DemoSelfComponent} from './demoself.component';
import {DemoSelfThemeComponent} from "./component/demoselftheme.component";*/


/*const demoRoutes: Routes = [
  {
    path: './demo-self-theme',
    component: DemoSelfThemeComponent
  }
];*/


@NgModule({
  imports: [
    /*RouterModule.forChild(demoRoutes)*/
  ],
  exports: [
    RouterModule
  ]
})
export class DemoSelfModule {
}
