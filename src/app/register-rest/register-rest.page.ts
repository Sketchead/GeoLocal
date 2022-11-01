import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-rest',
  templateUrl: './register-rest.page.html',
  styleUrls: ['./register-rest.page.scss'],
})
export class RegisterRestPage implements OnInit {
  credentials: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private router:Router,
    private alertController: AlertController,
    private loadingController:LoadingController) { }
    
    
    ngOnInit() {
      this.credentials = this.fb.group({
        })
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
