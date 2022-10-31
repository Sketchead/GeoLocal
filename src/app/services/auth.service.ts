import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
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

  async login ({email,password}){

  }

  logout(){
    return signOut(this.auth)
  }
}
