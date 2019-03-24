import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PageBoxComponent} from './page-box/page-box.component';
import {SharedModule} from '../shared/module/shared.module';

@NgModule({
    declarations: [
        MenuComponent,
        NavbarComponent,
        PageBoxComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        MenuComponent,
        NavbarComponent,
        PageBoxComponent
    ]
})
export class LayoutModule {
}
