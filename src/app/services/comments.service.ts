import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc,getDoc,deleteDoc,updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';
export interface Comments {
  id?:string;
  comment:string;
  date: Date;
  postID?:string;
  user:string;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private firestore:Firestore, private auth:Auth) { }
  
  addComment(comment:Comments){
    const placeRef = collection(this.firestore,'comments');
    return addDoc(placeRef,comment);
  }
  getComment():Observable<Comments[]>{
    const postsRef = collection(this.firestore,'comments');
    return collectionData(postsRef, { idField: 'id'}) as Observable<Comments[]>;
  }
  deleteComment(comment:Comments){
    const commentRef = doc(this.firestore,`comments/${comment.id}`);
    return deleteDoc(commentRef);
  }
  
  async updateComment(comment:Comments){
    const user = await this.auth.currentUser;
    console.log("prueba: "+ comment.comment);
    console.log('ID1: '+comment.id);
    try{
      const commentDocRef = doc(this.firestore,`comments/${comment.id}`);
      await updateDoc(commentDocRef,{
        comment : comment.comment
      });
    }catch(e){
      console.log(e);
      return null;
    }
    //console.log(e);
    //}
  }
}
