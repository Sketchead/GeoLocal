import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { LoginPage } from '../login/login.page';
import { RegisterClientPage } from '../register-client/register-client.page';
import { RegisterRestPage } from '../register-rest/register-rest.page';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

import { LandpagePage } from './landpage.page';
import { RegisterPage } from '../register/register.page';

const routes: Routes = [
  {
    path: '',
    component: LandpagePage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'login',
    component: LoginPage,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    component: RegisterPage,
   // ...canActivate(redirectLoggedInToHome)
  }/*
  ,
  {
    path: 'register-client',
    component: RegisterClientPage,
    ...canActivate(redirectLoggedInToHome)
  }
  ,
  {
    path: 'register-res',
    component: RegisterRestPage,
    ...canActivate(redirectLoggedInToHome)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandpagePageRoutingModule {}
