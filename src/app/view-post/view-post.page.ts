import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//import { Post } from '../models/post';
import { Firestore, collection, collectionData, docData, addDoc, deleteDoc, updateDoc,query, getDoc, doc, getFirestore } from '@angular/fire/firestore';
import { DataService, Post } from '../services/data.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {
  userLogged? = null;
  public post : Post = {title:'a',text:'e',positive:true,type:""};
  public a: Params;
  public isOwner: Boolean;
  profiles= [];
  profilePicture = null;
  username = null;
  constructor(private dataService: DataService,private route: ActivatedRoute,private firestore: Firestore,
    private alertController: AlertController,private loadingController:LoadingController, private auth: Auth,
    private router:Router) {
    }
    
    async ngOnInit() {
      this.route.queryParams.subscribe(async (params) => {
        //console.log(params.id);
        const docRef = doc(this.firestore,`posts/${params.id}`)
        await getDoc(docRef)
        .then(async (doc)=>{
          this.post.id = params.id
          this.post.title = await doc.data().title
          this.post.images = await doc.data().images
          this.post.text = await doc.data().text
          this.post.author = await doc.data().author
          this.post.positive = await doc.data().positive
          this.post.pos = await doc.data().pos
          this.dataService.getProfiles().subscribe(res=>{
            this.profiles = res;
          })
          const gauth = getAuth();
          onAuthStateChanged(gauth, (user) => {
            if (user) {
              this.userLogged = this.auth.currentUser.uid;
              if(this.post.author === this.auth.currentUser.uid){
                this.isOwner=true;
              }
            } 
          });
        })
      });    
    }
    updatePost(id: string){
      console.log('upd click')
      this.router.navigate(['/edit-post'], {
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
    
    postText(postText:string){
      if(postText==undefined){
        return postText
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
    async deletepost(post,confirm){
      if(confirm){
        /*  QUEDA PENDIENTE ELIMINADO DE IMAGENES
        if(this.hasImage(post)){
          
          console.log(post.images)
          await this.dataService.deleteImage(post)
        }*/
        const loading = await this.loadingController.create()
        await loading.present()
        await this.dataService.deletePost(post)
        await loading.dismiss()
        
        await this.router.navigateByUrl('/app/home',{replaceUrl:true});    
        this.Done("Eliminado exitoso","La publicacion se ha eliminado con exito")
      }
    }
    
    async hasImage(post){
      if(post.images==undefined){
        return false
      }
      return true
    }
    
    
    async deleteConfirmation(post) {
      const alert = await this.alertController.create({
        header: '¿Estas seguro?',
        message: "Una vez eliminado, no se podra recuperar",
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            handler: () => this.deletepost(post,false),
          },
          {
            text: 'Si',
            handler: () => this.deletepost(post,true),
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
  