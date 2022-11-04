import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { notEqual } from 'assert';
import { Observable } from 'rxjs';

export interface Post{
  author?: string;
  id?: string;
  title: string;
  text: string;
  positive: boolean;
  pos?: number[];
  images?: string[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
  
  getPosts(): Observable<Post[]>{
    const postsRef = collection(this.firestore,'posts');
    return collectionData(postsRef, { idField: 'id'}) as Observable<Post[]>;
  }

  getPostById(id: string): Post{
    let pst: Post;
    const postsDocRef = doc(this.firestore, `posts/${id}`);
    let p  = docData(postsDocRef, { idField: 'id'}) as unknown as Post
    pst.author = p.author
    pst.id = p.id
    pst.images = p.images
    pst.pos = p.pos
    pst.positive = p.positive
    pst.text = p.text
    pst.title = p.title
    return pst;
  }

  addPost(post: Post){
    const postRef = collection(this.firestore,'posts');
    return addDoc(postRef, post);
  }

  deletePost(post: Post){
    const postRef = doc(this.firestore,`posts/${post.id}`);
    return deleteDoc(postRef);
  }

  updatePost(post: Post){
    const postsDocRef = doc(this.firestore,`posts/${post.id}`);
    return updateDoc(postsDocRef, {
      title: post.title,
      text: post.text,
      positive: post.positive,
      images: post.images})
  }
}
