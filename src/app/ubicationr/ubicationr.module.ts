import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicationrPageRoutingModule } from './ubicationr-routing.module';

import { UbicationrPage } from './ubicationr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicationrPageRoutingModule
  ],
  declarations: [UbicationrPage]
})
export class UbicationrPageModule {}
