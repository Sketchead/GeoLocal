import { RestaurantService } from '../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Post } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { CameraSource,CameraResultType,Camera,Photo } from '@capacitor/camera'


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {

  credentials: FormGroup;
  title:string;
  text:string;
  positive:boolean;
  post: Post;
  pos:number[];
  images: string[];
  b64imx: Photo;

  constructor( 
    private dataservice: DataService, 
    private router: Router, 
    private loadingController: LoadingController,    
    private auth:Auth,
    private a:AuthService,
    private alertController: AlertController
    ) { }

  

  ngOnInit() {
  }

  async addPost(){
    //let postID: string;
    const loading = await this.loadingController.create();
      await loading.present();
      //await this.dataservice.getImagesArray();
      this.post={
       author:this.auth.currentUser.uid,
       title: this.title,
       text:this.text,
       positive:this.positive
      }
      
      const postedId = await this.dataservice.addPostGetId(this.post);
      await loading.dismiss();
      this.editPostAddPhoto(postedId);
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
          message: 'Ocurrio un error al subir la foto',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
    this.router.navigateByUrl('/app/home',{replaceUrl:true});  
  }

}
