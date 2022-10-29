import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts = [];
  constructor(private dataService: DataService) {
    this.dataService.getPosts().subscribe(res=>{
      console.log(res);
      this.posts = res;
    })
  }

}
