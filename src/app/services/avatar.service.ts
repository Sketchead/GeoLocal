import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc,docData,Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private auth:Auth,
    private firestore:Firestore,
    private storage:Storage) { }

  getUserProfile(){
    const user = this.auth.currentUser
    const userDocRef = doc(this.firestore,`users/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadPhoto(cameraFile: Photo,client:Client){
    const user = await this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage,path);
    
    try{
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageURL = await getDownloadURL(storageRef)
      const userDocRef = doc(this.firestore,`users/${user.uid}`);
      await updateDoc(userDocRef,{
        imageURL
      })
      return true;
    }catch(e){
      console.log(e);
      return null;
    }
  }
  

}
