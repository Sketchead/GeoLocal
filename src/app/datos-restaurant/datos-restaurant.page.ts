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
  selector: 'app-datos-restaurant',
  templateUrl: './datos-restaurant.page.html',
  styleUrls: ['./datos-restaurant.page.scss'],
})
export class DatosRestaurantPage implements OnInit {

  credentials: FormGroup;
  b64imx: Photo;
 
  constructor(
    private dataservice: DataService, 
    private router: Router, private loadingController: LoadingController,
    private auth:Auth,
    private a:AuthService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  confirmar(){
    this.router.navigateByUrl('/app/profile',{replaceUrl:true}); 
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

}
