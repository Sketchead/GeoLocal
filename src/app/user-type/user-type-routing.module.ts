import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTypePage } from './user-type.page';

const routes: Routes = [
  {
    path: '',
    component: UserTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTypePageRoutingModule {}
