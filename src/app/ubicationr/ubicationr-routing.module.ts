import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicationrPage } from './ubicationr.page';

const routes: Routes = [
  {
    path: '',
    component: UbicationrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicationrPageRoutingModule {}
