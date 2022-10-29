import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { notEqual } from 'assert';
import { Observable } from 'rxjs';

export interface Post{
  id?: string;
  title: string;
  text: string;
  positive: boolean;
  images?: string[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
  
  getPosts(): Observable<Post[]>{
    const postsRef = collection(this.firestore,'posts');
    return collectionData(postsRef, { idField: 'postId'}) as Observable<Post[]>;
  }

  getPostsById(id): Observable<Post>{
    const postsDocRef = doc(this.firestore,'posts/${id}');
    return docData(postsDocRef, { idField: 'postId'}) as Observable<Post>;
  }

  addPost(post: Post){
    const postRef = collection(this.firestore,'posts');
    return addDoc(postRef, post);
  }

  deletePost(post: Post){
    const postRef = doc(this.firestore,'posts/${post.id}');
    return deleteDoc(postRef);
  }

  updatePost(post: Post){
    const postsDocRef = doc(this.firestore,'posts/${post.id}');
    return updateDoc(postsDocRef, {
      title: post.title,
      text: post.text,
      positive: post.positive,
      images: post.images})
  }
}
