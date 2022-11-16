import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router:Router,
    private alertController: AlertController,
    private authService:AuthService,
    private loadingController:LoadingController,) { } 

  get email(){
    return this.credentials.get('email');
  }
  
  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() { 
    this.credentials = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]})
  }

  async login(){
    const loading = await this.loadingController.create();
        await loading.present();
        
        const petition = new Promise((resolve,reject)=>{
          const user = this.authService.login(this.credentials.value);
          if(user){
            resolve('exito')
          }else{
            reject('fallo')
          }
        });
        
        await loading.dismiss();
        
        petition.then((message)=>{ 
          this.router.navigateByUrl('/app/home',{replaceUrl:true});
        }).catch((message)=>{
          this.showAlert('Error',message)
        })
  }

  //------------------------GOOGLE----------------------
  async googleLogin(){
    
  }
  //------------------------FACEBOOK----------------------
  async facebookLogin(){

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
