import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts = [];
  constructor(private router: Router,private dataService: DataService) {
    this.dataService.getPosts().subscribe(res=>{
      console.log(res);
      this.posts = res;
    })
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
