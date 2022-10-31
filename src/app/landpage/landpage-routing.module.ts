import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { LoginPage } from '../login/login.page';
import { RegisterClientPage } from '../register-client/register-client.page';
import { RegisterRestPage } from '../register-rest/register-rest.page';

import { LandpagePage } from './landpage.page';

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
    component: LoginPage
  }
  ,
  {
    path: 'register-client',
    component: RegisterClientPage
  }
  ,
  {
    path: 'register-res',
    component: RegisterRestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandpagePageRoutingModule {}
