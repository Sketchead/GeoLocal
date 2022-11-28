import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Post } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { CameraSource,CameraResultType,Camera,Photo } from '@capacitor/camera'
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.page.html',
  styleUrls: ['./datos-cliente.page.scss'],
})
export class DatosClientePage implements OnInit {
  
  credentials: FormGroup;
  userLogged? = null;
  userType  = null;
  rest : Restaurant;
  client : Client;
  name:string
  //client
  username:string
  firstLastname:string
  secondLastname:string
  //res
  resname:string;
  
  constructor(
    private dataservice: DataService, 
    private router: Router, private loadingController: LoadingController,
    private auth:Auth,
    private a:AuthService,
    private alertController: AlertController,
    private firestore: Firestore,
    private clientService :ClientService,
    private restaurantService :RestaurantService
    ) {
      const gauth = getAuth();
      onAuthStateChanged(gauth, async (user) => {
        if (user) {
          this.userLogged = this.auth.currentUser.uid;
          const docRef = doc(this.firestore,`users/${this.auth.currentUser.uid}`)
          await getDoc(docRef).then(async (doc)=>{
            this.userType = await doc.data().client.type
            console.log(this.userType)
            if(this.userType=="client"){
              this.name = await doc.data().client.name
              this.username = await doc.data().client.username
              this.firstLastname = await doc.data().client.firstLastname
              this.secondLastname = await doc.data().client.secondLastname
            }else if(this.userType=="restaurant"){
              this.name = await doc.data().client.name
              this.resname = await doc.data().client.username
            }
          });
        } 
      });
    }
     
    ngOnInit() {
    }
    
    async editClient(flag){
      if(flag){
        const loading = await this.loadingController.create();
        await loading.present();
        if(this.userType=="client"){
          this.client={
            user:this.auth.currentUser.uid,
            email: this.auth.currentUser.email,
            name:this.name,
            username:this.username,
            firstLastname:this.firstLastname,
            secondLastname:this.secondLastname, 
            type:"client"
          }
          await this.clientService.editClient(this.client) 
        }else{
          
          this.rest={
            user:this.auth.currentUser.uid,
            email: this.auth.currentUser.email,
            name:this.name, 
            username:this.resname,
            latitude:"21.5039",
            longitude:" -104.895",
            type:"restaurant" 
          }
          await this.restaurantService.editRes(this.rest)
        }
        await loading.dismiss();
        this.Done("Editado exitoso","Tu perfil se ha modificado con exito")
        await this.router.navigateByUrl('/app/profile',{replaceUrl:true}); 
      }
    }
    
    type(){
      let type = ""
      type = this.userType
      return type
    }
    
    back(){
      this.router.navigateByUrl('/app/profile',{replaceUrl:true}); 
    }
    
    
    async updateConfirmation() {
      const alert = await this.alertController.create({
        header: '¿Estas seguro?',
        message: "Este cambio sera visible para los demas usuarios",
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            handler: () => this.editClient(false),
          },
          {
            text: 'Si',
            handler: () => this.editClient(true),
          },
        ],
      });
      
      await alert.present();
    }
    
    async Done(header,message) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons:['OK'],
      });
      await alert.present();
    }
    
  }
  