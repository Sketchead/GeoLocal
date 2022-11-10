import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosRestaurantPage } from './datos-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: DatosRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosRestaurantPageRoutingModule {}
