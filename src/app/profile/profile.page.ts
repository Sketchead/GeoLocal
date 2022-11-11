import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DataService, Post } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = null;
  userLogged? = null;
  posts = [];
  ownPosts = null;
  profiles= [];
  profilePicture = null;
  username = null;
  constructor(private auth:AuthService,
    private router:Router,
    private avatarService:AvatarService,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private dataService: DataService
    ) {
      this.dataService.getProfiles().subscribe(res=>{
        this.profiles = res;
      })
      const gauth = getAuth();
      onAuthStateChanged(gauth, (user) => {
        if (user) {
          this.avatarService.getUserProfile().subscribe((data)=>{
            this.profile = data;
            this.ownPosts = data.client.user
          })
          this.dataService.getPosts().subscribe(res=>{
            this.posts = res;
          })
        } else {
          this.router.navigateByUrl('/login',{replaceUrl:true}); 
          this.showAlert("No hay usuario autenticado","Por favor Inicie sesion")
        }
      });
 
    }
    
    ngOnInit() {
      
      
    }
    postText(postText:string){
      if(postText==undefined){
        return postText
      }
      if(postText.length>250){
        postText = postText.substring(0,200)
        return postText+" ..."
      }
      return postText
    }
    hasimage(post:Post){
      for(let i=0;i<this.profiles.length;i++){
        if(post.author==this.profiles[i].client.user){
          this.profilePicture = this.profiles[i].imageURL
          return true
        }
      }
      return false
    }

    user(post:Post){
      for(let i=0;i<this.profiles.length;i++){
        if(post.author==this.profiles[i].client.user){
          this.username = this.profiles[i].client.username
          return this.username
        }
      }
      return "Prueba"
    }

    type(post:Post){
      let type=""
      for(let i=0;i<this.profiles.length;i++){
        if(post.author==this.profiles[i].client.user){
          type = this.profiles[i].client.type
          return type
        }
      }
      return "tipo"
    }
    seePost(id: string){
      this.router.navigate(['/view-post'], {
        queryParams: { id: id  },
      });
    }

    async deletePost(post,confirm){
      if(confirm){
        const loading = await this.loadingController.create()
        await loading.present()
        
        await this.dataService.deletePost(post)
        await loading.dismiss()

        await this.dataService.getPosts().subscribe(res=>{
          this.posts = res;
        })
        this.Done("Eliminado exitoso","La publicacion se ha eliminado con exito")
      }
    }
    
    
    async deleteConfirmation(post) {
      const alert = await this.alertController.create({
        header: '¿Estas seguro?',
        message: "Una vez eliminado, no se podra recuperar",
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            handler: () => this.deletePost(post,false),
          },
          {
            text: 'Si',
            handler: () => this.deletePost(post,true),
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

    async logout(){
      await this.auth.logout()
      await this.router.navigateByUrl('',{replaceUrl:true});
    }
    
    async changeImage(){
      const client = this.profile
      const image = await Camera.getPhoto({
        quality:90,
        allowEditing:false,
        resultType:CameraResultType.Base64,
        source:CameraSource.Photos,
      });
      console.log(image);
      if(image){
        const loading = await this.loadingController.create();
        await loading.present();
        
        const result = await this.avatarService.uploadPhoto(image,client)
        loading.dismiss();
        
        if(!result){
          const alert = await this.alertController.create({
            header:'Subir imagen Fallo',
            message:'Hubo un problema al subir tu imagen',
            buttons:['OK']
          });
          await alert.present();
        }
      }
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
  