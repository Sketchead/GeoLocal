import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosClientePage } from './datos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: DatosClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosClientePageRoutingModule {}
