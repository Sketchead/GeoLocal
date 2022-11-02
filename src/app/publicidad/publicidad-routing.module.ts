import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicidadPage } from './publicidad.page';

const routes: Routes = [
  {
    path: '',
    component: PublicidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicidadPageRoutingModule {}
