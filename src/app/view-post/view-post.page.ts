import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//import { Post } from '../models/post';
import { DataService, Post } from '../services/data.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  public post : Post;
  public a: Params;
  constructor(private dataservice: DataService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      console.log(params.id);
      this.post = this.dataservice.getPostById(params.id);
      console.log(this.post);
    });
    
   }

  ngOnInit() {
    
  }

}
