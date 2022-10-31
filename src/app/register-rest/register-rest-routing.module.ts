import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterRestPage } from './register-rest.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterRestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRestPageRoutingModule {}
