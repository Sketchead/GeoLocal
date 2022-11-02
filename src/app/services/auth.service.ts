import { Injectable } from '@angular/core';
import {  getAuth,Auth } from '@angular/fire/auth';
import { GoogleAuthProvider,signInWithRedirect } from "firebase/auth"

import { createUserWithEmailAndPassword, signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) {
  }

  async register({email,password}){
    try{
      const user = await createUserWithEmailAndPassword(this.auth,email,password);
    }catch(e){
      return null;
    }
  }

  async googleregister(){
    try{
      const auth = getAuth();
      const provider = new GoogleAuthProvider
      await signInWithRedirect(auth, provider);
    }catch(e){
      return null
    }
  }

  async login ({email,password}){

  }

  logout(){
    return signOut(this.auth)
  }
}
