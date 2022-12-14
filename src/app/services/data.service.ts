import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, addDoc, deleteDoc, updateDoc,query, getDoc, doc, getFirestore } from '@angular/fire/firestore';
import { notEqual } from 'assert';
import { Observable } from 'rxjs';
import { Photo } from '@capacitor/camera'
import { Auth } from '@angular/fire/auth';
import { deleteObject, ref,Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadString } from '@firebase/storage';
import { setDoc } from '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


export interface Post{
  author?: string;
  id?: string;
  title: string;
  text: string;
  positive?: boolean;
  pos?: number[];
  images?: string[];
  type:string;
}
export interface User{
  latitud: string;
  longitud: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private firestore: Firestore, private auth:Auth, private storage: Storage,) { }
  
  getPosts(): Observable<Post[]>{
    const postsRef = collection(this.firestore,'posts');
    return collectionData(postsRef, { idField: 'id'}) as Observable<Post[]>;
  }
 
  getUsers(): Observable<User[]>{
    const postsRef = collection(this.firestore,'posts');
    return collectionData(postsRef, { idField: 'id'}) as Observable<User[]>;
  }

  getProfiles(): Observable<Post[]>{
    const profileRef = collection(this.firestore,'users');
    return collectionData(profileRef, { idField: 'user'}) as Observable<Post[]>;
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
    /* PARA INSERTAR Y RECUPERAR ID, SE CAMBIAR??A RETURN DEL M??TODO 
    addDoc(postRef, post).then(documentId => {
      console.log(documentId.id);
      return documentId.id;
    }); */
    return addDoc(postRef, post);
  }
  
  addPostGetId(post: Post){
    const postRef = collection(this.firestore,'posts');
    //PARA INSERTAR Y RECUPERAR ID, SE CAMBIAR??A RETURN DEL M??TODO 
    const pid = addDoc(postRef, post).then(documentId => {
      console.log(documentId.id);
      return documentId.id;
    }); 
    return pid;
  }
  
  deletePost(post: Post){
    const postRef = doc(this.firestore,`posts/${post.id}`);
    return deleteDoc(postRef);
  }
  
  deleteImage(post:Post){
    const user = post.author;
    for (let i = 0; i < post.images.length; i++) {
      console.log(post.images[i])
    }/*
    const path = `uploads/${user}/${post.images}`;
    const storageRef = ref(this.storage,path);
    deleteObject(storageRef).then(() => {
      return true
    }).catch((error) => {
      console.log(error)
    });*/
  }
  
  updatePost(post: Post){
    const postsDocRef = doc(this.firestore,`posts/${post.id}`);
    return updateDoc(postsDocRef, {
      title: post.title,
      text: post.text,
      positive: post.positive
      })
    }
    
    async uploadPhoto(cameraFile: Photo){
      let images: string[] 
      const user = this.auth.currentUser;
      const pId = 'bvSZeSKsuk6Ea95M6ytv';
      //Agregar id de doc
      const path = `uploads/${user.uid}/photo.png`;
      const storageRef = ref(this.storage,path);
      
      try{
        await uploadString(storageRef, cameraFile.base64String, 'base64');
        const imageURL = await getDownloadURL(storageRef)
        images = [imageURL]
        const postDocRef = doc(this.firestore,`posts/${pId}`)
        await setDoc(postDocRef,{
          images
        })
        return true;
      }catch(e){
        console.log(e);
        return null;
      }
    }
    
    async uploadPhotoWId(cameraFile: Photo, docId: string){
      let images: string[] 
      const user = this.auth.currentUser;
      const pId = docId;
      //Agregar id de doc
      const path = `uploads/${user.uid}/${pId}/photo.png`;
      const storageRef = ref(this.storage,path);
      
      try{
        await uploadString(storageRef, cameraFile.base64String, 'base64');
        const imageURL = await getDownloadURL(storageRef)
        images = [imageURL]
        const postDocRef = doc(this.firestore,`posts/${pId}`)
        await updateDoc(postDocRef,{
          images
        })
        return true;
      }catch(e){
        console.log(e);
        return null;
      }
    }
    
    //Para recuperar array de url de imagenes
    async getImagesArray(cameraFile: Photo): Promise<string[]>{
      let images: string[] 
      const user = this.auth.currentUser;
      const pId = 'bvSZeSKsuk6Ea95M6ytv';
      //Agregar id de doc
      
      const path = `uploads/${user.uid}/photo.png`;
      const storageRef = ref(this.storage,path);
      
      try{
        await uploadString(storageRef, cameraFile.base64String, 'base64');
        const imageURL = await getDownloadURL(storageRef)
        images = [imageURL]
        
        return images;
      }catch(e){
        console.log(e);
        return null;
      }
    }
    
    async getDoc(docId){
      const docRef = doc(this.firestore,`posts/${docId}`)
      let dataDoc = null
      getDoc(docRef)
      .then((doc)=>{
        console.log(doc.data(),doc.id)
        dataDoc = doc.data()
        return dataDoc
      })
    }
  }
  