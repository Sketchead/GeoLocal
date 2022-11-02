import { Injectable } from '@angular/core';
import {  getAuth,Auth } from '@angular/fire/auth';
import { GoogleAuthProvider,signInWithRedirect,FacebookAuthProvider } from "firebase/auth"
import { redirectLoggedInTo} from '@angular/fire/auth-guard';
import { collection,query, where, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth:Auth, private firestore: Firestore) {
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
  
  async facebookregister(){
    try{
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      await signInWithRedirect(auth, provider);
    }catch(e){
      return null
    }
  }
  
  async hasSetup(){
    const auth = getAuth();
    const user = auth.currentUser.uid
    
    const db = collection(this.firestore,'users')
    const isSetup = query(collection(db, "users"), where("user", "==", user));
    //console.log(isSetup)
    if(!isSetup){
      return () => redirectLoggedInTo(['/user-type'])
    }
    console.log("false")
     return () => redirectLoggedInTo(['/app/home'])
  }
  
  async login ({email,password}){
    
  }
  
  logout(){
    return signOut(this.auth)
  }
}