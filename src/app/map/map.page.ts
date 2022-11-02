import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')mapRef:ElementRef;
  map: GoogleMap;

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.createMap();
  }
  async createMap(){
    this.map = await GoogleMap.create({
      id:'map',
      apiKey:environment.mapsKey,
      element:this.mapRef.nativeElement,
      config:{
        center:{
          lat:33.6,
          lng:-117.9,
        },
        zoom:8,
      }
    });
  }
}
