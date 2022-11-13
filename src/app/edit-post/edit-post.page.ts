import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CameraSource,CameraResultType,Camera,Photo } from '@capacitor/camera';
import { FormGroup } from '@angular/forms';
//import { Post } from '../models/post';
import { Firestore, collection, collectionData, docData, addDoc, deleteDoc, updateDoc,query, getDoc, doc, getFirestore } from '@angular/fire/firestore';
import { DataService, Post } from '../services/data.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
  public post : Post = {title:'a',text:'e',positive:true,type:""};
  credentials: FormGroup;
  title:string;
  text:string;
  positive:boolean;
  post2: Post;
  pos:number[];
  images: string[];
  b64imx: Photo;
  type:string;
  constructor(private dataservice: DataService, private router: Router, private loadingController: LoadingController,    private auth:Auth,
    private a:AuthService,private alertController: AlertController,private firestore: Firestore,private route: ActivatedRoute) { }

  ngOnInit() {
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

      })
    });    
  }
  async addPost(){
    //let postID: string;
    const loading = await this.loadingController.create();
      await loading.present();
      //await this.dataservice.getImagesArray();
      this.post2={
       id: this.post.id,
       author:this.auth.currentUser.uid,
       title: this.title,
       text:this.text,
       positive:this.positive,
       type:"post"
      }
      
      this.dataservice.updatePost(this.post2);
      await loading.dismiss();
      this.editPostAddPhoto(this.post2.id);
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
      await this.dataservice.updatePost(post)
      await loading.dismiss()
      
      await this.router.navigateByUrl('/app/home',{replaceUrl:true});    
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

  async choosePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);
    this.b64imx=image
   /*  if (image){
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.dataservice.uploadPhoto(image);
      loading.dismiss();

      if(!result){
        const alert = await this.alertController.create({
          header: 'Acción fallida',
          message: 'Hubo un problema al subir tu foto',
          buttons: ['OK']
        });
        await alert.present();
      }
    } */
  }

  async editPostAddPhoto(postedId: string){
    if (this.b64imx){
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.dataservice.uploadPhotoWId(this.b64imx,postedId);
      loading.dismiss();

      if(!result){
        const alert = await this.alertController.create({
          header: 'Acción fallida',
          message: 'Hubo un problema al subir tu foto',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
    this.router.navigateByUrl('/app/home',{replaceUrl:true});  
  }
}
