import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private router:Router,
    private alertController: AlertController,
    private authService:AuthService,
    private loadingController:LoadingController,
    ) { }
    
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
      //------------------------EMAIL&&PASSWORD----------------------
      async register(){
        const loading = await this.loadingController.create();
        await loading.present();
        
        const petition = new Promise((resolve,reject)=>{
          const user = this.authService.register(this.credentials.value);
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
          this.showAlert('Fallo el ingreso','No se pudo ingresar')
        })
      }
      //------------------------GOOGLE----------------------
      async googleRegister(){
        const loading = await this.loadingController.create();
        await loading.present();

        const petition = new Promise((resolve,reject)=>{
          const user = this.authService.googleregister()
          console.log(user)
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
          this.showAlert('Fallo registro',message)
        })
        
      }
      //------------------------FACEBOOK----------------------
      async facebookRegister(){
        const loading = await this.loadingController.create();
        await loading.present();

        const petition = new Promise((resolve,reject)=>{
          const user = this.authService.facebookregister()
          console.log(user)
          if(user){
            resolve('exito')
          }else{
            reject('fallo')
          }
        });

        await loading.dismiss();

        petition.then((message)=>{ 
        }).catch((message)=>{
          this.showAlert('Fallo registro',message)
        })
        await this.router.navigateByUrl('/app/home',{replaceUrl:true});
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
 