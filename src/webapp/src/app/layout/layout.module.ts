import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultModule} from './default/default.module';
import {MenuComponent} from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DefaultModule
  ],
  exports: [
    MenuComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
