import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
import { title } from 'process';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')mapRef:ElementRef;
  map: GoogleMap;

  constructor(private loadingController:LoadingController) { }



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
        title: 'localhost',
        snippet:'Best place on earth',
      },
      {
        coordinate: {
          lat: 21.5090,
          lng: -104.8950,
        },
        title: 'random place',
        snippet:'Not sure',
      },
    ];  
    await this.map.addMarkers(markers);
  }


}
