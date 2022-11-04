import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Post } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  credentials: FormGroup;
  title:string;
  text:string;
  positive:boolean;
  post: Post;
  pos:number[];
  constructor(private dataservice: DataService, private router: Router, private loadingController: LoadingController,    private auth:Auth,
    private a:AuthService, ) { 
/*       this.pos[0]=21.50951
      this.pos[1]=-104.89569 */
    }

  ngOnInit() {
  }

  async addPost(){
    const loading = await this.loadingController.create();
      await loading.present();

      this.post={
       author:this.auth.currentUser.uid,
       title: this.title,
       text:this.text,
       positive:this.positive
      }
      await this.dataservice.addPost(this.post)
      await loading.dismiss();
      this.router.navigateByUrl('/app/home',{replaceUrl:true}); 
  }
}
