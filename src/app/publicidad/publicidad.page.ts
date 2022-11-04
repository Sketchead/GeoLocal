import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {

  constructor( 
    private router:Router,
    private loadingController:LoadingController,
    private restaurantService:RestaurantService
    ) { }

  async addres(){
    const loading = await this.loadingController.create();
    await loading.present();

      await loading.dismiss();
      this.router.navigateByUrl('/app/home',{replaceUrl:true});     
  }

  ngOnInit() {
  }

}
