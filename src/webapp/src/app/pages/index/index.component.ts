import {Component, OnInit} from '@angular/core';
import {MenuItemModel, MenuType} from '../../layout/menu/menu-item.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  title: string = 'RedTrench';

  userMenuName: string = 'Configuration';
  userName: string = 'Bráulio Figueiredo';

  personalMenu: MenuItemModel[];
  mainMenu: MenuItemModel[];

  constructor() {
    this.buildPersonMenu();
    this.buildMainMenu();
  }

  buildPersonMenu() {
    this.personalMenu = [];

    this.personalMenu.push(
        new MenuItemModel(
            'Item 1',
            MenuType.MENU_ITEM,
            'https://teste.com.br'
        )
    );

    this.personalMenu.push(
        new MenuItemModel(
            null,
            MenuType.DIVIDER
        )
    );

    this.personalMenu.push(
        new MenuItemModel(
            'Item 2',
            MenuType.MENU_ITEM,
            'https://google.com.br'
        )
    );
  }

  buildMainMenu() {
    this.mainMenu = [];

    this.mainMenu.push(
        new MenuItemModel(
            'Main Menu - Item 1',
            MenuType.MENU_ITEM,
            '',
            false,
            'fa-car'
        )
    );

    this.mainMenu.push(
        new MenuItemModel(
            'Main Menu - Item 2',
            MenuType.MENU_ITEM,
            '',
            true,
            'fa-book'
        )
    );

    const item3 =
      new MenuItemModel(
        'Main Menu - Item 3',
        MenuType.MENU_ITEM,
        '',
        false,
        'fa-bar-chart'
      );

    let subItems: MenuItemModel[];

    subItems = [];
    subItems.push(new MenuItemModel('Submenu - Item 1', MenuType.MENU_ITEM, 'https://google.com.br'));
    subItems.push(new MenuItemModel('Submenu - Item 2', MenuType.MENU_ITEM, 'https://google.com.br'));

    item3.subItems = subItems;

    this.mainMenu.push(item3);
  }

  ngOnInit() {
  }

}
