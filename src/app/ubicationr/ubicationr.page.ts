import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
import { title } from 'process';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ubicationr',
  templateUrl: './ubicationr.page.html',
  styleUrls: ['./ubicationr.page.scss'],
})
export class UbicationrPage implements OnInit {
  @ViewChild('map')mapRef:ElementRef;
  map: GoogleMap;
  lat:string;
  long:String;

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
    //Posicion
    this.map.setOnMapClickListener(async (position)=>{
      const alert = await this.alert.create({
        header: 'Ubicaciòn',
        message:'posicion'
        +'Latitud: '+position.latitude+'    Longitud: '+position.longitude,
        buttons: ['OK']
      });  
      await alert.present()
      let result = await alert.onDidDismiss();
      console.log(result);
      this.lat=position.latitude.toString();
      this.long=position.longitude.toString();
      console.log(this.lat);
      console.log(this.long);
    });

  }

} 
 