/*系统模块*/
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

/*扩展组件*/
import { LayoutComponent } from './layout.component';/*布局组件*/
import { LayoutRouterModule } from '../route/route.module';/*路由组件*/

/*扩展*/
import { DemoComponent } from '../demo/demo.component';



@NgModule({
  imports: [
    /*系统模块*/
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/fonts/iconfont' }),
    /*扩展路由*/
    LayoutRouterModule
  ],
  declarations: [
    LayoutComponent,
    DemoComponent
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
