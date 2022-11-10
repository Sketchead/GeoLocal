import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosRestaurantPageRoutingModule } from './datos-restaurant-routing.module';

import { DatosRestaurantPage } from './datos-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosRestaurantPageRoutingModule
  ],
  declarations: [DatosRestaurantPage]
})
export class DatosRestaurantPageModule {}
