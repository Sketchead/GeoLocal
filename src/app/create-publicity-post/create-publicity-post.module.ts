import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePublicityPostPageRoutingModule } from './create-publicity-post-routing.module';

import { CreatePublicityPostPage } from './create-publicity-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePublicityPostPageRoutingModule
  ],
  declarations: [CreatePublicityPostPage]
})
export class CreatePublicityPostPageModule {}
