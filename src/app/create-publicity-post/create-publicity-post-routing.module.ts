import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePublicityPostPage } from './create-publicity-post.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePublicityPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePublicityPostPageRoutingModule {}
