import { Injectable } from '@angular/core';
import { Firestore ,collectionData, collection, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore:Firestore,) { }

  createClient(client){
    const clientRef = collection(this.firestore,'users')
    return addDoc(clientRef,client)
  }
}
