import {Component, Input, OnInit} from '@angular/core';
import {MenuItemModel, MenuType} from './menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() title: string;
  @Input() userName: string = null;
  @Input() userMenuName: string = null;
  @Input() userMenu: MenuItemModel[] = [];
  @Input() indexLink: string = '';
  @Input() mainMenu: MenuItemModel[] = [];
  @Input() logoElement: string = null;

  MenuType = MenuType;
}
