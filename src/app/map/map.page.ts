import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
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
    await loading.dismiss()
  }
}
