export class MenuItemModel {
    constructor(
        public description?: string,
        public menuType?: MenuType,
        public link?: string,
        public active?: boolean,
        public icon?: string,
        public subItems?: MenuItemModel[]
    ) {
        this.subItems = [];
    }
}

export enum MenuType {
    DIVIDER = 1,
    MENU_ITEM = 2
}
