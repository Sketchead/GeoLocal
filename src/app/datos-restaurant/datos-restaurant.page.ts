import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-restaurant',
  templateUrl: './datos-restaurant.page.html',
  styleUrls: ['./datos-restaurant.page.scss'],
})
export class DatosRestaurantPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  confirmar(){
    this.router.navigateByUrl('/app/profile',{replaceUrl:true});
  }

}
