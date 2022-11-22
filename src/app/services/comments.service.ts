import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface Comments {
  comment:string;
  date: Date;
  postID?:string;
  user:string;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private firestore:Firestore) { }
  
  addComment(comment:Comments){
    const placeRef = collection(this.firestore,'comments');
    return addDoc(placeRef,comment);
  }
  getComment():Observable<Comments[]>{
    const postsRef = collection(this.firestore,'comments');
    return collectionData(postsRef, { idField: 'id'}) as Observable<Comments[]>;
  }
}
