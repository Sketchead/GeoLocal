import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
import { title } from 'process';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, Firestore, getDoc, collection } from '@angular/fire/firestore';
import { Console } from 'console';
import { DataService } from '../services/data.service';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const markers: Marker[] =[]

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')mapRef:ElementRef;
  map: GoogleMap;
  a:string;
  lt =[];
  lon = [];
  userType  = null;
  profiles= [];
  myPosition: any = {};
  markers: Marker[] =[];
  c=0;
  marcadores;string =[]
  
  

  constructor(
    private loadingController:LoadingController, 
    private data:DataService,
    private alert:AlertController,
    private firestore: Firestore,
    private auth:Auth,
    private dataService:DataService
    ) {   this.createMap();  }



  ngOnInit() {
    
  }




  ionViewDidEnter(){
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
    this.dataService.getProfiles().subscribe(res=>{
      //this.profiles = res.lastIndexOf.arguments.latitude.toString;
      this.profiles = res;
      for(let i=0; i<this.profiles.length; i++){
        if(this.profiles[i].client.latitude!=undefined && this.profiles[i].client.longitude!=undefined){
          const marker = {
              coordinate: {
                lat: Number(this.profiles[i].client.latitude),
                lng: Number(this.profiles[i].client.longitude),
              },
              title: 'Restaurant: '+this.profiles[i].client.username
            }
            this.markers.push(marker)
            console.log(marker)
        }else{
          console.log("no hay");
        }
      }
      console.log('markers',this.markers)
      this.map.addMarkers(this.markers)

      this.map.setOnMarkerClickListener(async (marker)=>{
        //this.getCoordenadas()
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
    })
    await loading.dismiss()
  }
  

  //metodo puntos
  async addMarkers(a:number, b:number){
    //for(let i=0; i<this.profiles.length; i++){
      this.markers= [
        {
          coordinate: {
            lat: a,
            lng: b,
          },
          title: 'Coordenadas',
          snippet:'Best place on earth',
        },
        /*{
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
        },*/
      ];  
      await this.map.addMarkers(markers);
      this.c++
    //}
    

    //Ver coordenadas
    this.map.setOnMarkerClickListener(async (marker)=>{
      //this.getCoordenadas()
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

    /*this.map.setOnMapClickListener(async (position)=>{
      const alert = await this.alert.create({
        header: 'Ubicaciòn',
        message:'posicion'
        +'Latitud: '+position.latitude+'    Longitud: '+position.longitude,
        buttons: ['OK']
      });  
      await alert.present()
      let result = await alert.onDidDismiss();
      console.log(result);
      this.a=position.latitude.toString();
      console.log(this.a);
    });*/

  }

  public getCoordenadas(){
    /*return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data();
          console.log(data);
          //const id = a.payload.doc.id;
          //return { id, ...data};
        });
      })
    )
    //return this.students;*/

    /*const docRef = doc(this.firestore,`users/${this.auth.currentUser.uid}`)
    getDoc(docRef).then(async (doc)=>{
        this.userType = await doc.data().client.type
        if(this.userType=="restaurant"){
          for(let i=0; i<10;i++){
            this.lat.push( doc.data().client.latitude)
            this.lon.push(doc.data().client.longitude)
            console.log(this.lat[i]);
            console.log(this.lon[i]);
          }  
        //this.lat = await doc.data().client.latitude
        //this.lon = await doc.data().client.longitude
        //console.log(this.lat);
        //console.log(this.lon);
        }else{
          console.log("usuario no restaurante");
        }  
    });*/

  }

  generaMarkers(){
    for(let i=0; i<this.profiles.length; i++){
      this.marcadores[i]=
      "{\n"+
        "coordinate: {\n"+
          "lat:"+this.profiles[i].client.latitude+",\n"+
          "lng:"+this.profiles[i].client.longitude+",\n"+
        "},\n"+
        "title: 'Coordenadas',\n"+
        "snippet:'Best place on earth',\n"+
      "},"
    }
  }
  
 

}
