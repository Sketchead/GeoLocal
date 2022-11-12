import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Auth } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AvatarService } from '../services/avatar.service';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { Firestore,getDoc,doc } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userLogged? = null;
  posts = [];
  profiles= [];
  profilePicture = null;
  username = null;
  userType  = null;
  constructor(private router: Router,
    private dataService: DataService, 
    private auth:Auth,
    private alertController: AlertController,
    private loadingController:LoadingController,
    private avatarService:AvatarService,
    private authServ: AuthService,
    private firestore: Firestore) {
        this.dataService.getPosts().subscribe(res=>{
          this.posts = res;
        })
        this.dataService.getProfiles().subscribe(res=>{
          this.profiles = res;
        })
        const gauth = getAuth();
      onAuthStateChanged(gauth, async (user) => {
        if (user) {
          this.userLogged = this.auth.currentUser.uid;
          const docRef = doc(this.firestore,`users/${this.auth.currentUser.uid}`)
          await getDoc(docRef).then(async (doc)=>{
            this.userType = await doc.data().client.type
            console.log('tipo: ',this.userType)
          });
        } 
      });

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
    
    createPost(){
      this.router.navigate(['/create-post']);
    }

    createPublicity(){
      this.router.navigate(['/create-publicity-post']);
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

    
  }
  