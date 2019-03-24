import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PrincipalService} from '../../shared/service/principal.service';
import {UserModel} from '../../shared/model/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    version: string;

    constructor(
        private principal: PrincipalService,
        private router: Router
    ) {
        this.version = environment.version;
    }

    ngOnInit() {
    }

    login() {
        // TODO: Implements login conditionals here
        // Issue: #30
        this.principal.setUser(new UserModel(1));
        this.router.navigate(['/']);
    }
}
