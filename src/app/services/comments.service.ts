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

  updateComment(comment:Comments){
    console.log("prueba: "+ comment.comment);
    
      const commentDocRef = doc(this.firestore,`comments/${comment.id}`);
       updateDoc(commentDocRef,{
        comment
      })
      //console.log(e);
    //}
  }
}
