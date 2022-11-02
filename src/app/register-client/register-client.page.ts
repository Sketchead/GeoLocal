import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {
  credentials: FormGroup;
  client : Client;
  name:string;
  username:string;
  firstLastname:string;
  secondLastname:string;
  
  constructor(
    private clientService :ClientService,
    private auth:Auth, 
    private alertController: AlertController,
    private loadingController:LoadingController,
    private router:Router) { }
    
    ngOnInit() {
      
    }
    
    async addclient(){
      const loading = await this.loadingController.create();
      await loading.present();

      this.client={
       user:this.auth.currentUser.uid,
       email: this.auth.currentUser.email,
       name:this.name,
       username:this.username,
       firstLastname:this.firstLastname,
       secondLastname:this.secondLastname,
       type:"client"
      }
      await this.clientService.createClient(this.client)
      await loading.dismiss();
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
  