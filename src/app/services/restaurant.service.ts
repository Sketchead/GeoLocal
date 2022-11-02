import { Injectable } from '@angular/core';
import { Firestore ,collectionData, collection, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private firestore:Firestore) { }

  createRes(res){
    const resRef = collection(this.firestore,'users')
    return addDoc(resRef,res)
  }
  
}
 