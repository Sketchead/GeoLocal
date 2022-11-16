import { Injectable } from '@angular/core';
import {  getAuth,Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { GoogleAuthProvider,signInWithRedirect,FacebookAuthProvider } from "firebase/auth"
import { redirectLoggedInTo} from '@angular/fire/auth-guard';
import { collection,query, where, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { Firestore,getDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth:Auth, private firestore: Firestore) {
  }
  
  async register({email,password}){
    try{
      const user = await createUserWithEmailAndPassword(this.auth,email,password);
      return user
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
    if(!isSetup){
      return () => redirectLoggedInTo(['/user-type'])
    }
    console.log("false")
    return () => redirectLoggedInTo(['/app/home'])
  }
  
  async login ({email,password}){
    try{
      const user = await signInWithEmailAndPassword(this.auth,email,password);
      return user
    }catch(e){
      console.log("error Login: "+e)
      return e;
    }
  }
  
  async googleLogin(){
    try{
      const auth = getAuth();
      const provider = new GoogleAuthProvider
      await signInWithRedirect(auth, provider);
    }catch(e){
      return null
    }
  }
  
  async facebookLogin(){
    try{
    const auth = getAuth();
      const provider = new FacebookAuthProvider();
      await signInWithRedirect(auth, provider);
    }catch(e){
      return null
    }
  }
  
  logout(){
    return signOut(this.auth)
  }
  
  async getUserType(userId){
    const docRef = doc(this.firestore,`users/${userId}`)
    let dataDoc = null
    getDoc(docRef)
    .then((doc)=>{
      console.log(doc.data(),doc.id)
      dataDoc = doc.data()
      return dataDoc.type
    })
  }
}