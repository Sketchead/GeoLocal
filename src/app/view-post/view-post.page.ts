import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//import { Post } from '../models/post';
import { Firestore, collection, collectionData, docData, addDoc, deleteDoc, updateDoc,query, getDoc, doc, getFirestore } from '@angular/fire/firestore';
import { DataService, Post } from '../services/data.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  public post : Post = {title:'a',text:'e',positive:true};
  public a: Params;
  public isOwner: Boolean;
  constructor(private dataservice: DataService,private route: ActivatedRoute,private firestore: Firestore, private auth: Auth) {
   }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      //console.log(params.id);
      const docRef = doc(this.firestore,`posts/${params.id}`)
      await getDoc(docRef)
        .then(async (doc)=>{
          console.log(doc.data(),doc.id)
          this.post.title = await doc.data().title
          this.post.images = await doc.data().images
          this.post.text = await doc.data().text
          this.post.author = await doc.data().author
          this.post.positive = await doc.data().positive
          this.post.pos = await doc.data().pos

          if(this.post.author === this.auth.currentUser.uid){
            this.isOwner=true;
          }
        })
    });    
  }

}
