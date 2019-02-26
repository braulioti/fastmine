import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {LayoutModule} from '../layout/layout.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    IndexComponent
  ]
})
export class PagesModule { }
