import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Post } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { CameraSource,CameraResultType,Camera,Photo } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  credentials: FormGroup;
  title:string;
  text:string;
  positive:boolean;
  post: Post;
  pos:number[] = [1,2];
  images: string[]; 
  b64imx: Photo;
  type:string;
  constructor(private dataservice: DataService, private router: Router, private loadingController: LoadingController,    private auth:Auth,
    private a:AuthService,private alertController: AlertController) { 
      /*       this.pos[0]=21.50951
      this.pos[1]=-104.89569 */
      const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
      
        this.pos[0]=(coordinates.coords.latitude);
        this.pos[1]=(coordinates.coords.longitude);
        console.log('Lat:', this.pos[0]);
        console.log('Lon:', this.pos[1]);

      };

      printCurrentPosition()
      defineCustomElements(window);
    }

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
       positive:this.positive,
       pos:this.pos,
       type:"post"
      }
      
      const postedId = await this.dataservice.addPostGetId(this.post);
      await loading.dismiss();
      this.editPostAddPhoto(postedId);
  }

   async choosePhoto() {
    const alert = await this.alertController.create({
      header: 'Cargar foto desde',
      buttons: [
        {
          text: 'Galería',
          role: 'gallery',
          handler: async() => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Base64,
              source: CameraSource.Photos,
            });
            console.log(image);
            this.b64imx=image
          },
        },
        {
          text: 'Cámara',
          role: 'camera',
          handler: async() => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Base64,
              source: CameraSource.Camera,
            });
            console.log(image);
            this.b64imx=image
          },
        },
      ],
    });

      await alert.present();
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
