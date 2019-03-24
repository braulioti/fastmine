import {TestBed} from '@angular/core/testing';

import {PrincipalService} from './principal.service';
import {UserModel} from '../model/user.model';
import {StorageServiceModule} from 'angular-webstorage-service';

describe('PrincipalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StorageServiceModule
    ],
    providers: [
      PrincipalService
    ]
  }));

  const user = new UserModel(1, 'test', null, 'First Name');

  it('should be created', () => {
    const service: PrincipalService = TestBed.get(PrincipalService);
    expect(service).toBeTruthy();
  });

  it('test user into storage', () => {
    const service: PrincipalService = TestBed.get(PrincipalService);

    service.setUser(user);

    const userInStorage = user.id === service.storage.get('user');

    expect(userInStorage).toBe(true);
  });

  it('token produces authorization in header', () => {
    const service: PrincipalService = TestBed.get(PrincipalService);

    service.setToken('test');

    const existsAuthorizationInHeader = service.getHeader().get('Authorization') === 'Bearer test';

    expect(existsAuthorizationInHeader).toBe(true);
  });
});
