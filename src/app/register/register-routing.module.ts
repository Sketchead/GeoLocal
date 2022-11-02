import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './register.page';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])
const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    ...canActivate(redirectLoggedInToHome)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
