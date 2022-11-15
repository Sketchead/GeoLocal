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

@Component({
  selector: 'app-create-publicity-post',
  templateUrl: './create-publicity-post.page.html',
  styleUrls: ['./create-publicity-post.page.scss'],
})
export class CreatePublicityPostPage implements OnInit {
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
      const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
      
        this.pos[0]=(coordinates.coords.latitude);
        this.pos[1]=(coordinates.coords.longitude);
        console.log('Lat:', this.pos[0]);
        console.log('Lon:', this.pos[1]);

      };

      printCurrentPosition()
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
       pos:this.pos,
       type:"publicity"
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
          message: 'Hubo un problema al subir tu foto',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
    this.router.navigateByUrl('/app/home',{replaceUrl:true});  
  }
}
