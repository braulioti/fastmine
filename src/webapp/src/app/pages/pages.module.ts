import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {LayoutModule} from '../layout/layout.module';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    IndexComponent,
    LoginComponent
  ]
})
export class PagesModule { }
