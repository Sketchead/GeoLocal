import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { LoginPage } from '../login/login.page';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/app/home']);
const redirectLoggedIntoSetup = () =>redirectLoggedInTo(['user-type']);

import { LandpagePage } from './landpage.page';
import { RegisterPage } from '../register/register.page';

const routes: Routes = [
  {
    path: '',
    component: LandpagePage,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    component: HomePage,
    //...canActivate(redirectLoggedIntoSetup)
  },
  {
    path: 'login',
    component: LoginPage,
    //...canActivate(redirectLoggedIntoSetup),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    component: RegisterPage,
    //...canActivate(redirectLoggedIntoSetup),
    ...canActivate(redirectLoggedInToHome)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandpagePageRoutingModule {}
