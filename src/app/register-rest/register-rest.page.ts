import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

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
  
  
  constructor(
    private restaurantService:RestaurantService,
    private auth:Auth, 
    private alertController: AlertController,
    private router:Router) { }
    
    ngOnInit() {
      
    }
    
    addres(){
      this.rest={
       user:this.auth.currentUser.uid,
       email: this.auth.currentUser.email,
       name:this.name,
       resname:this.resname,
       latitude:"21.5039",
       longitude:" -104.895",
       type:"restaurant"
      }
        this.restaurantService.createRes(this.rest)
        this.router.navigateByUrl('/home',{replaceUrl:true});     
    }
    async showAlert(header,message) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons:['OK'],
      });
      await alert.present();
    }
}
