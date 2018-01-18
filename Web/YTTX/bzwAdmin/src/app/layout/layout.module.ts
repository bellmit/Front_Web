/*系统模块*/
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';

/*扩展组件*/
import {LayoutComponent} from './layout.component';
/*布局组件*/
import {LayoutRouterModule} from '../route/route.module';
/*路由组件*/

/*扩展*/
import {IndexComponent} from '../index/index.component';
import {F0FComponent} from '../route/f0f.component';
import {DemoSelfComponent} from '../demo/self/demoself.component';
import {DemoSelfThemeComponent} from "../demo/self/component/demoselftheme.component";
import {DemoSelfBtnComponent} from "../demo/self/component/demoselfbtn.component";


@NgModule({
  imports: [
    /*系统模块*/
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot({extraFontName: 'anticon', extraFontUrl: './assets/fonts/fonts/iconfont'}),
    /*扩展路由*/
    LayoutRouterModule
  ],
  declarations: [
    LayoutComponent,
    IndexComponent,
    F0FComponent,
    DemoSelfComponent,
    DemoSelfThemeComponent,
    DemoSelfBtnComponent
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule {
}
