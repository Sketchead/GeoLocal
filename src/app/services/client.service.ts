import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore , doc, setDoc, updateDoc} from '@angular/fire/firestore';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore:Firestore,
    private auth:Auth) { }

  async createClient(client:Client){
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

  async editClient(client:Client){
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
