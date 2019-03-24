import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('index link to title menu item is not null after created', () => {
        expect(component.indexLink).not.toBe(null);
    });

    it('index link to title menu item is not undefinded after created', () => {
        expect(component.indexLink).not.toBe(undefined);
    });

    it('user menu is empty', () => {
        const isEmpty = (!(component.userMenuName) && !(component.userName) && (component.userMenu.length === 0));

        expect(isEmpty).toEqual(true);
    });

    it('main menu started empty', () => {
        expect(component.mainMenu.length).toBe(0);
    });

    it('logoElement is empty', () => {
        const isEmpty = (!(component.logoElement) && !(component.logoElement) && (component.userMenu.length === 0));

        expect(isEmpty).toBe(true);
    });
});
