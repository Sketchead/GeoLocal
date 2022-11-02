import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';

import { UserTypePage } from './user-type.page';

const redirectLoggedInToHome = () => redirectLoggedInTo(['register'])

const routes: Routes = [
  {
    path: '',
    component: UserTypePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTypePageRoutingModule {}
