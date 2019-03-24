import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {LayoutModule} from '../../layout/layout.module';
import {PrincipalService} from '../../shared/service/principal.service';
import {StorageServiceModule} from 'angular-webstorage-service';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                LayoutModule,
                RouterTestingModule,
                StorageServiceModule
            ],
            providers: [PrincipalService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
