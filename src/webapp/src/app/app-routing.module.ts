import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {LoginComponent} from './pages/login/login.component';
import {UserRouteAccessService} from './shared/auth/user-route-access-service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
