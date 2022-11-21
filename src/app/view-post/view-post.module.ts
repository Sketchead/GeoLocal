import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPostPageRoutingModule } from './view-post-routing.module';

import { ViewPostPage } from './view-post.page';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPostPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ViewPostPage]
})
export class ViewPostPageModule {}
