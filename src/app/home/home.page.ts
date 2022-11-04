import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userLogged? = null;
  posts = [];
  constructor(private router: Router,private dataService: DataService, private auth:Auth,) {
    this.dataService.getPosts().subscribe(res=>{
      console.log(res);
      this.posts = res;
    })
    //this.userLogged=this.auth.currentUser.uid;
  }

  seePost(id: string){
    this.router.navigate(['/view-post'], {
      queryParams: { id: id  },
    });
  }

  createPost(){
    console.log("click");
    this.router.navigate(['/create-post']);
  }

}
