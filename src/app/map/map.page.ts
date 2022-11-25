import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
import { title } from 'process';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')mapRef:ElementRef;
  map: GoogleMap;

  constructor(private loadingController:LoadingController, private alert:AlertController) { }



  ngOnInit() {
  }




  ionViewDidEnter(){
    this.createMap();
  }
  async createMap(){
    const loading = await this.loadingController.create()
      await loading.present()
    this.map = await GoogleMap.create({
      id:'map',
      apiKey:environment.mapsKey,
      element:this.mapRef.nativeElement,
      config:{
        center:{
          lat:21.5095,
          lng:-104.8957,
        },
        zoom:14,
        minZoom: 5
      }
    });
    this.addMarkers();
    await loading.dismiss()
  }

  //metodo puntos
  async addMarkers(){
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 21.5095,
          lng: -104.8957,
        },
        title: 'Restaurant La U',
        snippet:'Best place on earth',
      },
      {
        coordinate: {
          lat: 21.5039,
          lng: -104.895,
        },
        title: 'Restaurant La Coquiza',
        snippet:'Not sure',
      },
      {
        coordinate: {
          lat: 21.5100,
          lng: -104.8850,
        },
        title: 'Restaurant La Noria',
        snippet:'Not sure',
      },
    ];  
    await this.map.addMarkers(markers);

    //Ver coordenadas
    this.map.setOnMarkerClickListener(async (marker)=>{
      const alert = await this.alert.create({
        header: 'Ubicaciòn',
        message: marker.title+'\n'
        +'Latitud: '+marker.latitude+'    Longitud: '+marker.longitude,
        buttons: ['OK']
      });  
      await alert.present()
      let result = await alert.onDidDismiss();
      console.log(result);
    });
    /*this.map.setOnMarkerClickListener(async (marker)=>{
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps:{
          marker,
        },
        breakpoints: [0,0.3],
        initialBreakpoint:0.3,
      });
      modal.present();
    });*/
  }


}
