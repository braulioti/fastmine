import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {NavbarComponent} from './navbar/navbar.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
