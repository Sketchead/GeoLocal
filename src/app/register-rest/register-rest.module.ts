import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterRestPageRoutingModule } from './register-rest-routing.module';

import { RegisterRestPage } from './register-rest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterRestPageRoutingModule
  ],
  declarations: [RegisterRestPage]
})
export class RegisterRestPageModule {}
