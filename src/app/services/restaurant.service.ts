import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore ,collectionData, collection, addDoc, setDoc, doc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  latitude:string;
  longitude:string;
  uso:number;

  constructor(private firestore:Firestore,
    private auth:Auth) { }

  async createRes(client){
    const user = await this.auth.currentUser;
    try{
      const userDocRef = doc(this.firestore,`users/${user.uid}`);
      await setDoc(userDocRef,{
        client
      })
      return true;
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async editRes(client){
    const user = await this.auth.currentUser;
    try{
      const userDocRef = doc(this.firestore,`users/${user.uid}`);
      await updateDoc(userDocRef,{
        client
      })
      return true;
    }catch(e){
      console.log(e);
      return null;
    }
  }
  
  
}
 