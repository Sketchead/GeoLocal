import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosClientePageRoutingModule } from './datos-cliente-routing.module';

import { DatosClientePage } from './datos-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosClientePageRoutingModule
  ],
  declarations: [DatosClientePage]
})
export class DatosClientePageModule {}
