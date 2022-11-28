import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Restaurant } from '../models/restaurant';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RestaurantService } from '../services/restaurant.service';
import { UbicationrPage } from '../ubicationr/ubicationr.page';


@Component({
  selector: 'app-register-rest',
  templateUrl: './register-rest.page.html',
  styleUrls: ['./register-rest.page.scss'],
})
export class RegisterRestPage implements OnInit {
  credentials: FormGroup;
  rest : Restaurant;
  name:string;
  resname:string;
  la:string;
  lo:string;
  
  constructor(
    private restaurantService:RestaurantService,
    private auth:Auth, 
    private alertController: AlertController,
    private loadingController:LoadingController,
    private router:Router) { }
    
    ngOnInit() {
      
    }
    
    async addres(){
      const loading = await this.loadingController.create();
      await loading.present();
      const gauth = getAuth();


          this.rest={
            user:this.auth.currentUser.uid,
            email: this.auth.currentUser.email,
            name:this.name, 
            username:this.resname,
            latitude:this.restaurantService.latitude,
            longitude:this.restaurantService.longitude,
            type:"restaurant" 
           }
         
      
      
        await this.restaurantService.createRes(this.rest)
        await loading.dismiss();
        this.router.navigateByUrl('/app/home',{replaceUrl:true});     
    }
    async showAlert(header,message) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons:['OK'],
      });
      await alert.present();
    }

    ubicacion(){
      this.router.navigateByUrl('ubicationr',{replaceUrl:true});
      this.restaurantService.uso = 2;
    }

}
 