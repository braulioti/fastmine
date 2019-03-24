import {Inject, Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {UserModel} from '../model/user.model';

@Injectable()
export class PrincipalService {
    private user: UserModel;
    private token: string;
    private authenticated: boolean;

    constructor(
        @Inject(LOCAL_STORAGE) public storage: WebStorageService
    ) {
        this.token = this.storage.get('token');
        this.user = null;
    }

    setUser(user: UserModel) {
        this.user = user;
        if (this.user) {
            this.storage.set('user', this.user.id);
        } else {
            this.storage.set('user', null);
        }
    }

    getUser(): UserModel {
        if (!this.user) {
            const userId = this.storage.get('user');

            if (userId) {
                this.user = new UserModel(userId);
            }
        }
        return this.user;
    }

    identity(force?: boolean): Promise<any> {
        const user = this.getUser();

        if (user) {
            this.authenticated = !!this.user.id;
        } else {
            this.authenticated = false;
        }

        return new Promise<any>((resolve, reject) => {
            if (this.authenticated) {
                resolve(user);
            } else {
                resolve(null);
            }
        });
    }

    setToken(value: string) {
        this.token = value;
        this.storage.set('token', this.token);
    }

    getHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        });
    }
}
