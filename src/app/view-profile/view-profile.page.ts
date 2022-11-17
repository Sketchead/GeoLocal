import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { DataService, Post } from '../services/data.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  profile = null;
  userLogged? = null;
  posts = [];
  ownPosts = null;
  profiles= [];
  profilePicture = null;
  username = null;
  profileuser = ""
  
  constructor(private auth:AuthService,
    private router:Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    private avatarService:AvatarService) { 
      this.route.queryParams.subscribe(async (params) => {
      this.dataService.getProfiles().subscribe(res=>{
        this.profiles = res;
      })
      const gauth = getAuth();
      onAuthStateChanged(gauth, (user) => {
        if (user) {
          this.avatarService.getUserProfileWId(params.id).subscribe((data)=>{
            this.profile = data;
            this.ownPosts = data.client.user
            this.profileuser = data.client.username
          })
          this.dataService.getPosts().subscribe(res=>{
            this.posts = res;
          })
        }
      });
    });  
    }

  ngOnInit() {
  }
  postText(postText:string){
    if(postText==undefined){
      return postText
    }
    if(postText.length>250){
      postText = postText.substring(0,200)
      return postText+" ..."
    }
    return postText
  }

  user(post:Post){
    for(let i=0;i<this.profiles.length;i++){
      if(post.author==this.profiles[i].client.user){
        this.username = this.profiles[i].client.username
        return this.username
      }
    }
    return "Prueba"
  }

  hasimage(post:Post){
    for(let i=0;i<this.profiles.length;i++){
      if(post.author==this.profiles[i].client.user){
        this.profilePicture = this.profiles[i].imageURL
        return true
      }
    }
    return false
  }

  type(post:Post){
    let type=""
    for(let i=0;i<this.profiles.length;i++){
      if(post.author==this.profiles[i].client.user){
        type = this.profiles[i].client.type
        return type
      }
    }
    return "tipo"
  }
  seePost(id: string){
    this.router.navigate(['/view-post'], {
      queryParams: { id: id  },
    });
  }

}
 