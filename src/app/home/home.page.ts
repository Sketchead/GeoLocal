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
import { Geolocation } from '@capacitor/geolocation';


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
  pos:number[] = [1,2];
  nearbyPosts = []
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

          const getCPosition = async () => {
            this.nearbyPosts = [];
            const coordinates = await Geolocation.getCurrentPosition();
            this.pos[0]=(coordinates.coords.latitude);
            this.pos[1]=(coordinates.coords.longitude);
            for (let index = 0; index < this.posts.length; index++) {
              
              console.log('Lat:', this.pos[0]);
              console.log('Lon:', this.pos[1]);
 
              var lat2 = res[index].pos[0]; 
              var lon2 = res[index].pos[1]; 
              var lat1 = this.pos[0]; 
              var lon1 = this.pos[1]; 
        
              var R = 6371; // km 

              var x1 = lat2-lat1;
              var dLat = this.toRad(x1);  
              var x2 = lon2-lon1;
              var dLon = this.toRad(x2);  
              var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
                              Math.sin(dLon/2) * Math.sin(dLon/2);  
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
              var d = R * c; 
              
              console.log('DISTANCIA: ',d)
              if(d<5)this.nearbyPosts.push(res[index]);         
            }
            console.log(this.nearbyPosts);
          };

          getCPosition()
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
            if(doc.data()){
              this.userType = await doc.data().client.type
            }else{
              this.router.navigateByUrl('/user-type',{replaceUrl:true});
            } 
          });
        } else {
          this.router.navigateByUrl('/login',{replaceUrl:true});
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
    seeProfile(id: string){
      if(id==this.userLogged){
        this.router.navigate(['/app/profile'])
      }else{
      this.router.navigate(['/view-profile'], {
        queryParams: { id: id  },
      });
    }
    }

    updatePost(id: string){
      console.log('upd click')
      this.router.navigate(['/edit-post'], {
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

    toRad(n: number) {
      return n * Math.PI / 180;
    }
    
  }
  